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
language: C
lgtm: cpp
platforms: Linux | macOS | Unix | Windows
---

PAPPL is a simple C-based framework/library for developing CUPS Printer Applications, which are the recommended replacement for printer drivers.  It was developed to support any kind of printer or driver that can be used on desktops, servers, and in embedded environments.

PAPPL supports JPEG, PNG, PWG Raster, Apple Raster, and "raw" printing to printers connected via USB and network (AppSocket/JetDirect) connections. PAPPL provides an embedded [IPP Everywhere™](https://www.pwg.org/ipp/everywhere.html), [AirPrint™](https://support.apple.com/en-us/HT201311), and [Mopria®](https://mopria.org/) service that provides access to printers locally or on your whole network.

PAPPL is licensed under the Apache License Version 2.0 with an exception to allow linking against GPL2/LGPL2 software (like older versions of CUPS), so it can be used freely in any project you'd like.  If you want to support the development of this framework financially, please consider sponsoring me through [Github](https://github.com/sponsors/michaelrsweet) or [Liberapay](https://liberapay.com/michaelrsweet).  I am also available to do consulting and/or development through my company Lakeside Robotics (<https://www.lakesiderobotics.ca>).


<div class="border bg20 px-3 py-2">
  <h2>System Requirements</h2>
  <div class="row"><div class="col-lg-4 border-end">
    <p>Tools:</p>
    <ul>
      <li>C99 compiler (Clang, GCC, MSVC)</li>
      <li>POSIX-compliant `make` (all but Windows)</li>
      <li>Xcode (optional for macOS)</li>
      <li>Visual Studio 2019 or later (Windows)</li>
    </ul>
  </div><div class="col-lg-4 border-end">
    <p>Required Libraries:</p>
    <ul>
      <li>Avahi (0.8+) or mDNSResponder</li>
      <li>CUPS (2.2+) or libcups (3.0+)</li>
      <li>GNU TLS (3.0+), LibreSSL (3.0+), or OpenSSL (1.1+)</li>
      <li>ZLIB (1.1+)</li>
    </ul>
  </div><div class="col-lg-4">
    <p>Optional Libraries:</p>
    <ul>
      <li>JPEGLIB (8+) or libjpeg-turbo (2.0+)</li>
      <li>LIBPAM</li>
      <li>LIBPNG (1.6+)</li>
      <li>LIBUSB (1.0+)</li>
    </ul>
  </div></div>
</div>
<div class="border bg20 px-3 py-2 mt-4">
  <h2>Printer Applications Using PAPPL</h2>
  <ul>
    <li><a href="https://github.com/OpenPrinting/ghostscript-printer-app" target="_blank">Ghostscript Printer Application</a> for Ghostscript-supported printers,</li>
    <li><a href="https://github.com/OpenPrinting/gutenprint-printer-app" target="_blank">Gutenprint Printer Application</a> for <a href="http://gutenprint.sf.net/" target="_blank">Gutenprint</a>-supported printers,</li>
    <li><a href="https://github.com/michaelrsweet/hp-printer-app" target="_blank">HP Printer Application</a> for HP PCL printers,</li>
    <li><a href="https://github.com/OpenPrinting/hplip-printer-app" target="_blank">HPLIP Printer Application</a> for HPLIP-supported printers,</li>
    <li><a href="https://github.com/michaelrsweet/lprint" target="_blank">LPrint</a> for DYMO, EPL, and ZPL label printers, and</li>
    <li><a href="https://github.com/openprinting/ps-printer-app" target="_blank">PostScript Printer Application</a> for PostScript printers.</li>
  </ul>
</div>
