<!--
Thanks for contributing to Backpack :pray:

Please include a description of the changes you are introducing and some screenshots if appropriate.

Please ensure your pull request title is clear as it will be used to generate the changelog.

Add `major`, `minor` or `patch` label depending on the change according to [semver](semver.org) or `skip-changelog` if the change shouldn't be added to the changelog (e.g. a change to a test or documentation)
-->

Remember to include the following changes:

- [ ] Ensure the PR title includes the name of the component you are changing so it's clear in the release notes for consumers of the changes in the version e.g `[KOA-123][BpkButton] Updating the colour`
- [ ] `README.md` (If you have created a new component)
- [ ] Component `README.md`
- [ ] Tests
- [ ] Accessibility tests
    - The following checks were performed:
        - [ ] Ability to navigate using a [keyboard only](https://webaim.org/techniques/keyboard/)
        - [ ] Zoom functionality ([Deque University explanation](https://dequeuniversity.com/checklists/web/text)):
            - [ ] The page SHOULD be functional AND readable when only the text is magnified to 200% of its initial size
            - [ ] Pages must reflow as zoom increases up to 400% so that content continues to be presented in only one column i.e. Content MUST NOT require scrolling in two directions (both vertically and horizontally)
        - [ ] Ability to navigate using a [screen reader only](https://webaim.org/articles/screenreader_testing/)
- [ ] Storybook examples created/updated
- [ ] For breaking changes or deprecating components/properties, migration guides added to the description of the PR. If the guide has large changes, consider creating a new Markdown page inside the component's docs folder and link it here