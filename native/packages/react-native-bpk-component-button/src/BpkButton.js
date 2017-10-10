/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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

 import {
   View,
   TouchableHighlight,
 } from 'react-native';
 import React from 'react';
 import PropTypes from 'prop-types';
 import LinearGradient from 'react-native-linear-gradient';
 import difference from 'lodash/difference';

 import { withTheme } from 'react-native-bpk-theming';
 import BpkText from 'react-native-bpk-component-text';

 import styles from './BpkButton-styles';

 const BUTTON_TYPES = ['primary', 'featured', 'secondary', 'destructive'];
 const REQUIRED_THEME_ATTRIBUTES = {
   primary: [
     styles.themeMappings.text.color.primary,
     styles.themeMappings.gradient.primary.startColor,
     styles.themeMappings.gradient.primary.endColor,
   ],
   secondary: [
     styles.themeMappings.text.color.secondary,
     styles.themeMappings.button.borderColor.secondary,
     styles.themeMappings.gradient.secondary.startColor,
   ],
 };
 const THEMEABLE_TYPES = Object.keys(REQUIRED_THEME_ATTRIBUTES);

 const getStyleForElement = (elementType, { type, title, icon, iconOnly, large, disabled }) => {
   // Start with base style.
   const styleForElement = [styles.base[elementType]];

   // Add styles for the button type (primary, secondary etc).
   if (styles.types[type] && styles.types[type][elementType]) {
     styleForElement.push(styles.types[type][elementType]);
   }

   // Add modifiers. Disabled comes last to override other styles.
   if (large) {
     let largeModifier = 'large';
     if (['secondary', 'destructive'].includes(type)) {
       largeModifier = 'largeWithOutline';
     }
     styleForElement.push(styles.modifiers[largeModifier][elementType]);
   }

   if (disabled) {
     styleForElement.push(styles.modifiers.disabled[elementType]);
   }

   if (iconOnly) {
     styleForElement.push(large ? styles.modifiers.iconOnlyLarge[elementType] : styles.modifiers.iconOnly[elementType]);
   } else if (title && icon) {
     // If it has a title and icon, get the style for that.
     styleForElement.push(styles.modifiers[large ? 'textAndIconLarge' : 'textAndIcon'][elementType]);
   }

   return styleForElement;
 };

 const getThemingForElement = (elementType, theme, { type, disabled }) => {
   const themeForElement = {};
   if (theme && !disabled && styles.themeMappings[elementType]) {
     Object.keys(styles.themeMappings[elementType]).forEach((key) => {
       const values = styles.themeMappings[elementType][key];
       if (values[type]) {
         themeForElement[key] = theme[values[type]];
       }
     });
   }
   return themeForElement;
 };

 const getGradientColors = (theme, { type, disabled }) => {
   let gradientColors = styles.gradientColors[type];

   if (theme) {
     const gradientThemeProps = styles.themeMappings.gradient[type];
     gradientColors = [theme[gradientThemeProps.startColor], theme[gradientThemeProps.endColor]];
   }

   if (disabled) {
     gradientColors = styles.gradientColors.disabled;
   }
   return gradientColors;
 };

 const iconPropType = (props, propName, componentName) => {
   const hasIcon = props[propName];
   if (props.iconOnly && !hasIcon) {
     return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. When \`iconOnly\` is enabled, \`${propName}\` must be supplied.`); // eslint-disable-line max-len
   }
   return false;
 };

 const isTypeThemeable = type => THEMEABLE_TYPES.includes(type);

 const themeAttributesSupplied = (type, theme) => (
   difference(REQUIRED_THEME_ATTRIBUTES[type], Object.keys(theme)).length === 0
 );

 const themePropType = (props, propName, componentName) => {
   const type = props.type;
   const theme = props.theme;
   if (!theme) {
     return false;
   }
   if (!themeAttributesSupplied(type, theme)) {
     return new Error(`Invalid prop \`${propName}\` supplied to \`${componentName}\`. For buttons of type \`${type}\`, the \`theme\` prop must include \`${REQUIRED_THEME_ATTRIBUTES[type].join(', ')}\``); // eslint-disable-line max-len
   }
   return false;
 };

 const BpkButton = (props) => {
   const {
     type,
     title,
     icon,
     iconOnly,
     onPress,
     large,
     disabled,
     accessibilityLabel,
     style,
     ...rest
   } = props;
   let theme = props.theme;

   // Validate the button type.
   if (!BUTTON_TYPES.includes(type)) {
     throw new Error(`"${type}" is not a valid button type. Valid types are ${BUTTON_TYPES.join(', ')}`);
   }

   // Validate that button is themeable and all theming attributes
   // have been supplied. If not, disable theming.
   if (theme) {
     if (!isTypeThemeable(type) || !themeAttributesSupplied(type, theme)) {
       theme = null;
     }
   }

   const accessibilityTraits = ['button'];
   if (disabled) {
     accessibilityTraits.push('disabled');
   }

   // Note that TouchableHighlight isn't on Android, so TouchableFeedback
   // will need to be used to support it.
   return (
     <LinearGradient
       colors={getGradientColors(theme, props)}
       style={[getStyleForElement('container', props), style]}
     >
       <TouchableHighlight
         style={[getStyleForElement('button', props), getThemingForElement('button', theme, props)]}
         disabled={disabled}
         onPress={onPress}
         underlayColor={styles.underlayColor}
         accessibilityComponentType="button"
         accessibilityLabel={accessibilityLabel || title}
         accessibilityTraits={accessibilityTraits}
         {...rest}
       >
         <View style={getStyleForElement('view', props)}>
           { !iconOnly &&
             <BpkText
               textStyle={large ? 'lg' : 'sm'}
               emphasize
               style={[getStyleForElement('text', props), getThemingForElement('text', theme, props)]}
             >
               {title}
             </BpkText>
           }
           {icon}
         </View>
       </TouchableHighlight>
     </LinearGradient>
   );
 };

 const propTypes = {
   title: PropTypes.string.isRequired,
   icon: iconPropType,
   iconOnly: PropTypes.bool,
   onPress: PropTypes.func.isRequired,
   type: PropTypes.oneOf(BUTTON_TYPES),
   large: PropTypes.bool,
   disabled: PropTypes.bool,
   accessibilityLabel: PropTypes.string,
   style: View.propTypes.style,
   theme: themePropType,
 };

 BpkButton.propTypes = propTypes;

 BpkButton.defaultProps = {
   icon: null,
   iconOnly: false,
   type: 'primary',
   large: false,
   disabled: false,
   accessibilityLabel: null,
   style: null,
   theme: null,
 };

 export default withTheme(BpkButton);
 export {
   propTypes,
   BUTTON_TYPES,
  };
