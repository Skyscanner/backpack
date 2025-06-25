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

import PropTypes from 'prop-types';

import { cssModules } from '../../bpk-react-utils';

// @ts-expect-error TS(2307): Cannot find module './BpkPanel.module.scss' or its... Remove this comment to see the full error message
import STYLES from './BpkPanel.module.scss';

const getClassName = cssModules(STYLES);

const BpkPanel = (props: any) => {
  const classNames = [getClassName('bpk-panel')];
  const { children, className, fullWidth, padded, ...rest } = props;

  if (padded) {
    classNames.push(getClassName('bpk-panel--padded'));
  }
  if (fullWidth) {
    classNames.push(getClassName('bpk-panel--full-width'));
  }
  if (className) {
    classNames.push(className);
  }

  return (
    <section className={classNames.join(' ')} {...rest}>
      {children}
    </section>
  );
};

BpkPanel.propTypes = {
  children: PropTypes.node.isRequired,
  padded: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
};

BpkPanel.defaultProps = {
  padded: true,
  fullWidth: false,
  className: null,
};

export default BpkPanel;
