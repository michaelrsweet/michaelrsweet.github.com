---
title: Mini-Markdown "Library"
subtitle: A Miniature Markdown "Library"
author: Michael R Sweet
copyright: Copyright © 2017 by Michael R Sweet
project: mmd
project_name: mmd
layout: project
---

`mmd` is a miniature markdown parsing "library" consisting of a single C source
\file and accompanying header file.  `mmd` mostly conforms to the CommonMark
version of markdown syntax with the following exceptions:

- Embedded HTML markup and entities are explicitly not supported or allowed; the
  reason for this is to better support different kinds of output from the
  markdown "source", including XHTML, man, and `xml2rfc`.
- Thematic breaks using a mix of whitespace and the separator character are not
  supported ("* * * *", "-- -- -- --", etc.); these could conceivably be added
  but did not seem particularly important.
- Link titles are silently ignored.

In addition, <code>mmd</code> supports a couple (otherwise undocumented)
CommonMark extensions:

- Metadata as used by Jekyll and other web markdown solutions.
- "@" links which resolve to headings within the file.

I'm providing `mmd` as open source under the "new" 2-clause BSD license which
allows you do pretty much do whatever you like with it.  Please do provide
feedback and report bugs to the Github project page so that everyone can
benefit.