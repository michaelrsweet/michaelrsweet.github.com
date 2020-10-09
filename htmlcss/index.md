---
title: HTML/CSS Parsing Library
subtitle: A HTML/CSS Parsing Library
author: Michael R Sweet
copyright: Copyright © 2018-2020 by Michael R Sweet
project: htmlcss
project_name: htmlcss
logo: htmlcss-160.png
html_doc: htmlcss.html
layout: project
---

> Note: This library is under development and is not yet complete!

HTMLCSS is a lightweight HTML/CSS parser written in C that allows applications
to prepare a HTML document for rendering or conversion.  HTMLCSS is extremely
portable and only requires a C99 compiler like GCC, Clang, Visual C, etc.
HTMLCSS is also extremely memory efficient, utilizing a shared string pool and
smart CSS cache to minimize the size of a HTML document in memory.

Features include:

- HTML 5 markup parser
- CSS 3 stylesheet parser
- OFC/OFF/TTC/TTF font file parser (metadata only)
- GIF/JPG/PNG image file parser (metadata only)
- Functions to calculate CSS properties for a given node in a HTML document
- Functions to extract HTML "runs" consisting of CSS properties, content
  strings, and image references that can be rendered directly, including the
  :before and :after content from a stylesheet

HTMLCSS does *not* support dynamic HTML content created using Javascript in a
HTML document, as such content is typically used for interactive web pages while
HTMLCSS is intended for use with static content.

HTMLCSS is licensed under the Apache License Version 2.0 with exceptions for use
with GPL2/LGPL2 applications which allows you do pretty much do whatever you
like with it.  Please do provide feedback and report bugs to the Github project
page so that everyone can benefit.
