# Parallel Builds

## Decision
For the time being there is no real benefit on parallelising the build steps in Travis, so the CI will remain a serial flow.

### Idea
Travis CI has a beta feature to launch jobs in parallel, cutting down the amount of time the whole build process takes. With an initial PoC the time was cut in half, jolly good!

### Problems
When it came down to make the PoC production ready, some issues were found:

- Caching
  - Our monorepo relies on Lerna to create symlinks to the different packages, unfortunately symlinks are not cached by travis so the command `npm run bootstrap` needs to run in every parallel job. It takes roughly 120 seconds to complete, so each parallel job has 2 minutes of overhead.
- Docs site
  - When building and testing the docs site, all the tests needs to pass. So, this step cannot run in parallel and needs to wait for the other jobs to finish before starting.

The overhead of each task and the docs site running as the last step are making the total build time the same if not worse than what we currently have.

### Conclusion
Having no discernible difference between the current time and the proposed solution, the YAGNI approach was chosen. If the CI time increases in the future parallelising the builds could be a viable solution.

### Reference
The `.travis.yml` parallel builds were structured like this:

```yml
[...]


jobs:
  include:
    - stage: build shared cache
      script:
        - npm install -g greenkeeper-lockfile@1
        - greenkeeper-lockfile-update
        - npm install
        - npm run build
        - greenkeeper-lockfile-upload

    - stage: parallel task
      script:
        - npm run lint

    - stage: parallel task
      install: npm run bootstrap
      script:
        - npm run check-bpk-dependencies

    - stage: parallel task
      script:
        - ./scripts/check-pristine-state package-lock.json
        - npm run danger

    - stage: parallel task
      install: npm run bootstrap
      script:
        - npm run jest

    - stage: parallel task
      install: npm run bootstrap
      script:
        - npm run test:native

    - stage: parallel task
      install: npm run bootstrap
      script:
        - npm run flow

    - stage: docs
      install: npm run bootstrap
      script:
        - npm run docs:dist
        - if [ "$TRAVIS_BRANCH" == 'master' ] && [ "$TRAVIS_PULL_REQUEST" == 'false' ]; then npm run storybook:dist; fi
        - test -e dist/index.html
        - test -e dist/sassdoc/index.html
      deploy:
        provider: pages
        github_token: $DEPLOY_TOKEN
        on:
          branch: master
        local_dir: dist/
        skip_cleanup: true
        detect_encoding: true
        repo: backpack/backpack.github.io
        target-branch: master
        verbose: true

cache:
  directories:
    - packages/bpk-component-icon
    - package/bpk-token
    - native/node_modules
- node_modules
[...]
```
