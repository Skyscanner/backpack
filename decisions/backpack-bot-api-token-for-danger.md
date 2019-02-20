# GitHub API token for danger

## Background
The `Backpack bot` GitHub account has an access token that allows it to access public repos. This is used by Danger to add comments on our PRs.

## Decision
In the Travis settings for the `backpack` repo, this token is not hidden, and can therefore appear in public build logs.

## Thinking
If we hide the token, Danger will not be able to comment on PRs created from forks.

As the token only allows access to public repos, we do not consider it to be a risk to expose it publicly through Travis.

