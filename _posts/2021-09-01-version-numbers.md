---
title: Version Numbering
category: website
layout: post
permalink: /blog/:year-:month-:day-:title.html
excerpt_separator: <!--more-->
comments: true
commentform: true
---

I recently got some push-back on my latest beta releases, specifically on the
format of my version numbers (1.0b1 for PDFio, and 1.1b1 for PAPPL).  I've been
using this scheme for many years now, and it is hardly unique. What follows is
a short summary of the history, standards, and best practices for version
numbers...

<!--more-->

## Some History

Version numbering has long been a source of pain in software.  Early programs
either lacked version numbers or used integers ("version 1", "version 2", etc.)
to identify some release.  Bug fixes often turned these integers into real
numbers (1.01, 1.02, etc.) where a newer version was numerically greater than
the older version (1.01 is older than 1.1, etc.)

A modified version of this scheme gradually replaced real number versioning
where two or more integers separated by periods represented a version number,
for example 1.0 was the first release of (major) version 1, 1.1 was the second
release, and so forth. Bug fixes (patches) yielded a third number - 1.0.1,
1.0.2, etc.  The notion of alpha-, beta-, and pre-release software became a
thing with all sorts of formats - 1.0b1, 1.0-pre1, etc.  Then developers got
*serious* and declared *release candidates* and *golden masters*!

Large companies started tracking *build numbers* in addition to public version
numbers. For example, Apple uses a numbering scheme that can be roughly
translated as "majorMINORbuildPATCH", where "major" is an integer representing
the internal major release number, "MINOR" is an uppercase letter (A=0, B=1,
C=2, ...) representing a minor update to that major release, "build" is an
integer representing the number of times that "build train" (branch) has been
built, and "PATCH" is a lowercase letter (omitted for the first build)
representing the number of times a build had to be patched (components rolled
back and the combined build re-tested) to yield a functional build.  Thus, the
current macOS® 12.0 Beta 6 has a version number of "21A5294g" - major version
21, minor version 0, build number 5294, patch 7.

This last wrinkle demonstrates an important distinction - there are version
numbers that are used for human consumption ("macOS 12") and version numbers
that are used for computers ("21A5294g").  Some packaging schemes define rules
for comparing version number strings, while others provide explicit ways to
assign sequences or values for comparison.


## Standards

Of course, eventually people got together to define
[standards](https://xkcd.com/927/).  In the open source community, the
[Semantic Versioning](https://semver.org) standard is quite popular, although
most Linux packaging systems don't exactly conform (more below).

The [Trusted Network Connect](https://en.wikipedia.org/wiki/Trusted_Network_Connect)
standard defines version numbers as a set of four 16-bit unsigned integers that
can effectively be compared as a single 64-bit value or treated as four
separated integers, e.g. `MAJOR.MINOR.PATCH+BUILD` for display/interoperability
purposes.  This has trickled down to IPP and other standards.

[Snapcraft](https://snapcraft.io) packages can have any version number string
they like.  Snaps are tracked by their build numbers which are (manually)
assigned to stable, candidate, beta, and edge (as in "bleeding edge") releases
that users can install.


## Where It All Falls Apart

Most of the version numbering standards focus on identifying *production*
code.  As I mentioned at the top of this article, I've been using more-or-less
standard suffixes to identify beta (`MAJOR.MINORbNUMBER`) and release candidate
(`MAJOR.MINORrcNUMBER`) source archives that allow developers to try my new
software out and report any issues they encounter, but I don't expect this
software to be released to the general public as it is *not yet* production
code.  But if a developer does choose to package it up, most of the traditional
Linux packaging formats (RPM, Debian, Slackware, etc.) will treat `1.0b1` as
older than `1.0.0` so the right thing will happen when I release 1.0.0 and the
developer packages *that* code.

The Semantic Versioning specification gives lip-service to supporting
so-called "pre-release" suffixes (`1.0.0-alpha1`, `1.0.0-beta.2`, etc.) but it
is up to you (i.e., not standardized) to define the meaning of the names.
Common suffixes are "alpha", "beta", "pre", and "rc" - it is just important to
keep the names you use in lexical sort order so that the version number
comparisons work as expected.  Alas, none of the Linux package formats actually
support Semantic Versioning suffixes, so that `1.0.0-beta.1` to `1.0.0` upgrade
won't actually happen...

The TNC-style four number version tuple is even less flexible - there is
literally no way to express a beta release.  More than likely you'll end up
using the last number as a build number and (internally) decide when you have
a final build for a particular MAJOR.MINOR.PATCH version.


## Recommendations

With 30+ years of software development experience I can make the following
recommendations:

1. Define a version numbering scheme that works for your project, and use it
   consistently.  This scheme naturally may depend on where you plan to release
   your software.

2. If you distribute binaries, build numbers are an important part of your
   software version number.  Automate the build number whenever possible, for
   example `git rev-list --all --count` will give you the number of commits
   pushed to the Git repository used by your build system.

3. If you distribute APIs, don't remove APIs in minor or patch releases.  If
   you have to remove an API, it is time for a major version number change.

Version numbering is an important part of your software development plan.
You should have a software development plan whether you are developing software
by yourself or as part of a large team.  It can even be written down on the back
of a napkin during lunch...
