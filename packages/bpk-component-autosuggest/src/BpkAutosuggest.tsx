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
  FocusEvent,
} from 'react';
import { useCombobox } from 'downshift';
import type {
  UseComboboxState,
  UseComboboxStateChangeOptions,
} from 'downshift';

import ClearIconLg from '../../bpk-component-icon/lg/close-circle';
import { withButtonAlignment } from '../../bpk-component-icon';
import BpkInput, { INPUT_TYPES } from '../../bpk-component-input';
import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkAutosuggest.module.scss';

const getClassName = cssModules(STYLES);

const ClearButtonIcon = withButtonAlignment(ClearIconLg);

type BpkAutoSuggestTheme = {
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

type BpkAutoSuggestProps<T> = {
  ariaLabel: string;
  ariaLabelClear: string;
  getSuggestionValue: (suggestion: T) => string;
  id: string;
  inputProps: HTMLProps<HTMLInputElement>;
  onSuggestionsClearRequested: () => void;
  onSuggestionSelected: (data?: { inputValue: string; suggestion?: T }) => void;
  onSuggestionsFetchRequested: (value: string) => void;
  renderSuggestion: (suggestion: T) => ReactElement;
  suggestions: T[];
  defaultValue?: string;
  enterKeyHint?: string;
  getA11yResultsMessage?: (resultCount: number) => string;
  isBanana?: boolean;
  isDesktop?: boolean;
  onClick?: () => void;
  onLoad?: (inputValue: string) => void;
  renderBesideInput?: () => ReactElement;
  showClear?: boolean;
  theme?: Partial<BpkAutoSuggestTheme>;
  highlightFirstSuggestion?: boolean;
  shouldRenderSuggestions?: (value?: string) => boolean;
  multiSection: boolean;
  getSectionSuggestions: (section: T) => T[];
  renderSectionTitle: (section: T) => ReactElement;
};

const BpkAutosuggest = forwardRef<HTMLInputElement, BpkAutoSuggestProps<any>>(
  (
    {
      ariaLabel,
      ariaLabelClear,
      defaultValue,
      enterKeyHint,
      getA11yResultsMessage,
      getSectionSuggestions,
      getSuggestionValue,
      highlightFirstSuggestion,
      id,
      inputProps,
      isBanana,
      isDesktop,
      multiSection,
      onClick,
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
    },
    forwardedRef,
  ) => {
    const defaultTheme = {
      container: getClassName('bpk-autosuggest__container'),
      containerOpen: getClassName('bpk-autosuggest__container--open'),
      suggestionsContainer: getClassName(
        'bpk-autosuggest__suggestions-container',
      ),
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
      clearButton: getClassName('bpk-autosuggest__banana-clear-button'),
    };

    const theme = { ...defaultTheme, ...customTheme };

    function stateReducer(
      state: UseComboboxState<any>,
      actionAndChanges: UseComboboxStateChangeOptions<any>,
    ) {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useCombobox.stateChangeTypes.InputFocus:
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
          onSuggestionSelected({
            suggestion: changes.selectedItem,
            inputValue,
          });
        }
      },
      getA11yStatusMessage({ resultCount }) {
        return getA11yResultsMessage?.(resultCount) ?? '';
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
      if (isBanana && !isDesktop) {
        onLoad?.(inputValue);
      }
      // fire track event on load and forget about it after. We don't want to track again when anything (inputValue) changes
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onClickOrKeydown = () => {
      if (
        !isOpen &&
        (typeof shouldRenderSuggestions !== 'function' ||
          shouldRenderSuggestions(inputValue))
      ) {
        onSuggestionsFetchRequested(inputValue);
        openMenu();
      } else {
        onClick?.();
      }

      // Desktop destination autosuggest lives on the homepage and is "loaded/interacted with" via clicking on it
      // Every other use case is within a new screen or modal so is interacted with via the user navigating into the modal/new screen
      if (isBanana && isDesktop) {
        onLoad?.(inputValue);
      }
    };

    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key !== 'Enter') {
        return;
      }

      if (e.key === 'Enter' && suggestions.length) {
        onSuggestionSelected({ suggestion: suggestions[0], inputValue });
      }

      if (defaultValue) {
        onClickOrKeydown();
      } else if (suggestions.length === 0) {
        onSuggestionSelected();
      }
    };

    const handleInputFocus = (event: FocusEvent<HTMLInputElement>) => {
      if (
        typeof shouldRenderSuggestions !== 'function' ||
        shouldRenderSuggestions(inputValue)
      ) {
        onSuggestionsFetchRequested(inputValue);
        openMenu();
      }

      inputProps.onFocus?.(event);
    };

    const clearSuggestions = (e: MouseEvent) => {
      onSuggestionsClearRequested();
      e.stopPropagation();
      setInputValue('');
    };

    const renderSuggestions = (items: any[]) =>
      items.map((suggestion, index) => (
        <li
          key={Object.values(suggestion)[0]}
          {...getItemProps({ item: suggestion, index })}
          className={getClassName(
            theme.suggestion,
            highlightedIndex === index && theme.suggestionHighlighted,
            highlightFirstSuggestion &&
              index === 0 &&
              highlightedIndex === -1 &&
              theme.suggestionHighlighted,
          )}
        >
          {renderSuggestion(suggestion)}
        </li>
      ));

    const renderSections = (section: any) => (
      <section key={section.title}>
        <div className={theme.sectionTitle}>{renderSectionTitle(section)}</div>
        {renderSuggestions(section.suggestions)}
      </section>
    );

    return (
      <div
        className={getClassName(
          theme.container,
          suggestions.length && theme.containerOpen,
        )}
      >
        {isBanana ? (
          <label
            {...getLabelProps({ 'aria-label': ariaLabel })}
            className={getClassName(theme.label, theme.desktopLabel)}
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
                  enterKeyHint={enterKeyHint}
                />
              </div>
            </div>
            {inputValue.length > 0 && showClear && (
              <div tabIndex={-1}>
                <button
                  type="button"
                  title={ariaLabelClear}
                  onClick={clearSuggestions}
                  aria-label={ariaLabelClear}
                  className={theme.clearButton}
                  data-testid="clear button"
                >
                  <ClearButtonIcon />
                </button>
              </div>
            )}
          </label>
        ) : (
          <BpkInput
            {...getInputProps({
              onKeyDown,
              onFocus: handleInputFocus,
              ref: forwardedRef,
              type: INPUT_TYPES.text,
              onClick: onClickOrKeydown,
              ...inputProps,
            })}
          />
        )}

        <div
          className={getClassName(
            theme.suggestionsContainer,
            theme.desktopSuggestionsContainer,
            multiSection && theme.sectionContainer,
            isOpen && theme.suggestionsContainerOpen,
          )}
        >
          <ul
            {...getMenuProps()}
            className={getClassName(
              theme.suggestionsList,
              theme.desktopSuggestionsList,
            )}
          >
            {isOpen && multiSection
              ? suggestions.map((suggestion) => renderSections(suggestion))
              : renderSuggestions(suggestions)}
          </ul>
        </div>
      </div>
    );
  },
);

export default BpkAutosuggest;
