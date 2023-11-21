import type { MouseEvent } from 'react';

import BpkPageIndicator from '../../bpk-component-page-indicator';
import BpkButtonV2 from '../../bpk-component-button/src/BpkButtonV2/BpkButton';

import BpkExpand from './BpkExpand';

export type BpkAccessoryTypes = 'expand' | 'button' | 'pagination';

type Props = {
  accessory: BpkAccessoryTypes;
  currentIndex: number;
  hideContent: () => void;
  setCurrentIndex: (index: number) => void;
  showContent: () => void;
  totalIndicators: number;
};
const BpkAccessory = ({
  accessory,
  currentIndex,
  hideContent,
  setCurrentIndex,
  showContent,
  totalIndicators,
}: Props) => {
  if (accessory === 'expand') {
    // {<BpkAccessory type={accessory} showAllCards={showCards} />
    return <BpkExpand showContent={showContent} hideContent={hideContent} />;
  }
  if (accessory === 'pagination') {
    return (
      <BpkPageIndicator
        currentIndex={currentIndex}
        totalIndicators={totalIndicators}
        indicatorLabel=""
        prevNabLabel=""
        nextNavLabel=""
        showNav
        onClick={(
          e: MouseEvent<HTMLButtonElement>,
          newIndex: number,
          direction: string,
        ) => {
          setCurrentIndex(newIndex);
        }}
      />
    );
  }
  if (accessory === 'button') {
    return <BpkButtonV2>Action</BpkButtonV2>;
  }
  return null;
};

export default BpkAccessory;
