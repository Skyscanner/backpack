// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import ChevronDown from '../../../bpk-component-icon/sm/chevron-down';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import ChevronUp from '../../../bpk-component-icon/sm/chevron-up';
import { BUTTON_TYPES, BpkButtonV2 } from '../../../bpk-component-button';
import { withButtonAlignment, withRtlSupport } from '../../../bpk-component-icon';

const AlignedChevronDownIcon = withButtonAlignment(withRtlSupport(ChevronDown));
const AlignedChevronUpIcon = withButtonAlignment(withRtlSupport(ChevronUp));

const BpkExpand = ({
  collapsed,
  hideContent,
  setCollapsed,
  showContent,
}: any) => {
  // TODO: pass a prop for both strings
  const buttonText = collapsed ? 'Show More' : 'Show Less';
  const buttonIcon = collapsed ? (
    <AlignedChevronDownIcon />
  ) : (
    <AlignedChevronUpIcon />
  );
  const buttonOnClick = () => {
    if (collapsed) {
      showContent();
      setCollapsed(false);
    } else {
      hideContent();
      setCollapsed(true);
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
