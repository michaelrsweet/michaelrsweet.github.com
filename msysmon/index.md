---
title: Mike's System Monitor
subtitle: A lightweight process monitoring tool
author: Michael R Sweet
copyright: Copyright © 2026 by Michael R Sweet
project: msysmon
project_name: msysmon
logo: msysmon-160.png
html_doc: msysmon.html
layout: project-news
language: C
lgtm: cpp
platforms: Linux | macOS
---

`msysmon` is a lightweight administrator/developer tool for monitoring the CPU,
memory, and threads used by processes on a Linux or macOS system.  I wrote it
primarily to do long-term testing of embedded Linux systems where memory leaks,
crashes, and/or CPU spins can cause problems but are often hard to track down.

`msysmon` runs in the background to collect usage information and provides a
simple web interface for viewing it complete with graphs.
