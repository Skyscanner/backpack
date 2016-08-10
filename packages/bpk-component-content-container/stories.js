import React from 'react'
import { storiesOf } from '@kadira/storybook'

import BpkContentContainer from './index'

storiesOf('bpk-component-content-container', module)
  .add('Example', () => (
    <div>
      <BpkContentContainer>
        <h1>Heading Level 1</h1>
        <h2>Heading Level 2</h2>
        <h3>Heading Level 3</h3>
        <h4>Heading Level 4</h4>
        <h5>Heading Level 5</h5>
        <h6>Heading Level 6</h6>
        <h1>Heading Level 1</h1>
        <p>
          A paragraph (from the Greek paragraphos, "to write beside" or "written beside") is a self-contained unit of a
          discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences.
          Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing,
          used to organize longer prose.
        </p>
        <h2>Heading Level 2</h2>
        <p>
          A paragraph (from the Greek paragraphos, "to write beside" or "written beside") is a self-contained unit of a
          discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences.
          Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing,
          used to organize longer prose.
        </p>
        <h3>Heading Level 3</h3>
        <p>
          A paragraph (from the Greek paragraphos, "to write beside" or "written beside") is a self-contained unit of a
          discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences.
          Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing,
          used to organize longer prose.
        </p>
        <h4>Heading Level 4</h4>
        <p>
          A paragraph (from the Greek paragraphos, "to write beside" or "written beside") is a self-contained unit of a
          discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences.
          Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing,
          used to organize longer prose.
        </p>
        <h5>Heading Level 5</h5>
        <p>
          A paragraph (from the Greek paragraphos, "to write beside" or "written beside") is a self-contained unit of a
          discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences.
          Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing,
          used to organize longer prose.
        </p>
        <h6>Heading Level 6</h6>
        <p>
          A paragraph (from the Greek paragraphos, "to write beside" or "written beside") is a self-contained unit of a
          discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences.
          Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing,
          used to organize longer prose.
        </p>
        <blockquote>
          <p>
            A paragraph (from the Greek paragraphos, "to write beside" or "written beside") is a self-contained unit of
            a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more
            sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of
            formal writing, used to organize longer prose.
          </p>
        </blockquote>
        <ul>
          <li>Lorem ipsum dolor sit amet</li>
          <li>Consectetur adipiscing elit</li>
          <li>Integer molestie lorem at massa</li>
          <li>Facilisis in pretium nisl aliquet</li>
          <li>Nulla volutpat aliquam velit
            <ul>
              <li>Phasellus iaculis neque</li>
              <li>Purus sodales ultricies</li>
              <li>Vestibulum laoreet porttitor sem</li>
              <li>Ac tristique libero volutpat at</li>
            </ul>
          </li>
          <li>Faucibus porta lacus fringilla vel</li>
          <li>Aenean sit amet erat nunc</li>
          <li>Eget porttitor lorem</li>
          <li>Nulla volutpat aliquam velit
            <ol>
              <li>Phasellus iaculis neque</li>
              <li>Purus sodales ultricies</li>
              <li>Vestibulum laoreet porttitor sem</li>
              <li>Ac tristique libero volutpat at</li>
            </ol>
          </li>
        </ul>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Matthew</td>
              <td>Davidson</td>
              <td>@matthewdavidson</td>
            </tr>
            <tr>
              <td>2</td>
              <td>James</td>
              <td>Ferguson</td>
              <td>@jamesf</td>
            </tr>
          </tbody>
        </table>
      </BpkContentContainer>
    </div>
  ))
