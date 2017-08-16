# Contributing to Backpack

So you want to help us enable Skyscanner to create beautiful, coherent products at scale? That's awesome! ♥

This document describes how to go about it. If you have any questions, get in touch on Slack in #backpack or via [backpack@skyscanner.net](mailto:backpack@skyscanner.net).

<!-- TOC depthFrom:2 depthTo:3 withLinks:1 updateOnSave:1 orderedList:0 -->

- [License](#license)
- [Before you jump in](#before-you-jump-in)
- [Getting started](#getting-started)
- [Development tasks](#development-tasks)
- [Adding a new component](#adding-a-new-component)
- [Design](#design)
- [Tokens](#tokens)
- [Sass mixins](#sass-mixins)
- [React component](#react-component)
- [Documentation](#documentation)
- [Publishing packages (Backpack squad members only)](#publishing-packages-backpack-squad-members-only)

<!-- /TOC -->

## License

By contributing your code, you agree to license your contribution under the terms of the APLv2: <<LINK TO REPO LICENCE>>

All files are released with the Apache 2.0 license.

If you are adding a new file it should have a header comment like this:

```
Backpack - Skyscanner's Design System

Copyright 2017 Skyscanner Ltd

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

## Before you jump in

Is there something that you think should be in Backpack, but currently isn't? Before you dive in, please note that not everything that is a UI component belongs in Backpack.

> Is this really going to be used by multiple products?

If you use it multiple times yourself, it might as well be a component, but maybe Backpack is the wrong place for it and it should instead stay in your own codebase. If in doubt, don’t hesitate to get in touch with us!

> I’m sure this should be in Backpack!

Awesome! The rest of this file should give you a good picture of the process.

* * *

Backpack development takes places on Github. If you don't have a Github account, you can create one
on [github.com](https://github.com). You may want to [get added to the Skyscanner team](https://gojira.skyscanner.net/servicedesk/customer/portal/25/create/395) if you aren't already a member.

When you are ready to jump into code, use the following workflow to add new components or change any existing ones:

1. [Fork the repository](https://github.com/Skyscanner/backpack)
2. Create a new branch
3. Make your changes
4. Commit and push your new branch
5. Submit a [pull request](https://github.com/Skyscanner/backpack/pulls)
6. Notify someone in the Backpack Design System squad or drop a note in #backpack

## Getting started

> Make sure to run at least npm 4, which ships with Node 7. You can get the
[latest Node version from this website](https://nodejs.org/en/), use a tool like
[nvm](https://github.com/creationix/nvm) (`nvm use` will switch you to a supported version) or
[nave](https://github.com/isaacs/nave) (`nave auto` does the trick), or just upgrade npm using
`npm install -g npm@latest`.

To get started run:

```sh
npm install
```

The Backpack repository is a **multi-package repository**. This means that, instead of having one code repository for each npm module, we manage all of Backpack’s npm modules in a single code repository.

The tool we use for managing this multi-repo is [Lerna](https://lernajs.io).

> Because we use Lerna to manage multiple packages in one repository,
> you'll also need to run `npm run bootstrap` anytime that you have changed the dependencies
> within a package. This is the equivalent to running `npm install` inside each of the package
> folders.

You can find the individual modules / packages inside the `packages/` folder.

## Development tasks

```sh
ENABLE_CSS_MODULES=true npm start # Start development test harness complete with hot module reloading [HMR]
npm test                          # Lints .js & .scss files and runs unit tests
npm run build                     # Runs the build process for all packages
```

## Adding a new component

If you want to add a new component, we will need the following:

- Design (Sketch file)
- Associated tokens
- Sass mixin(s)
- React component
- Stories
- Tests
- Documentation (Including main `readme.md`)


### Design

Sketch is the preferred format for non-technical folks. We’d appreciate if you could provide an exact match of your component in Sketch format together with folders for each state e.g. disabled, expanded etc.

**If you don’t have access to a designer, get in touch with us or post into #design-general.**

### Tokens

Any visual CSS parameters of the component, such as *color, margins, paddings* etc. should not live as magic numbers in the component code, but as **tokens** in the `bpk-tokens` package.

Tokens are defined in the `src/base` directory (with the exception of product-specific tokens, which are in other subdirectories). Tokens come in two layers: In `aliases.json`, all base tokens are defined with concrete values, such as colors, numbers and sizes. The other files then map those aliases to tokens for specific elements in our [Atomic Design system](https://confluence.skyscannertools.net/pages/viewpage.action?pageId=14123039).

> You should probably not touch `aliases.json`, as our color palette or grid rarely changes.

Be aware that changing tokens will update *all* packages in the repository, as they all depend on `bpk-tokens`. Changing an existing token is almost always worth a "major" release, whereas adding a new token is usually a "minor" release.

#### Building

To build the tokens, run

```sh
npm run build:tokens
```

This will output different formats from the source JSON, for example Sass variables, a JavaScript module, Android and iOS resources.

### Sass mixins

Every *atom-level component* (buttons, form elements, icons, cf [Atomic Design system](https://confluence.skyscannertools.net/pages/viewpage.action?pageId=14123039)) should not only come as a React component, but also as a set of Sass mixins for easy adoption.

All Sass mixins are defined in the `bpk-mixins` package. The package also exposes the Sass variables from the `bpk-tokens` package via the `_bonds.scss` file.

If you add a new file of mixins, for example for a new *atom*, make sure you add the file to the imports in `_index.scss`.

#### Linting

To lint the Sass, run

```sh
npm run lint:scss
```

### React component

Each React component has its own subdirectory `packages/bpk-component-<component-name>`, where the npm module is stored. For it to be properly published, create a `package.json` starting at version `0.0.0` and take inspiration from existing packages in terms of structure. We use [CSS Modules](https://github.com/css-modules/css-modules) along with [BEM](http://getbem.com/) to prevent collisions and accidental overwrites in CSS.

#### Storybook

We use [Storybook](https://getstorybook.io/) to drive the development of Backpack's UI components. Start it using `npm start`.

Create a `stories.js` file and use it to list all the different possible states of your component. Check out Storybook's documentation for more details, and also check out the `stories.js` files of existing components.

> Make sure you import your new component's stories into Storybook by adding it to `.storybook/config.js`.

#### Testing

React components need to be properly unit tested. We use [jest](https://facebook.github.io/jest/)'s snapshot testing, but depending on the complexity of your component, you may want to add additional tests.

#### README

Create a `readme.md` file that shows how to install and use your component. It should also include a table of the component's props, PropTypes and their default values. Take inspiration from existing components.

### Documentation

Our documentation consists of two parts: [Sassdoc](http://backpack.prod.aws.skyscnr.com/sassdoc/), which is automatically generated from the `bpk-mixin` sources, and the main [documentation](http://backpack.prod.aws.skyscnr.com/).

#### Sassdoc

As mentioned, the Sassdoc are automatically generated from source and comments. If you want to double check, you can generate them using `npm run sassdoc` and start a static server to browse the docs, but usually this is not necessary.

Take a look at some of the mixin source files to see how to annotate your Sass to generate proper Sassdoc.

#### Backpack documentation

The Backpack documentation is a standalone client-side app. Each package has its own “page”, which you can find and edit in the `bpk-docs` package under `src/pages`.

The “page” modules themselves contain introductory blurbs and examples for the respective component. They also import the component’s README, which you should have created according to the section further up in this document.

You can run the docs app locally using:

```sh
npm run docs
```

And loading [http://localhost:8080/](http://localhost:8080/)

If you need any help writing documentation, get in touch!

When adding documentation for a new component, add the new dependency in `packages/bpk-docs/package.json` and run `npm run bootstrap` to install it.

## Publishing packages (Backpack squad members only)

- Update the [changelog](/changelog.md) with every package that has changed, separating out breaking changes (*major*), additions (*minor*) and fixes (*patch*) changes (you should see examples of this in previous entries). Make sure to add
  them at the top under a heading of “UNRELEASED"
  - Some useful commands for determining "what's changed?":
    - `npm run lerna updated`
    - `npm run lerna diff <package-name>`
- Make sure you are an owner of the npm packages (speak to a member of the Backpack squad)
- **Do not run `npm publish`. Instead, run `npm run publish`** (this will run `lerna publish`).
- You’ll be asked to specify a new version for every package that has changed. Options are *patch*, *minor* or *major*. These should directly align to the entries you put in the changelog in step 1.
- You’ll be asked at the end to confirm. Note you can still exit without making these changes.
- Update the changelog with the package versions and update the title with today’s date and a brief summary of what has changed.
- Commit and push to master.
- Update the #backpack Slack channel and the [BackpackNeedToKnow](mailto:backpackneedtoknow@skyscanner.net) mailing list if necessary.
