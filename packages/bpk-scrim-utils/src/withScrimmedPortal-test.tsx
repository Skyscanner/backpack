import { render, within } from '@testing-library/react';

import withScrimmedPortal from './withScrimmedPortal';

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
});