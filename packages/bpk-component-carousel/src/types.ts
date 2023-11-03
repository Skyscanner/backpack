import type { ReactNode } from "react";

export type OnImageChangedHandler = (() => void) | null | undefined;

export type Props = {
  images: ReactNode[]
  initialImageIndex?: number;
  onImageChanged?: OnImageChangedHandler
};
