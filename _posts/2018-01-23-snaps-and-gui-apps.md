---
title: Building Snaps for GUI Applications
layout: post
permalink: /blog/:year-:month-:day-:title.html
excerpt_separator: <!--more-->
---

[Snaps](https://snapcraft.io/) are a convenient way to build binaries for Linux
on multiple architectures and for multiple distributions.  However, the current
documentation for creating snaps is a bit obtuse, making it hard to get a
working snap that can be distributed.

<!--more-->

Overview
--------

Distribution of Linux applications in binary form has long been a challenge.
Thousands of distributions, versions, and architectures make delivering a
"universal" application pretty much impossible.  The Linux Standard Base was one
attempt at solving this by providing a common base set of libraries and
interfaces that applications could depend on, however the LSB never truly
achieved widespread support.  Many vendors have historically chosen to support
a small subset of popular Linux distributions, typically only on Intel
architecture platforms.

[Snapcraft](https://snapcraft.io/) is one of several newer application packaging
and distribution mechanisms that are available on Linux that attempt to solve
this problem.  Snaps generally contain all of the libraries and other
prerequisites needed to support the application, solving the library dependency
problem, and are isolated from other applications and operating system
components making it relatively easy (and safe) to install, update, and remove
them.

In addition, Snapcraft provides an
[automated build system](https://build.snapcraft.io) that allows you to build
and deploy software built from a Github repository on Intel and ARM architecture
platforms.


Preparing a GUI Application Snap
--------------------------------

The documentation for [creating your first snap](https://docs.snapcraft.io/build-snaps/)
is a bit incomplete, so what follows are the steps I used to finally create a
working snap for HTMLDOC.  I plan to create snaps for my other projects as time
permits.

Start by creating a directory called `snap` in the top directory of your
project.  Next, create a new text file called `snapcraft.yaml` in the `snap`
directory.  The first line should contain the name of the snap as
[registered](https://dashboard.snapcraft.io) on the Snapcraft dashboard:

```
name: htmldoc
```

After the name you provide the current version of the snap along with a short
summary and longer description of what the snap does:

```
version: 1.9.1
summary: HTML and Markdown conversion utility
description: |
  HTMLDOC is a program that reads HTML and Markdown source files or web pages
  and generates corresponding EPUB, HTML, PostScript, or PDF files with an
  optional table of contents.
```

If you have an icon (most applications do), list it using an `icon` line:

```
icon: desktop/htmldoc-128.png
```

Next the `grade` and `confinement` lines tell Snapcraft how to treat your snap.
A stable application will have the following lines:

```
grade: stable
confinement: strict
```

An application under active development should report "devel" and "devmode"
instead:

```
grade: devel
confinement: devmode
```

The application itself is specified in a section called `apps`:

```
apps:
    htmldoc:
        command: desktop-launch $SNAP/bin/htmldoc
        desktop: share/applications/htmldoc.desktop
        plugs: [home, network, x11]
```

Here we define a single application called "htmldoc" that is started using the
`desktop-launch` program.  All GUI applications need to use `desktop-launch` so
that the application is granted the necessary access to the desktop.  The
`$SNAP` variable specifies the snap directory, in which the `htmldoc` executable
can be found under the `bin` subdirectory.  The application is registered with
a desktop file so it can be run from the application launcher provided by the
desktop environment you are using, e.g., GNOME.  The `plugs` value lists a
named set of things (interfaces) your application needs to use - in this case
"home" for the user's home directory, "network" for network access, and "x11"
for desktop access. [Other plugs values](https://docs.snapcraft.io/core/interfaces)
are incompletely documented, so use the `snapcraft interfaces` command to list
the currently available values.

Finally, we need to define how to build the application from source.  Since
HTMLDOC is a typical autoconf-based project we can use the "autotools" plugin
with a single build part called "main":

```
parts:
    main:
        plugin: autotools
        source: .
        after: [desktop-gtk3]

build-packages: [libfltk1.3-dev]
```

The `after` line specifies that HTMLDOC is a desktop application with specific
requirements.  A FLTK application should use the GTK+ 3.x rules
("desktop-gtk3"), while Qt and GNOME applications should use the corresponding
strings ("desktop-qt4", "desktop-qt5", or "desktop-gnome-platform",
respectively).  I found the
[Snapcraft parts wiki](https://wiki.ubuntu.com/snapcraft/parts) particularly
useful for getting this part right - search for "desktop-" for details.

The `build-packages` line lists the additional packages required by your
application, in this case "libfltk1.3-dev" (the Fast Light Toolkit) used for
HTMLDOC's GUI.


Accessing Files from the Snap
-----------------------------

Most applications have additional data files they need to run.  The `SNAP`
environment is set to the installed snap path when your application is run.
For example, HTMLDOC calls a function on startup that checks for the SNAP
environment variable to override the default PREFIX/share/htmldoc directory
that is compiled in:

```
const char *snap;
static char datadir[1024];

if ((snap = getenv("SNAP")) != NULL)
{
  snprintf(datadir, sizeof(datadir), "%s/share/htmldoc", snap);
  _htmlData = datadir;
}
```


Building and Testing the Snap
-----------------------------

After you have [installed Snapcraft](https://docs.snapcraft.io/core/install) and
the `snapcraft` tool (`sudo snap install snapcraft --classic`), you can build
your snap from the current directory by running the `snapcraft` tool, e.g.:

```
snapcraft
```

If successful, you can install the snap locally with:

```
sudo snap install NAME_VERSION.snap --devmode --dangerous
```

where `NAME` is the name of your snap and `VERSION` is the build version.  Once
installed you can run the application to test that everything is working.
