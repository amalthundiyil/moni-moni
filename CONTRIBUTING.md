# Contributing

First of all, thank you for your contribution!

There are several areas where you can help, the [OpenSource Guide](https://opensource.guide/how-to-contribute/)
is a nice guide emphasizing that not all contributions need to be code.

We also have a [Code of Conduct](https://github.com/amal-thundiyil/moni-moni/tree/master/CODE_OF_CONDUCT.md)
that is worth reading!

Please **[open an issue first](https://github.com/amal-thundiyil/moni-moni/issues/new)** for any bug report or new feature if there isn't
already one opened. We use GitHub issues to keep track of failures in the
software and addition of new features. A GitHub issue is a nice place to discuss ideas
and get feedback from other members of the project.

If you want to find an area that currently needs improving have a look at the
open issues listed at the [issues page](https://github.com/amal-thundiyil/moni-moni/issues).

For newcomers, issues with minor complexity are tagged
as [good first issue](https://github.com/amal-thundiyil/moni-moni/labels/good-first-issue).

# Reporting Bugs

If you've found a bug thanks for letting us know!
It is a good idea to describe in detail how to reproduce
the bug (when you know how), what environment the bug appeared and so on.
Please tell us at least the following things:

- What commands did you execute to get to where the bug occurred?
- What did you expect?
- What happened instead?
- Do you know how to reproduce the bug?

As more information you provide, the earlier we'll correct it!.

When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method with the owners of this repository before making a change.

Please note we have a code of conduct, please follow it in all your interactions with the project.

## Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a
   build.
2. Update the README.md with details of changes to the interface, this includes new environment
   variables, exposed ports, useful file locations and container parameters.
3. Increase the version numbers in any examples files and the README.md to the new version that this
   Pull Request would represent. The versioning scheme we use is [SemVer](http://semver.org/).
4. You may merge the Pull Request in once you have the sign-off of two other developers, or if you
   do not have permission to do that, you may request the second reviewer to merge it for you.

## Git Commits

It would be good if you could follow the same general style regarding Git
commits as the rest of the project, this makes reviewing code, browsing the
history and triaging bugs much easier.

Git commit messages have a very terse summary in the first line of the commit
message, followed by an empty line, followed by a more verbose description or a
List of changed things. For examples, please refer to the excellent [How to
Write a Git Commit Message](https://chris.beams.io/posts/git-commit/).

If you change/add multiple different things that aren't related at all, try to
make several smaller commits. This is much easier to review. Using `git add -p`
allows staging and committing only some changes.

For example, if your work is done on the client, prefix the commit
message with `client: my message`, if you work on the server prefix it with `server: my message`,
if you work only on the CI, prefix it with `ci: my message` and so on.

## Code Review

We encourage actively reviewing the code so it's common practice
to receive comments on provided patches.

If you are reviewing other contributor's code please consider the following
when reviewing:

- Be nice. Please make the review comment as constructive as possible so all
  participants will learn something from your review.

As a contributor you might be asked to rewrite portions of your code to make it
fit better into the upstream sources.

## Certificate of Origin

By contributing to this project you agree to the Developer Certificate of
Origin (DCO). This document was created by the Linux Kernel community and is a
simple statement that you, as a contributor, have the legal right to make the
contribution. See the [DCO](DCO) file for details.
