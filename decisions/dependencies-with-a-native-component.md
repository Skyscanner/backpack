# Dependencies with a native component

## Decision

When an NPM dependency has a native component, we use a peer dependency instead of a direct dependency.

## Thinking

A number of NPM dependencies (including `react-native` and `react-native-maps`) contain native components. The JS dependency acts as a bridge between JS and the native code.

If we specify such a dependency as a direct dependency of our library then consumers are forced to use the dependency we specify, which in turn makes it our responsibility to update such dependencies in the consuming codebases.

If the consumer deviates from the version we specify, then it's possible that they would end up with multiple versions installed, which could lead to mismatches between the native and JS libraries.

It's safer (and easier for us) to use peer dependencies, as our library will then simply use what's made available to it by the consuming codebase.
