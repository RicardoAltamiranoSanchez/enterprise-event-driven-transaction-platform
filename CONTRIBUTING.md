# Contributing to Enterprise Platform

First off, thank you for considering contributing to the Enterprise Event-Driven Transaction Platform. It's people like you that make open source such a great community!

## 1. Where do I go from here?

If you've noticed a bug or have a feature request, make sure to check our [Issues](../../issues) first to see if someone else has already created a ticket. If not, go ahead and [make one](../../issues/new).

## 2. Fork & create a branch

If this is something you think you can fix, then fork the repository and create a branch with a descriptive name.

## 3. Get the test suite running

Make sure your local environment is set up by following the [README.md](README.md) instructions. Run the docker compose environment to ensure everything is working:

```bash
docker compose up --build
```

## 4. Implement your fix or feature

At this point, you're ready to make your changes. Feel free to ask for help; everyone is a beginner at first.

## 5. Make a Pull Request

At this point, you should switch back to your master branch and make sure it's up to date with the upstream master repository. Then, open a PR with a clear title and description against the `main` branch.

All PRs must include an update to the `CHANGELOG.md` and respect the existing `pre-commit` hooks.
