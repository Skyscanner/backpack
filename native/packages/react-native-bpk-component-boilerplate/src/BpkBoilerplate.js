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
import { type StyleObj, StyleSheet, View, ViewPropTypes } from 'react-native';

const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
});

export type Props = {
  style: ?StyleObj,
};

const BpkBoilerplate = (props: Props) => {
  const { style: userStyle, ...rest } = props;

  const style = [styles.base];
  if (userStyle) {
    style.push(userStyle);
  }

  return <View style={style} {...rest} />;
};

BpkBoilerplate.propTypes = {
  style: ViewPropTypes.style,
};

BpkBoilerplate.defaultProps = {
  style: null,
};

export default BpkBoilerplate;
