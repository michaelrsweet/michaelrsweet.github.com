---
title: Improving Code Quality, Part 2
category: website
layout: post
permalink: /blog/:year-:month-:day-:title.html
excerpt_separator: <!--more-->
comments: true
commentform: true
---

This is a follow-up to [my first post on code quality][Part1] with updates to
various tools and some thoughts on POSIX threading.

[Part1]: /blog/2020-12-31-how-i-improve-my-c-code-quality.html

<!--more-->

Tool Updates
============

Dynamic Code Analysis
---------------------

In addition to [Address Sanitizer][ASAN], GCC and Clang also both support
[Memory Sanitizer][MSAN] and [Thread Sanitizer][TSAN] to detect uninitialized
memory accesses and threading issues.  Compile with the `-fsanitize=memory` or
`-fsanitize=thread` options to enable them, respectively.

The Thread Sanitizer is still very much a beta tool, and while it has helped
with some of my recent threaded code it needs better support for locks -
[see below](#threaded-software-debugging).

[ASAN]: https://github.com/google/sanitizers/wiki/AddressSanitizer
[MSAN]: https://github.com/google/sanitizers/wiki/MemorySanitizer
[TSAN]: https://github.com/google/sanitizers/wiki/ThreadSanitizerCppManual


Static Code Analysis
--------------------

The [LGTM][LGTM] service is shutting down, with everything moving over to the
[CodeQL][CODEQL] tools.  [Github][GITHUB] offers built-in support for running
CodeQL as an "action" (continuous integration), and if you were using LGTM they
will create a pull request for any of your repositories to migrate to the new
tools.  Github also offers integration with [Codacy][CODACY] but I haven't been
as happy with their tools.

[CODACY]: https://www.codacy.com
[CODEQL]: https://semmle.com/codeql
[GITHUB]: https://github.com
[LGTM]: https://lgtm.com


Continuous Integration, Unit Tests, and Test Suites
---------------------------------------------------

[Travis CI][TRAVIS-CI] decided to go non-free, so I've moved all of my CI to
[Github Actions][GITHUB-ACTIONS].

[GITHUB-ACTIONS]: https://docs.github.com/en/actions
[TRAVIS-CI]: https://www.travis-ci.com


Threaded Software Debugging
===========================

Over the last year I have needed to debug [PAPPL][PAPPL] threading issues,
mainly around its use of reader/writer locks (`pthread_rwlock_t`) to control
access to the various objects.  [Thread Sanitizer][TSAN] was of limited use, so
I ended up developing simple logging macros along with an analysis program to
find deadlock, recursive locking, and locked-at-free issues.  For example:

```c
pthread_rwlock_rdlock(&obj->rwlock);
... access object values
pthread_rwlock_unlock(&obj->rwlock);
```

becomes:

```c
_papplRWLockRead(obj);
... access object values
_papplRWUnlock(obj);
```

The macros log the thread, function, object address, and action (rdlock, wrlock,
or unlock) to `stderr` and then call the corresponding `pthread_rwlock_xxx`
function.  When the test program is done running, the `parse-lock-log` program
then analyses the log and reports on any issues that are found.

I have been looking at re-implementing this as a shared library that can be
loaded at runtime without re-compilation so it can be used more generally and
also provide live reporting in addition to post execution analysis.  I'll post
more if I make any headway on this...

[PAPPL]: https://www.msweet.org/pappl
