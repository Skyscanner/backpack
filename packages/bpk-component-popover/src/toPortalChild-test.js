import { mount } from 'enzyme';
import React, { PropTypes } from 'react';

import toPortalChild from './toPortalChild';

describe('toPortalChild', () => {
  it('should map "closePortal" prop to "onClose" prop', () => {
    const MyComponent = props => <button onClick={props.onClose}>test</button>;
    MyComponent.propTypes = { onClose: PropTypes.func };

    const MyPortalChildComponent = toPortalChild(MyComponent);

    const closePortalMock = jest.fn();

    const component = mount(
      <MyPortalChildComponent closePortal={closePortalMock} />,
    );

    component.find('button').simulate('click');

    expect(closePortalMock).toHaveBeenCalled();
  });
});
