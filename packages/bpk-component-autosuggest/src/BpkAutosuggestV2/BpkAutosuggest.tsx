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

import { useEffect, forwardRef } from 'react';
import type {
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  HTMLProps,
} from 'react';

import { useCombobox } from 'downshift';

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
  suggestionsList?: string;
  suggestion?: string;
  suggestionHighlighted?: string;
  sectionContainer?: string;
  sectionTitle?: string;
  clearButton?: string;
  label?: string;
  desktopLabel?: string;
  input?: string;
  inputWrapper?: string;
  inputTextWrapper?: string;
  desktopSuggestionsContainer?: string;
  desktopSuggestionsList?: string;
};

export type BpkAutoSuggestProps<T> = {
  ariaLabels: {
    resultsList: string;
    label?: string;
    clearButton?: string;
  };
  getSuggestionValue: (suggestion: T) => string;
  id: string;
  inputProps: HTMLProps<HTMLInputElement>;
  onSuggestionsClearRequested: () => void;
  onSuggestionSelected?: (data?: {
    inputValue: string;
    suggestion?: T;
  }) => void;
  onSuggestionsFetchRequested: (value: string) => void;
  renderSuggestion: (suggestion: T) => ReactElement;
  suggestions: T[];
  getA11yResultsMessage: (resultCount: number) => string;
  defaultValue?: string;
  withLabel?: boolean;
  isDesktop?: boolean;
  onClick?: () => void;
  onLoad?: (inputValue: string) => void;
  renderBesideInput?: () => ReactElement;
  showClear?: boolean;
  theme?: Partial<BpkAutoSuggestTheme>;
  highlightFirstSuggestion?: boolean;
  shouldRenderSuggestions?: (value?: string) => boolean;
  multiSection?: boolean;
  getSectionSuggestions?: (section: T) => T[];
  renderSectionTitle?: (section: T) => ReactElement;
  alwaysRenderSuggestions?: boolean;
  onInputValueChange?: (input: { method: string; newValue: string }) => void;
  renderInputComponent?: (inputProps: HTMLProps<HTMLInputElement>) => ReactElement;
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
      isDesktop,
      multiSection,
      onClick,
      onInputValueChange,
      onLoad,
      onSuggestionSelected,
      onSuggestionsClearRequested,
      onSuggestionsFetchRequested,
      renderBesideInput,
      renderSectionTitle,
      renderSuggestion,
      shouldRenderSuggestions,
      showClear,
      suggestions,
      theme: customTheme,
      withLabel,
    },
    forwardedRef,
  ) => {
    const theme = { ...defaultTheme, ...customTheme };

    function stateReducer(
      state: UseComboboxState<any>,
      actionAndChanges: UseComboboxStateChangeOptions<any>,
    ) {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useCombobox.stateChangeTypes.InputClick:
          return {
            ...changes,
            isOpen: false, // keep the menu closed when input gets focused.
          };
        default:
          return changes;
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

    useEffect(() => {
      if (defaultValue) {
        setInputValue(defaultValue);
      }
    }, [defaultValue, setInputValue]);

    useEffect(() => {
      if (!isDesktop) {
        onLoad?.(inputValue);
      }
      // fire track event on load and forget about it after. We don't want to track again when anything (inputValue) changes
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClickOrKeydown = () => {
      if (shouldRenderSuggestions) {
        shouldRenderSuggestions(inputValue);
        openMenu();
      }

      if (!isOpen && inputValue.length) {
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

    const clearSuggestions = (e: MouseEvent) => {
      onSuggestionsClearRequested();
      e.stopPropagation();
      setInputValue('');
    };

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

    return (
      <div
        className={getClassName(
          theme.container,
          suggestions.length && theme.containerOpen,
        )}
      >
        {withLabel ? (
          <label
            {...getLabelProps({ 'aria-label': ariaLabels.label })}
            className={getClassName(
              theme.label,
              isDesktop && theme.desktopLabel,
            )}
          >
            <div className={theme.inputTextWrapper}>
              {renderBesideInput?.()}
              <div className={theme.inputWrapper}>
                <input
                  {...getInputProps({
                    className: theme.input,
                    onKeyDown,
                    ref: forwardedRef,
                    type: INPUT_TYPES.text,
                    onClick: onClickOrKeydown,
                    ...inputProps,
                  })}
                  enterKeyHint='search'
                />
              </div>
            </div>
            {inputValue.length > 0 && showClear && (
              <div tabIndex={-1}>
                <button
                  type="button"
                  title={ariaLabels.clearButton}
                  onClick={clearSuggestions}
                  aria-label={ariaLabels.clearButton}
                  className={theme.clearButton}
                  data-testid="clear button"
                >
                  X
                </button>
              </div>
            )}
          </label>
        ) : (
          <div className={theme.inputTextWrapper}>
            {renderBesideInput?.()}
            <div className={theme.inputWrapper}>
              <input
                {...getInputProps({
                  className: theme.input,
                  onKeyDown,
                  ref: forwardedRef,
                  type: INPUT_TYPES.text,
                  onClick: onClickOrKeydown,
                  ...inputProps,
               })}
              enterKeyHint='search'
            />
          </div>
        </div>
        )}

        <div
          className={getClassName(
            theme.suggestionsContainer,
            isDesktop && theme.desktopSuggestionsContainer,
            multiSection && theme.sectionContainer,
            showSuggestions && theme.suggestionsContainerOpen,
          )}
        >
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
      </div>
    );
  },
);

BpkAutosuggest.defaultProps = {
  theme: defaultTheme,
};

export default BpkAutosuggest;
