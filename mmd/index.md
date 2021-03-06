---
title: Mini-Markdown "Library"
subtitle: A Miniature Markdown "Library"
author: Michael R Sweet
copyright: Copyright © 2017-2021 by Michael R Sweet
project: mmd
project_name: mmd
logo: mmd-160.png
html_doc: mmd.html
snap: mmd
layout: project-news
---

![Version](https://img.shields.io/github/v/release/michaelrsweet/mmd?include_prereleases)
![Apache 2.0](https://img.shields.io/github/license/michaelrsweet/mmd)
[![Build Status](https://travis-ci.com/michaelrsweet/mmd.svg?branch=master)](https://travis-ci.com/github/michaelrsweet/mmd)
[![Coverity Scan Status](https://img.shields.io/coverity/scan/22387.svg)](https://scan.coverity.com/projects/michaelrsweet-mmd)
[![LGTM Grade](https://img.shields.io/lgtm/grade/cpp/github/michaelrsweet/mmd)](https://lgtm.com/projects/g/michaelrsweet/mmd/context:cpp)
[![LGTM Alerts](https://img.shields.io/lgtm/alerts/github/michaelrsweet/mmd)](https://lgtm.com/projects/g/michaelrsweet/mmd/)

`mmd` is a miniature markdown parsing "library" consisting of a single C source
file and accompanying header file.  `mmd` mostly conforms to the [CommonMark][]
version of markdown syntax with the following exceptions:

- Embedded HTML markup and entities are explicitly not supported or allowed;
  the reason for this is to better support different kinds of output from the
  markdown "source", including XHTML, man, and `xml2rfc`.

- Tabs are silently expanded to the markdown standard of four spaces since HTML
  uses eight spaces per tab.

- Some pathological nested link and inline style features supported by
  CommonMark (`******Really Strong Text******`) are not supported by `mmd`.

In addition, `mmd` supports a couple (otherwise undocumented) markdown
extensions:

- Metadata as used by Jekyll and other web markdown solutions.

- "@" links which resolve to headings within the file.

- Tables as used by the [Github Flavored Markdown Spec][GFM].

[CommonMark]: https://spec.commonmark.org
[GFM]: https://github.github.com/gfm

