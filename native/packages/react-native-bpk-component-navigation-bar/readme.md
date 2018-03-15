# react-native-bpk-component-navigation-bar

> Backpack React Native navigation bar component.

## Installation

```sh
npm install react-native-bpk-component-navigation-bar --save-dev
```

## Usage

The component has slightly different APIs on iOS and Android. For both platforms the `BpkNavigationBar` is the main component
to use. On Android we additionally provide `BpkNavigationBarButtonAndroid` to render the leading and trailing bar buttons. On iOS
there are a few more variations of buttons and we provide three components:

+ `BpkNavigationBarBackButtonIOS` for rendering a back item with an optional title.
+ `BpkNavigationBarTextButtonIOS` for rendering a text button.
+ `BpkNavigationBarIconButtonIOS` for rendering an icon only button.

### Android

```js
import React from "react";
import { I18nManager } from "react-native";
import BpkNavigationBar, {
  BpkNavigationBarButtonAndroid
} from "react-native-bpk-component-navigation-bar";

const backIcon = () =>
  I18nManager.isRTL ? "native-android--forward" : "native-android--back";

export default () => (
  <BpkNavigationBar
    leadingButton={
      <BpkNavigationBarButtonAndroid
        title={translationHelper.t("back-button-title")}
        icon={backIcon}
        onPress={() => null}
      />
    }
    title={translationHelper.t("navigation-bar-title")}
  />
);
```

### iOS

```js
import React from "react";
import { I18nManager } from "react-native";
import BpkNavigationBar, {
  BpkNavigationBarBackButtonIOS
} from "react-native-bpk-component-navigation-bar";

export default () => (
  <BpkNavigationBar
    leadingButton={
      <BpkNavigationBarBackButtonIOS
        title={translationHelper.t("back-button-title")}
        showTitle
        onPress={() => null}
      />
    }
    title={translationHelper.t("navigation-bar-title")}
  />
);
```

## Components

### `BpkNavigationBar`

Renders the navigation bar.

```js
import BpkNavigationBar from 'react-native-bpk-component-navigation-bar'
```

#### Props

| Property       | PropType               | Required | Default Value |
| -------------- | ---------------------- | -------- | ------------- |
| title          | oneOf(string, element) | true     | -             |
| theme          | object                 | false    | null          |
| leadingButton  | button element         | false    | null          |
| trailingButton | button element         | false    | null          |
| subtitleView   | element                | false    | null          |

#### Theme Props

**Common:**

+ `navigationBarStatusBarStyle`
+ `navigationBarBackgroundColor`
+ `navigationBarTintColor`



**Android:**

+ `navigationBarStatusBarColor`



**iOS:**

+ `navigationBarShadowColor`



### `BpkNavigationBarButtonAndroid`

Renders bar buttons on Android only.

```js
import { BpkNavigationBarButtonAndroid } from 'react-native-bpk-component-navigation-bar'
```



#### Props

| Property | PropType                          | Required | Default Value |
| -------- | --------------------------------- | -------- | ------------- |
| title    | string                            | true     | -             |
| icon     | oneOf(Object.keys(BpkIcons.icon)) | true     | -             |
| onPress  | func                              | false    | null          |



### `BpkNavigationBarBackButtonIOS`

Renders a back button on iOS with optional support to show a title.

```js
import { BpkNavigationBarBackButtonIOS } from 'react-native-bpk-component-navigation-bar'
```



#### Props

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| title     | string   | true     | -             |
| showTitle | bool     | false    | false         |
| onPress   | func     | false    | null          |

### `BpkNavigationBarTextButtonIOS`

Renders a text button on iOS.

```js
import { BpkNavigationBarTextButtonIOS } from 'react-native-bpk-component-navigation-bar'
```



#### Props

| Property  | PropType | Required | Default Value |
| --------- | -------- | -------- | ------------- |
| title     | string   | true     | -             |
| emphasize | bool     | false    | false         |
| onPress   | func     | false    | null          |

### `BpkNavigationBarIconButtonIOS`

Renders a text button on iOS.

```js
import { BpkNavigationBarIconButtonIOS } from 'react-native-bpk-component-navigation-bar'
```



#### Props

| Property | PropType                          | Required | Default Value |
| -------- | --------------------------------- | -------- | ------------- |
| title    | string                            | true     | -             |
| icon     | oneOf(Object.keys(BpkIcons.icon)) | true     | -             |
| onPress  | func                              | false    | null          |

