import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkCarouselSlidesIndicator.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  length: number;
  activeIndex: number;
};

const BpkSCarousellidesIndicator = ({ activeIndex, length }: Props) => {
  if (length < 2) return null;

  // scroll starting from 3 dot until last 5, unless there are less than 5
  const activeDotIndex = Math.min(Math.max(0, activeIndex - 2), Math.max(0, length - 5));

  return (
    <div className={getClassName('bpk-carousel-slides-indicator')}>
      <div
        className={getClassName('bpk-carousel-slides-indicator__row')}
        style={
          {
            '--scroll-index': activeDotIndex,
          } as React.CSSProperties
        }
      >
        {Array.from({ length }).map((_, index) => (
          <div
            className={getClassName(`${getClassName('bpk-carousel-slides-indicator__dot')} ${index === activeIndex - 1 || index === activeIndex + 1 ? getClassName('bpk-carousel-slides-indicator__siblingToActive') : ''} ${index === activeIndex ? getClassName('bpk-carousel-slides-indicator__active') : ''}`)}

            // eslint-disable-next-line react/no-array-index-key
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default BpkSCarousellidesIndicator;
