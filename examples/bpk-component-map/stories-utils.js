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

/**
 * This file is a workaround for Storybook not supporting HOCs API table generation in v7 by creating mock components that can be used to generate the API table
 * They plan on adding support in v8
 * https://github.com/storybookjs/storybook/issues/12558#issuecomment-1288834879
 * @todo remove this file once we upgrade to Storybook v8
 */

import PropTypes from 'prop-types';

import DefaultLoadingElement from '../../packages/bpk-component-map/src/DefaultLoadingElement';

/**
 * Temporarily re-defining the map props due to a bug in react docgen which doesn't allow us to import the prop types from another file
 * https://github.com/storybookjs/storybook/issues/9266
 * This does work in TS, so we can remove this once we migrate the map component to TS
 * @todo remove this once we migrate the map component to TS
 */
const WithGoogleMapsScriptPropTypes = {
    loadingElement: PropTypes.node,
    googleMapsApiKey: PropTypes.string.isRequired,
    libraries: PropTypes.arrayOf(
        PropTypes.oneOf([
          'drawing',
          'geometry',
          'localContext',
          'places',
          'visualization',
        ]),
      ),
    preventGoogleFontsLoading: PropTypes.bool,
  };
  
const WithGoogleMapsScriptDefaultProps = {
    loadingElement: <DefaultLoadingElement />,
    preventGoogleFontsLoading: false,
    libraries: ['geometry', 'drawing', 'places'],
  };

const WithGoogleMapsScriptMock = () => <div />;

WithGoogleMapsScriptMock.propTypes = {
    ...WithGoogleMapsScriptPropTypes,
};

WithGoogleMapsScriptMock.defaultProps = {
    ...WithGoogleMapsScriptDefaultProps,
};

export default WithGoogleMapsScriptMock;