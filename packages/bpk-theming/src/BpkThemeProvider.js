/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const uniq = (arr = []) => {
  const seen = {};
  return arr.filter((item) => {
    if (seen.hasOwnProperty[item]) {
      return false;
    }
    seen[item] = true;
    return true;
  });
};

const createStyle = (theme, themeAttributes) => {
  if (!theme) {
    return {};
  }
  const flattenedThemeAttributes = [].concat(...themeAttributes);
  let style = {};
  const missingThemeAttributes = [];
  flattenedThemeAttributes.forEach((attribute) => {
    if (theme[attribute]) {
      const cssName = attribute
        .replace(/([A-Z])/g, (variable) => `-${variable.toLowerCase()}`)
        .replace(/([0-9])/, (variable) => `-${variable.toLowerCase()}`);
      const value = theme[attribute];
      style[`--bpk-${cssName}`] = value;
    } else {
      missingThemeAttributes.push(attribute);
    }
  });

  if (missingThemeAttributes.length > 0) {
    style = {};
  }

  return style;
};

class BpkThemeProvider extends Component {
  getChildContext() {
    return { theme: this.props.theme };
  }

  render() {
    const {
      children,
      component: WrapperComponent,
      style: userStyle,
      theme,
      themeAttributes,
      ...rest
    } = this.props;

    const dedupedThemeAttributes = uniq(themeAttributes);
    const style = createStyle(theme, dedupedThemeAttributes);

    return (
      <WrapperComponent style={{ ...userStyle, ...style }} {...rest}>
        {children}
      </WrapperComponent>
    );
  }
}

BpkThemeProvider.childContextTypes = {
  theme: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

const themeAttributesPropType = (props, propName, componentName) => {
  const { theme } = props;
  let { themeAttributes } = props;
  if (!theme) {
    return null;
  }
  // Validate types.
  if (!themeAttributes) {
    return new Error(`${componentName}: \`themeAttributes\` is required.`);
  }
  if (!Array.isArray(themeAttributes)) {
    return new Error(`${componentName}: \`themeAttributes\` must be an array.`);
  }

  themeAttributes = [].concat(...themeAttributes);
  const extraneousThemeAttributes = { ...theme };
  const missingThemeAttributes = [];
  themeAttributes.forEach((attribute) => {
    if (theme[attribute]) {
      delete extraneousThemeAttributes[attribute];
    } else {
      missingThemeAttributes.push(attribute);
    }
  });
  const errors = [];
  if (missingThemeAttributes.length > 0) {
    errors.push(
      `${componentName}: To apply theming, the theme prop must include \`${themeAttributes.join(
        ', ',
      )}\` (missing \`${missingThemeAttributes.join(', ')}\`)`,
    );
  }
  if (Object.keys(extraneousThemeAttributes).length > 0) {
    errors.push(
      `${componentName}: Extraneous theme attributes supplied: \`${Object.keys(
        extraneousThemeAttributes,
      ).join(', ')}\`.`,
    );
  }
  if (errors.length > 0) {
    return new Error(errors.join('\n'));
  }
  return false;
};

BpkThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  themeAttributes: themeAttributesPropType, // eslint-disable-line react/require-default-props
  // (disabled because isRequired is inside the custom validator)
  component: PropTypes.elementType,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

BpkThemeProvider.defaultProps = {
  theme: null,
  component: 'div',
  style: null,
};

export default BpkThemeProvider;
