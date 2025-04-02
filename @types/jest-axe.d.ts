declare module 'jest-axe' {
    import { AxeResults, RunOptions } from 'axe-core';
  
    export function axe(
      html: string | HTMLElement,
      options?: RunOptions,
    ): Promise<AxeResults>;
  
    export function toHaveNoViolations(): void;
  }