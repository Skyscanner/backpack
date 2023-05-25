import type { ReactNode } from 'react';

export type Props = {
  id: string | undefined;
  ariaLabelledby: string;
  children: ReactNode;
  closeLabel: string;
  fullScreenOnDesktop?: boolean;
  isOpen: boolean;
  noFullScreenOnMobile?: boolean;
  onClose: () => void | null;
  padded?: boolean;
  title?: string | null;
  wide?: boolean;
};
export declare const BpkModalV2: (props: Props) => JSX.Element | null;
