---
title: StringsUtil
subtitle: A Strings File Library and Utility
author: Michael R Sweet
copyright: Copyright © 2022 by Michael R Sweet
project: stringsutil
project_name: stringsutil
logo: stringsutil-160.png
html_doc: stringsutil.html
snap: stringsutil
layout: project-news
---

![Version](https://img.shields.io/github/v/release/michaelrsweet/stringsutil?include_prereleases)
![Apache 2.0](https://img.shields.io/github/license/michaelrsweet/stringsutil)
[![Build Status](https://img.shields.io/github/workflow/status/michaelrsweet/stringsutil/Build)](https://github.com/michaelrsweet/stringsutil/actions/workflows/build.yml)
[![Coverity Scan Status](https://img.shields.io/coverity/scan/24835.svg)](https://scan.coverity.com/projects/michaelrsweet-stringsutil)
[![LGTM Grade](https://img.shields.io/lgtm/grade/cpp/github/michaelrsweet/stringsutil)](https://lgtm.com/projects/g/michaelrsweet/stringsutil/context:cpp)
[![LGTM Alerts](https://img.shields.io/lgtm/alerts/github/michaelrsweet/stringsutil)](https://lgtm.com/projects/g/michaelrsweet/stringsutil/)

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

StringsUtil is licensed under the Apache License Version 2.0 with an (optional)
exception to allow linking against GPL2/LGPL2-only software.  See the files
"LICENSE" and "NOTICE" for more information.
