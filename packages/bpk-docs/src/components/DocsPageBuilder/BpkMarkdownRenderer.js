/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2019 Skyscanner Ltd
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

/* @flow */

// Uses https://github.com/rexxars/react-markdown

import React from 'react';
import PropTypes from 'prop-types';
import { cssModules } from 'bpk-react-utils';
import {
  BpkTable,
  BpkTableHead,
  BpkTableBody,
  BpkTableRow,
  BpkTableCell,
  BpkTableHeadCell,
} from 'bpk-component-table';
import BpkText from 'bpk-component-text';
import { BpkCodeBlock } from 'bpk-component-code';
import BpkMobileScrollContainer from 'bpk-component-mobile-scroll-container';
import ReactMarkdown from 'react-markdown';

import STYLES from './BpkMarkdownRenderer.scss';

const getClassName = cssModules(STYLES);

const TAG_NAMES = ['h1', 'h1', 'h2', 'h3'];
const TEXT_STYLES = ['xxl', 'xxl', 'xl', 'lg'];

export type Props = {
  darkBackground: boolean,
};

const BpkMarkdownRenderer = (props: Props) => {
  const { darkBackground, ...rest } = props;

  const renderers = {};

  renderers.table = tableProps => {
    const { children, ...tableRest } = tableProps;
    return (
      <BpkMobileScrollContainer
        className={getClassName(
          'bpkdocs-markdown-renderer__mobile-scroll-container',
        )}
        trailingIndicatorClassName={getClassName(
          `bpkdocs-markdown-renderer__mobile-scroll-indicator--trailing${
            darkBackground ? '--dark' : '--light'
          }`,
        )}
        leadingIndicatorClassName={getClassName(
          `bpkdocs-markdown-renderer__mobile-scroll-indicator--leading${
            darkBackground ? '--dark' : '--light'
          }`,
        )}
        {...tableRest}
      >
        <BpkTable className={getClassName('bpkdocs-markdown-renderer__table')}>
          {children}
        </BpkTable>
      </BpkMobileScrollContainer>
    );
  };

  renderers.tableRow = tableRowProps => {
    const { children, ...tableRowRest } = tableRowProps;
    return <BpkTableRow {...tableRowRest}>{children}</BpkTableRow>;
  };

  renderers.tableHead = tableHeadProps => {
    const { children, ...tableHeadRest } = tableHeadProps;
    return <BpkTableHead {...tableHeadRest}>{children}</BpkTableHead>;
  };

  renderers.tableBody = tableBodyProps => {
    const { children, ...tableBodyRest } = tableBodyProps;
    return <BpkTableBody {...tableBodyRest}>{children}</BpkTableBody>;
  };

  renderers.tableCell = tableCellProps => {
    const { isHeader, children, ...tableCellRest } = tableCellProps;
    const CellComponent = isHeader ? BpkTableHeadCell : BpkTableCell;
    return <CellComponent {...tableCellRest}>{children}</CellComponent>;
  };

  renderers.heading = headingProps => {
    const { level, children, ...headingRest } = headingProps;

    return (
      <BpkText
        textStyle={TEXT_STYLES[level]}
        tagName={TAG_NAMES[level]}
        {...headingRest}
      >
        {children}
      </BpkText>
    );
  };

  renderers.code = codeBlockProps => {
    const { language, value, ...codeBlockRest } = codeBlockProps;
    return <BpkCodeBlock {...codeBlockRest}>{value}</BpkCodeBlock>;
  };

  return <ReactMarkdown renderers={renderers} {...rest} />;
};

BpkMarkdownRenderer.propTypes = {
  source: PropTypes.string.isRequired,
  darkBackground: PropTypes.boolean,
};

BpkMarkdownRenderer.defaultProps = {
  darkBackground: false,
};

export default BpkMarkdownRenderer;
