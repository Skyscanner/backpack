import React from 'react';
import renderer from 'react-test-renderer';
import { withButtonAlignment } from 'bpk-component-icon';
import BaggageIcon from 'bpk-component-icon/sm/baggage';
import BpkCtaButton from './BpkCtaButton';


describe('BpkCtaButton', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<BpkCtaButton>My button</BpkCtaButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "href" attribute', () => {
    const tree = renderer.create(<BpkCtaButton href="#">My button</BpkCtaButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "secondary" attribute', () => {
    const tree = renderer.create(<BpkCtaButton secondary>My button</BpkCtaButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "destructive" attribute', () => {
    const tree = renderer.create(<BpkCtaButton destructive>My button</BpkCtaButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "link" attribute', () => {
    const tree = renderer.create(<BpkCtaButton link>My button</BpkCtaButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "featured" attribute', () => {
    const tree = renderer.create(<BpkCtaButton featured>My button</BpkCtaButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "iconOnly" attribute', () => {
    const tree = renderer.create(<BpkCtaButton iconOnly>
      <span className="visually-hidden">Search</span>
    </BpkCtaButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "selected" attribute', () => {
    const tree = renderer.create(<BpkCtaButton selected>My button</BpkCtaButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "secondary selected" attributes', () => {
    const tree = renderer.create(<BpkCtaButton secondary selected>My button</BpkCtaButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "destructive selected" attributes', () => {
    const tree = renderer.create(<BpkCtaButton destructive selected>My button</BpkCtaButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "link selected" attributes', () => {
    const tree = renderer.create(<BpkCtaButton link selected>My button</BpkCtaButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "disabled" attribute', () => {
    const tree = renderer.create(<BpkCtaButton disabled>My button</BpkCtaButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "loading" attribute', () => {
    const tree = renderer.create(<BpkCtaButton loading>My button</BpkCtaButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "large" attribute', () => {
    const tree = renderer.create(<BpkCtaButton large>My button</BpkCtaButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "large" and "secondary" attributes', () => {
    const tree = renderer.create(<BpkCtaButton large secondary>My button</BpkCtaButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "large" and "destructive" attributes', () => {
    const tree = renderer.create(<BpkCtaButton large destructive>My button</BpkCtaButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "large" and "link" attributes', () => {
    const tree = renderer.create(<BpkCtaButton large link>My button</BpkCtaButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "large" and "featured" attributes', () => {
    const tree = renderer.create(<BpkCtaButton large featured>My button</BpkCtaButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "large" and "iconOnly" attributes', () => {
    const tree = renderer.create(<BpkCtaButton large iconOnly>
      <span className="visually-hidden">Search</span>
    </BpkCtaButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "large" and "selected" attributes', () => {
    const tree = renderer.create(<BpkCtaButton large selected>My button</BpkCtaButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "large" and "disabled" attributes', () => {
    const tree = renderer.create(<BpkCtaButton large disabled>My button</BpkCtaButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with "large" and "loading" attributes', () => {
    const tree = renderer.create(<BpkCtaButton large loading>My button</BpkCtaButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "icon" attribute', () => {
    const AlignedIcon = withButtonAlignment(BaggageIcon);
    const icon = <AlignedIcon />;
    const tree = renderer.create(<BpkCtaButton icon={icon}>My button</BpkCtaButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "iconSelected" attribute', () => {
    const AlignedIcon = withButtonAlignment(BaggageIcon);
    const icon = <AlignedIcon />;
    const tree = renderer.create(<BpkCtaButton selected iconSelected={icon}>My button</BpkCtaButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "iconDisabled" attribute', () => {
    const AlignedIcon = withButtonAlignment(BaggageIcon);
    const icon = <AlignedIcon />;
    const tree = renderer.create(<BpkCtaButton disabled iconDisabled={icon}>My button</BpkCtaButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with a "iconLoading" attribute', () => {
    const AlignedIcon = withButtonAlignment(BaggageIcon);
    const icon = <AlignedIcon />;
    const tree = renderer.create(<BpkCtaButton loading iconLoading={icon}>My button</BpkCtaButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should respect the class names entered as a string', () => {
    const tree = renderer.create(
      <BpkCtaButton large secondary className="custom-class-1 custom-class-2">My button</BpkCtaButton>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should add only bpk specific classes if className prop is set to empty string', () => {
    const tree = renderer.create(<BpkCtaButton large secondary className="">My button</BpkCtaButton>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
