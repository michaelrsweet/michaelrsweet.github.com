---
title: PDFio
subtitle: PDF read/write library
author: Michael R Sweet
copyright: Copyright © 2021 by Michael R Sweet
project: pdfio
project_name: PDFio
logo: pdfio-160.png
xepub_doc: pdfio.epub
html_doc: pdfio.html
layout: project-news
---

![Version](https://img.shields.io/github/v/release/michaelrsweet/pdfio?include_prereleases)
![Apache 2.0](https://img.shields.io/github/license/michaelrsweet/pdfio)
![Build](https://github.com/michaelrsweet/pdfio/workflows/Build/badge.svg)
[![Coverity Scan Status](https://img.shields.io/coverity/scan/22385.svg)](https://scan.coverity.com/projects/michaelrsweet-pdfio)
[![LGTM Grade](https://img.shields.io/lgtm/grade/cpp/github/michaelrsweet/pdfio)](https://lgtm.com/projects/g/michaelrsweet/pdfio/context:cpp)
[![LGTM Alerts](https://img.shields.io/lgtm/alerts/github/michaelrsweet/pdfio)](https://lgtm.com/projects/g/michaelrsweet/pdfio/)


PDFio is a simple C library for reading and writing PDF files.  The primary
goals of PDFio are:

- Read and write any version of PDF file.
- Provide access to pages, objects, and streams within a PDF file.
- Support reading encrypted PDF files.
- Support writing PDF files with digital signatures.
- Extract or embed useful metadata (author, creator, page information, etc.)
- "Filter" PDF files, for example to extract a range of pages or to embed fonts
  that are missing from a PDF
- Provide access to objects used for each page

PDFio is *not* concerned with rendering or viewing a PDF file, although a PDF
RIP or viewer could be written using it.


Requirements
------------

PDFio requires the following to build the software:

- A C99 compiler such as Clang, GCC, or MS Visual C
- A POSIX-compliant `make` program
- ZLIB (<https://www.zlib.net>) 1.0 or higher

IDE files for Xcode (macOS/iOS) and Visual Studio (Windows) are also provided.


Legal Stuff
-----------

PDFio is Copyright © 2021 by Michael R Sweet.

This software is licensed under the Apache License Version 2.0 with an
(optional) exception to allow linking against GPL2/LGPL2 software.  See the
files "LICENSE" and "NOTICE" for more information.
