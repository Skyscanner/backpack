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

import type { ReactNode, ComponentType } from 'react';

import wrapDisplayName from './wrapDisplayName';

type Props = {
  children?: ReactNode | string;
  className?: string | null;
  [rest: string]: any;
};

type DefaultProps = {
  className?: string;
  [rest: string]: any;
};

const withDefaultProps = (
  WrappedComponent: ComponentType<any>,
  defaultProps: DefaultProps,
) => {
  const { className: defaultClassName, ...defaultRest } = defaultProps;

  const component = ({
    children = null,
    className: innerClassName = null,
    ...rest
  }: Props) => {
    const classNames = [];

    if (defaultClassName) {
      classNames.push(defaultClassName);
    }
    if (innerClassName) {
      classNames.push(innerClassName);
    }

    return (
      <WrappedComponent
        // General HOC difficult/impossible to remove
        // eslint-disable-next-line @skyscanner/rules/forbid-component-props
        className={classNames.join(' ')}
        {...defaultRest}
        {...rest}
      >
        {children}
      </WrappedComponent>
    );
  };

  component.displayName = wrapDisplayName(WrappedComponent, 'withDefaultProps');

  return component;
};

export default withDefaultProps;
