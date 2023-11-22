# Contributing to @polar-rules/nest-task

We would love for you to contribute to NestTask and help make it even better than it is
today! As a contributor, here are the guidelines we would like you to follow:

- [Question or Problem?](#question)
- [Issues and Bugs](#issue)
- [Feature Requests](#feature)
- [Submission Guidelines](#submit)
- [Development Setup](#development)
- [Coding Rules](#rules)
- [Commit Message Guidelines](#commit)

## <a name="question"></a> Got a Question or Problem?

**Do not open issues for general support questions as we want to keep GitHub issues for bug reports and feature requests.**

Stack Overflow is a much better place to ask questions since:

- Questions and answers stay available for public viewing so your question / answer might help someone else
- Stack Overflow's voting system assures that the best answers are prominently visible.

To save your and our time, we will systematically close all issues that are requests for general support and redirect people to Stack Overflow.

## <a name="issue"></a> Found a Bug?

If you find a bug in the source code, you can help us by
[submitting an issue](#submit-issue) to our [GitHub Repository](https://github.com/polar-rules/nest-task). Even better, you can
[submit a Pull Request](#submit-pr) with a fix.

## <a name="feature"></a> Missing a Feature?

You can _request_ a new feature by [submitting an issue](#submit-issue) to our GitHub
Repository. If you would like to _implement_ a new feature, please submit an issue with
a proposal for your work first, to be sure that we can use it.
Please consider what kind of change it is:

- For a **Major Feature**, first open an issue and outline your proposal so that it can be
  discussed. This will also allow us to better coordinate our efforts, prevent duplication of work,
  and help you to craft the change so that it is successfully accepted into the project. For your issue name 
- Please add label `status:discussion` and `type:feature` for all **Major Feature**
- **Small Features** can be crafted and directly [submitted as a Pull Request](#submit-pr) with status `status:waiting-for-review`.

## <a name="submit"></a> Submission Guidelines

### <a name="submit-issue"></a> Submitting an Issue

Before you submit an issue, please search the issue tracker, maybe an issue for your problem already exists and the 
discussion might inform you of workarounds readily available.

We want to fix all the issues as soon as possible, but before fixing a bug we need to reproduce and confirm it.
In order to reproduce bugs we will systematically ask you to provide a minimal reproduction scenario using a repository 
or [Gist](https://gist.github.com/). Having a live, reproducible scenario gives us wealth of important information
without going back & forth to you with additional questions like:

- version of @polar-rules/nest-task used
- 3rd-party libraries and their versions
- and most importantly - a use-case that fails

Unfortunately, we are not able to investigate / fix bugs without a minimal reproduction, so if we don't hear back
from you we are going to close an issue that doesn't have enough info to be reproduced.

You can file new issues by filling out our [new issue form][new_issue].

### <a name="submit-pr"></a> Submitting a Pull Request (PR)

Before you submit your Pull Request (PR) consider the following guidelines:

1. Search [GitHub Pull Requests][gh_prs] for an open or closed PR
   that relates to your submission. You don't want to duplicate effort.
1. Fork this repository.
1. Make your changes in a new git branch:

   ```shell
   git checkout -b task-number-task-title master
   ```

1. Create your patch, **including appropriate test cases**.
1. Follow our [Coding Rules](#rules).
1. Commit your changes using a descriptive commit message that follows our
   [commit message conventions](#commit). Adherence to these conventions
   is necessary because release notes are automatically generated from these messages.

   ```shell
   git commit -a
   ```

   Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

1. Push your branch to GitHub:

   ```shell
   git push origin task-number-task-title
   ```

1. In GitHub, send a pull request to `polar-rules/nest-task:master`.

- If we suggest changes then:

    - Make the required updates.
    - Re-run the Nest test suites to ensure tests are still passing.
    - Rebase your branch and force push to your GitHub repository (this will update your Pull Request):

      ```shell
      git rebase master -i
      git push -f
      ```

That's it! Thank you for your contribution!

#### After your pull request is merged

After your pull request is merged, you can safely delete your branch and pull the changes
from the main (upstream) repository:

- Delete the remote branch on GitHub either through the GitHub web UI or your local shell as follows:

  ```shell
  git push origin --delete my-fix-branch
  ```

- Check out the master branch:

  ```shell
  git checkout master -f
  ```

- Delete the local branch:

  ```shell
  git branch -D my-fix-branch
  ```

- Update your master with the latest upstream version:

  ```shell
  git pull --ff upstream master
  ```

## <a name="development"></a> Development Setup

You will need [Node.js](https://nodejs.org) version >= 14.0.0 (except for v13).

1. After cloning the repo, run:

```bash
$ npm install
```

### <a name="common-scripts"></a>Commonly used NPM scripts

```bash
# build all packages and move to "sample" directories
$ npm run build

# run the full unit tests suite
$ npm run test:run

# run linter
$ npm run run:lint
```

## <a name="rules"></a> Coding Rules

To ensure consistency throughout the source code, keep these rules in mind as you are working:

- All features or bug fixes **must be tested** by one or more specs (unit-tests).
- Please investigate the project firstly to follow project approaches, patterns, etc.

## <a name="commit"></a> Commit Message Guidelines

We have very precise rules over how our git commit messages can be formatted. This leads to **more
readable messages** that are easy to follow when looking through the **project history**. But also,
we use the git commit messages to **generate the Nest change log**.

### Commit Message Format

We keep it simple.

Git commit message must follow pattern `[#${n}] ${commit-message}`, where:
- `${n}` - number of current GitHub issue (you should not start task without creating of the GitHub issue).
  For example: "[#1] Project initialization"
- `${commit-message}` - should follow rules mentioned in [3.2 Commit message conventions](#32-commit-message-conventions)

Usually when this is the case, it will be obvious to you to use this pattern, but still double check where the issue
is located.

### Commit message conventions

- Capitalize the subject line
- Do not end the subject line with a period
- Use the imperative mood in the subject line

**Example:** `[#1] Added withdraw API`

### What NOT to do

- Avoid creation sequential nonsense commits like `[#1] Test commit 1` and then `[#1] Test commit 2`. We are aware
  that in some cases it's required to do, especially when working with something that possible to test on side of
  repository, test environment or server. But it's important to clean them before you created a Pull Request. In
  purpose to resolve it you can use `git rebase -i ${commit-hash}` and squash commits that are inappropriate.
- You should not have commits without task number
- You need to validate, when you commit, that your commit is correctly linked to the task

### Revert

If the commit reverts a previous commit, it should begin with `revert:`, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.
