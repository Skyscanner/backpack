import type { ChipStyleType } from './BpkChipGroup';
import { MutableRefObject } from 'react';
type Props = {
    chipStyle: ChipStyleType;
    scrollContainerRef: MutableRefObject<HTMLElement | null>;
    leading?: boolean;
};
declare const Nudger: ({ chipStyle, leading, scrollContainerRef }: Props) => JSX.Element;
export default Nudger;
