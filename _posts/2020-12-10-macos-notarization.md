---
title: Code Signing and Notarization on macOS
category: website
layout: post
permalink: /blog/:year-:month-:day-:title.html
excerpt_separator: <!--more-->
comments: true
commentform: true
---

Over the past several years, Apple has been increasing the security requirements
of macOS applications.  Besides the macOS binaries I've been building of my
software, I also have been helping other open source projects get their macOS
binaries to be acceptable on users' systems while still allowing the build
process to be as automated as possible...

<!--more-->

Code Signing Basics
===================

*Code signing* calculates a cryptographic hash (a complex checksum) of your
software files and a certificate you get from Apple that both identifies who you
are and that Apple trusts you.  The hash can then be verified when the software
is installed and run so that macOS knows that the software can be trusted and
that it hasn't been changed.  If not, you'll get the dreaded "this software
can't be trusted" dialog.

You install a code signing certificate by running the Xcode application, opening
the Preferences window (`CMD+,`), and going under the Accounts tab.  Click on
"Manage Certificates..." to add a Developer ID Application certificate for
signing a command-line tool or application bundle and/or a Developer ID
Installer certificate for signing a macOS package.

Each developer account has an associated team ID that consists of 10 uppercase
letters and/or numbers, e.g. "AB3456789Z".  This team ID is listed in the
certificate common name, e.g. "Developer ID Application: Bob's Software (AB3456789Z)".

> Note: The Developer ID certificates require a paid Apple developer program
> account.  If you are a member of a development team, you might have to ask
> your team administrator to generate the certificates for you.

Two other kinds of certificates are also used on macOS:

- The "ad-hoc" certificate ("-") which is for running and testing code on your
  local machine only.
- The "Apple Development" certificate which is for signing software you submit
  to the Mac AppStore.

Unless you re-sign with a Developer ID certificate, executables signed with the
ad-hoc or Apple Development certificates will not run on your other systems.


Notarization
------------

Starting with macOS 10.15, software must also be *notarized*.  Notarization is
a kind of two-factor authentication for code signing - after you sign your
software, you send a copy of it to Apple along with your Apple ID credentials
(more on that in a moment) so that Apple can match everything up and produce
a cryptographic seal-of-approval for your software.  The results of notarization
should be attached to the software that you provide to your users to avoid
issues when the user isn't online.


Runtime Restrictions
--------------------

Another feature of code signing on macOS is that the signature can specify
additional restrictions for the runtime environment for the program.  Some of
these restrictions are required for notarization to work, and one of them
(the "runtime" restriction) prevents you from inserting dynamic libraries or
debugging the executables.


Command-Line Tools
==================

Xcode includes three command-line tools, accessed by putting `xcrun` in front of
the names, that are used for code signing and notarization.  The `codesign`
utility does the actual code signing and accepts several arguments:

- `-s IDENTITY`: Specifies the code signing identity such as "-" for ad-hoc,
  "Developer ID Application" to use any Developer ID application certificate
  you have, or "TEAMID" to use the Developer ID certificate associated with the
  specified team.

- `-o OPTIONS`: Specifies code signing options separated by commas.  All
  notarized applications (and those shipped through the Mac AppStore) must use
  the "runtime" option.

- `--timestamp`: Includes an authenticated date/time stamp in the signature,
  which is required for notarization.

- `-i BUNDLE-ID` or `--prefix BUNDLE-PREFIX`: Specifies a unique identifier for
  a command-line program, e.g. "com.bobsoft.program" for the identifier or
  "com.bobsoft" for the prefix.  In the case of `--prefix`, the program name is
  added to the prefix.  The BUNDLE-ID must be unique across all software you
  sign.

- `-f`: Forces the code signature to be replaced, if one already exists.

The `altool` is used to notarize a package or ZIP file containing an application
bundle or one or more programs:

- `--notarize-app`: Notarizes the given file.
- `--notarization-info UUID`: Queries the status of a notarization request.
- `-f FILENAME`: Specifies a ZIP file or package (.pkg) file.
- `--primary-bundle-id BUNDLE-ID-OR-PREFIX`: Specifies the application bundle ID
  or the prefix that was used for command-line programs.
- `--username APPLEID`: Specifies the developer account's Apple ID (email
  address).
- `--password @keychain:AC_TEAMID`: Specifies the keychain entry to use for the
  password (token) string.
- `--asc-provider TEAMID`: Specifies the developer team that is producing the
  software.

Finally, the `stapler` command is used to attach a copy of the notarization to
your software.  This command currently only works for application bundles and
packages.


Creating an OSS-Friendly Code Signing Workflow
==============================================

Any [code signing workflow][1] for open source projects should be flexible about
the use of Apple identifiers.  I typically use the "APPLEID" and "TEAMID"
environment variables to provide the Apple ID and team ID values for a given
project.

