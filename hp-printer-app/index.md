---
title: HP Printer Application
subtitle: A Generic PCL Printer Application
author: Michael R Sweet
copyright: Copyright © 2019-2022 by Michael R Sweet
project: hp-printer-app
project_name: hp-printer-app
logo: hp-printer-app-160.png
html_doc: hp-printer-app.html
snap: hp-printer-app
layout: project-news
language: C
xlgtm: cpp
platforms: Linux | macOS | Unix
---

`hp-printer-app` implements printing for a variety of common PCL printers
connected via network or USB.  Features include:

- A single executable handles spooling, status, and server functionality.
- Multiple printer support.
- Each printer implements an IPP Everywhere™ print service and is compatible
  with the driverless printing support in Android™, Chrome OS™, iOS®, Linux®,
  macOS®, and Windows® 10/11 clients.
- Each printer can directly print "raw", Apple/PWG Raster, and/or PNG files.
- Each printer automatically recovers from out-of-media, power loss, and
  disconnected/bad cable issues.


<div class="border bg20 px-3 py-2 mb-3">
  <h2>What is Supported?</h2>
  <div class="row"><div class="col-lg-3 border-end">
    <p>Clients:</p>
    <ul>
      <li>Android™ (4.4+)</li>
      <li>Chrome OS™</li>
      <li>iOS® (4+)</li>
      <li>Linux® (w/CUPS 1.4+)</li>
      <li>macOS® (10.14+)</li>
      <li>Windows® (10+)</li>
    </ul>
  </div><div class="col-lg-9">
    <p>Printers:</p>
    <ul>
      <li>HP: Most DeskJet, LaserJet, Photosmart, and OfficeJet</li>
      <li>Other: Laser printers with PCL 5 support from Canon, IBM, Lexmark, Kyocera, Ricoh, Xerox, etc.</li>
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
