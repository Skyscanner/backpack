import type { ReactNode, SyntheticEvent } from 'react';

export declare const BUTTON_TYPES: {
  readonly primary: 'primary';
  readonly primaryOnDark: 'primary-on-dark';
  readonly primaryOnLight: 'primary-on-light';
  readonly secondary: 'secondary';
  readonly secondaryOnDark: 'secondary-on-dark';
  readonly destructive: 'destructive';
  readonly featured: 'featured';
  readonly link: 'link';
  readonly linkOnDark: 'link-on-dark';
};
export declare const SIZE_TYPES: {
  readonly small: 'small';
  readonly large: 'large';
};
export type ButtonType = typeof BUTTON_TYPES[keyof typeof BUTTON_TYPES];
export type SizeType = typeof SIZE_TYPES[keyof typeof SIZE_TYPES];
export type Props = {
  children: string | ReactNode;
  type?: ButtonType;
  size?: SizeType;
  className?: string | null;
  disabled?: boolean;
  iconOnly?: boolean;
  onClick?: (event: SyntheticEvent) => void;
  rel?: string | undefined;
  submit?: boolean;
  href?: string | null;
  blank?: boolean;
  [rest: string]: any;
};
