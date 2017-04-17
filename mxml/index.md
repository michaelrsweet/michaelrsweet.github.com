---
title: Mini-XML
subtitle: Tiny XML Library
author: Michael R Sweet
copyright: Copyright © 2003-2017 by Michael R Sweet.
layout: project
project: mxml
project_name: Mini-XML
---

Mini-XML is a tiny XML library that you can use to read and write XML and
XML-like data files in your application without requiring large non-standard
libraries.  Mini-XML only requires an ANSI C compatible compiler (GCC works,
as do most vendors' ANSI C compilers) and a `make` program.

Mini-XML supports reading of UTF-8 and UTF-16 and writing of UTF-8 encoded XML
files and strings.  Data is stored in a linked-list tree structure, preserving
the XML data hierarchy, element names, attributes, and attribute values are
supported with no preset limits, just available memory.

Mini-XML is provided under version 2 of the GNU Library General Public License,
with an exception to allow static linking.
