# Contributing to Backpack

You want to help us enable Skyscanner to create beautiful, coherent products at scale? That's awesome! :heart:

## Table of contents

* [Prerequisites](#prerequisites)
* [Getting started](#getting-started)
* [Adding a new component](#adding-a-new-component)
* [How to](#how-to)

## Prerequisites

### Licence

By contributing your code, you agree to license your contribution under the terms of the [APLv2](./LICENSE).

All files are released with the Apache 2.0 licence.

If you are adding a new file it should have a header comment containing licence information:

<details>
<summary>Show/hide licence header</summary>

```
Backpack - Skyscanner's Design System

Copyright 2018 Skyscanner Ltd

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

</details>

### Decisions

Conventions and squad decisions are kept in the [decisions folder](/decisions). We recommend familiarising yourself with these.

### Installing Node

Backpack is developed using Node, using the following versions:

* `LTS` (Node)
* `^5.6.0` (npm)

This is enforced using a pre-install hook that calls out to [ensure-node-env](https://github.com/Skyscanner/ensure-node-env).

If you use [nvm](https://github.com/creationix/nvm) or [nave](https://github.com/isaacs/nave) to manage your Node environment, Backpack has built-in support for these. Just run `nvm use` or `nave auto` to install the correct Node version.

To install npm, use `npm install --global npm@^5.6.0`.

### React Native

> Skip this section if you don't intend to develop React Native components.

<details>
<summary>iOS</summary>

Install XCode from the [App Store](https://itunes.apple.com/gb/app/xcode/id497799835?mt=12). Once installed, open it and accept the licence agreement. You're free to close it after that.

We use [Cocoapods](https://cocoapods.org) to install some iOS-specific dependencies. Cocoapods uses Ruby, so you'll need to install that too. [rbenv](https://github.com/rbenv/rbenv) and [rvm](https://rvm.io/) are both good ways to get Ruby. The version of Ruby you'll need is specified in `native/ios/.ruby-version`.

Once you have Ruby, install [Bundler](https://bundler.io) with `gem install bundler`.

</details>

<details>
<summary>Android</summary>

Get [Homebrew](https://brew.sh/) if you don't already have it.

Install Watchman with `brew install watchman`, then install Java 8 with `brew tap caskroom/versions && brew cask install java8`.

Get Android Studio with `brew cask install android-studio`. Once installed, open it and a setup wizard will guide you through installing lots of extra things like the Android SDK (choose *Standard* installation). You may be asked for your password during this. You're free to close Android Studio once this is done.

Add an environment variable pointing to the SDK location to your `~/.bash_profile`
(or similarly used file):

```
echo "export ANDROID_HOME=\"$HOME/Library/Android/sdk\"" >> ~/.bash_profile
echo "export ANDROID_SDK_ROOT=\"$HOME/Library/Android/sdk\"" >> ~/.bash_profile
source ~/.bash_profile
```

Accept the SDK licences:

```
$ANDROID_SDK_ROOT/tools/bin/sdkmanager --licenses
```

Download Android system images for the minimum and targeted API levels. Note that you may get a warning about a `.cfg` file not being present. You're safe to ignore this.

```
$ANDROID_SDK_ROOT/tools/bin/sdkmanager "system-images;android-27;google_apis;x86"
$ANDROID_SDK_ROOT/tools/bin/sdkmanager "system-images;android-21;google_apis;x86"
```
Create Android Virtual Devices (AVDs):

```
$ANDROID_SDK_ROOT/tools/bin/avdmanager create avd --name "bpk-avd" --package "system-images;android-27;google_apis;x86" --device "pixel" && cp native/android/bpk-avd.ini ~/.android/avd/bpk-avd.avd/config.ini
$ANDROID_SDK_ROOT/tools/bin/avdmanager create avd --name "bpk-avd-min" --package "system-images;android-21;google_apis;x86" --device "Nexus 5"
```
</details>

#### Detox

Backpack uses [Detox](https://github.com/wix/detox) for e2e testing of React Native components, which requires `applesimutils` and `ffmpeg` to be installed:

```
brew tap wix/brew
brew install applesimutils ffmpeg
```

for any issue with Detox please refer the the [offical documentation](https://github.com/wix/detox/tree/master/docs).

### Code style

Backpack uses a combination of [ESLint](https://eslint.org) and [Prettier](https://prettier.io) to enforce coding styles. ESLint runs as a pre-commit hook, so it isn't possible to commit code that causes ESLint to fail.

We recommend that you install [a plugin to your editor](https://eslint.org/docs/user-guide/integrations#editors) to run ESLint automatically, which will then show you any errors inline. You can even enable an option to fix ESLint errors automatically upon saving.

## Getting started

### Install dependencies

Run `npm install` to install dependencies from npm.

<details>
<summary>A note on dependencies</summary>

Backpack is a multi-package repository, also known as a monorepo. This means that instead of having one code repository for each npm package, we manage them all inside this single repository.

We use [Lerna](https://lernajs.io) to achieve this. Lerna links packages together inside this repo by 'bootstrapping'.

When you run `npm install`, Lerna is bootstrapped automatically as a post-install hook. However, if you change dependencies within a package, you will need to run Lerna manually with `npm run bootstrap`.

</details>

#### React Native

> Skip this section if you don't intend to develop React Native components.

<details>
<summary>iOS</summary>

From inside `native/ios`, run `bundler install` followed by `bundle exec pod install`.
</details>

<details>
<summary>Android</summary>

To ensure that maps powered by Google work set the `google_maps_api_key` in `native/android/local.properties` and make sure you are using the backpack.keystore.

##### APK signing

For members of Backpack we have a keystore tied to our Google Maps API key in LastPass. Retrieve this key and place it in `native/android/backpack.keystore`. For contributors who are not members of Backpack nothing needs to be done, but Google Maps will not work. If you need Google Maps to work you'll need to supply your own Google Maps Api Key and possible keystore.

</details>

### Build the code

Backpack's code depends on some things that must be built first, such as icon fonts, SVGs and tokens.

Use `npm run build` to do this.

### Run the development environment

We use [Storybook](https://storybook.js.org/) for our development environment. The instructions for running it are different, depending on whether you're running the web or React Native storybook.

#### Web

Run `npm start` to start the storybook server, then go to [http://localhost:9001](http://localhost:9001) in a web browser to view it.

#### React Native

1. Run `npm run native` to start the storybook server.
2. Open another terminal tab/window.
3. Run `npm run ios` to run the Backpack app on an iPhone simulator.
4. Run `npm run android` to run the Backpack app on an Android emulator.
5. Go to [http://localhost:7007](http://localhost:7007) in a web browser.

At this point, you should have a functioning development environment running on your local machine.

## Adding a new component

If you want to add a new component, we will need the following:

- Design (Sketch file)
- Associated tokens
- Sass mixin(s)
- React component
- Stories
- Tests
- Documentation (Including main `README.md`)

### Design

Sketch is the preferred format for non-technical folks. We’d appreciate if you could provide an exact match of your component in Sketch format together with folders for each state e.g. disabled, expanded etc.

### Tokens

Any visual CSS parameters of the component, such as *color, margins, paddings* etc. should not live as magic numbers in the component code, but as **tokens** in the `bpk-tokens` package.

Tokens are defined in the `src/base` directory (with the exception of product-specific tokens, which are in other subdirectories). Tokens come in two layers: In `aliases.json`, all base tokens are defined with concrete values, such as colors, numbers and sizes. The other files then map those aliases to tokens for specific elements.

> You should probably not touch `aliases.json`, as our color palette or grid rarely changes.

### Sass mixins

All Sass mixins are defined in the `bpk-mixins` package. The package also exposes the Sass variables from the `bpk-tokens` package.

If you add a new file of mixins, for example for a new *atom*, make sure you add the file to the imports in `_index.scss`.

### React component

Use `npm run create-component` to create a new skeleton React component. Once this is created, use existing components for code style inspiration.

We use [CSS Modules](https://github.com/css-modules/css-modules) along with [BEM](http://getbem.com/) to prevent collisions and accidental overwrites in CSS.

### Documentation

Our documentation consists of two parts: [Sassdoc](https://backpack.github.io/sassdoc/), which is automatically generated from the `bpk-mixin` sources, and the main [documentation](https://backpack.github.io).

#### Sassdoc

As mentioned, the Sassdoc are automatically generated from source and comments. If you want to double check, you can generate them using `npm run sassdoc` and start a static server to browse the docs, but usually this is not necessary.

Take a look at some of the mixin source files to see how to annotate your Sass to generate proper Sassdoc.

#### Backpack documentation

When adding documentation for a new component:

 * Add the new dependency in `packages/bpk-docs/package.json` and run `npm run bootstrap` to install it.
 * Add routes for your new component in `packages/bpk-docs/src/constants/Routes.js` and `packages/bpk-docs/src/constants/redirect-routes.js`.
 * Add new link in `packages/bpk-docs/src/layouts/links.js`.

 For help writing documentation, see Skyscanner's [copywriting guide](https://backpack.github.io/style-guide/copywriting) and Backpack's [guide for writing docs](/decisions/writing-docs.md).

## How to

<details>
<summary>Create a pull request to Backpack</summary>

For anything non-trivial, we strongly recommend speaking to somebody from Backpack squad before starting work on a PR. This lets us pass on any advice or knowledge we already have about the work you're proposing. It might even be something we're already working on. After this, follow the steps below.

1. [Fork the repository](https://github.com/Skyscanner/backpack/fork).
2. Create a new branch.
3. Make your changes.
4. Commit and push your new branch.
5. Submit a [pull request](https://github.com/Skyscanner/backpack/pulls).
6. Notify someone in Backpack squad or drop a note in #backpack.

Bear in mind that small, incremental pull requests are likely to be reviewed faster.

</details>

<details>
<summary>Run tests</summary>

`npm test` will run all tests for both web and React Native. It will pick up any files that end in `-test.js`, so you don't need to do anything to make Jest pick them up. You can also use `npm run test:native` to only run React Native tests.

You can also run the tests in 'watch mode', which means the process will continually run and run tests every time files change. Use `npm run jest:watch` to do this, or `npm run jest:native:watch` to only run them for React Native.

</details>

<details>
<summary>Run the documentation site</summary>

The Backpack documentation is a standalone client-side app. Each package has its own page, which you can find and edit in the `bpk-docs` package under `src/pages`.

The “page” modules themselves contain introductory blurbs and examples for the respective component. They also import the component’s README, which you should have created as part of your component.

You can run the docs app locally using:

```sh
npm run build
npm run docs
```

And loading [http://localhost:8080](http://localhost:8080).

The web Map component page requires an environment variable named `GOOGLE_MAPS_API_KEY`. During builds, this is set by Travis.

</details>

<details>
<summary>Run linters manually</summary>

* `npm run lint` to lint both JS and SCSS.
* `npm run lint:js` to lint JS.
* `npm run lint:js:fix` to lint and try to automatically fix any errors.
* `npm run lint:scss` to lint SCSS.

</details>

<details>
<summary>Run Android emulators manually</summary>

The setup process detailed in *[Prerequisites](#prerequisites)* created two Android emulators. One with API version 27 and another with 21.

To run these manually, from inside the `/native` folder, run `npm run android:emulator` or `npm run android:emulator:min` to run API versions 27 and 21 respectively.

</details>

<details>
<summary>Publish packages (Backpack squad members only)</summary>

- Update the [unreleased changelog](/unreleased.md) with every package that has changed, separating out breaking changes (*major*), additions (*minor*) and fixes (*patch*) changes (you should see examples of this in previous entries of the [changelog](/changelog.md)).
  - Some useful commands for determining "what's changed?":
    - `npm run lerna updated`
    - `npm run lerna diff <package-name>`
- Make sure you are an owner of the npm packages (speak to a member of the Backpack squad).
- **Do not run `npm publish`. Instead, run `npm run publish`** (this will run `lerna publish`).
- You’ll be asked to specify a new version for every package that has changed. Options are *patch*, *minor* or *major*. These should directly align to the entries you put in the [unreleased changelog](/unreleased.md) in step 1.
- You’ll be asked at the end to confirm. Note you can still exit without making these changes.
- Move entries from [unreleased.md](/unreleased.md) to the [changelog](/changelog.md). Update the package versions for the new changes, and group them under a title with today’s date and a brief summary of what has changed.
- Commit and push to master.

Be aware that if `bpk-tokens` has changed, *all* packages in the repository will be updated as they all depend on `bpk-tokens`. Changing an existing token is almost always worth a "major" release, whereas adding a new token is usually a "minor" release.

When a component is released for the first time on npm, remember to add the component to the Skyscanner organisation through the [npm UI](https://www.npmjs.com/settings/skyscanner/teams/team/backpack/access).

</details>

## And finally..

If you have any questions at all, don't hesitate to get in touch. We love to talk all things Backpack and we look forward to seeing your contribution!
