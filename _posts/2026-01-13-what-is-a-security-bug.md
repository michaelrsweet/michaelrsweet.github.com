---
title: What is a Security Bug?
category: website
layout: post
permalink: /blog/:year-:month-:day-:title.html
excerpt_separator: <!--more-->
comments: true
commentform: true
---

I've had the privilege of working with a lot of security researchers throughout
my career.  Every one of them has been passionate about their work and the
issues they report, and my work has greatly benefitted from their contributions.

Unfortunately, the software security industry has created an environment where
CVEs (Common Vulnerabilities and Exposures) have become an economic driver.
Researchers seem to increasingly need published CVEs or bug bounties to justify
the time they spend trying to break software in new and interesting ways.

This has predictably led to more software bugs being reported as critical
security vulnerabilities, with push-back and frustration from developers when
those bugs are either not exploitable or not in that software at all!  In
addition, many issues are discovered and reported automatically ("AI",
"fuzzing", etc.) without sufficient investigation/analysis by the reporter.
Finally, security updates trigger an emergency response for everyone involved,
causing further disruption to the software development process.  Thus, it is
important to clearly identify which bugs rate a CVE and which ones are ordinary
bugs.

<!--more-->

Bugs vs. Vulnerabilities
------------------------

CVE defines a vulnerability as a weakness in software or hardware components
*that can be exploited*.  In addition, there is a
[list of common weaknesses][CWE] that provide guidance on which bugs get CVEs
and which bugs don't, and you are expected to connect a weakness to an actual,
exploitable vulnerability or exposure before filing a CVE.  Unfortunately, CWEs
are often applied overly broadly to justify why a bug should be treated as the
most serious of security issues, e.g.:

- *This critical issue exposes CWE-999 and must be assigned a CVE or given a bug bounty!*

One common over-application of CWEs is for so-called Denial of Service (DoS)
vulnerabilities in software that does not provide a service - you can't deny
something that doesn't exist.  I've had reporters argue that, "my server uses
this library and the bug in this library causes a denial of service for my
server", however it is the responsibility of the *server* to protect against
DoS attacks, not a subordinate library, because only the server knows what is an
appropriate use of memory, CPU, time, and other resources.

> Note: I'm not talking about issues that cause a crash in a library due to
> buffer overflow/underflow, divide by 0, etc.  While there are ways to mitigate
> such risks, those sorts of issues can be exploitable in unpredictable ways and
> need to be assigned CVEs for something other than a Denial of Service
> vulnerability.  Running out of memory or taking a long time to perform an
> operation because you load a large file is not a CVE.

I also sometimes see security reports for incorrect API usage such as passing
`NULL` pointers where such pointers are not allowed, passing the wrong kinds of
pointers or objects to an API, or using an unstable (private) API.  These are
not vulnerabilities in the API because they are not caused by an attacker but
*by the developer*.  They are also *not exploitable* as defined for CVEs,
although the application itself might be exploitable.

Identifying weaknesses is important, but so is determining whether a weakness
can be exploited and what the scope of the vulnerability and exposure is.  If a
weakness requires playing a [game of Fizzbin][FISBIN] or is simply not
exploitable, then it is not a vulnerability and does not get a CVE.

Sometimes a bug is just a bug.

[CWE]: https://cwe.mitre.org/
[FISBIN]: https://memory-alpha.fandom.com/wiki/Fizzbin

