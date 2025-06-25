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

/* @flow strict */
import PropTypes from 'prop-types';
// @ts-expect-error TS(2305): Module '"react"' has no exported member 'Node'.
import type { Node } from 'react';
import { forwardRef } from 'react';

import { cssModules } from '../../bpk-react-utils';

import themeAttributes, {
  linkAlternateThemeAttributes,
} from './themeAttributes';

// @ts-expect-error TS(2307): Cannot find module './BpkLink.module.scss' or its ... Remove this comment to see the full error message
import STYLES from './BpkLink.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  children: Node,
  // @ts-expect-error TS(8020): JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  href: ?string,
  // @ts-expect-error TS(8020): JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  className: ?string,
  // @ts-expect-error TS(8020): JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  onClick: ?(event: SyntheticEvent<>) => mixed,
  blank: boolean,
  // @ts-expect-error TS(8020): JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  rel: ?string,
  alternate: boolean,
  implicit: boolean,
};

const BpkLink = forwardRef((props: Props, ref) => {
  const {
    alternate,
    blank,
    children,
    className,
    href,
    implicit,
    onClick,
    rel: propRel,
    ...rest
  } = props;

  const classNames = [getClassName('bpk-link')];
  const underlinedClassNames = [getClassName('bpk-link-underlined')];

  const target = blank ? '_blank' : null;
  const rel = blank ? propRel || 'noopener noreferrer' : propRel;

  if (className) {
    classNames.push(className);
  }
  if (implicit) {
    classNames.push(getClassName('bpk-link--implicit'));
  }
  if (alternate) {
    classNames.push(getClassName('bpk-link--alternate'));
  }
  
  if (implicit && !alternate) {
    underlinedClassNames.push(getClassName('bpk-link-underlined--implicit'));
  } else if (alternate && !implicit) {
    underlinedClassNames.push(getClassName('bpk-link-underlined--alternate'));
  } else if (implicit && alternate) {
    underlinedClassNames.push(getClassName('bpk-link-underlined-implicit--alternate'));
  }

  return (
    // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
    <a
      className={classNames.join(' ')}
      // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
      href={href}
      // @ts-expect-error TS(2322): Type '((event: SyntheticEvent) => mixed) | null' i... Remove this comment to see the full error message
      onClick={onClick}
      // @ts-expect-error TS(2322): Type '"_blank" | null' is not assignable to type '... Remove this comment to see the full error message
      target={target}
      // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
      rel={rel}
      // @ts-expect-error TS(2322): Type 'ForwardedRef<unknown>' is not assignable to ... Remove this comment to see the full error message
      ref={ref}
      {...rest}
    >
      <span className={underlinedClassNames.join(' ')}>{children}</span>
    </a>
  );
});

BpkLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  // @ts-expect-error TS(2322): Type 'Requireable<boolean>' is not assignable to t... Remove this comment to see the full error message
  blank: PropTypes.bool,
  rel: PropTypes.string,
  // @ts-expect-error TS(2322): Type 'Requireable<boolean>' is not assignable to t... Remove this comment to see the full error message
  alternate: PropTypes.bool,
  // @ts-expect-error TS(2322): Type 'Requireable<boolean>' is not assignable to t... Remove this comment to see the full error message
  implicit: PropTypes.bool,
};

BpkLink.defaultProps = {
  className: null,
  onClick: null,
  blank: false,
  rel: null,
  alternate: false,
  implicit: false,
};

export default BpkLink;
export { themeAttributes, linkAlternateThemeAttributes };
