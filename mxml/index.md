---
title: Mini-XML
subtitle: Tiny XML Library
author: Michael R Sweet
copyright: Copyright © 2003-2019 by Michael R Sweet.
layout: project
logo: mxml-160.png
epub_doc: mxml.epub
html_doc: mxml.html
project: mxml
project_name: Mini-XML
---

Mini-XML is a tiny XML library that you can use to read and write XML and
XML-like data files in your application without requiring large non-standard
libraries.  Mini-XML only requires an ANSI C compatible compiler (GCC works,
as do most vendors' ANSI C compilers) and a `make` program.

Mini-XML provides the following functionality:

- Reading of UTF-8 and UTF-16 and writing of UTF-8 encoded XML files and
  strings.
- Data is stored in a linked-list tree structure, preserving the XML data
  hierarchy.
- SAX (streamed) reading of XML files and strings to minimize memory usage.
- Supports arbitrary element names, attributes, and attribute values with no
  preset limits, just available memory.
- Supports integer, real, opaque ("cdata"), and text data types in "leaf" nodes.
- Functions for creating and managing trees of data.
- "Find" and "walk" functions for easily locating and navigating trees of data.

Mini-XML doesn't do validation or other types of processing on the data
based upon schema files or other sources of definition information.

> Note: Version 3.0 hides the definition of the `mxml_node_t` structure,
> requiring the use of the various accessor functions that were introduced in
> version 2.0.

The Mini-XML library is licensed under the Apache License Version 2.0 with an
exception to allow linking against GPL2/LGPL2-only software.  See the files
"LICENSE" and "NOTICE" for more information.
