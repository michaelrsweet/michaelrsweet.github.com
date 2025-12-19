---
title: StringsUtil
subtitle: A Strings File Library and Utility
author: Michael R Sweet
copyright: Copyright © 2022-2025 by Michael R Sweet
project: stringsutil
project_name: stringsutil
logo: stringsutil-160.png
html_doc: stringsutil.html
snap: stringsutil
layout: project-news
language: C
lgtm: cpp
platforms: Linux | macOS | Unix | Windows
---

StringsUtil provides a library for using Apple ".strings" localization files and a utility for managing those files.  It is intended as a free, smaller, embeddable, and more flexible alternative to GNU gettext.  Key features include:

- Support for localizing using both Apple ".strings" and GNU gettext ".po" files.
- Simple C/C++ library with support for embedding localization data in an executable and/or loading localizations from external files.
- Tools for exporting, importing, and merging localization files.
- Tool for reporting on the quality of a localization.
- Tool for scanning C/C++ source files for localization strings.
- Tool for doing a first pass machine translation using the LibreTranslate service/software.
