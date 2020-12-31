---
title: How I Improve My (C) Code Quality
category: website
layout: post
permalink: /blog/:year-:month-:day-:title.html
excerpt_separator: <!--more-->
comments: true
commentform: true
---

I periodically get bug reports and pull requests concerning the quality or
patterns in my code.  While some of my projects provide some documentation on
the coding standards and tools I use, I've never bothered to write this up
before.  So here is a snapshot of my strategy for producing quality C code that
I have honed over the last 35 years (!) of writing C.

<!--more-->

Documentation and Style
=======================

I know plenty of programmers who think that documentation is not their job, that
"comments are for wusses", that hard-to-read code is job security, or that "I
don't have enough time to write documentation". I personally think those
attitudes are the number one problem with most coding today.

Consider the following two code examples - the first provides no clue about the
purpose of the function, arguments, or variables and would be difficult to
maintain while the second makes everything obvious from the naming. The names of
functions, structures, etc. should be obvious so that other code that calls them
is easier to follow as well. Imagine looking at another function in your program
that calls `a(1,10);` and wondering what the heck *that* does!

There are also differences in formatting between the two examples that help with
the readability and maintenance of the code. I'm not going to advocate for a
particular coding style, and the second example isn't even the one *I* use. The important thing is to choose a style that works for you and be consistent!
Remember, even if *you* are the only person that will be maintaining the code,
you will still need to remember what the heck you were doing in one, two, or
ten years!

*"Bad" Code Example:*

```c
void a(int b, int c){
int q; char qq[100];
for (q=b;q<=c;q++){snprintf(qq,sizeof(qq),"%d",q);puts(qq);}
}
```

*"Good" Code Example:*

```c
// Print a list of numbers from "first" to "last"
void
print_numbers(
    int first,       // First number
    int last)        // Last number
{
    int number;      // Current number
    char text[100];  // Number as a string

    // Loop through the number
    for (number = first; number <= last; number ++)
    {
        // Format and print the number on a line
        snprintf(text, sizeof(text), "%d", number);
        puts(text);
    }
}
```


Code Quality Tools
==================

There are a lot of tools available that help you write better code.  The
following is far from a definitive list but represents what I have incorporated
into my own projects.


Compiler Features
-----------------

Most compilers provide helpful warnings about problems in your code.
[Clang][CLANG] and [GCC][GCC] both support `-Wall` to enable a lot of common
warnings, `-Wextra` to enable less common warnings, `-Wxxx` to enable warning
"xxx", and `-Wno-xxx` to disable a warning that isn't useful in your code. I usually stick to `-Wall -Wunused` (all common plus unused function arguments)
and sometimes add `-Wno-format-truncation` (GCC only) which warns about the
`snprintf` output buffer not being large enough for a corresponding "%s" in the
format string.  The `-Werror` option can be used to turn warnings into errors,
but I only add it in "maintainer" mode so that random new warnings or system
header variations don't derail people using my code.

For normal development I use the `-Os` option to include optimizations that do
not affect debugging or size and `-g` to include debugging symbols.  You can use
`-O0` to disable optimizations, but in my experience that can hide issues that
only show up when the code optimizer is enabled or create issues that the
optimizer fixes for you.

For release builds, I find `-Os` is still usually the best. Some code benefits
from the additional optimizations provided by `-O2` (mainly expansion of inline
functions) or `-O3` which does more execution modeling, loop unrolling, and code
cloning to reduce branching delays.

> If you are using [MS Visual C][MSVC], it uses `/Wall` to enable all its
> warnings and `/wd xxx` to disable specific ones. `/WX` turns warnings into
> errors. `/Os` is the equivalent of GCC's `-Os` while `/Ot` roughly corresponds
> to `-O2`. Debugging is enabled with `/Zi`.  Most often I'm just letting the
> Visual Studio defaults for the Debug and Release targets get used since these
> options have changed over the years...

[CLANG]: https://clang.llvm.org/docs
[GCC]: https://gcc.gnu.org/onlinedocs/gcc-10.2.0/gcc
[MSVC]: https://docs.microsoft.com/en-us/cpp/build/reference/compiler-options-listed-by-category?view=msvc-160


Dynamic Code Analysis
---------------------

Dynamic code analysis tools work on your running programs and typically involve
a steep processing and/or memory penalty.  I've been using dynamic code analysis
tools for much of my career.  First was a product called Rational Purify that
helped you find memory access issues, but alas Rational was eventually bought up
by IBM and Purify appears to have been discontinued.

