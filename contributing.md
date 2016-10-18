# Contributing to backpack

Use the following workflow to add new components or change any existing ones:

1. Fork the repo
2. Create a new branch
3. Make your changes
4. Commit and push your new branch
5. Submit a [merge request](http://git.prod.skyscanner.local/backpack/backpack/merge_requests/)
6. Notify someone in the Backpack Design System squad or drop a note in #backpack

## Getting started

To get started run:

```sh
npm install
```

> Because we use [Lerna](https://lernajs.io) you'll also need to run `npm run bootstrap` anytime that you have changed
> the dependencies within a package.

## Development tasks

```sh
npm start           # Start development test harness complete with hot module reloading [HMR]
npm test            # Lints .js & .scss files and runs unit tests
```


## Publishing packages (Backpack squads only)
- Make changes to packages (on a branch)
- Make a note in the changelog of every package you have changed, separating out changes (Major), additions (Minor) and fixes (Patch) changes. Mark them at the top under the title of “UNRELEASED"
    - use full commands:
        - npm run lerna updated
        - npm run lerna diff <package-name>
- Code review process as usual, merge to master
- Make sure you are an owner of the npm packages (speak to a member of the Backpack squad)
- npm run publish
- You’ll be asked to specify a new version for every package that has changed. Options are PATCH, MINOR or MAJOR. These should directly align to the entries you put in the changelog in step 2.
- You’ll be asked at the end to confirm. Note you can still exit without making these changes.
- Update the changelog with the package versions and update the title with today’s date.
- Commit and push to master.
- Update the backpack Slack channel if necessary.
