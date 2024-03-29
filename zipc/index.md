---
title: zipc
subtitle: A Simple ZIP Container "Library"
author: Michael R Sweet
copyright: Copyright © 2017-2021 by Michael R Sweet.
project: zipc
project_name: zipc
logo: zipc-160.png
html_doc: zipc.html
layout: project-news
language: C
lgtm: cpp
platforms: Linux | macOS | Unix | Windows
---

`zipc` is a simple ZIP container "library" consisting of a C source file and accompanying header file.  The ZIP format is documented in the PKWARE [APPNOTE.TXT - .ZIP File Format Specification](http://www.pkware.com/appnote).

The current version implements reading and writing of files smaller than 4GB, with or without deflate compression.  There is no support for signatures, encryption, password protection, etc. as those features of ZIP are typically not used for ZIP container-based formats.

Among other places, `zipc` is used by my [HTMLDOC](../htmldoc) and [Codedoc](../codedoc) projects to generate EPUB books.

Please do provide feedback and report bugs to the Github project page so that everyone can benefit.
