---
title: HTMLDOC
subtitle: HTML Conversion Software
author: Michael R Sweet
copyright: Copyright © 1997-2022 by Michael R Sweet
project: htmldoc
project_name: HTMLDOC
logo: htmldoc-160.png
epub_doc: htmldoc.epub
html_doc: htmldoc.html
pdf_doc: htmldoc.pdf
snap: htmldoc
layout: project-news
language: C++
lgtm: cpp
platforms: Linux | macOS | Unix | Windows
---

HTMLDOC converts HTML and Markdown source files or web pages to EPUB, PostScript, or PDF files with an optional table of contents. While it currently does not support many things in "the modern web" such as Cascading Style Sheets (CSS), forms, full Unicode, and Emoji characters, it is still useful for converting HTML documentation, invoices, and reports. It provides a convenient GUI and can be integrated with many continuous integration and web server solutions.

Binaries are provided by me for Linux® on the snapcraft store, macOS® (10.14 and higher), and Microsoft Windows® (10 and higher), and most Linux distributions provide native packages.

![HTMLDOC Screenshot](htmldoc-ubuntu.png)


<div class="border bg20 px-3 py-2">
  <h2>System Requirements</h2>
  <div class="row"><div class="col-lg-4 border-end">
    <p>Tools:</p>
    <ul>
      <li>C99 compiler (Clang, GCC, MSVC)</li>
      <li>POSIX-compliant `make` (all but Windows)</li>
      <li>Xcode (optional for macOS)</li>
      <li>Visual Studio 2019 or later (Windows)</li>
    </ul>
  </div><div class="col-lg-4 border-end">
    <p>Required Libraries:</p>
    <ul>
      <li>GNU TLS (3.0+), LibreSSL (3.0+), or OpenSSL (1.1+)</li>
      <li>ZLIB (1.1+)</li>
    </ul>
  </div><div class="col-lg-4">
    <p>Optional Libraries:</p>
    <ul>
      <li>JPEGLIB (8+) or libjpeg-turbo (2.0+)</li>
      <li>LIBPNG (1.6+)</li>
    </ul>
  </div></div>
</div>
