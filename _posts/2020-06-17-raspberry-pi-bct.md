---
title: Getting a Raspberry Pi to Pass BCT
category: website
layout: post
permalink: /blog/:year-:month-:day-:title.html
excerpt_separator: <!--more-->
comments: true
commentform: true
---

Over the past few weeks I have been working with
[Yocto](https://www.yoctoproject.org), specifically to put together a layer
containing [PAPPL](https://www.msweet.org/pappl) and other necessary bits to
build headless Raspberry Pi-based print servers.  And since I'm a standards guy
I want this setup to more-or-less pass all of the network certification tests,
including Apple's Bonjour Conformance Tests.  Unfortunately, this has taken a
bit longer than I'd hoped...

<!--more-->

Hardware
--------

I've been using a [Raspberry Pi Zero W](https://www.raspberrypi.org/products/raspberry-pi-zero-w/)
and a [Rasberry Pi 3 Model B](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/)
for my testing. These use the same wireless chip (a Broadcom BCM43438) but the
'Pi 3 also offers 100baseT Ethernet for the wired network tests.

My iMac Pro serves as the build machine (running Parallels with
an Ubuntu 18.04 VM), and my 16" MacBook Pro serves as the BCT test machine.
Both the MacBook Pro and the Raspberry Pi under test are connected to a 4th
generation Apple TimeCapsule (802.11a/b/g/n) base station for the tests.


Software
--------

I'm using Yocto to create custom Linux images for the Raspberry Pi's.  For those
not familiar with it, Yocto is an embedded Linux development environment that
can be configured to support a wide variety of embedded processing boards
and/or virtual machine environments like [QEMU](https://www.qemu.org).

Yocto is organized into "images" which are the final OS images you put on your
board, "layers" which are logical pieces of the OS such as core, networking,
multimedia, Board Support Packages ("BSPs"), etc.,  and "recipes" which
represent individual packages or components for the OS.  You can customize all
of these things, and everything gets compiled from source code or (if you are
very lucky) can be found in an official pre-compiled repository hosted by the
Yocto project.  Building a Yocto image for the first time takes several hours,
even on my iMac Pro...

I've been working with the "Zeus" branch (which until recently was the newest)
and the official [meta-raspberrypi](https://meta-raspberrypi.readthedocs.io/en/latest/layer-contents.html#images)
BSP layer.  To that I've updated the [Avahi](https://www.avahi.org),
[CUPS](https://www.cups.org), and [dhcpcd](https://roy.marples.name/projects/dhcpcd/)
"recipes" to pull in the current versions of each.


Certification Tests
-------------------

The two public certification tests I've been focusing on have been the PWG's
[IPP Everywhere™ Printer Self-Certification Tools](https://www.pwg.org/ippeveselfcert)
and Apple's [Bonjour Conformance Test ("BCT")](https://developer.apple.com/bonjour).
PAPPL easily passes the IPP Everywhere tests, but getting the BCT to pass has
been a major challenge thanks to some interesting bugs/features in the wireless
drivers and firmware used for the Raspberry Pi.


Raspberry Pi Wireless Drivers
-----------------------------

The Wi-Fi chipset used in Raspberry Pi boards is a "FullMAC" implementation -
the chipset handles all of the low-level Wi-Fi communications, power management,
reading/writing of packets, etc. and just passes on the (processed) information
to the kernel driver.  So this means the Wi-Fi chip firmware needs to know how
to handle low-level networking details and whether a given network packet that
is received over Wi-Fi needs to be passed on to the kernel.  This is where the
problems begin.

The first part of the BCT is a test of IPv4 link-local address handling.  With
IPv4, link-local addresses (169.254.0.0/16) are typically only used when you
don't have any working Internet infrastructure (more specifically, when there
isn't a working DHCP server).  Each network device will try a series of
semi-random addresses when it first comes on the network to find an available
address.  The underlying protocol is defined in
[RFC 3927](https://tools.ietf.org/html/rfc3927) and uses Address Resolution
Protocol ("ARP") packets - a device asks whether any other device on the network
is using a particular IP address, and if nothing answers after three attempts it
then claims the address by announcing it a few times.

This query process is where things break with the default wireless settings and
the Raspberry Pi wireless firmware.  ARP packets are not addressed to a
particular network device and they really need to be passed on to the kernel
for processing.  The current firmware for the Raspberry Pi Wi-Fi chipset does
not do this, however, preventing the link-local queries from working.  In
addition, the power saving mode puts the Wi-Fi chipset to sleep in the middle of
the BCT tests which run for several hours!


Getting BCT to Pass
-------------------

After much research and experimentation, I ended up writing a small script to
disable power management and put the Wi-Fi interface in "promiscuous" mode so
that the Wi-Fi firmware sends all packets to the kernel and not just the ones
with its local addresses:

```
"set-wireless-options.sh"

#!/bin/sh
iw dev wlan0 set power_save off
ifconfig wlan0 promisc
```

I call this script from the `/etc/network/interfaces` configuration file:

```
"/etc/network/interfaces" (snippet)

# Wireless interface
auto wlan0
iface wlan0 inet dhcp
    wireless_mode managed
    wireless_essid any
    wpa-driver nl80211
    wpa-conf /etc/wpa_supplicant.conf
    # Replace "/PATH/TO" with the actual path to the script...
    pre-up /PATH/TO/set-wireless-options.sh
```

With those changes I can get the Raspberry Pi Zero W to pass BCT.


Future Developments
-------------------

At some point I will be making my Yocto layer public on Github, complete with
the necessary recipes for PAPPL and other key components needed for a headless
print server.  I'm also hoping that I'll be able to get some firmware and/or
kernel driver bug fixes to make it unnecessary to use promiscuous mode or turn
the power-saver features off - we'll see...
