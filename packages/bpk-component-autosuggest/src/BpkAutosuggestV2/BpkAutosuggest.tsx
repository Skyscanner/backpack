/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useEffect, forwardRef, useRef } from 'react';
import type { KeyboardEvent, ReactElement, HTMLProps } from 'react';

import {
  useFloating,
  offset,
  flip,
  shift,
  size,
  arrow as floatingArrow,
  FloatingArrow,
  autoUpdate,
  FloatingPortal,
} from '@floating-ui/react';
import { useCombobox } from 'downshift';

import { surfaceHighlightDay } from '@skyscanner/bpk-foundations-web/tokens/base.es6';


import { INPUT_TYPES } from '../../../bpk-component-input';
import { cssModules } from '../../../bpk-react-utils';

import type {
  UseComboboxState,
  UseComboboxStateChangeOptions,
} from 'downshift';

import STYLES from './BpkAutosuggest.module.scss';

const getClassName = cssModules(STYLES);

export type BpkAutoSuggestTheme = {
  container?: string;
  containerOpen?: string;
  suggestionsContainer?: string;
  suggestionsContainerOpen?: string;
  suggestionsList?: string;
  suggestion?: string;
  suggestionHighlighted?: string;
  sectionContainer?: string;
  sectionTitle?: string;
  // add extra theme from fsc
  desktopSuggestionsContainer?: string;
  desktopSuggestionsList?: string;
};

export type BpkAutoSuggestProps<T> = {
  suggestions: T[];
  ariaLabels: {
    resultsList: string;
    label?: string;
    clearButton?: string;
  };
  getSuggestionValue: (suggestion: T) => string;
  inputProps: HTMLProps<HTMLInputElement>;
  onSuggestionSelected?: (data?: {
    inputValue: string;
    suggestion?: T;
  }) => void;
  onSuggestionsFetchRequested: (value: string) => void;
  onSuggestionsClearRequested: () => void;
  renderSuggestion: (suggestion: T) => ReactElement;
  id: string;
  // enterKeyHint?: string;
  getA11yResultsMessage: (resultCount: number) => string;
  defaultValue?: string;
  isDesktop?: boolean;
  // isDestination?: boolean;
  onLoad?: (inputValue: string) => void;
  onClick?: () => void;
  // renderBesideInput?: () => ReactElement;
  // showClear?: boolean;
  // isSwapButton?: boolean;
  theme?: Partial<BpkAutoSuggestTheme>;
  highlightFirstSuggestion?: boolean;
  shouldRenderSuggestions?: (value?: string) => boolean;
  multiSection?: boolean;
  getSectionSuggestions?: (section: T) => T[];
  renderSectionTitle?: (section: T) => ReactElement;
  alwaysRenderSuggestions?: boolean;
  onInputValueChange?: (input: { method: string; newValue: string }) => void;
  renderInputComponent?: (
    inputProps: HTMLProps<HTMLInputElement>,
  ) => ReactElement;
};

const defaultTheme = {
  container: getClassName('bpk-autosuggest__container'),
  containerOpen: getClassName('bpk-autosuggest__container--open'),
  suggestionsContainer: getClassName('bpk-autosuggest__suggestions-container'),
  suggestionsContainerOpen: getClassName(
    'bpk-autosuggest__suggestions-container--open',
  ),
  suggestionsList: getClassName('bpk-autosuggest__suggestions-list'),
  suggestion: getClassName('bpk-autosuggest__suggestion-item'),
  suggestionHighlighted: getClassName(
    'bpk-autosuggest__suggestion-item--highlighted',
  ),
  sectionContainer: getClassName('bpk-autosuggest__section-container'),
  sectionTitle: getClassName('bpk-autosuggest__section-title'),
  input: getClassName('bpk-autosuggest__suggestions-container-input'),
};

const strokeWidth = 0.0625;

