---
title: A Simple Raspberry Pi Zero Case
category: website
layout: post
permalink: /blog/:year-:month-:day-:title.html
excerpt_separator: <!--more-->
comments: true
commentform: true
---

I spent part of the holiday break designing myself a simple but flexible
3D-printable case for the Raspberry Pi Zero SBCs. The design is available for
free on [Thingiverse](https://www.thingiverse.com/thing:6901849).

<!--more-->

History
=======

I've been using the [UniPiCase Zero][UNIPI] cases but have never been completely
happy with them:

- Don't work with any of the various display or IO HATs.
- No way to see the LED on PCB (power/activity).
- No access to the MicroSD card.
- Only available in black.
- Bulky.

![UniPiCase Zero](/images/UniPiCase.jpg)

[UNIPI]: https://www.pishop.ca/product-category/raspberry-pi/raspberry-pi-cases/model-zero-and-zero-w/unipicase-zw/

I've tried a bunch of acrylic minimalistic cases, and designed and 3D printed
some others, but have never found "the one".


Goals
=====

I wanted a case that I could use for any Raspberry Pi project I did, which meant
adapting to the ports that needed to be accessed and optionally using a HAT.  I
also wanted to make the board LED visible for power/status/activity.

I decided to design a clamshell case with thin-walled openings that could be cut
away for the camera, USB data, HDMI, and 40pin header.  The two halves would
allow the top and bottom of the case to be printed against the build plate.
Since some of my previous attempts at a snap-together design didn't work well, I
opted to add recesses for screw heads on the top half and nuts on the bottom
half.  The bottom half also has recessed screw posts so that the board in held
in place, and that leaves the openings for the various ports and the MicroSD
card at the right level as well.  The final design element is a pseudo light
tube that directs the LED output to the top of the case - this works best for
light colored filament.

It took nine iterations to create the final design I put up on Thingiverse:

![Nine Raspberry Pi Zero case revisions](/images/ZeroCaseRevisions.jpg)

![Side view w/o top](/images/ZeroCaseSideNoTop.jpg)

![Side view](/images/ZeroCaseSideView.jpg)

![Top view](/images/ZeroCaseTopView.jpg)

Enjoy!
