/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* @flow */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import BpkText from 'react-native-bpk-component-text';
import BpkIcon, { icons } from 'react-native-bpk-component-icon';
import { spacingSm } from 'bpk-tokens/tokens/base.react.native';

import { type TitleWithIcon } from './common-types';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leadingIcon: {
    marginEnd: spacingSm,
  },
  trailingIcon: {
    marginStart: spacingSm,
  },
  textWithIcon: {
    // This line height ensure the icon lines up
    // nicely with the baseline of the text.
    lineHeight: 24,
  },
});

const TitleView = (props: {
  title: string | TitleWithIcon,
  tintColor: string,
  style: any,
}) => {
  const { title, tintColor, style, ...rest } = props;

  const titleValue = typeof title === 'object' ? title.value : title;
  const hasIcon = typeof title === 'object';
  let isLeading = false;
  let isTrailing = false;
  let icon = null;

  if (typeof title === 'object') {
    isLeading = title.iconPosition === 'leading';
    isTrailing = title.iconPosition === 'trailing';
    icon = (
      <BpkIcon
        icon={icons[title.icon]}
        small
        style={[
          isLeading ? styles.leadingIcon : styles.trailingIcon,
          { color: tintColor },
        ]}
      />
    );
  }

  return (
    <View style={[styles.container, style]} {...rest}>
      {isLeading && icon}
      <BpkText
        textStyle="lg"
        emphasize
        numberOfLines={1}
        ellipsizeMode="tail"
        style={[{ color: tintColor }, hasIcon ? styles.textWithIcon : null]}
      >
        {titleValue}
      </BpkText>
      {isTrailing && icon}
    </View>
  );
};

export default TitleView;
