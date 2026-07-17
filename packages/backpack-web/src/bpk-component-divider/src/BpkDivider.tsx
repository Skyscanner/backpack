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

import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import STYLES from './BpkDivider.module.scss';

const getClassName = cssModules(STYLES);

// Backpack owns the divider's styling, so this component does not accept
// `className`, `style`, or arbitrary passthrough props. See "Bpk components do
// not accept className or style" in .claude/guidelines/bpk-new-component-workflow.md.
export type Props = {
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'none' | 'base' | 'lg';
  weight?: 'default' | 'bold';
};

const BpkDivider = ({
  orientation = 'horizontal',
  spacing = 'none',
  weight = 'default',
}: Props) => {
  const classNames = getClassName(
    'bpk-divider',
    `bpk-divider--${orientation}`,
    `bpk-divider--spacing-${spacing}`,
    `bpk-divider--weight-${weight}`,
  );

  if (orientation === 'vertical') {
    return (
      <div
        className={classNames}
        role="separator"
        aria-orientation="vertical"
        {...getDataComponentAttribute('Divider')}
      />
    );
  }

  return <hr className={classNames} {...getDataComponentAttribute('Divider')} />;
};

export default BpkDivider;
