/*
 *
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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
 *
 */

/* global cy, Cypress */
import * as ROUTES from './../../packages/bpk-docs/src/constants/routes';

const docsUrl = Cypress.env('docs_url') || 'http://0.0.0.0:8080';

describe('Docs site routes', () => {
  Object.values(ROUTES).map(route =>
    it(`should load ${route} properly`, () => {
      cy.visit(`${docsUrl}${route}`);
      cy.get('#application-container').should('exist');
      cy.url().should('include', '/components/card');
    }),
  );
});
