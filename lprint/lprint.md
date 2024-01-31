---
title: LPrint Documentation
subtitle: Documentation
author: Michael R Sweet
copyright: Copyright © 2019-2024 by Michael R Sweet
project: lprint
project_name: LPrint
logo: lprint-160.png
html_doc: lprint.html
snap: lprint
layout: project
---

LPrint Documentation
====================

LPrint v1.3.0 - January 31, 2024
Copyright 2019-2024 by Michael R Sweet

LPrint is licensed under the Apache License Version 2.0.  See the files
"LICENSE" and "NOTICE" for more information.


Table of Contents
-----------------

- [Overview](#overview)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Adding Printers](#adding-printers)
- [Printing Options](#printing-options)
- [Setting Default Options](#setting-default-options)
- [Running a Server](#running-a-server)
- [Server Web Interface](#server-web-interface)
- [Resources](#resources)


Overview
--------

LPrint is a label printer application for macOS® and Linux®.  I wrote it in
response to criticism that coming changes in CUPS will leave users of label
printers in the cold - see [Apple CUPS Github issue #5271][APPLE5271].

[APPLE5271]: https://github.com/apple/cups/issues/5271

Basically, LPrint is a print spooler optimized for label printing.  It accepts
"raw" print data as well as PNG images (like those used for shipping labels by
most shippers' current web APIs) and has built-in "drivers" to send the print
data to USB and network-connected label printers.  The spooler also tries to
keep the labels moving by merging jobs over a single connection to the printer
rather than starting and stopping like CUPS does to support a wider variety of
printers.

LPrint supports the full range of options and features supported by the
embedded drivers - currently most DYMO, Seiko, TSPL, and Zebra EPL2/ZPL label
printers.  Whenever possible, LPrint will auto-detect the make and model of your
printer and its installed capabilities.  And you can configure the default
values of all options as well as manually configure the media that is loaded in
each printer.

LPrint also offers a simple network server mode that makes your label printers
appear as IPP Everywhere™/AirPrint™/Mopria™ printers on your network.  Thus, any
Android™, Chrome OS™, iOS®, Linux®, macOS®, or Windows® 10/11 client can use any
label printer supported by LPrint.  And you can, of course, send jobs from
LPrint to an LPrint server on the network.

Finally, LPrint offers command-line and web-based monitoring of printer and
job status.


Installation
------------

LPrint is published as a snap for Linux.  Run the following commands to install
it and start the server:

    sudo snap install core         (if you haven't already done so)
    sudo snap install avahi        (some Debian-based distros)
    sudo snap install lprint
    sudo snap connect lprint:raw-usb
    sudo snap connect lprint:avahi-control
    sudo snap start lprint.lprint-server

A package file is included with all source releases on Github for use on macOS
11 and higher for both Intel and Apple Silicon.

If you need to install LPrint from source, you'll need a "make" program, a C99
compiler (Clang and GCC work), the CUPS developer files, and the PAPPL developer
files.  Once the prerequisites are installed on your system, use the following
commands to install LPrint to "/usr/local/bin":

    ./configure
    make
    sudo make install

The "configure" script supports the usual autoconf options - run:

    ./configure --help

to get a list of configuration options.


Basic Usage
-----------

LPrint uses a single executable to perform all functions.  The normal syntax
is:

    lprint SUB-COMMAND [OPTIONS] [FILES]

where "SUB-COMMAND" is one of the following:

- "add": Add a printer
- "cancel": Cancel one or more jobs
- "default": Get or set the default printer
- "delete": Delete a printer
- "devices": List available printers
- "drivers": List available drivers
- "jobs": List queued jobs
- "modify": Modify a printer
- "options": Lists the supported options and values
- "printers": List added printer queues
- "server": Run in server mode
- "shutdown": Shutdown a running server
- "status": Show server or printer status
- "submit": Submit one or more files for printing

You can omit the sub-command if you just want to print something, for example:

    lprint labels.zpl

The options vary based on the sub-command, but most commands support "-d" to
specify a printer and "-o" to specify a named option with a value, for example:

- `lprint -d myprinter labels.zpl`: Print a file to the printer named
  "myprinter".
- `lprint -o media=na_index-4x6_4x6in label.png`: Print a shipping label
  image to a 4x6 label.
- `lprint default -d myprinter`: Set "myprinter" as the default printer.

You can find our more about each sub-command by reading its included man page,
for example the following command will explain all of the supported options for
the "submit" sub-command:

    man lprint-submit


Adding Printers
---------------

The "add" sub-command adds a new printer:

    lprint add -d PRINTER -v DEVICE-URI -m DRIVER-NAME

"PRINTER" is the name you want to give the print queue.  Printer names can
contain spaces and special characters, but if you do any printing from scripts
you probably want to limit yourself to ASCII letters, numbers, and punctuation.

"DEVICE-URI" is a "usb:", "snmp:", or "socket:" URI for the printer.  For
USB-connected label printers, use the "devices" sub-command to discover the URI
to use:

    lprint devices

For network-connected printers, print the configuration summary on your label
printer to discover its IP address.  The device URI will then be "socket://"
followed by the IP address.  For example, a printer at address 192.168.0.42
will use the device URI "socket://192.168.0.42".

Many network-connected label printers also support discovery via SNMP - use the
"devices" sub-command to discover these printers' device URIs.

Finally, the "DRIVER-NAME" is the name of the internal LPrint driver for the
printer.  Use the "drivers" sub-command to list the available drivers:

    lprint drivers

For example, the common 4-inch Zebra printer uses the "zpl_4inch-203dpi-dt"
driver:

    lprint add -d myprinter -v socket://192.168.0.42 -m zpl_4inch-203dpi-dt


Printing Options
----------------

The following options are supported by the "submit" sub-command:

- "-n NNN": Specifies the number of copies to produce.
- "-o media=SIZE-NAME": Specifies the media size name using the PWG media size
  self-describing name (see below).
- "-o media-source=ROLL-NAME": Specifies the roll to use such as 'main-roll' or
  'alternate-roll'.
- "-o media-top-offset=NNNin" or "-o media-top-offset=NNNmm": Specifies a
  printing offset from the top of the label.
- "-o media-type=TYPE-NAME": Specifies a media type name such as 'labels',
  'labels-continuous', or 'continuous'.
- "-o orientation-requested=none": Prints in portrait or landscape orientation
  automatically.
- "-o orientation-requested=portrait": Prints in portrait orientation.
- "-o orientation-requested=landscape": Prints in landscape (90 degrees counter-
  clockwise) orientation.
- "-o orientation-requested=reverse-portrait": Prints in reverse portrait
  (upside down) orientation.
- "-o orientation-requested=reverse-landscape": Prints in reverse landscape
  (90 degrees clockwise) orientation.
- "-o print-color-mode=bi-level": Prints black-and-white output with no shading.
- "-o print-color-mode=monochrome": Prints grayscale output with shading as
  needed.
- "-o print-content-optimize=auto": Automatically optimize printing based on
  content.
- "-o print-content-optimize=graphic": Automatically optimize printing for
  graphics like lines and barcodes.
- "-o print-content-optimize=photo": Automatically optimize printing for
  photos or other shaded images.
- "-o print-content-optimize=text": Automatically optimize printing for text.
- "-o print-content-optimize=text-and-graphic": Automatically optimize printing
  for text and graphics.
- "-o print-darkness=NNN": Specifies a relative darkness from -100 (lightest)
  to 100 (darkest).
- "-o print-quality=draft": Print using the lowest quality and fastest speed.
- "-o print-quality=normal": Print using good quality and speed.
- "-o print-quality=high": Print using the best quality and slowest speed.
- "-o print-speed=NNNin" or "-o print-speed=NNNmm": Specifies the print speed
  in inches or millimeters per second.
- "-o printer-resolution=NNNdpi": Specifies the print resolution in dots per
  inch.
- "-t TITLE": Specifies the title of the job that appears in the list produced
  by the "jobs" sub-command.

Media sizes use the PWG self-describing name format which looks like this:

    CLASS_NAME_WIDTHxLENGTHin
    CLASS_NAME_WIDTHxLENGTHmm

"CLASS" is "na" for North American media sizes, "oe" for other cut label sizes
in inches, "om" for other cut label sizes in millimeters, or "roll" for
continuous roll sizes in inches or millimeters.  "NAME" is a string of letters,
numbers, dots ("."), and dashes ("-") describing the size.  "WIDTH" and
"LENGTH" are the width and length of the label or receipt you want to print.
The trailing "in" or "mm" specifies the units in inches or millimeters,
respectively.  For example, a 4x6" shipping label uses the size name
`na_4x6-index_4x6in` while a 1.25x3.5" address label uses
`oe_address-label_1.25x3.5in` and a 50x200mm receipt uses
`roll_receipt_50x200mm`.

2-up labels (where two labels are placed side-by-side) use the combined sizes
of both labels.  For example, a 2-up 0.5x1" multipurpose label uses the size
name `oe_square-multipurpose-label_1x1in`.

You can get a list of supported values for these options using the "options"
sub-command:

    lprint options
    lprint options -d PRINTER


Setting Default Options
-----------------------

You can set the default values for each option with the "add" or "modify"
sub-commands:

    lprint add -d PRINTER -v DEVICE-URI -m DRIVER-NAME -o OPTION=VALUE ...
    lprint modify -d PRINTER -o OPTION=VALUE ...

In addition, you can configure the installed media and other printer settings
using other "-o" options.  For example, the following command configures the
labels that are installed in a Dymo LabelWriter 450 Twin Turbo printer:

    lprint modify -d Dymo450TT \
      -o media-ready=oe_address-label_1.25x3.5in,oe_shipping-label_2.125x4in

Use the "options" sub-command to see which settings are supported for a
particular printer.


Running a Server
----------------

The "server" sub-command runs a standalone spooler.  The following options
control the server operation:

- "-o admin-group=GROUP": Specifies a group to use for remote authentication.
- "-o auth-service=SERVICE": Specifies a PAM service for remote authentication.
- "-o listen-hostname=HOSTNAME": Sets the network hostname to resolve for listen
  addresses - "*" for the wildcard addresses, "localhost" to only listen for
  local print requests.
- "-o log-file=FILENAME": Specifies a log file.
- "-o log-file=-": Specifies that log entries are written to the standard error.
- "-o log-file=syslog": Specifies that log entries are sent to the system log.
- "-o log-level=LEVEL": Specifies the log level - "debug", "info", "warn",
  "error", or "fatal".
- "-o server-hostname=HOSTNAME": Sets the network hostname to advertise.
- "-o server-name=DNS-SD-NAME": Sets the DNS-SD name to advertise.
- "-o server-options=OPTION[,...,OPTION]": Sets server options:
  - 'none': No options
  - 'dnssd-host': Use the hostname in printer DNS-SD names
  - 'no-multi-queue': Don't allow multiple queues
  - 'raw-socket': Enable raw socket (JetDirect) support for all printers
  - 'usb-printer': Enable the IPP-USB gadget for the default printer (Raspberry
    Pi)
  - 'no-web-interface': Disable the web interface
  - 'web-log': Enable web access of the log
  - 'web-network': Enable web-based network configuration
  - 'web-remote': Enable remote access for the web interface
  - 'web-security': Enable web-based security configuration
  - 'no-tls': Disable TLS (encryption) support
- "-o server-port=NNN": Sets the network port number; the default is randomly
  assigned starting at 8000.
- "-o spool-directory=DIRECTORY": Specifies the directory to store print files.

When using the LPrint snap you can set these options using the `snap set`
command, for example:

    sudo snap set lprint auth-service=other

When using the LPrint package for macOS, you can set these options by creating
the "/Library/Application Support/lprint.conf" file and listing the options one
per line, for example:

    sudo vi "/Library/Application Support/lprint.conf"
    i
    auth-service=other
    listen-hostname=localhost
    :wq

Other operating systems will look for the "lprint.conf" file in the "/etc" and
"/usr/local/etc" directories.

After changing these options you'll need to restart the server.  On macOS the
`launchctl` command is used:

    sudo launchctl stop org.msweet.lprint
    sudo launchctl start org.msweet.lprint

Similarly, on Linux the `systemctl` command is used:

    sudo systemctl restart lprint.service

If you've run the server by hand, just use the "shutdown" sub-command and then
run the server again:

    sudo lprint shutdown
    sudo lprint server

> *Note:* When you install the LPrint snap on Linux or the package on macOS, the
> server is automatically run as root.  When you install from source, a
> `launchd` (macOS) or `systemd` (all others) service file is installed but not
> activated - they can be used to automatically start LPrint when the system
> boots.


Server Web Interface
--------------------

When you run a standalone spooler on a network hostname, a web interface can be
enabled that allows you to add, modify, and delete printers, as well as setting
the default printer.  To require authentication for the various web interface
operations, you set the PAM authentication service with the
`-o auth-service=SERVICE` option.  For example, to use the "cups" PAM service
with LPrint, run:

    lprint server -o server-name=HOSTNAME -o server-port=NNN -o auth-service=cups

By default, any user can authenticate web interface operations.  To restrict
access to a particular UNIX group, use the `-o admin-group=GROUP` option as
well.


Resources
---------

The following additional resources are available:

- LPrint home page: <https://www.msweet.org/lprint>
- LPrint Github project: <https://github.com/michaelrsweet/lprint>
