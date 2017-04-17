---
title: zipc
subtitle: a simple ZIP container &ldquo;library&rdquo;
layout: project
project: zipc
---

`zipc` is a simple ZIP container "library" consisting of a C source file and
accompanying header file.  Currently I have only implemented writing of files
smaller than 4GB with or without deflate compression.  There is no support for
signatures, encryption, password protection, etc. as those features of ZIP are
typically not used for ZIP container-based formats.

I'm providing this as open source under the "new" 2-clause BSD license which
allows you do pretty much do whatever you like with it.  Please do provide
feedback and report bugs to the Github project page so that everyone can
benefit.
