import { useRef, useState } from 'react';


import { useScrollToInitialImage } from './utils';
import BpkCarouselContainer from './BpkCarouselContainer';
import BpkSlidesIndicator from './BpkCarouselSlidesIndicator';
import type { Props } from './types';

const BpkCarousel = ({
  images,
  initialImageIndex = 0,
  onImageChanged = null
}: Props) => {
  const [shownImageIndex, updateShownImageIndex] = useState(initialImageIndex);
  const imagesRef = useRef<Array<HTMLElement | null>>([]);

  useScrollToInitialImage(initialImageIndex, imagesRef);

  return (
    <>
        <BpkCarouselContainer
          images={images}
          onVisible={updateShownImageIndex}
          imagesRef={imagesRef}
          onImageChanged={onImageChanged}
        />
      <BpkSlidesIndicator
        length={images.length}
        activeIndex={shownImageIndex}
      />
      </>
  );
};

export default BpkCarousel;
