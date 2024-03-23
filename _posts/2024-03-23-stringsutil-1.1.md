---
title: StringsUtil v1.1
category: stringsutil
layout: post
permalink: /blog/:year-:month-:day-:title.html
excerpt_separator: <!--more-->
comments: true
commentform: true
---

StringsUtil v1.1 is now available and is a bug fix release.  Changes include:

- Now support building against CUPS 2.x or libcups 3.x.
- When exporting a C header/source file, the variable name no longer includes
  directory information.
- Fixed decoding of JSON Unicode escapes ("\uXXXX").
- Fixed exporting of quotes in ".strings" files in C header/source files.
- Now preserve formatting strings when translating.

Enjoy!

<a class="btn btn-primary" href="https://github.com/michaelrsweet/stringsutil/releases/tag/v1.1">Download StringsUtil v1.1</a>
<a class="btn btn-primary" href="/stringsutil/index.html">Home Page</a>
<a class="btn btn-default" href="https://github.com/michaelrsweet/stringsutil">Github Project</a>
