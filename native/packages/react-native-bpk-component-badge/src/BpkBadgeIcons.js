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

import React, { Fragment, type Element } from 'react';
import PropTypes from 'prop-types';
import BpkText from 'react-native-bpk-component-text';
import BpkIcon from 'react-native-bpk-component-icon';
import { spacingSm } from 'bpk-tokens/tokens/base.react.native';
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  item: {
    includeFontPadding: false,
    marginEnd: spacingSm,
  },
});

export type Props = {
  icons: Array<Element<typeof BpkIcon>>,
  itemStyle: ?(Object | Array<Object>),
  separator: ?string,
};

const BpkBadgeIcons = (props: Props) => {
  const { icons, separator, itemStyle: userItemStyle } = props;

  const itemStyle = [styles.item];

  if (userItemStyle) {
    itemStyle.push(StyleSheet.flatten(userItemStyle));
  }

  const adjustedIcons = icons.map(icon =>
    React.cloneElement(icon, {
      small: true,
      style: itemStyle,
    }),
  );

  return (
    <Fragment>
      {adjustedIcons.map((icon, index) => (
        <Fragment key={`${icon.props.icon}`}>
          {icon}
          {separator &&
            index < adjustedIcons.length - 1 && (
              <BpkText
                allowFontScaling={false}
                style={itemStyle}
                textStyle="xs"
              >
                {separator}
              </BpkText>
            )}
        </Fragment>
      ))}
    </Fragment>
  );
};

BpkBadgeIcons.propTypes = {
  icons: PropTypes.arrayOf(PropTypes.element).isRequired,
  itemStyle: Text.propTypes.style,
  separator: PropTypes.string,
};

BpkBadgeIcons.defaultProps = {
  itemStyle: null,
  separator: null,
};

export default BpkBadgeIcons;
