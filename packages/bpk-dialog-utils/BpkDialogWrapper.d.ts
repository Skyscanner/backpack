
import { ReactNode } from 'react';
import type {Props as DialogWrapperProps} from './BpkDialogWrapper';
export type Props = Partial<DialogWrapperProps> & {
  ariaLabelledby: string;
  children: ReactNode;
  dialogClassName?: string;
  id: string | undefined;
  isOpen: boolean;
  onClose: () => void | null;
  exiting?: boolean;
  transitionClassNames?: {
    appear?: string,
    appearActive?: string,
    exit?: string
  };
  timeout?: {appear?: number, exit?: number};
}

declare const BpkDialogWrapper: ({ariaLabelledby, children, dialogClassName, id, isOpen, onClose, exiting, transitionClassNames, timeout}: Props) => JSX.Element;
export default BpkDialogWrapper;
