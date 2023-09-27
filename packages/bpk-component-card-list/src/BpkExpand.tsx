import { useState } from 'react';

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import ChevronDown from '../../bpk-component-icon/sm/chevron-down';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import ChevronUp from '../../bpk-component-icon/sm/chevron-up';
import { BUTTON_TYPES, BpkButtonV2 } from '../../bpk-component-button';
import { withButtonAlignment, withRtlSupport } from '../../bpk-component-icon';

const AlignedChevronDownIcon = withButtonAlignment(withRtlSupport(ChevronDown));
const AlignedChevronUpIcon = withButtonAlignment(withRtlSupport(ChevronUp));

const BpkExpand = ({ hideContent, showContent }: any) => {
  const [contentHidden, setContentHidden] = useState(true);

  const buttonText = contentHidden ? 'Show More' : 'Show Less';
  const buttonIcon = contentHidden ? (
    <AlignedChevronDownIcon />
  ) : (
    <AlignedChevronUpIcon />
  );
  const buttonOnClick = () => {
    if (contentHidden) {
      showContent();
      setContentHidden(false);
    } else {
      hideContent();
      setContentHidden(true);
    }
  };

  return (
    <BpkButtonV2 type={BUTTON_TYPES.link} onClick={() => buttonOnClick()}>
      {buttonText}
      {buttonIcon}
    </BpkButtonV2>
  );
};

export default BpkExpand;
