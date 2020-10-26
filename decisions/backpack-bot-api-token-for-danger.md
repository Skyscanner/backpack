# GitHub API token for danger

## Background

The `BackpackBot` GitHub account used to be a completely standalone account on GitHub which had no access to the [Skyscanner organisation](https://github.com/orgs/Skyscanner/) or [Backpack team](https://github.com/orgs/Skyscanner/teams/backpack). However we have decided to use a private Danger token and thus it's now a member of the Backpack team.

The account has an access token that is limited to `public_repo`. This is used by Danger to add comments on our PRs, **this token should be kept secret**.

## Decision
When we use the token for Danger it should be a secret i.e. not visible to forks or in build logs.

## Thinking

While Danger recommends using a non-hidden token the risk is too great and we rarely if ever gets PRs from forks anyway.
When we do get PRs from forks we can cherry pick the commits over to our own branch.

