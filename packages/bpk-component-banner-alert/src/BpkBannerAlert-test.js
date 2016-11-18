import React from 'react';
import renderer from 'react-test-renderer';
import BpkBannerAlert, { ALERT_TYPES } from './BpkBannerAlert';

const message = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.';

describe('BpkBannerAlert', () => {
  it('should render correctly with "type" attribute equal to "success"', () => {
    const tree = renderer.create(
      <BpkBannerAlert type={ALERT_TYPES.SUCCESS} message={message} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "type" attribute equal to "warn"', () => {
    const tree = renderer.create(
      <BpkBannerAlert type={ALERT_TYPES.WARN} message={message} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "type" attribute equal to "error"', () => {
    const tree = renderer.create(
      <BpkBannerAlert type={ALERT_TYPES.ERROR} message={message} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with child nodes', () => {
    const tree = renderer.create(
      <BpkBannerAlert type={ALERT_TYPES.SUCCESS} message={message} toggleButtonLabel={'View more'}>
        {message}
      </BpkBannerAlert>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
