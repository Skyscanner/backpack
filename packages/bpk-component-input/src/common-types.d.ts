import type PropTypes from 'prop-types';
import type { SyntheticEvent } from 'react';

export declare const CLEAR_BUTTON_MODES: {
  readonly never: 'never';
  readonly whileEditing: 'whileEditing';
  readonly always: 'always';
};
export declare const INPUT_TYPES: {
  readonly text: 'text';
  readonly email: 'email';
  readonly number: 'number';
  readonly password: 'password';
  readonly tel: 'tel';
};
type BaseProps = {
  id: string;
  name: string;
  value: string;
  type?: typeof INPUT_TYPES[keyof typeof INPUT_TYPES];
  className?: string | null;
  valid?: boolean | null;
  large?: boolean;
  docked?: boolean;
  dockedFirst?: boolean;
  dockedMiddle?: boolean;
  dockedLast?: boolean;
  inputRef?: ((ref: HTMLInputElement) => void) | null;
  [rest: string]: any;
};
export type PropsWithoutClearButonMode = BaseProps & {
  clearButtonMode?: 'never';
  clearButtonLabel?: string | null;
  onClear?: ((e?: SyntheticEvent<HTMLButtonElement>) => void) | null;
};
export type PropsWithClearButtonMode = BaseProps & {
  clearButtonMode: typeof CLEAR_BUTTON_MODES[keyof Omit<
    typeof CLEAR_BUTTON_MODES,
    'never'
  >];
  clearButtonLabel: string;
  onClear: (e?: SyntheticEvent<HTMLButtonElement>) => void;
};
export type Props = PropsWithoutClearButonMode | PropsWithClearButtonMode;
export declare const clearablePropType: (
  props: Props,
  propName: string,
  componentName: string,
) => Error | null;
export declare const propTypes: {
  id: PropTypes.Validator<string>;
  name: PropTypes.Validator<string>;
  value: PropTypes.Validator<string>;
  type: PropTypes.Requireable<'number' | 'text' | 'email' | 'password' | 'tel'>;
  className: PropTypes.Requireable<string>;
  valid: PropTypes.Requireable<boolean>;
  large: PropTypes.Requireable<boolean>;
  docked: PropTypes.Requireable<boolean>;
  dockedFirst: PropTypes.Requireable<boolean>;
  dockedMiddle: PropTypes.Requireable<boolean>;
  dockedLast: PropTypes.Requireable<boolean>;
  inputRef: PropTypes.Requireable<(...args: any[]) => any>;
  clearButtonMode: PropTypes.Requireable<string>;
  clearButtonLabel: (
    props: Props,
    propName: string,
    componentName: string,
  ) => Error | null;
  onClear: (
    props: Props,
    propName: string,
    componentName: string,
  ) => Error | null;
};
export declare const defaultProps: {
  type: 'text';
  className: null;
  valid: null;
  large: boolean;
  docked: boolean;
  dockedFirst: boolean;
  dockedMiddle: boolean;
  dockedLast: boolean;
  inputRef: null;
  clearButtonMode: 'never';
  clearButtonLabel: null;
  onClear: null;
};
export {};
