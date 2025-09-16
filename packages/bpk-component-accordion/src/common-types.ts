
export const ACCORDION_TYPES = {
  default: 'default',
  surfaceDefault: 'surface-default',
  surfaceLowContrast: 'surface-low-contrast',
} as const;

export type AccordionType = (typeof ACCORDION_TYPES)[keyof typeof ACCORDION_TYPES];
