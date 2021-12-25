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
---

![Version](https://img.shields.io/github/v/release/michaelrsweet/zipc?include_prereleases)
![BSD 2-Clause](https://img.shields.io/github/license/michaelrsweet/zipc)
[![Build Status](https://travis-ci.com/michaelrsweet/zipc.svg?branch=master)](https://travis-ci.com/github/michaelrsweet/zipc)
[![Coverity Scan Status](https://img.shields.io/coverity/scan/22416.svg)](https://scan.coverity.com/projects/michaelrsweet-zipc)
[![LGTM Grade](https://img.shields.io/lgtm/grade/cpp/github/michaelrsweet/zipc)](https://lgtm.com/projects/g/michaelrsweet/zipc/context:cpp)
[![LGTM Alerts](https://img.shields.io/lgtm/alerts/github/michaelrsweet/zipc)](https://lgtm.com/projects/g/michaelrsweet/zipc/)

`zipc` is a simple ZIP container "library" consisting of a C source file and
accompanying header file.  The ZIP format is documented in the PKWARE
[APPNOTE.TXT - .ZIP File Format Specification](http://www.pkware.com/appnote).

The current version implements reading and writing of files smaller than 4GB,
with or without deflate compression.  There is no support for signatures,
encryption, password protection, etc. as those features of ZIP are typically not
used for ZIP container-based formats.

Among other places, `zipc` is used by my [HTMLDOC](../htmldoc) and
[Codedoc](../codedoc) projects to generate EPUB books.

I'm providing this as open source under the "new" 2-clause BSD license which
allows you do pretty much do whatever you like with it.  Please do provide
feedback and report bugs to the Github project page so that everyone can
benefit.