The notarization (`altool`) command needs an [app-specific password string][2].
While the Apple examples store this in a keychain item named "AC\_PASSWORD", I
recommend using "AC\_$TEAMID" to allow for working on multiple development
teams.  For example, if your team ID is "AB3456789Z", your Apple ID is
"bob@bobsoft.com", and your app-specific password string is "abcdef123456789",
run:

    xcrun altool --store-password-in-keychain-item "AC_AB3456789Z" \
        -u "bob@bobsoft.com" -p abcdef123456789

Once you have these basics setup, you can use the [following script][3] to sign
and notarize an application, a package, or a list of commands:

```
#!/bin/sh
#
# macOS code signing and notarization script.
#
# Copyright © 2020 by Michael R Sweet
#
# Redistribution and use in source and binary forms, with or without
# modification, are permitted provided that the following conditions are met:
#
# 1. Redistributions of source code must retain the above copyright notice, this
#    list of conditions and the following disclaimer.
#
# THIS SOFTWARE IS PROVIDED BY MICHAEL R SWEERT "AS IS" AND ANY EXPRESS OR
# IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
# MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
# EVENT SHALL MICHAEL R SWEET BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
# SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
# PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
# OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
# WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
# OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
# ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
#
# Usage:
#
#   sign-and-notarize [--prefix BUNDLE-PREFIX] FILE [ ... FILE ]
#


if test "x$APPLEID" = x; then
  echo Please set the APPLEID environment variable.
  exit 1
fi

if test "x$TEAMID" = x; then
  echo Please set the TEAMID environment variable.
  exit 1
fi

primary=""
prefix=""
files=""
zipfile="$TMPDIR/notarize$$.zip"
alfile="$TMPDIR/notarize$$.txt"

# Collect files and do code signing...
while test $# -gt 0; do
  arg="$1"
  shift

  case "$arg" in
    --help)
      echo "Usage: sign-and-notarize [--prefix BUNDLE-PREFIX] FILE [ ... FILE]"
      exit 0
      ;;

    --prefix)
      prefix="$1"
      shift
      ;;

    -*)
      echo "Unknown option '$arg'."
      exit 1
      ;;

    *.app | *.pkg)
      files="$files $arg"

      # Get the primary bundle ID...
      if test -f $arg/Contents/Info.plist; then
        primary=`plutil -p $arg/Contents/Info.plist | grep CFBundleIdentifier | awk -F\" '{print $4}'`
      fi

      echo "xcrun codesign -f -s $TEAMID -o runtime --timestamp $arg"
      xcrun codesign -f -s $TEAMID -o runtime --timestamp $arg
      ;;

    *)
      if test "x$prefix" = x; then
        echo "Missing --prefix option."
        exit 1
      fi

      files="$files $arg"
      echo "xcrun codesign -f -s $TEAMID --prefix $prefix -o runtime --timestamp $arg"
      xcrun codesign -f -s $TEAMID --prefix $prefix -o runtime --timestamp $arg
      ;;
  esac
done

if test "x$files" = x; then
  echo "Usage: sign-and-notarize [--prefix BUNDLE-PREFIX] FILE [ ... FILE]"
  exit 1
fi

# Notarize...
echo "zip -rv ... $files"
zip -rv $zipfile $files

if test "x$primary" = x; then
  # When signing multiple command-line tools, use the prefix as the primary
  if (echo $files | grep -q ' '); then
    primary="$prefix"
  else
    primary="$prefix.`echo $files`"
  fi
fi

echo "xcrun altool --notarize-app -f ... --primary-bundle-id $primary ..."
xcrun altool --notarize-app -f $zipfile --primary-bundle-id $primary --username $APPLEID --password @keychain:AC_$TEAMID --asc-provider $TEAMID > $alfile || exit 1

uuid=`grep RequestUUID $alfile | awk '{print $3}'`
status="in progress"

while test "$status" = "in progress"; do
  echo "    $uuid: $status"
  sleep 10
  echo "xcrun altool --notarization-info ..."
  xcrun altool --notarization-info $uuid --username $APPLEID --password @keychain:AC_$TEAMID --asc-provider $TEAMID > $alfile || exit 1
  status="`grep Status: $alfile | cut -b14-`"
done

echo "    $uuid: $status"
rm -f $alfile $zipfile

# Staple the notarization...
for file in $files; do
  case "$file" in
    *.app | *.pkg)
      echo "xcrun stapler staple $file"
      xcrun stapler staple $file
      ;;
  esac
done
```

[1]: https://developer.apple.com/documentation/xcode/notarizing_macos_software_before_distribution/customizing_the_notarization_workflow#3087720
[2]: https://support.apple.com/en-us/HT204397
[3]: /tools/sign-and-notarize.sh.txt
