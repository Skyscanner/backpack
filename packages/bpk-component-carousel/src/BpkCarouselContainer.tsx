import type { MutableRefObject, ReactNode } from 'react';
import { memo, useState } from 'react';

import { cssModules } from '../../bpk-react-utils';

import { useIntersectionObserver } from './utils';
import STYLES from './BpkCarouselContainer.module.scss';
import BpkCarouselImage from './BpkCarouselImage';
import type { OnImageChangedHandler } from './types';

const getClassName = cssModules(STYLES);

type Props = {
  images: ReactNode[];
  onVisible: (visibleIndex: number) => void;
  imagesRef: MutableRefObject<Array<HTMLElement | null>>;
  onImageChanged: OnImageChangedHandler
};

const BpkScrollContainer = memo(({ images, imagesRef, onImageChanged, onVisible }: Props) => {
  const [root, setRoot] = useState<HTMLElement | null>(null);
  const observeImageChange = useIntersectionObserver(onVisible, {
    root,
    threshold: 0.5,
  }, onImageChanged);
  const observeCycleScroll = useIntersectionObserver(
    (index) => {
      const imageElement = imagesRef.current && imagesRef.current[index];
      if (imageElement) {
        imageElement.scrollIntoView({
          block: 'nearest',
          inline: 'start',
        });
      }
    },
    { root, threshold: 1 },
  );

  if (images.length === 1) {
    return (
      <div className={getClassName('bpk-carousel-container')} role="list" data-testid="image-gallery-scroll-container">
        <BpkCarouselImage image={images[0]} index={0} />
      </div>
    );
  }

  return (
    <div
      className={getClassName('bpk-carousel-container')}
      ref={setRoot}
      data-testid="image-gallery-scroll-container"
      role="list"
    >
      <BpkCarouselImage
        image={images[images.length - 1]}
        index={images.length - 1}
        ref={(el) => {
          observeCycleScroll(el);
          observeImageChange(el);
        }}
      />
      {images.map((image, index) => (
        <BpkCarouselImage
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          image={image}
          index={index}
          ref={(el) => {
            // eslint-disable-next-line no-param-reassign
            imagesRef.current[index] = el;
            observeImageChange(el);
          }}
        />
      ))}
      <BpkCarouselImage
        image={images[0]}
        index={0}
        ref={(el) => {
          observeCycleScroll(el);
          observeImageChange(el);
        }}
      />
    </div>
  );
});

export default BpkScrollContainer;
