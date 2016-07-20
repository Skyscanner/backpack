# Contributing to backpack-components

Use the following workflow to add new components or change any existing ones:

1. Fork the repo
2. Create a new branch
3. Make your changes
4. Commit and push your new branch
5. Submit a [merge request](http://git.prod.skyscanner.local/backpack/components/merge_requests/)
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
