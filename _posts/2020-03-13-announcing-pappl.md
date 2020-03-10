---
title: Announcing PAPPL, A Printer Application Framework
category: pappl
layout: post
permalink: /blog/:year-:month-:day-:title.html
excerpt_separator: <!--more-->
comments: true
commentform: true
---

<img class="float-left mr-2 mt-2" src="/pappl/pappl-160.png" width="80" height="80">PAPPL
is a Printer Application framework/library.  I am developing it to support
future features in LPrint as well as making a Printer Application for
Gutenprint.  My hope is that it will accelerate the adoption of
[IPP Everywhere™](https://www.pwg.org/ipp/everywhere.html) and make it easier
for people to support other IPP-based licensing programs like
[AirPrint™](https://support.apple.com/en-us/HT201311) and
[Mopria®](https://mopria.org).

PAPPL is licensed under the Apache License Version 2.0 with an exception
to allow linking against GPL2/LGPL2 software (like older versions of CUPS),
so it can be used freely in any project you'd like.  If you want to support
the development of this framework financially, please consider
[sponsoring me through Github](https://github.com/sponsors/michaelrsweet).
I am also available to do consulting and/or development through my company
[Lakeside Robotics](https://www.lakesiderobotics.ca).

<a class="btn btn-primary" href="/pappl/index.html">Home Page</a>
<a class="btn btn-default" href="https://github.com/michaelrsweet/pappl">Github Project</a>

<!--more-->


Overview
--------

PAPPL is a simple C library for writing Printer Applications using existing
drivers or accounting solutions.  I'll include tutorials for transitioning
CUPS driver code (using the `rastertopcl` driver from CUPS) to a Printer
Application, and future versions of LPrint and Gutenprint will use it as well.

PAPPL embeds a multi-threaded IPP server and provides callbacks for a
variety of events that allows a GUI or command-line application to interact
with both the local user that is running the Printer Application and any
network clients that are submitting print jobs, querying printer status and
capabilities, and so forth.

PAPPL requires a POSIX-compliant host operating system such as Linux®, macOS®,
QNX®, or VxWorks®.  It also requires the following support libraries:

- CUPS 2.2 or later for the CUPS libraries (libcups2/libcupsimage2)
- GNU TLS 2.8 or later (except on macOS) for TLS support
- JPEGLIB 9 or later for JPEG image support
- LIBPNG 1.6 or later for PNG image support
- ZLIB 1.1 or later for compression support

Most development happens on a Mac, with testing on various Linux distributions
and a [Raspberry Pi Zero W](https://www.raspberrypi.org/products/raspberry-pi-zero-w/)
to ensure that memory and CPU requirements remain low.


IPP Server
----------

PAPPL fully implements the
[IPP Everywhere™ specification](https://ftp.pwg.org/pub/pwg/candidates/cs-ippeve10-20130128-5100.14.pdf)
and passes the
[IPP Everywhere™ Printer Self-Certification Manual](https://ftp.pwg.org/pub/pwg/candidates/cs-ippeveselfcert10-20160219-5100.20.pdf)
tests.  PAPPL also implements several IPP extensions used for IPP-based
licensing programs to simplify certification, including the CUPS "marker-xxx"
attributes, the Get-Printer-Attributes operation using the resource path "/",
and the CUPS-Get-Printers operation.

When configured to support multiple printers, PAPPL implements a subset of the
[IPP System Service v1.0 specification](https://ftp.pwg.org/pub/pwg/candidates/cs-ippsystem10-20191122-5100.22.pdf)
to allow creation, deletion, and enumeration of printers.


DNS-SD Discovery
----------------

PAPPL takes care of registration of DNS-SD (Bonjour) services for each printer,
including the required sub-type, "flagship" LPD registrations, and recommended
naming and renaming behavior.  Drivers can provide a serial number suffix like
"[42ACBD]" to use when more than one printer on the network is using the same
name, rather than just adding an increasing number to the end
("Example Printer", "Example Printer 2", "Example Printer 3", etc.) that isn't
very descriptive.


File Formats
------------

PAPPL supports JPEG, PNG, PWG Raster, and Apple Raster documents in all of the
standard color spaces and bit depths.  JPEG images are scaled to the destination
media size and print resolution using bilinear interpolation, while PNG images
are scaled using a nearest-neighbor algorithm to preserve edge detail in bar
codes and other non-photographic content.  PWG Raster and Apple Raster documents
are not scaled as they are normally sent at the proper resolution and size by
the print client.

PAPPL also allows drivers to advertise support for other "raw" formats that are
directly supported by the printer.

> I am investigating options for PDF printing support in a future version of
> PAPPL.  This work is being tracked via
> [Issue #3](https://github.com/michaelrsweet/pappl/issues/3) in the Github
> project.


Driver Interface
----------------

PAPPL provides a simple driver interface for raster printing, and developers of
CUPS Raster drivers will readily adapt to it.  Drivers provide configuration
and capability information to PAPPL, and PAPPL then calls the driver to start
a job, start a page, output lines of graphics, end a page, and finally end a
job during the processing of a print job.

The driver interface supports 1-bit grayscale (clustered- or dispersed-dot)
and 1-bit bi-level (threshold) dithering using a 16x16 matrix, which is
sufficient to support most B&W printing needs.  Continuous tone printing is
supported using 8-bit and 16-bit per component sGray, sRGB, AdobeRGB, or
DeviceN (K, RGB, CMYK, etc.) raster data.

Drivers can also specify "raw" formats that the printer accepts directly - this
is most useful for printers that support industry standard formats such as FGL,
PCL, or ZPL which are produced directly by common shipping and billing
automation applications.  "Raw" files are submitted to the driver using a
separate "print file" interface, allowing the driver to add any printer-specific
commands that are needed to successfully print them.

Aside from printing functionality, drivers can also provide up-to-date status
and configuration information by querying the printer when requested by the
embedded server.  This is an improvement over the CUPS command file interface
and allows a PAPPL-based driver to provide details such as updated media
information.

Drivers can also support printer identification, usually a sound or a light on
the printer, which is a requirement for IPP Everywhere™ and is used to visually
or audibly isolate a particular printer for the user.


Embedded Web Interface
----------------------

The embedded server can also provide a web interface to the Printer Application,
and PAPPL includes a standard web interface that can be customized and/or
overridden.  Aside from the usual status monitoring functionality, the web
interface can be configured to allow remote users (with proper authentication)
to:

- Create and delete printers,
- Set the printer location and DNS-SD name,
- Configure the loaded media,
- Configure remote access accounts,
- Configure networking settings such as hostname and IP address,
- Update the TLS certificates used by the server, and/or
- Request software/firmware updates.

You can also add custom pages and content using callbacks, static data, or
external files or directories.

> Note: An embedded web interface is required for IPP Everywhere™ conformance.
> The optional features allow a Printer Application to easily support the
> functionality required for other IPP-based licensing programs.


Going Forward
-------------

I'm planning on starting a series of beta releases soon, along with
corresponding changes in the LPrint and Gutenprint repositories to use PAPPL.
Once I have all three projects working as desired I'll do a 1.0 release of
PAPPL.
