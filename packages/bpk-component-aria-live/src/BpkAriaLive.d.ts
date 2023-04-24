import type { ReactElement } from 'react';

export declare const POLITENESS_SETTINGS: {
  readonly off: 'off';
  readonly polite: 'polite';
  readonly assertive: 'assertive';
};
export type PolitenessSetting =
  typeof POLITENESS_SETTINGS[keyof typeof POLITENESS_SETTINGS];
export type Props = {
  children: ReactElement | string;
  politenessSetting?: PolitenessSetting;
  visible?: boolean;
  className?: string | null;
  [rest: string]: any;
};
declare const BpkAriaLive: ({
  className,
  politenessSetting,
  visible,
  ...rest
}: Props) => JSX.Element;
export default BpkAriaLive;
