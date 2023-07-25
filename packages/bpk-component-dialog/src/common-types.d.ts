import type { ReactNode } from 'react';
export declare const HEADER_ICON_TYPES: {
    readonly primary: "primary";
    readonly warning: "warning";
    readonly destructive: "destructive";
};
export type DialogInnerProps = {
    ariaLabel: string;
    id: string;
    children: ReactNode;
    dialogRef: (ref: HTMLElement | null | undefined) => void;
    getApplicationElement: () => HTMLElement | null;
    className?: string;
    contentClassName?: string;
    flare?: boolean;
    flareClassName?: string;
};
export type Props = Omit<DialogInnerProps, 'dialogRef'> & {
    dialogRef?: (ref: HTMLElement | null | undefined) => void;
    isOpen: boolean;
    renderTarget?: () => HTMLElement | null;
    onClose: (event?: TouchEvent | MouseEvent | KeyboardEvent) => void | null;
    closeLabel?: string;
    dismissible?: boolean;
    headerIcon?: ReactNode;
    headerIconType?: (typeof HEADER_ICON_TYPES)[keyof typeof HEADER_ICON_TYPES];
};