const BpkAutosuggest = forwardRef<HTMLInputElement, BpkAutoSuggestProps<any>>(
  (
    {
      alwaysRenderSuggestions,
      ariaLabels,
      defaultValue,
      getA11yResultsMessage,
      getSectionSuggestions,
      getSuggestionValue,
      highlightFirstSuggestion,
      id,
      inputProps,
      isDesktop = true,
      multiSection,
      onClick,
      onInputValueChange,
      onLoad,
      onSuggestionSelected,
      onSuggestionsClearRequested,
      onSuggestionsFetchRequested,
      renderInputComponent,
      renderSectionTitle,
      renderSuggestion,
      shouldRenderSuggestions,
      suggestions,
      theme: customTheme = {},

    },
    forwardedRef,
  ) => {
    const theme = { ...defaultTheme, ...customTheme };
    const arrowRef = useRef(null);

    function stateReducer(
      state: UseComboboxState<any>,
      actionAndChanges: UseComboboxStateChangeOptions<any>,
    ) {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useCombobox.stateChangeTypes.InputClick:
          return {
            ...changes,
            isOpen: !isDesktop, // keep the menu closed when input gets focused.
          };
        default: {
          const forceOpen = !isDesktop && !!changes.inputValue;
          return {
            ...changes,
            isOpen: forceOpen ? true : changes.isOpen,
          };
        }
      }
    }
    const {
      getInputProps,
      getItemProps,
      getLabelProps,
      getMenuProps,
      highlightedIndex,
      inputValue,
      isOpen,
      openMenu,
      setInputValue,
    } = useCombobox({
      stateReducer,
      items: suggestions,
      itemToString(suggestion: any | null) {
        return suggestion ? getSuggestionValue(suggestion) : '';
      },
      async onInputValueChange(changes) {
        onInputValueChange?.({
          method: changes.type,
          newValue: changes.inputValue ?? '',
        });

        if (changes.inputValue?.length) {
          if (changes.isOpen) {
            onSuggestionsFetchRequested(changes.inputValue);
          }
        } else if (suggestions.length) {
          onSuggestionsClearRequested();
        }
      },
      onSelectedItemChange(changes) {
        if (changes.selectedItem) {
          setInputValue(getSuggestionValue(changes.selectedItem));
          onSuggestionSelected?.({
            suggestion: changes.selectedItem,
            inputValue,
          });
        }
      },
      getA11yStatusMessage() {
        return getA11yResultsMessage(suggestions.length) ?? '';
      },
      initialInputValue: defaultValue ?? '',
      id,
    });

    const { context, floatingStyles, refs } =
      useFloating({
        placement: 'bottom-start',
        middleware: [
          offset(17),
          flip(),
          shift(),
          size({
            apply({ elements, rects }) {
              Object.assign(elements.floating.style, {
                width: `${rects.reference.width}px`,
              });
            },
          }),
          floatingArrow({ element: arrowRef }),
        ],
        whileElementsMounted: autoUpdate,
      });

    useEffect(() => {
      if (defaultValue) {
        setInputValue(defaultValue);
      } else {
        setInputValue('');
      }
    }, [defaultValue, setInputValue]);

    useEffect(() => {
      if (!isDesktop) {
        onLoad?.(inputValue);
      }
      const shouldRenderResultsOnInitialLoad = !!inputValue;
      if (shouldRenderResultsOnInitialLoad) {
        onSuggestionsFetchRequested(inputValue);
      }
      // fire track event on load and forget about it after. We don't want to track again when anything (inputValue) changes
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClickOrKeydown = () => {
      if (shouldRenderSuggestions) {
        shouldRenderSuggestions(inputValue);
        openMenu();
      }

      if ( !isOpen && inputValue.length) {
        onSuggestionsFetchRequested(inputValue);
        openMenu();
      } else {
        onClick?.();
      }

      // Desktop destination autosuggest lives on the homepage and is "loaded/interacted with" via clicking on it
      // Every other use case is within a new screen or modal so is interacted with via the user navigating into the modal/new screen
      if (isDesktop) {
        onLoad?.(inputValue);
      }
    };

    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key !== 'Enter') {
        return;
      }

      if (e.key === 'Enter' && suggestions.length) {
        onSuggestionSelected?.({ suggestion: suggestions[0], inputValue });
      }

      if (defaultValue) {
        onClickOrKeydown();
      } else if (suggestions.length === 0) {
        onSuggestionSelected?.();
      }
    };

    // const clearSuggestions = (e: MouseEvent) => {
    //   e.stopPropagation();
    //   setInputValue('');
    // };

    // Render suggestions function to render single section suggestion
    const renderSuggestions = (items: any[], sectionIndex?: number) =>
      items.map((suggestion, index) => {
        const suggestionIndex = sectionIndex ? index + sectionIndex : index;
        const isFirstSuggestion = sectionIndex
          ? sectionIndex === 0 && index === 0
          : index === 0;

        const key = index * 1000;

        return (
          <li
            key={key}
            {...getItemProps({ item: suggestion, index: suggestionIndex })}
            className={getClassName(
              theme.suggestion,
              highlightedIndex === suggestionIndex &&
                theme.suggestionHighlighted,
              highlightFirstSuggestion &&
                isFirstSuggestion &&
                highlightedIndex === -1 &&
                theme.suggestionHighlighted,
            )}
          >
            {renderSuggestion(suggestion)}
          </li>
        );
      });


    // renderSections function to render multi-section suggestions
    const renderSections = (sections: any[]) =>
      sections.map((section, index) => (
        <section key={section.title}>
          <div className={theme.sectionTitle}>
            {renderSectionTitle?.(section)}
          </div>
          {renderSuggestions(getSectionSuggestions?.(section)!, index)}
        </section>
      ));

    const showSuggestions = alwaysRenderSuggestions ? true : isOpen;

    const renderList = () =>
      multiSection
        ? renderSections(suggestions)
        : renderSuggestions(suggestions);

    // Render the input component
    const renderInput = () => {
      const refObj = forwardedRef as React.MutableRefObject<HTMLInputElement | null>;
      const inputComponentProps = getInputProps({
        className: theme.input,
        onKeyDown,
        ref: (node: HTMLInputElement) => {
          refs.setReference(node);
          if (typeof forwardedRef === 'function') {
            forwardedRef(node);
          } else if (refObj) {
            refObj.current = node;
          }
        },
        type: INPUT_TYPES.text,
        onClick: onClickOrKeydown,
        ...inputProps,
      });

      return renderInputComponent ? (
        renderInputComponent(inputComponentProps)
      ) : (
        <input {...inputComponentProps} enterKeyHint="search" />
      );
    };

    return (
      <div
        className={getClassName(
          theme.container,
          suggestions.length && theme.containerOpen,
        )}
      >
        {renderInput()}

        {showSuggestions && (
          <FloatingPortal>
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              className={getClassName(
                theme.suggestionsContainer,
                isDesktop && theme.desktopSuggestionsContainer,
                multiSection && theme.sectionContainer,
                showSuggestions && theme.suggestionsContainerOpen,
              )}
            >
              <FloatingArrow
                ref={arrowRef}
                context={context}
                className={getClassName('bpk-autosuggest__arrow')}
                role="presentation"
                stroke={surfaceHighlightDay}
                strokeWidth={strokeWidth}
              />
              <ul
                {...getMenuProps({ 'aria-label': ariaLabels.resultsList })}
                className={getClassName(
                  theme.suggestionsList,
                  isDesktop && theme.desktopSuggestionsList,
                )}
              >
                {showSuggestions && renderList()}
              </ul>
            </div>
          </FloatingPortal>
        )}
      </div>
    );
  },
);

export default BpkAutosuggest;
