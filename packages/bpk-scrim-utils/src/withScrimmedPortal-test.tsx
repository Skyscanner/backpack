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
import { render, within, screen } from '@testing-library/react';
import { useEffect, useState } from 'react';
import { renderToString } from 'react-dom/server';

import withScrimmedPortal from './withScrimmedPortal';
import type { Props } from './withScrimmedPortal';

describe('withScrimmedPortal', () => {
  it('renders the wrapped component inside a portal correctly with fallback to document.body', () => {
    const DialogContent = () => <div>Dialog content</div>;
    const ScrimmedComponent = withScrimmedPortal(DialogContent);

    render(
      <div id="pagewrap">
        <div> Content hidden from AT</div>
        <ScrimmedComponent
          getApplicationElement={() => document.getElementById('pagewrap')}
        />
      </div>
    );
    expect(document.body).toMatchSnapshot();
  });

  it('renders the wrapped component inside a portal with renderTarget provided', () => {
    const WrappedComponent = () => <div>Wrapped Component</div>;
    const ScrimmedComponent = withScrimmedPortal(WrappedComponent);
      render(
        <div>
          <div id="pagewrap">
            <div> Content hidden from AT</div>
            <ScrimmedComponent
              getApplicationElement={() => document.getElementById('pagewrap')}
              renderTarget={() => document.getElementById('modal-container')}
              />
          </div>
          <div id="modal-container" />
       </div>
      );
      expect(document.body).toMatchSnapshot();
  });

  it('renders the wrapped component outside the applicationElement', () => {
    const WrappedComponent = () => <div>Wrapped Component</div>;
    const ScrimmedComponent = withScrimmedPortal(WrappedComponent);
    render(
      <div>
        <div id="pagewrap">
          <div> Content hidden from AT</div>
          <ScrimmedComponent
            getApplicationElement={() => document.getElementById('pagewrap')}
            renderTarget={() => document.getElementById('modal-container')}
          />
        </div>
        <div id="modal-container" />
      </div>
    );

    const hiddenElements = document.getElementById('pagewrap');
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

    expect(screen.getByText('Wrapped Component / portal is not ready yet / portal is now ready')).toBeInTheDocument();
  });

  it('renders the wrapped component inside a portal correctly when runOnServer is false (default)', () => {
    const DialogContent = () => <div>Dialog content</div>;
    const ScrimmedComponent = withScrimmedPortal(DialogContent);

    render(
      <div id="pagewrap">
        <div> Content hidden from AT</div>
        <ScrimmedComponent
          getApplicationElement={() => document.getElementById('pagewrap')}
        />
      </div>
    );
    expect(document.body).toMatchSnapshot();
  });

  it('renders the wrapped component inside a portal correctly when runOnServer is true', () => {
    const DialogContent = () => <div>Dialog content</div>;
    const ScrimmedComponent = withScrimmedPortal(DialogContent);

    render(
      <div id="pagewrap">
        <div> Content hidden from AT</div>
        <ScrimmedComponent
          getApplicationElement={() => document.getElementById('pagewrap')}
        />
      </div>
    );
    expect(document.body).toMatchSnapshot();
  });

  it('throws an error when runOnServer is false and component is rendered on the server', () => {
    const DialogContent = () => <div>Dialog content blablablabla</div>;
    const ScrimmedComponent = withScrimmedPortal(DialogContent);

    expect(() => renderToString(
      <div id="pagewrap">
        <div> Content hidden from AT</div>
        <ScrimmedComponent
          getApplicationElement={() => document.getElementById('pagewrap')}
        />
      </div>
    )).toThrow();
  });
});
