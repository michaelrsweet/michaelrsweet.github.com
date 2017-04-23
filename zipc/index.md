---
title: zipc
subtitle: A Simple ZIP Container "Library"
author: Michael R Sweet
copyright: Copyright © 2017 by Michael R Sweet.
project: zipc
project_name: zipc
layout: project
---

`zipc` is a simple ZIP container "library" consisting of a C source file and
accompanying header file.  The ZIP format is documented in the PKWARE
[APPNOTE.TXT - .ZIP File Format Specification](http://www.pkware.com/appnote).

Currently I have only implemented writing of files smaller than 4GB with or
without deflate compression.  There is no support for signatures, encryption,
password protection, etc. as those features of ZIP are typically not used for
ZIP container-based formats.

I'm providing this as open source under the "new" 2-clause BSD license which
allows you do pretty much do whatever you like with it.  Please do provide
feedback and report bugs to the Github project page so that everyone can
benefit.
