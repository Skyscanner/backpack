# Danger API token for danger

## Decision
The `Backpack bot` GitHub account has an access token that allows it to access public repos. This is used by Danger to add comments on our PR.

In the Travis settings for the `backpack` repo, this token is not hidden.

## Thinking
Danger will not be able to comment on PRs created from forks unless the token is visible.

As the token only allows `backpack bot` to access public repos, we do not consider it to be a risk to expose it publicly through Travis.

## Anything else
-
