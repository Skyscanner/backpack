
import { ReactNode } from 'react';
import type {Props as DialogWrapperProps} from './BpkDialogWrapper';
export type Props = Partial<DialogWrapperProps> & {
  ariaLabelledby: string;
  children: ReactNode;
  closeOnEscPressed?: boolean;
  closeOnScrimClick?: boolean;
  dialogClassName?: string;
  id: string | undefined;
  isOpen: boolean;
  onClose: (
    arg0?: Event | KeyboardEvent | MouseEvent | PointerEvent,
    arg1?: {
      source: 'ESCAPE' | 'DOCUMENT_CLICK';
    },
  ) => void | null;
  exiting?: boolean;
  transitionClassNames?: {
    appear?: string,
    appearActive?: string,
    exit?: string
  };
  timeout?: {appear?: number, exit?: number};
}

declare const BpkDialogWrapper: ({ariaLabelledby, children, closeOnEscPressed, closeOnScrimClick, dialogClassName, id, isOpen, onClose, exiting, transitionClassNames, timeout}: Props) => JSX.Element;
export default BpkDialogWrapper;
