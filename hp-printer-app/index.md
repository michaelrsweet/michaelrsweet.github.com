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
---

![Version](https://img.shields.io/github/v/release/michaelrsweet/hp-printer-app?include_prereleases)
![Apache 2.0](https://img.shields.io/github/license/michaelrsweet/hp-printer-app)


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


Requirements
------------

`hp-printer-app` depends on:

- A POSIX-compliant "make" program (both GNU and BSD make are known to work),
- A C99 compiler (both Clang and GCC are known to work),
- [PAPPL](https://www.msweet.org/pappl) 1.1 or later.
- [CUPS](https://openprinting.github.io/cups) 2.2 or later (for libcups).


Supported Printers
------------------

The following printers are currently supported:

- HP LaserJet printers with PCL 5 language support
- Most HP DeskJet, OfficeJet, and Photosmart printers
- Laser printers with PCL 5 support from Canon, IBM, Lexmark, Kyocera, Ricoh,
  Xerox, etc.


Standards
---------

Through PAPPL, `hp-printer-app` implements PWG 5100.14-2013: IPP Everywhere™
for each printer, and has a partial implementation of PWG 5100.22-2019: IPP
System Service v1.0 for managing the print queues and default printer.


Legal Stuff
-----------

The HP Printer Application is Copyright © 2019-2022 by Michael R Sweet.

This software is licensed under the Apache License Version 2.0.  See the files
"LICENSE" and "NOTICE" for more information.
