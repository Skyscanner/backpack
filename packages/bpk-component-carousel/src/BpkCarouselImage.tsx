import type { ReactNode } from "react";
import { forwardRef } from "react";

import { cssModules } from "../../bpk-react-utils";

import STYLES from "./BpkCarouselImage.module.scss"

const getClassName = cssModules(STYLES);

type ImageProps = {
  image: ReactNode;
  index: number;
};
const BpkCarouselImage = forwardRef<HTMLDivElement, ImageProps>(({ image, index }, ref) => (
  <div
    className={getClassName('bpk-carousel-image')}
    key={index}
    data-index={index}
    ref={ref}
    role="listitem"
  >
    {image}
  </div>
));

export default BpkCarouselImage

