# GitHub API token for danger

## Background
The `BackpackBot` GitHub account is a completely standalone account on GitHub which has no access to the [Skyscanner organisation](https://github.com/orgs/Skyscanner/) or [Backpack team](https://github.com/orgs/Skyscanner/teams/backpack).

The account has an access token that is limited to `public_repo`. This is used by Danger to add comments on our PRs. It is the smallest scope that Danger needs to be able to comment on PRs.

## Decision
In the Travis settings for the `backpack` repo, this token is not hidden, and can therefore appear in public build logs.

## Thinking
If we hide the token, Danger will not be able to comment on PRs created from forks.

As the token does not allow access to any code repos within Skyscanner, we do not consider it a risk to expose it via Travis.