[Valgrind][VALGRIND] replaced Purify for me. Valgrind basically simulates the
host processor to run your code, tracks all memory usage, and validates all
arguments passed to system calls and library functions. Valgrind just runs your
compiled program (nothing needs to change for your compiler or linker options),
and uses debug symbols to provide backtraces when an error occurs.

I used Valgrind extensively when developing and testing CUPS and HTMLDOC, and
still run it from time to time on my other software when a hard-to-time problem
gets reported.  That said, you can expect a 10x performance hit (or more) and
increased memory usage, and I've brought my development machine to its knees
more than once when doing a big test!

> While I worked at Apple, I did some contributions to Valgrind to keep the
> macOS support up-to-date. Unfortunately, starting with macOS 10.13 Apple
> added system integrity features (mandatory code signing, library validation,
> and secure runtime checks) that make it impossible to run Valgrind on current
> macOS releases. Since most of my code is cross-platform, I still use it from
> time to time on Linux, but it is no longer part of my macOS test suites.

A more recent, lighter-weight tool called [Address Sanitizer][ASAN] is supported
by recent versions of both GCC and Clang on macOS and Linux. The address
sanitizer checks for memory errors and leaks. Unlike Valgrind, you can't use
Address Sanitizer with an existing executable.  Instead, you add the
`-fsanitize=address` option to your compiler and linker options to build
Address Sanitizer into your program, and every run of the program is a run of
the Address Sanitizer.

The `ASAN_OPTIONS` environment variable can be used to specify testing options.
I always set it to `leak_check_at_exit=false` to suppress the inevitable "you
didn't free everything before exiting" error, since unconditionally freeing
everything you've allocated doesn't usually make sense.

[ASAN]: https://clang.llvm.org/docs/AddressSanitizer.html
[VALGRIND]: https://www.valgrind.org


Static Code Analysis
--------------------

Static code analysis tools work on your source code and have no impact on your
code's execution speed or memory usage. Each tool has its strengths and
weaknesses, and a common complaint is that they are not always smart enough to
see logical connections. For example, the following (convoluted) example will
trip up most source code analyzers with an error about "copy" not being
initialized in the calls to `puts` and `free`:

```c
// Print a string in a convoluted way
void
print_string(char *s) { // String
    bool ok = false;    // Did we have a string to copy?
    char *copy;         // Copy of string

    if (s != NULL) {
        // Have a string, make a copy
        copy = strdup(s);
        ok   = copy != NULL;
    }
  
    if (ok) {
        puts(copy);
        free(copy);
    }
}
```

That said, there are a few tools that I use extensively in my projects, and
most of them are open source or free to use for open source projects:

- The [Clang Static Analyzer][CLANG-ANALYZER] is probably the fastest of the
  current static analysis tools and is part of the Clang compiler and Apple's
  Xcode IDE (`CMD+SHIFT+B`). I also enable the "shallow" analysis mode for
  regular macOS builds to catch coding errors that the normal warnings miss.

- [Cppcheck][CPPCHECK] is an open source analyzer that offers "add-ons" that
  scan for a variety of things including common CERT vulnerabilities and
  [MISRA C][MISRA-C] conformance. I find the MISRA C code "standard" to be a
  joke (among other things it says you can't do pointer arithmetic or have a
  loop with multiple variables) but the CERT checks are top-notch.

- [LGTM][LGTM] is an open source code scanning service that is integrated with
  many of the source code hosting companies. Some of its checks yield a lot of
  false positives, but all of my C projects are setup to use it and you can
  exclude certain checks as needed. One weakness is that LGTM does not support
  forks of projects, and while I generally agree with their rationale that most
  forks are mirrors of the parent repository, there should be a way to specify
  that your fork is different (e.g. OpenPrinting's CUPS repository...)

[CodeQL][CODEQL] is another open source scanning service (from the same people
that do LGTM) that brings in additional third-party scanning tools like
Cppcheck. I've tried using it since it offers Github integration, however the
documentation is poor and there does not seem to be a way to suppress things
like Cppcheck's MISRA conformance add-on, quickly yielding thousands of issues
in the Github dashboard with no way to resolve them. I'm hoping this will change
in 2021, but we'll see...

[Coverity][COVERITY] is a closed-source scanning tool that offers free code
scanning for open source projects. I've used it for CUPS in the past, and they
provide a convenient web dashboard for reviewing reports and excluding false
positives in each of your projects.

I've recently started looking at a more advanced tool called [Frama-C][FRAMA-C].
It looks like it will be able to do even more in depth scanning and logical
analysis, once I figure out how to use it. :)

