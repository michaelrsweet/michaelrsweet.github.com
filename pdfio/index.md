---
title: PDFio
subtitle: PDF read/write library
author: Michael R Sweet
copyright: Copyright © 2021-2023 by Michael R Sweet
project: pdfio
project_name: PDFio
logo: pdfio-160.png
html_doc: pdfio.html
epub_doc: pdfio.epub
layout: project-news
language: C
lgtm: cpp
platforms: Linux | macOS | Unix | Windows
---

PDFio is a simple C library for reading and writing PDF files.  The primary goals of PDFio are:

- Read and write any version of PDF file
- Provide access to pages, objects, and streams within a PDF file
- Support reading and writing of encrypted PDF files
- Extract or embed useful metadata (author, creator, page information, etc.)
- "Filter" PDF files, for example to extract a range of pages or to embed fonts that are missing from a PDF
- Provide access to objects used for each page

PDFio is *not* concerned with rendering or viewing a PDF file, although a PDF RIP or viewer could be written using it.

This software is licensed under the Apache License Version 2.0 with an (optional) exception to allow linking against GPL2/LGPL2 software.  See the files "LICENSE" and "NOTICE" for more information.

<div class="border bg20 px-3 py-2">
  <h2>System Requirements</h2>

  <p>Tools:</p>
  <ul>
    <li>C99 compiler (Clang, GCC, MSVC)</li>
    <li>POSIX-compliant `make` (all but Windows)</li>
    <li>Xcode (optional for macOS)</li>
    <li>Visual Studio 2019 or later (Windows)</li>
  </ul>

  <p>Required Libraries:</p>
  <ul>
    <li>ZLIB (1.1+)</li>
  </ul>
</div>
