# Accessibility tests

## Decision
We use [`jest-axe`](https://www.npmjs.com/package/jest-axe) to add automated accessibility tests to our components.

Generally, we only test the public interface of a component to reflect how it would be used in reality. For example, we have an accessibility test for `BpkAccordion` with `BpkAccordionItem` children, but we don't test them separately because they would never be used that way by a consumer.

We put the accessibility tests in their own test file, named `Bpk<ComponentName>-accessibility-test.js`.
