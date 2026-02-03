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
import '@testing-library/jest-dom';
import { useEffect, useState } from 'react';
import { renderToString } from 'react-dom/server';

import { render, within, screen } from '@testing-library/react';

import withScrimmedPortal from './withScrimmedPortal';

import type { Props } from './withScrimmedPortal';

describe('withScrimmedPortal', () => {
  it('renders the wrapped component inside a portal correctly with fallback to document.body', () => {
    const DialogContent = () => <div data-testid="dialog-content">Dialog content</div>;
    const ScrimmedComponent = withScrimmedPortal(DialogContent);

    render(
      <div id="pagewrap">
        <div data-testid="hidden"> Content hidden from AT</div>
        <ScrimmedComponent
          getApplicationElement={() => document.getElementById('pagewrap')}
        />
      </div>
    );

    const hiddenElements = document.getElementById('pagewrap');

    expect(document.body).toContainElement(screen.getByTestId('dialog-content'));
    expect(within(hiddenElements as HTMLElement).queryByText('Wrapped Component')).toBeNull();
  });

  it('renders the wrapped component inside a portal with renderTarget provided', () => {
    const DialogContent = () => <div data-testid="dialog-content">Dialog content</div>;
    const ScrimmedComponent = withScrimmedPortal(DialogContent);
      render(
        <div>
          <div id="pagewrap">
            <div data-testid="hidden"> Content hidden from AT</div>
            <ScrimmedComponent
              getApplicationElement={() => document.getElementById('pagewrap')}
              renderTarget={() => document.getElementById('modal-container')}
              />
          </div>
          <div id="modal-container" />
       </div>
      );
      const hiddenElements = document.getElementById('pagewrap');

      expect(
        document.getElementById('modal-container')
      ).toContainElement(screen.getByTestId('dialog-content'));
      expect(within(hiddenElements as HTMLElement).queryByText('Wrapped Component')).toBeNull();
  });

  it('notifies the child component when the portal is ready', () => {
    const WrappedComponent = ({ isPortalReady }: Props) => {
      const [portalStatus, setPortalStatus] = useState('');
      useEffect(() => {
        if (isPortalReady) {
          setPortalStatus(`${portalStatus} portal is now ready`);
        } else {          
          setPortalStatus(`${portalStatus} portal is not ready yet /`);
        }
      }, [isPortalReady]);

      const content = `Wrapped Component /${portalStatus}`;

      return <div>{content}</div>;
    };

    const ScrimmedComponent = withScrimmedPortal(WrappedComponent);
    render(
      <div id="pagewrap">
        <div> Content hidden from AT</div>
        <ScrimmedComponent
          getApplicationElement={() => document.getElementById('pagewrap')}
        />
      </div>
    );

    expect(screen.getByText('Wrapped Component / portal is now ready')).toBeInTheDocument();
  });
});

describe('Server Side Rendering', () => {
  it('renders without crashing', () => {
    const WrappedComponent = () => <div data-testid="dialog-content">Wrapped Component</div>;
    const ScrimmedComponent = withScrimmedPortal(WrappedComponent);

    expect(() => renderToString(
      <div id="pagewrap">
        <div> Content hidden from AT</div>
        <ScrimmedComponent
          getApplicationElement={() => document.getElementById('pagewrap')}
        />
      </div>
    )).not.toThrow();
  });
});
