---
title: Announcing LPrint, a Label Printer Application
category: lprint
layout: post
permalink: /blog/:year-:month-:day-:title.html
excerpt_separator: <!--more-->
comments: true
commentform: true
---

LPrint is a label printer application for macOS® and Linux®.  I wrote it in
response to criticism that coming changes in CUPS will leave users of label
printers in the cold...

<!--more-->

Basically, LPrint is a print spooler optimized for label printing.  It accepts
"raw" print data as well as PNG images (like those used for shipping labels by
most shippers' current web APIs) and has built-in "drivers" to send the print
data to USB and network-connected label printers.  The spooler also tries to
keep the labels moving by merging jobs over a single connection to the printer
rather than starting and stopping like CUPS does to support a wider variety of
printers.

LPrint supports the full range of options and features supported by the
embedded drivers - currently all Dymo and Zebra ZPL label printers.  Whenever
possible, LPrint will auto-detect the make and model of your printer and its
installed capabilities.  And you can configure the default values of all
options as well as manually configure the media that is loaded in each printer.

LPrint also offers a simple network server mode that makes any label printers
appear as IPP Everywhere™/AirPrint™ printers on your network.  Thus, any macOS,
iOS®, or Linux client can use any label printer supported by LPrint.  And you
can, of course, send jobs from LPrint to an LPrint server on the network.

Finally, LPrint offers command-line and web-based monitoring of printer and
job status.

I plan on doing a 1.0 beta release very soon.  Enjoy!

<a class="btn btn-primary" href="https://github.com/michaelrsweet/lprint">Download LPrint <span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span></a>
<a class="btn btn-default" href="https://snapcraft.io/lprint">Install lprint Snap <span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span></a>
<a class="btn btn-default" href="/lprint/index.html">Home Page <span class="glyphicon glyphicon-home" aria-hidden="true"></span></a>