[CLANG-ANALYZER]: https://clang-analyzer.llvm.org
[CODEQL]: https://semmle.com/codeql
[COVERITY]: https://scan.coverity.com
[CPPCHECK]: http://cppcheck.sourceforge.net
[FRAMA-C]: https://frama-c.com
[LGTM]: https://lgtm.com
[MISRA-C]: https://en.wikipedia.org/wiki/MISRA_C


Continuous Integration, Unit Tests, and Test Suites
---------------------------------------------------

Many of the static analysis tools in the previous section are actually part of
a continuous integration service integrated with Github.  Continuous integration
refers to automated builds of every commit and pull request to your code
repository. The most basic solutions provide you with the answer to "will it
build" for the platform(s) they support. Most also allow you to run unit tests
and test suites after the build, providing a powerful way to sanity-check your
software on a regular basis.  I regularly use [Travis CI][TRAVIS-CI] for Linux
and macOS testing and [AppVeyor][APPVEYOR] for Windows testing (it also now
supports Linux and macOS, but I'm not using that functionality).

To go beyond "will it compile" you need to write unit tests and/or test suites
to verify your code. There are a lot of unit test frameworks to choose from, but
you can also roll your own (which is what I generally do) if those frameworks
don't align with your needs. Some frameworks can help you track your code
coverage, while others just automate the reporting of test results. The key is
to ensure that you are testing as many of the features or APIs in your software
as you can, and to report failures as clearly as possible so you can more easily
fix problems that crop up. 

To integrate your unit tests into a continuous integration service, add a target
to your project that builds and runs them. The "standard" for makefile-based
projects is to support a "test" target, which Travis CI (at least) will use to
run the tests in a Docker container after a successful build.

[APPVEYOR]: https://www.appveyor.com
[TRAVIS-CI]: https://www.travis-ci.com


Setting Priorities
==================

When developing open source software, I have met contributors with wildly
different priorities than my own. Mostly these differences concern new features
or changes in behavior, but sometimes I meet people concerned with coding
practices, optimization, and/or standards conformance.


Avoid Over Optimization
-----------------------

I'm a strong believer in focusing my optimization efforts on the 10% of code
that yields 90% of the performance improvement. If one function is responsible
for a significant amount of execution time or memory use, and if there is an
obvious way to noticeably improve performance or memory use, then absolutely do
that optimization. Eeking another 1% improvement is usually not necessary or
useful, and often yields harder-to-maintain code.


Avoid "New" Language Features
-----------------------------

Most open source software is not built using the latest compilers or libraries.
In particular, Linux-based systems often provide a wide range of options, with
server-focused distributions shipping with (in some cases) decades-old tools.

My CUPS software *still* follows the C89 standard in order to compile on old
commercial UNIX platforms, and I avoid C11 APIs like `fopen_s` and `thrd_create`
since they are not widely supported even today. But C99 seems to be well
supported and that is what my new software follows.

> I'm not going to make any C++ recommendations.  I stopped doing new C++
> development years ago because STL and name mangling changes have made it
> incredibly difficult to ship binaries of C++ software.


Avoid Freeing Allocated Memory on Exit
--------------------------------------

Some tools and standards advocate freeing all memory you allocate before you
exit your program. In the days before virtual memory, preemptive multitasking,
and modern operating systems, this advice was sound - if you didn't free
everything then eventually your system would run out of free memory and you'd
either crash or be forced to reboot. Even today, if you are using a barebones
embedded OS then you absolutely need to tightly manage your memory.

But for any development for a modern OS, freeing/deleting objects for the sake
of returning memory to the operating system is 100% totally unnecessary. As
soon as your process is "reaped", all the memory that was allocated to the
process goes right back to the OS and is available for use again. All that
freeing memory will do is consume processor time and delay the exit of your
process.


Ignoring Return Values
----------------------

Some tools and standards complain when you ignore the return values of
functions. In my experience, these warnings are appropriate less than half the
time. For example, the `unlink` system call returns the usual `0` on success
and `-1` on failure, with the possible `errno` values indicating why the file
could not be removed. If I am writing a program whose sole purpose is to
delete files and it is important for me to know and/or report any failures, then
my code will absolutely check the return value. But if I am just removing a
temporary file my program created and that fails (perhaps because the file has
already been deleted), it is less important that I check the return value -
especially when there is nothing I can do to correct the problem.

When the return value is important and there is something I can do about it, I
check the return value. If it is not important or I can't do anything about it,
I ignore it.


Using "goto"
------------

Some language purists insist that `goto` should be removed from the C language.
While I generally avoid using `goto`, there is one scenario where its use is
justified: function exit points. By consolidating the clean up code in
one place you make the code smaller, more readable, and more maintainable.
