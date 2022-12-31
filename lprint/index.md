---
title: LPrint
subtitle: A Label Printer Application
author: Michael R Sweet
copyright: Copyright © 2019-2022 by Michael R Sweet
project: lprint
project_name: LPrint
logo: lprint-160.png
html_doc: lprint.html
snap: lprint
layout: project-news
language: C
lgtm: cpp
platforms: Linux | macOS | Unix
---

LPrint implements printing for a variety of common label and receipt printers connected via network or USB.  Features include:

- A single executable handles spooling, status, and server functionality.
- Multiple printer support.
- Each printer implements an IPP Everywhere™ print service and is compatible with the driverless printing support in Android™, Chrome OS™, iOS®, Linux®, macOS®, and Windows® 10/11 clients.
- Each printer can support options such as label modes, tear-off offsets, media tracking, media top offset, print darkness, resolution, roll selection, and speed.
- Each printer can directly print "raw", Apple/PWG Raster, and/or PNG files.
- Each printer automatically recovers from out-of-media, power loss, and disconnected/bad cable issues.


<div class="border bg20 px-3 py-2 mb-3">
  <h2>What is Supported?</h2>
  <div class="row"><div class="col-lg-3 border-end">
    <p>Clients:</p>
    <ul>
      <li>Android™ (4.4+)</li>
      <li>Chrome OS™</li>
      <li>iOS® (4+)</li>
      <li>Linux® (w/CUPS 1.4+)</li>
      <li>macOS® (10.8+)</li>
      <li>Windows® (10+)</li>
    </ul>
  </div><div class="col-lg-9">
    <p>Printers:</p>
    <ul>
      <li>DYMO:  LabelMANAGER 400, LabelMANAGER 450, LabelMANAGER PC, LabelMANAGER PC II, LabelMANAGER PNP, LabelPOINT 350, LabelWriter 300, LabelWriter 310, LabelWriter 315, LabelWriter 320, LabelWriter 330, LabelWriter 330 Turbo, LabelWriter 400, LabelWriter 400 Turbo, LabelWriter 450, LabelWriter 450 DUO, LabelWriter 450 Turbo, LabelWriter 4XL, LabelWriter DUO, LabelWriter DUO 128, and LabelWriter SE450</li>
      <li>Zebra: All EPL2 and ZPL printers</li>
    </ul>
  </div></div>
</div>
<div class="border bg20 px-3 py-2">
  <h2>System Requirements</h2>
  <div class="row"><div class="col-lg-4 border-end">
    <p>Tools:</p>
    <ul>
      <li>C99 compiler (Clang, GCC, MSVC)</li>
      <li>POSIX-compliant `make` (all but Windows)</li>
      <li>Xcode (optional for macOS)</li>
    </ul>
  </div><div class="col-lg-4 border-end">
    <p>Required Libraries:</p>
    <ul>
      <li>Avahi (0.8+) or mDNSResponder</li>
      <li>CUPS (2.2+) or libcups (3.0+)</li>
      <li>GNU TLS (3.0+), LibreSSL (3.0+), or OpenSSL (1.1+)</li>
      <li><a href="../pappl">PAPPL</a> (1.1+)</li>
      <li>ZLIB (1.1+)</li>
    </ul>
  </div><div class="col-lg-4">
    <p>Optional Libraries:</p>
    <ul>
      <li>JPEGLIB (8+) or libjpeg-turbo (2.0+)</li>
      <li>LIBPNG (1.6+)</li>
    </ul>
  </div></div>
</div>
