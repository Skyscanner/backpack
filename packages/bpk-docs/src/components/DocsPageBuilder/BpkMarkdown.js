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

import marked from 'marked';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server';
import { cssModules } from 'bpk-react-utils';
import {
  BpkTable,
  BpkTableHead,
  BpkTableBody,
  BpkTableRow,
  BpkTableCell,
  BpkTableHeadCell,
} from 'bpk-component-table';
import BpkMobileScrollContainer from 'bpk-component-mobile-scroll-container';
import STYLES from './BpkMarkdown.scss';

const getClassName = cssModules(STYLES);

const renderer = new marked.Renderer();

renderer.table = (header, body) => {
  return ReactDOMServer.renderToString(
    <BpkMobileScrollContainer>
      <BpkTable style={{ width: 'auto' }}>
        <BpkTableHead dangerouslySetInnerHTML={{ __html: header }} />
        {body && <BpkTableBody dangerouslySetInnerHTML={{ __html: body }} />}
      </BpkTable>
    </BpkMobileScrollContainer>,
  );
};

renderer.tablecell = (content, flags) => {
  var CellComponent = flags.header ? BpkTableHeadCell : BpkTableCell;
  // var tag = flags.align
  //   ? '<' + type + ' align="' + flags.align + '">'
  //   : '<' + type + '>';
  // return tag + content + '</' + type + '>\n';

  console.log(`content`, content);
  const contentFinal = content.split(' ').join('<br/>');
  return ReactDOMServer.renderToString(
    <CellComponent dangerouslySetInnerHTML={{ __html: contentFinal }} />,
  );
};

renderer.tablerow = content => {
  return ReactDOMServer.renderToString(
    <BpkTableRow dangerouslySetInnerHTML={{ __html: content }} />,
  );
};

export default renderer;
