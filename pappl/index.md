---
title: PAPPL
subtitle: Printer Application Framework
author: Michael R Sweet
copyright: Copyright © 2019-2022 by Michael R Sweet
project: pappl
project_name: PAPPL
logo: pappl-160.png
epub_doc: pappl.epub
html_doc: pappl.html
layout: project-news
---

![Version](https://img.shields.io/github/v/release/michaelrsweet/pappl?include_prereleases)
![Apache 2.0](https://img.shields.io/github/license/michaelrsweet/pappl)
![Build](https://github.com/michaelrsweet/pappl/workflows/Build/badge.svg)
[![Coverity Scan Status](https://img.shields.io/coverity/scan/22385.svg)](https://scan.coverity.com/projects/michaelrsweet-pappl)
[![LGTM Grade](https://img.shields.io/lgtm/grade/cpp/github/michaelrsweet/pappl)](https://lgtm.com/projects/g/michaelrsweet/pappl/context:cpp)
[![LGTM Alerts](https://img.shields.io/lgtm/alerts/github/michaelrsweet/pappl)](https://lgtm.com/projects/g/michaelrsweet/pappl/)

PAPPL is a simple C-based framework/library for developing CUPS Printer
Applications, which are the recommended replacement for printer drivers.  It
was developed to support any kind of printer or driver that can be used on
desktops, servers, and in embedded environments.

System Requirements
-------------------

<div class="row"><div class="col col-lg-4 bg20 border pt-2">
  <h3>Operating Systems</h3>
  <ul>
    <li>Linux®</li>
    <li>macOS® 10.14+</li>
    <li>Microsoft® Windows® 10+</li>
    <li>Unix®</li>
    <li>Other POSIX-compliant OS's</li>
  </ul>
</div><div class="col col-lg-4 bg20 border pt-2">
  <h3>Required Libraries</h3>
  <ul>
    <li>Avahi (0.8+) or mDNSResponder</li>
    <li>CUPS (2.2+) or libcups (3.0+)</li>
    <li>GNU TLS (3.0+), LibreSSL (3.0+), or OpenSSL (1.1+)</li>
    <li>ZLIB (1.1+)</li>
  </ul>
</div><div class="col col-lg-4 bg20 border pt-2">
  <h3>Optional Libraries</h3>
  <ul>
    <li>JPEGLIB (8+) or libjpeg-turbo (2.0+)</li>
    <li>LIBPAM</li>
    <li>LIBPNG (1.6+)</li>
    <li>LIBUSB (1.0+)</li>
  </ul>
</div></div>
<br>

The following PAPPL-based printer applications are currently available:

- [Ghostscript Printer Application][1] for Ghostscript-supported printers,
- [Gutenprint Printer Application][2] for [Gutenprint][3]-supported printers,
- [HP Printer Application][4] for HP PCL printers,
- [HPLIP Printer Application][5] for HPLIP-supported printers,
- [LPrint][6] for DYMO, EPL, and ZPL label printers, and
- [PostScript Printer Application][7] for PostScript printers.

PAPPL supports JPEG, PNG, PWG Raster, Apple Raster, and "raw" printing to
printers connected via USB and network (AppSocket/JetDirect) connections.
PAPPL provides an embedded [IPP Everywhere™][8], [AirPrint™][9], and
[Mopria®][10] service that provides access to printers locally or on your whole
network.

PAPPL is licensed under the Apache License Version 2.0 with an exception
to allow linking against GPL2/LGPL2 software (like older versions of CUPS),
so it can be used freely in any project you'd like.  If you want to support
the development of this framework financially, please consider sponsoring me
through [Github][11].  I am also available to do consulting and/or development
through my company Lakeside Robotics (<https://www.lakesiderobotics.ca>).


[1]: https://github.com/OpenPrinting/ghostscript-printer-app
[2]: https://github.com/OpenPrinting/gutenprint-printer-app
[3]: http://gutenprint.sf.net/
[4]: https://github.com/michaelrsweet/hp-printer-app
[5]: https://github.com/OpenPrinting/hplip-printer-app
[6]: https://github.com/michaelrsweet/lprint
[7]: https://github.com/openprinting/ps-printer-app
[8]: https://www.pwg.org/ipp/everywhere.html
[9]: https://support.apple.com/en-us/HT201311
[10]: https://mopria.org/
[11]: https://github.com/sponsors/michaelrsweet
