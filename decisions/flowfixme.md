# When to use `$FlowFixMe` comments

When we tried to upgrade to Flow 0.112, all of our components that used `...rest` started displaying an error. We tried a number of solutions for this but none of them worked. It seems to be a long-standing problem with Flow. See [this issue](https://github.com/facebook/flow/issues/8192) for more details.

We decided to suppress these comments using the following comment:

```
// $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
```

If you need to do this in future, add the same comment. Using this format will allow us to easily find and remove the suppression comments once a better solution is found.

We should revisit this occasionally to see if we can remove the comments. The last time we attempted this was April 2020. [This PR](https://github.com/facebook/flow/pull/7569), open as of April 8th, may fix the problem.

In all other cases, you shouldn't opt out of Flow. If there's a legitimate bug in Flow and you have to opt out, add a comment to explain, linking to a GitHub issue where possible.
