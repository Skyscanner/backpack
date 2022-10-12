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
import React, { type Node } from 'react';

import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkBreadcrumb.module.scss';

const getClassName = cssModules(STYLES);

type SchemaMetaDataItem = {
  url: string,
  label: string,
};

export type Props = {
  children: Node,
  schemaMetaData: ?(SchemaMetaDataItem[]),
  label: string,
};

/*
  The google structured data reference for the stringified output of
  the following function is here:
  https://developers.google.com/search/docs/data-types/breadcrumb
*/
const buildMetaData = (schemaMetaData: SchemaMetaDataItem[]): string => {
  const itemListElement = schemaMetaData.map((schemaMetaDataItem, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@id': schemaMetaDataItem.url,
      name: schemaMetaDataItem.label,
    },
  }));

  return JSON.stringify({
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  });
};

class BpkBreadcrumb extends React.Component<Props> {
  metaData: ?string;

  static defaultProps = {
    schemaMetaData: null,
  };

  constructor(props: Props) {
    super(props);

    this.metaData = props.schemaMetaData && buildMetaData(props.schemaMetaData);
  }

  render() {
    const { children, label, schemaMetaData, ...rest } = this.props;

    return (
      <React.Fragment>
        {this.metaData && (
          <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: this.metaData }}
          />
        )}
        {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
        <nav aria-label={label} {...rest}>
          <ol className={getClassName('bpk-breadcrumb')}>{children}</ol>
        </nav>
      </React.Fragment>
    );
  }
}

BpkBreadcrumb.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  schemaMetaData: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
};

BpkBreadcrumb.defaultProps = {
  schemaMetaData: null,
};

export default BpkBreadcrumb;
