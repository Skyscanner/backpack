import React from 'react';
import renderer from 'react-test-renderer';

import toPortalChild from './toPortalChild';

describe('toPortalChild', () => {
  it('should omit "closePortal" prop from being applied to composed component', () => {
    const MyComponent = props => <button {...props}>test</button>;

    const MyPortalChildComponent = toPortalChild(MyComponent);

    const tree = renderer.create(
      <MyPortalChildComponent closePortal={() => null} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
