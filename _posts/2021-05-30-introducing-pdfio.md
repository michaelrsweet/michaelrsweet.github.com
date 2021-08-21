---
title: Announcing PDFio, a Simple PDF Read/Write Library
category: pdfio
layout: post
permalink: /blog/:year-:month-:day-:title.html
excerpt_separator: <!--more-->
comments: true
commentform: true
---

PDFio is a simple C library for reading and writing PDF files. I've been working on it sporadically for the last few weeks to prototype some new printing features and support a future version of HTMLDOC. The primary goals of PDFio are:

- Read and write any version of PDF file
- Provide access to pages, objects, and streams within a PDF file
- Support reading encrypted PDF files
- Support writing PDF files with digital signatures
- Extract or embed useful metadata (author, creator, page information, etc.)
- "Filter" PDF files, for example to extract a range of pages or to embed fonts
  that are missing from a PDF
- Provide access to objects used for each page

PDFio is *not* concerned with rendering or viewing a PDF file, although a PDF RIP or viewer could be written using it. And while it is far from complete, the current code is sufficient to manipulate PDF files and create page content.

I'm providing PDFio under the Apache License Version 2.0 with an (optional) exception to allow linking against GPL2/LGPL2 software.

<a class="btn btn-primary" href="/pdfio/index.html">Home Page</a>
<a class="btn btn-default" href="https://github.com/michaelrsweet/pdfio">Github Project</a>
