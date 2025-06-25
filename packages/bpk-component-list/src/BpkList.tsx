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
// @ts-expect-error TS(2305) FIXME: Module '"react"' has no exported member 'Node'.
import type { Node } from 'react';

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkList.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  children: Node,
  ordered: boolean,
  // @ts-expect-error TS(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  className: ?string,
  // @ts-expect-error TS(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  ariaLabel: ?string,
  // @ts-expect-error TS(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  ariaLabelledby: ?string,
  // @ts-expect-error TS(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  title: ?string,
};

const BpkList = (props: Props) => {
  const { ariaLabel, ariaLabelledby, children, className, ordered, title } =
    props;

  const ListElements: any = ordered ? 'ol' : 'ul';
  const classNames: string = getClassName('bpk-list', className);

  return (
    <ListElements
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      title={title}
      className={classNames}
    >
      {children}
    </ListElements>
  );
};

BpkList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  ordered: PropTypes.bool,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
  ariaLabelledby: PropTypes.string,
  title: PropTypes.string,
};

BpkList.defaultProps = {
  ordered: false,
  className: null,
  ariaLabel: null,
  ariaLabelledby: null,
  title: null,
};

export default BpkList;
