---
title: Announcing StringsUtil, a Strings File Library and Utility
category: stringsutil
layout: post
permalink: /blog/:year-:month-:day-:title.html
excerpt_separator: <!--more-->
comments: true
commentform: true
---

StringsUtil provides a library for using Apple ".strings" localization files and
a utility for managing those files.  It is intended as a free, smaller,
embeddable, and more flexible alternative to GNU gettext.  Key features include:

- Support for localizing using both Apple ".strings" and GNU gettext ".po"
  files.
- Simple C/C++ library with support for embedding localization data in an
  executable and/or loading localizations from external files.
- Tools for exporting, importing, and merging localization files.
- Tool for reporting on the quality of a localization.
- Tool for scanning C/C++ source files for localization strings.
- *Coming Soon*: Tool for doing a first pass machine translation.

I'm providing StringsUtil under the Apache License Version 2.0 with an
(optional) exception to allow linking against GPL2/LGPL2 software.

<a class="btn btn-primary" href="/stringsutil/index.html">Home Page</a>
<a class="btn btn-default" href="https://github.com/michaelrsweet/stringsutil">Github Project</a>
