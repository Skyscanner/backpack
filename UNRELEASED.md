# Unreleased

# 2019-01-10 Infinite scroll observer threshold prop

**Added:**

- bpk-component-infinite-scroll:
  - Added `loaderIntersectionTrigger` so that consumers can decide which percentage of the loading component needs to be visible before triggering the fetch method. Options are `small`, `half` and `full`, being `full` the default option.
