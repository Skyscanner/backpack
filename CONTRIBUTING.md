# Contributing to Backpack

You want to help us enable Skyscanner to create beautiful, coherent products at scale? That's awesome! :heart:

## Table of contents

* [Prerequisites](#prerequisites)
* [Getting started](#getting-started)
* [Write your code](#write-your-code)
* [Accessibility DoD](#accessibility-dod)
* [Design documentation](#design-documentation)
* [Experimenting with Backpack components](#experimenting-with-backpack-components)
* [How to](#how-to)

## Prerequisites

### Licence

By contributing your code, you agree to license your contribution under the terms of the [APLv2](./LICENSE).

All files are released with the Apache 2.0 licence.

If you are adding a new file it should have a header comment containing licence information from the following file: [license](./license.txt).

### Environment

Backpack is developed using Node. The required Node version is specified in `.nvmrc`.


If you use [nvm](https://github.com/creationix/nvm) or [nave](https://github.com/isaacs/nave) to manage your Node environment, Backpack has built-in support for these. Just run `nvm use` or `nave auto` to install the correct Node version.

To install npm, use `npm install --global npm@^<version>`. For example, `npm install --global npm@^9.5.1`.

### Code style

Backpack uses a combination of [ESLint](https://eslint.org) and [Prettier](https://prettier.io) to enforce coding styles. ESLint runs as a pre-commit hook, so it isn't possible to commit code that causes ESLint to fail.

We recommend that you install [a plugin to your editor](https://eslint.org/docs/user-guide/integrations#editors) to run ESLint automatically, which will then show you any errors inline. You can even enable an option to fix ESLint errors automatically upon saving.

### Android, iOS and React Native

Backpack also supports native Android and iOS.

They can be found at [backpack-android](https://github.com/skyscanner/backpack-android) and [backpack-ios](https://github.com/skyscanner/backpack-ios)

## Getting started

Once you have a compatible environment as stated above, you can setup the project.

1. Pull the code and create a new branch

```sh
git clone https://github.com/YOUR_USERNAME/Backpack.git
git checkout -b {BRANCH_NAME}
```

2. Install npm dependencies

```sh
npm install --registry="https://registry.npmjs.org/"
```

3. Build SVGs

```sh
npm run build
```

4. Start the Storybook server, then go to [http://localhost:9001](http://localhost:9001) in a web browser to view it

```sh
npm start
```

## Write your code

Before you start writing code, we recommend familiarising yourself with the engineering conventions and squad decisions which are kept in the [decisions folder](/decisions). You should also check out the start guidance at [skyscanner.design](https://www.skyscanner.design/latest/getting-started/about-backpack-pN209Wjo)

### React components

#### TypeScript

**All Backpack components are written in Typescript or are being gradually migrated to Typescript.**

> As we're in the process of migrating all Backpack components to Typescript, we kindly request that engineers contributing changes to an existing component also migrate the respective component to TypeScript.

We also ship the type declaration files for all TypeScript components to ensure proper compatibility and usage of the components.

#### React version

Our current supported React version is 17.0.2, please be mindful when using React features that may not yet be supported.

#### Design
If you'd like to contribute a change to a React component, please first reach out to the backpack team on Slack to discuss and agree on the proposed change. Make sure to add to your message the design (Figma file) and include examples for each state e.g. disabled, expanded etc. if applicable.

#### Example components
Look at existing components for code style inspiration. Here are some good examples to follow:
- [bpk-component-chip](./packages/bpk-component-chip/index.ts)
- [bpk-component-button](./packages/bpk-component-button/index.ts)

#### CSS

We use [CSS Modules](https://github.com/css-modules/css-modules) along with [BEM](http://getbem.com/) to prevent collisions and accidental overwrites in CSS.

When creating (S)CSS files, follow the CSS Module naming convention by using the `.module.(s)css` extension.

When creating or modifying SCSS files, follow these rules

1. Use Modern SASS API
   * Use `@use` instead of `@import`
   * Prefer `math.div($a, $b)` instead of `$a / $b`. Add `@use sass:math` statement to the top of your file to make this function available
   * Read more about [@use rule](https://sass-lang.com/documentation/at-rules/use/) and [SASS math functions](https://sass-lang.com/documentation/modules/math/)
2. Use only what you need
   * Instead of blank import of all mixins, import them on demand. E.g. if you need only colour tokens, add `@use '../bpk-mixins/tokens'` statement only
3. Use `bpk-mixins` for Backpack components development
   * If you need to add or modify a mixin, do it in `packages/bpk-mixins`. Backpack now formally deprecates `@import` usage and uses the Modern Sass API in `packages/bpk-mixins`.

#### Adding a new component

If you want to add a new component:

1. Use `bpk-component-boilerplate` to create a new skeleton React component
2. Our components where possible are written as function components, familiarise yourself using [React component guidelines](https://react.dev/reference/react/Component) for more guidance
    - **For new components we restrict the use of `className` and `style` props to avoid allowing overwriting the component's styles and to ensure consistency across our product.**
3. Create stories - each component has a set of stories living under `examples/bpk-component-{name}/stories.ts`. Stories should cover most visual variants of a component. Read more about Storybook stories [here](https://storybook.js.org/docs/react/writing-stories/introduction)
4. Create tests
    - Visual regression tests - Each UI component's stories should also include a story that begins with the name `VisualTest` - these will then be picked up by Percy to run on CI
    - Unit tests - Unit tests live in the same folder with the component's code and rely on `jest` and `React Testing Library`
    - Accessibility tests - Accessibility tests live in the same folder with the component's code and rely on `jest-axe` and `React Testing Library`
5. Add type declaration files within the same folder of the component to ensure proper compatibility and usage of the components
6. Update `README.md` following the boilerplate format
7. **Add data component attributes** - All components must include data attributes for design system tracking and automation:
    - Import the utility function: `import { getDataComponentAttribute } from '../../bpk-react-utils';
    - Apply the attribute to the root element of your component: `{...getDataComponentAttribute('ComponentName')}`
    - This generates the `data-backpack-ds-component="ComponentName"` attribute automatically
    - For examples, see existing components like [bpk-component-chip](./packages/bpk-component-chip/src/BpkChip/BpkChip.tsx) or [bpk-component-button](./packages/bpk-component-button/src/BpkButton/BpkButton.tsx)
    - Make sure the attribute is only applied to the outermost component element, not to nested elements or helper functions

#### Contribute breaking changes

Anytime a change could break existing applications, it's considered a breaking change. To make upgrading Backpack easier for consumers, most breaking changes should follow a deprecation cycle. You should also consider running an experiment before making the changes stable - read more about experiments with Backpack here: [Backpack experimentation guidelines](#experimenting-with-backpack-components).

In most cases, it is recommended to create a V2 component. If your breaking change either
- requires consumers to make multiple modifications to their code to adopt the changes (e.g. renaming or removing multiple props of an API, large visual changes etc.), OR
- involves a significant alteration of the structure or API of a component in a way that keeping both APIs within one component may make the code unreadable (e.g. rewriting a component to reduce the number of files from 20 to 5)
then you should contribute your changes as a separate V2 component.

If keeping both versions in one component does not affect its readability, you will not need to create a separate component. And finally, if your breaking change does not require consumers to make many modifications or its usages are limited (around 5-10 usages across Skyscanner web repositories) you will not need to follow a deprecation cycle.

Migration guides are required for all breaking changes.

If you are unsure of the impact or scale of your change, reach out to Clover team and we will help you!

### Foundation elements

Any visual CSS parameters of the component, such as *color, margins, paddings* etc. should not live as magic numbers in the component code, but as **tokens** in the [`@skyscanner/bpk-foundations-web`](https://github.com/Skyscanner/backpack-foundations/tree/main/packages/bpk-foundations-web) package.

All of our tokens, Sass mixins, and icons live in the [`@skyscanner/bpk-foundations-web`](https://github.com/Skyscanner/backpack-foundations/tree/main/packages/bpk-foundations-web) repository. Head over to the [`@skyscanner/bpk-foundations-web` contribution guidelines](https://github.com/Skyscanner/backpack-foundations/blob/main/CONTRIBUTING.md) if you'd like to contribute any changes to a foundation element.

## Accessibility DoD

- Any changes to the components should be checked for:
    - Ability to navigate using a [keyboard only](https://webaim.org/techniques/keyboard/)
    - Zoom functionality ([Deque University explanation](https://dequeuniversity.com/checklists/web/text)):
      - The page SHOULD be functional AND readable when only the text is magnified to 200% of its initial size
      - Pages must reflow as zoom increases up to 400% so that content continues to be presented in only one column i.e. Content MUST NOT require scrolling in two directions (both vertically and horizontally)
    - Ability to navigate using a [screen reader only](https://webaim.org/articles/screenreader_testing/)

## Design documentation

See our design system documentation at [skyscanner.design](https://www.skyscanner.design).

## Experimenting with Backpack components

Want to run A/B experiments on features that entail changes to Backpack components? Continue reading below 👇

<details>
<summary>When is a component change considered experimental?</summary>

If the component or change you want to contribute to Backpack is not stable and it depends on the results of an experiment then it is considered experimental.

</details>

<details>
<summary>What do you need to do to mark a component or part of a component as experimental?</summary>

This will depend on what kind of change you are contributing.

**Patch and minor changes**

For patch and minor changes, you should use JSDoc annotations. JSDoc is a widely used and supported tool in the JavaScript ecosystem that allows developers to document their code. JSDoc comments will be visible in most IDEs.

**Major**

For major changes, you should create a new experimental V2 component. If the experiment is successful, the old component should be deprecated.

The new component should be added in the same folder as the original component, further nested inside a folder which follows the `Bpk{ComponentName}V2` naming. For example, the full path for a new component `BpkButton` should be `packages/bpk-component-button/src/BpkButton/BpkButton.tsx`. The 2 components will then be exported in the `index.(js|ts)` file of `bpk-component-button`.

Any follow-up changes to experimental components will not be considered breaking.
</details>

<details>
<summary>When should documentation be created and published?</summary>

Each Bpk component has a corresponding README file which contains information about the component such as usage examples and API documentation. Our components' full documentation is at [skyscanner.design](https://www.skyscanner.design). New experimental components should have a README file, but don’t need to be published to [skyscanner.design](https://www.skyscanner.design). Make sure the README file reflects the component is experimental! When an experiment has run and is considered successful and so the change is stable, documentation can be published.

For changes to existing components, make sure the API documentation is updated to indicate if something is experimental.

Major changes will often require a migration guide. If an experiment is considered succesful, you should add a migration guide within the docs folder located in the respective component folder.
</details>

<details>
<summary>How long does experimentation code live in Backpack?</summary>

Experimentation code should be cleaned up at most 2 weeks after an experiment has completed. In the case of a successful experiment, annotations should be removed and documentation should be published. In the case of an unsuccessful experiment, the code should be removed altogether.
</details>

<details>
<summary>Examples</summary>

Here’s an end-to-end example on how to add an experimental prop to a Bpk component:

1. Reach out to Clover with the proposed change
2. Contribute code changes. Make sure the API table is updated too!
```typescript
type Props = {
	text: string,
	color: string,
	/**
   * @experimental This prop is experimental and subject to change.
	 * Use with caution.
   */
	sparkles?: boolean
}
const BpkText = ({text, color, sparkles}: Props) => {
    ...
}
```
3. Released by Clover
4. Adopt changes in project
5. Run experiment
    - if experiment is successful, publish documentation (only Clover members) and remove experimental code.
    - if experiment is unsuccessful and further iterations are needed, repeat from step 2. Otherwise, remove experimental code. That’s all!
</details>

## How to

<details>
<summary>Create a pull request to Backpack</summary>

For anything non-trivial, we strongly recommend speaking to somebody from Backpack squad before starting work on a PR. This lets us pass on any advice or knowledge we already have about the work you're proposing. It might even be something we're already working on. After this, follow the steps below.

1. If you are not a Skyscanner employee, [fork the repository](https://github.com/Skyscanner/backpack/fork). If you are a Skyscanner employee, please follow the "Engineering Contribution" guide in the Backpack space in Confluence to get push rights to this repository. This contains information about setting up your Github account such as how to get added to the Skyscanner organisation, or set an SSH key to swap between your GH Enterprise and public GH accounts.
2. Create a new branch.
3. Make your changes.
4. Commit and push your new branch.
5. Submit a [pull request](https://github.com/Skyscanner/backpack/pulls). When submitting a PR ensure you add the correct label to your PR.
    * major, A breaking change (visual or API contract changes)
    * minor, A non-breaking change or a new component
    * patch, A fixed bug or updates to documentation
    * skip-changelog, The change you made should not end up in the release changelog
6. Notify someone in Backpack squad or drop a note in #backpack.

Bear in mind that small, incremental pull requests are likely to be reviewed faster.

</details>

<details>
<summary>Run tests</summary>

`npm test` will pick up any files that end in `-test.js`, so you don't need to do anything to make Jest pick them up.

You can also run the tests in 'watch mode', which means the process will continually run and run tests every time files change. Use `npm run jest:watch` to do this.

There are also visual regression tests, powered by [Percy](https://www.percy.io/).

These visual tests are run on CI. When a PR is raised, a build should be showing on the Percy Backpack dashboard. Head into this build/run and you should be able to view any differences there. Ask a member of the Clover team to approve the changes once you have confirmed it all looks as expected.

Visual regression tests run on all Storybook stories titled _'Visual test'_.

</details>

<details>
<summary>Run linters manually</summary>

* `npm run lint` to lint both JS and SCSS.
* `npm run lint:js` to lint JS.
* `npm run lint:js:fix` to lint and try to automatically fix any errors.
* `npm run lint:scss` to lint SCSS.

</details>

<details>
<summary>Publish packages (Backpack squad members only)</summary>

- Publish the latest draft on the [releases pages](https://github.com/Skyscanner/backpack/releases)
- Ensure CI runs the release workflow successfully
- Once released verify the artifacts are available

</details>

## And finally..

If you have any questions at all, don't hesitate to get in touch. We love to talk all things Backpack and we look forward to seeing your contribution!
