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

import { Component, Fragment, type ReactNode } from 'react';

import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import STYLES from './BpkBreadcrumb.module.scss';

const getClassName = cssModules(STYLES);

interface SchemaMetaDataItem {
  url: string;
  label: string;
}

export type Props = {
  children: ReactNode;
  schemaMetaData?: SchemaMetaDataItem[];
  label: string;
  className?: string;
  [rest: string]: any; // Inexact rest. See decisions/inexact-rest.md
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

class BpkBreadcrumb extends Component<Props> {
  metaData?: string;

  constructor(props: Props) {
    super(props);

    this.metaData = props.schemaMetaData && buildMetaData(props.schemaMetaData);
  }

  render() {
    const { children, label, schemaMetaData, ...rest } = this.props;

    return (
      <Fragment>
        {this.metaData && (
          <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: this.metaData }}
          />
        )}
        <nav aria-label={label} {...getDataComponentAttribute('Breadcrumb')} {...rest}>
          <ol className={getClassName('bpk-breadcrumb')}>{children}</ol>
        </nav>
      </Fragment>
    );
  }
}

export default BpkBreadcrumb;