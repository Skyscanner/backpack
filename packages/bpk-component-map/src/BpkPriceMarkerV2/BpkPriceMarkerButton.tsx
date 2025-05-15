import type { ReactNode } from 'react';

import BpkText, { TEXT_STYLES } from '../../../bpk-component-text';
import { cssModules } from '../../../bpk-react-utils';

import type { Status } from './BpkPriceMarker';

import STYLES from './BpkPriceMarkerButton.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  label: string;
  icon?: ReactNode;
  className?: string;
  onClick?: (event: MouseEvent) => void;
  buttonProps?: { [key: string]: string };
  status?: Status;
};

const BpkPriceMarkerButton = ({
  buttonProps = {},
  className = '',
  icon,
  label,
  onClick,
  status,
}: Props) => {
  const markerWrapperClassNames = getClassName('bpk-price-marker__wrapper');

  const actualClassName = getClassName(
    'bpk-price-marker',
    onClick && 'bpk-price-marker--dynamic',
    `bpk-price-marker-${status}`,
    icon && `bpk-price-marker-${status}--icon`,
    className,
  );
  return (
    <button
      type="button"
      className={markerWrapperClassNames}
      // @ts-expect-error Type '((event: MouseEvent) => void) | undefined' is not assignable to type 'MouseEventHandler<HTMLButtonElement> | undefined'
      onClick={onClick}
      {...buttonProps}
    >
      <div className={actualClassName}>
        {icon}
        <BpkText textStyle={TEXT_STYLES.label3}>{label}</BpkText>
      </div>
    </button>
  );
};

export default BpkPriceMarkerButton;
