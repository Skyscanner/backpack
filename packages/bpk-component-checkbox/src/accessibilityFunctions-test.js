import BpkLink from '../../bpk-component-link';

import {
  reduceLabelNodeToString,
  selectivelyHideNonLinkElements,
} from './accessibilityFunctions';

const labelWithLink = (
  <span>
    This is a <BpkLink href="#">link</BpkLink>
  </span>
);

const labelWithTwoLinks = (
  <span>
    This is a <BpkLink href="#">link</BpkLink> and this is{' '}
    <BpkLink href="#">another link</BpkLink>
  </span>
);

const labelWithoutLink = 'This is a link';

describe('Checkbox label accessibility functions', () => {
  it('should return a formatted string as literal text if it contained a link', () => {
    const formattedString = reduceLabelNodeToString(labelWithLink);
    expect(formattedString).toEqual('This is a link');
  });

  it('should return a formatted string as literal text if it contained no links', () => {
    const formattedString = reduceLabelNodeToString(labelWithoutLink);
    expect(formattedString).toEqual('This is a link');
  });

  it('should apply aria-hidden to non-link elements', () => {
    const formattedLabel = selectivelyHideNonLinkElements(labelWithLink);
    formattedLabel
      .filter((el) => el.type === 'span')
      .map((el) => {
        expect(el.props['aria-hidden']).toBeTruthy();
        return null;
      });

    formattedLabel
      .filter((el) => el.type !== 'span')
      .map((el) => {
        expect(el.props?.['aria-hidden']).toBeUndefined();
        return null;
      });
  });

  it('should handle labels with multiple links', () => {
    const formattedLabel = selectivelyHideNonLinkElements(labelWithTwoLinks);
    formattedLabel
      .filter((el) => el.type !== 'span')
      .map((el) => {
        expect(el.props?.['aria-hidden']).toBeUndefined();
        return null;
      });
  });
});
