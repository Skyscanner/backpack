import { createContext } from 'react';

interface BpkCardContext {
  /**
   * Indicates if the BpkCard should render elevated from the page or not. Parent card types can specify `false` when they handle elevation internally, rather than BpkCard.
   * BpkCard will render elevated by default.
   */
  elevated: boolean;
}

const defaultContext: BpkCardContext = {
  elevated: true,
};

/**
 * CardContext is an internal context to be used only within Backpack parent Card types (time of writing BpkDividedCard & BpkCardWrapper).
 * It facillitates the BpkCard to render appropriately when wrapped and/or is rendered indirectly from a parent.
 */
// eslint-disable-next-line import/prefer-default-export
export const CardContext = createContext(defaultContext);
