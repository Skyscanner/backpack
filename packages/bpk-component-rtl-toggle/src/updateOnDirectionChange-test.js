import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import updateOnDirectionChange from './updateOnDirectionChange';
import { DIRECTION_CHANGE_EVENT, getHtmlElement } from './utils';

const EnhancedComponent = updateOnDirectionChange('div');

describe('BpkRtlToggle', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<EnhancedComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should force an update when receiving a direction change event', () => {
    const component = mount(<EnhancedComponent />);
    const forceUpdateSpy = jest.fn();

    component.instance().forceUpdate = forceUpdateSpy;
    expect(forceUpdateSpy).not.toHaveBeenCalled();

    getHtmlElement().dispatchEvent(new Event(DIRECTION_CHANGE_EVENT));
    expect(forceUpdateSpy).toHaveBeenCalled();
  });
});
