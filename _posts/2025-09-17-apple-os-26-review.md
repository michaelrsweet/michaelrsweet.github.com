---
title: iOS/iPadOS/macOS/watchOS 26 Review
category: website
layout: post
permalink: /blog/:year-:month-:day-:title.html
excerpt_separator: <!--more-->
comments: true
commentform: true
---

Now that the latest Apple OS's are out of beta I am getting my devices updated.
I've seen the various "in depth" reviews, but here are my first impressions.

TL;DR: meh.

<!--more-->

User Interface Changes
----------------------

As usual there are UI changes, and trust me they were necessary as Apple had
moved further into the "undiscoverable" UI age where you not only had trouble
discovering everything you could do but didn't know what controls could be
clicked or dragged and there was a complete absence of any documentation or
online help to guide you.

That said, the latest OS 26 updates are not much of an improvement.  Aside from
some inappropriate usage of transparency, shadows, and reflections, everything
has suddenly gotten more padding - the rounded window corners take up twice the
space of the previous macOS release, and buttons are now much larger and fully
rounded on the ends, an effect that reminds me of the X11/Motif buttons from the
1990s.  The text/icons in controls also seem to have gotten smaller, although
I haven't compared screenshots side-by-side to confirm this - it might just be
the additional padding the gives it that impression.

For iOS-style navigation sheets, the old gray icons you tapped in the upper
right have been replaced by a blue circle with a checkbox.  It certainly doesn't
scream "refined"...

Oh, and as you've probably heard the macOS LaunchPad program is now gone and
now you get to run your programs from spotlight which provides a thoroughly
unorganized pop up window that cannot be resized or configured.  The top row
is supposed to show recently used apps, but in my experience that doesn't work
at all.  Instead you get to type a few letters from the name of your application
and then click on the app.  Oh so usable.

I have gone into the accessibility settings to enable the "Reduce Transparency"
setting to make the new transparency/shadow/reflection less pronounced.  I also
use the "Large" menu bar size and tweaked the text size slightly.


Apple Intelligence
------------------

I haven't installed this on any of my devices, both because I was unimpressed
by last year's offerings and because the one feature I *am* interested in
testing (Live Translation) requires a newer iPhone than I have - a new phone is
on order and I will report back on how well it works...

As with all LLM solutions, if you ask it to do something that has been done
before (and thus can be ---stolen--- indexed by the various training bots and
incorporated into the models) you *might* get something useful out of it.  At
least Apple Intelligence runs on-device...


Mail
----

Mail is less broken than last year, which I guess is progress.

One confusing thing I've noticed (and reported) is that when you are composing
a plain text email, the rich text controls remain at the top of the message
text area.

Another thing is that messages from a list have a prominent "unsubscribe"
banner at the top of each message.  Mail seems to remember when you dismiss the
banner for a given address, but it didn't remember me dismissing a similar
control in last year's Mail so I am uncertain how permanent clicking the X is
going to be...


Safari
------

Safari continues to work well in most situations.

The new tab and toolbar UI is distracting - everything is presented as
foreground bubbles - unless you enable "Reduce Transparency" in the
Accessibility Settings.

Auto-fill seems more buggy - it seems like the values are being entered one
character at a time and I've had a few times when my password has ended up in
the username field or the credit card number isn't fully entered when checking
out on a web store front.  I am trying to come up with a solid recipe for
reproducing this so I can report it to Apple...


Xcode
-----

Xcode continues to work, and once again you need to uncheck the Apple
Intelligence code assistant when you update.  New is an assistant button in
the toolbar that you can't hide or customize away (bug filed) but otherwise
all of my projects continue to build properly, even to create binaries for
older macOS releases on Intel.


Performance
-----------

I haven't noticed any performance problems, although aside from my iPhone I
have relatively high spec devices (64GB M4 Max MacBook Pro and M4 iPad Pro) so
your mileage may vary.


Summary
-------

There just isn't much to be excited about in this round of OS updates.  The UI
changes are distracting and (on macOS) actually make daily usage more difficult
due to the loss of LaunchPad.  The best I can say is that 26.0 doesn't appear to
have any fatal bugs and all of these OS updates are free.

