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
import type {
  KeyboardEvent,
  ReactElement,
  HTMLProps,
  MutableRefObject,
  ReactNode,
  InputHTMLAttributes,
  Ref,
  SyntheticEvent,
} from 'react';

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

import BpkInput from '../../../bpk-component-input';
import { cssModules } from '../../../bpk-react-utils';

import {
  patchInputPropsLegacySupport,
  patchAutosuggestPropsLegacySupport,
} from './compat-utils';

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
  desktopSuggestionsContainer?: string;
  desktopSuggestionsList?: string;
  inputTextWrapper?: string;
  inputWrapper?: string;
  label?: string;
  visuallyHidden?: string;
};

export type EnterKeyHintType =
  | 'enter'
  | 'done'
  | 'go'
  | 'next'
  | 'previous'
  | 'search'
  | 'send';

export type BpkInputRenderProps = InputHTMLAttributes<HTMLInputElement> & {
  ref?: Ref<HTMLInputElement>;
};

export type BpkAutoSuggestProps<T> = {
  suggestions: T[];
  ariaLabels?: {
    resultsList?: string;
    label?: string;
    clearButton?: string;
    noResults?: string;
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
  enterKeyHint?: EnterKeyHintType;
  getA11yResultsMessage: (resultCount: number) => string;
  defaultValue?: string;
  isDesktop?: boolean;
  onLoad?: (inputValue: string) => void;
  onClick?: () => void;
  renderBesideInput?: () => ReactElement;
  showClear?: boolean;
  theme?: Partial<BpkAutoSuggestTheme>;
  highlightFirstSuggestion?: boolean;
  shouldRenderSuggestions?: (value?: string) => boolean;
  multiSection?: boolean;
  getSectionSuggestions?: (section: T) => T[];
  renderSectionTitle?: (section: T) => ReactElement | null;
  alwaysRenderSuggestions?: boolean;
  onInputValueChange?: (input: { method: string; newValue: string }) => void;
  renderInputComponent?: (inputProps: BpkInputRenderProps) => ReactElement;
  onSuggestionHighlighted?: (data: { suggestion: T | null }) => void;
  focusInputOnSuggestionClick?: boolean;
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
  input: getClassName('bpk-autosuggest__input'),
  visuallyHidden: getClassName('bpk-autosuggest__visuallyhidden'),
};

const strokeWidth = 0.0625;

const BpkAutosuggest = forwardRef<HTMLInputElement, BpkAutoSuggestProps<any>>(
  (
    {
      alwaysRenderSuggestions,
      ariaLabels,
      defaultValue,
      enterKeyHint,
      focusInputOnSuggestionClick = false,
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
      onSuggestionHighlighted,
      onSuggestionSelected,
      onSuggestionsClearRequested,
      onSuggestionsFetchRequested,
      renderBesideInput,
      renderInputComponent,
      renderSectionTitle,
      renderSuggestion,
      shouldRenderSuggestions,
      showClear = false,
      suggestions,
      theme: customTheme = {},
    },
    forwardedRef,
  ) => {
    const ariaDescribedByLabelId = `${id}-srOnly`;
    const theme = { ...defaultTheme, ...customTheme };
    const arrowRef = useRef(null);
    const previousHighlightedIndexRef = useRef<number | null>(null);
    const hasInteractedRef = useRef(false);
    const hasLoadedInitiallyRef = useRef(false);

    const suggestionsCount = suggestions.length;
    const hasSuggestions = suggestionsCount > 0;

    const {
      onInputValueChange: safeOnInputValueChange,
      onSuggestionSelected: safeOnSuggestionSelected,
    } = patchAutosuggestPropsLegacySupport({
      onSuggestionSelected,
      onInputValueChange,
    });

    const safeInputProps = patchInputPropsLegacySupport(inputProps, {
      getHighlightedSuggestion: () =>
        highlightedIndex != null && highlightedIndex >= 0
          ? (flattenedSuggestions?.[highlightedIndex] ?? null)
          : null,
    });

    function stateReducer(
      state: UseComboboxState<any>,
      actionAndChanges: UseComboboxStateChangeOptions<any>,
    ) {
      const { changes, type } = actionAndChanges;

      const shouldForceKeepOpen =
        alwaysRenderSuggestions &&
        state.inputValue &&
        state.inputValue.length > 0 &&
        hasSuggestions &&
        changes.isOpen === false;

      if (shouldForceKeepOpen) {
        return {
          ...changes,
          isOpen: true,
        };
      }
      switch (type) {
        case useCombobox.stateChangeTypes.InputClick:
          return {
            ...changes,
            isOpen: state.isOpen,
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

    const flattenedSuggestions = multiSection
      ? suggestions.flatMap((section) => getSectionSuggestions?.(section) ?? [])
      : suggestions;

    const legacyOnChangeHandler = (() => {
      const raw = inputProps.onChange;
      if (typeof raw === 'function' && raw.length >= 2) {
        return (newValue: string) => {
          const fn = raw as unknown as (
            e: Event,
            data: { newValue: string },
          ) => void;
          fn(new Event('input'), { newValue });
        };
      }
      return null;
    })();

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
      items: flattenedSuggestions,
      itemToString(suggestion) {
        return suggestion ? getSuggestionValue(suggestion) : '';
      },
      async onInputValueChange(changes) {
        const { inputValue: newInputValue, isOpen: newIsOpen, type } = changes;
        safeOnInputValueChange?.({
          method: type,
          newValue: newInputValue ?? '',
        });

        if (newInputValue?.length) {
          if (newIsOpen) {
            onSuggestionsFetchRequested(newInputValue);
          }
        } else if (suggestionsCount) {
          onSuggestionsClearRequested();
        }
      },
      onSelectedItemChange(changes) {
        const { selectedItem } = changes;
        const newValue = getSuggestionValue(selectedItem);
        if (selectedItem) {
          setInputValue(newValue);
          safeOnSuggestionSelected?.({
            suggestion: selectedItem,
            inputValue,
          });

          if (legacyOnChangeHandler) {
            legacyOnChangeHandler(newValue);
          }

          if (alwaysRenderSuggestions) {
            // Manually clear suggestions or hide menu
            onSuggestionsClearRequested();
          }
        }
      },
      getA11yStatusMessage() {
        return getA11yResultsMessage?.(suggestionsCount) ?? '';
      },
      initialInputValue: defaultValue ?? '',
      id,
    });

    const { context, floatingStyles, refs } = useFloating({
      placement: 'bottom-start',
      middleware: isDesktop
        ? [
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
          ]
        : [],
      whileElementsMounted: isDesktop ? autoUpdate : undefined,
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
      if (alwaysRenderSuggestions) {
        hasLoadedInitiallyRef.current = true;
        onSuggestionsFetchRequested(inputValue ?? '');
      } else if (inputValue) {
        onSuggestionsFetchRequested(inputValue);
      }
      // fire track event on load and forget about it after. We don't want to track again when anything (inputValue) changes
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (highlightedIndex === previousHighlightedIndexRef.current) return;

      previousHighlightedIndexRef.current = highlightedIndex;

      const currentSuggestion =
        highlightedIndex != null && highlightedIndex >= 0
          ? (flattenedSuggestions?.[highlightedIndex] ?? null)
          : null;

      onSuggestionHighlighted?.({ suggestion: currentSuggestion });
    }, [highlightedIndex, flattenedSuggestions, onSuggestionHighlighted]);

    const handleInputInteraction = () => {
      hasInteractedRef.current = true;
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

      if (e.key === 'Enter' && suggestionsCount) {
        safeOnSuggestionSelected?.({ suggestion: suggestions[0], inputValue });
      }

      if (defaultValue) {
        handleInputInteraction();
      } else if (!hasSuggestions) {
        safeOnSuggestionSelected?.();
      }
    };

    const handleSuggestionClick = () => {
      if (!focusInputOnSuggestionClick) {
        (document.activeElement as HTMLElement)?.blur?.();
      }
    };

    const clearSuggestions = (e?: SyntheticEvent<HTMLButtonElement>) => {
      e?.stopPropagation();
      setInputValue('');
    };

    // Render suggestions function to render single section suggestion
    const renderSuggestions = <T,>({
      items,
      sectionId,
      sectionIndex,
      sectionTitle,
      startIndex = 0,
    }: {
      items: T[];
      sectionId?: string;
      sectionTitle?: string;
      sectionIndex?: number;
      startIndex?: number;
    }): ReactNode[] =>
      items.map((suggestion, localIndex) => {
        const globalIndex = startIndex + localIndex;
        const isFirst = globalIndex === 0;
        const itemId = sectionId
          ? `item-${sectionIndex}-${localIndex}`
          : undefined;

        const isHighlighted =
          highlightedIndex === globalIndex ||
          (highlightFirstSuggestion && isFirst && highlightedIndex === -1);

        return (
          <li
            key={
              sectionTitle
                ? `${sectionTitle}-${getSuggestionValue(suggestion)}`
                : getSuggestionValue(suggestion)
            }
            aria-labelledby={
              sectionId && itemId ? `${sectionId} ${itemId}` : undefined
            }
            {...getItemProps({
              item: suggestion,
              index: globalIndex,
              onClick: handleSuggestionClick,
              'aria-selected': highlightedIndex === globalIndex,
            })}
            className={getClassName(
              theme.suggestion,
              isHighlighted && theme.suggestionHighlighted,
            )}
          >
            {itemId ? (
              <span id={itemId}>{renderSuggestion(suggestion)}</span>
            ) : (
              renderSuggestion(suggestion)
            )}
          </li>
        );
      });

    // renderSections function to render multi-section suggestions
    const renderSections = <T,>(sections: T[]): ReactNode[] => {
      let suggestionIndex = 0;

      return sections.map((section, sectionIndex) => {
        const sectionSuggestions = getSectionSuggestions?.(section) ?? [];

        if (sectionSuggestions.length === 0) {
          return null;
        }

        const sectionId = `section-${sectionIndex}`;
        const sectionTitleElement = renderSectionTitle?.(section);

        const sectionTitle =
          typeof sectionTitleElement === 'string'
            ? sectionTitleElement
            : `section-${sectionIndex}`;

        const renderedItems = renderSuggestions({
          items: sectionSuggestions,
          sectionId,
          sectionTitle,
          sectionIndex,
          startIndex: suggestionIndex,
        });

        suggestionIndex += sectionSuggestions.length;

        return (
          <section
            key={sectionTitle}
            className={theme.sectionContainer}
            role="group"
            aria-labelledby={sectionId}
          >
            <div id={sectionId} className={theme.sectionTitle}>
              {sectionTitleElement}
            </div>
            {renderedItems}
          </section>
        );
      });
    };

    const showSuggestions =
      hasSuggestions &&
      ((alwaysRenderSuggestions &&
        hasLoadedInitiallyRef.current &&
        !hasInteractedRef.current) ||
        isOpen);

    const renderList = () =>
      multiSection
        ? renderSections(suggestions)
        : renderSuggestions({ items: suggestions });

    // Render the input component
    const renderInput = () => {
      const inputAriaLabel = inputValue || safeInputProps.placeholder;

      const {
        className: inputClassName,
        name: inputName,
        onClick: inputOnClick,
        onKeyDown: inputOnKeyDown,
        type: typeFromInputProps,
        ...restInputProps
      } = safeInputProps;

      const {
        ref: downshiftInputRef,
        value,
        ...finalInputProps
      } = getInputProps({
        onKeyDown,
        ref: forwardedRef,
        onClick: handleInputInteraction,
        onFocus: handleInputInteraction,
        'aria-describedby': ariaDescribedByLabelId,
        'aria-label': inputAriaLabel,
        className: inputClassName || theme.input,
        ...restInputProps,
      });

      const setInputRef = (node: HTMLInputElement | null) => {
        refs.setReference(node);

        // convert input ref from Downshift
        if (typeof downshiftInputRef === 'function') {
          downshiftInputRef(node);
        } else if (
          downshiftInputRef &&
          typeof downshiftInputRef === 'object' &&
          'current' in downshiftInputRef
        ) {
          (
            downshiftInputRef as MutableRefObject<HTMLInputElement | null>
          ).current = node;
        }
      };

      let normalizedInputValue: string | number = '';

      if (Array.isArray(value)) {
        normalizedInputValue = value.join(', ');
      } else if (typeof value === 'string' || typeof value === 'number') {
        normalizedInputValue = value;
      }

      if (renderInputComponent) {
        return (
          <div ref={setInputRef}>
            {renderInputComponent({
              ...finalInputProps,
              ref: setInputRef,
              enterKeyHint,
              value,
            })}
          </div>
        );
      }

      return (
        <div className={getClassName(theme.label)}>
          <div className={getClassName(theme.inputTextWrapper)}>
            <label aria-hidden {...getLabelProps()}>
              {renderBesideInput?.()}
            </label>
            <span className={theme.visuallyHidden} id={ariaDescribedByLabelId}>
              {ariaLabels?.label && ariaLabels.label}
            </span>
            <div className={getClassName(theme.inputWrapper)}>
              <BpkInput
                value={normalizedInputValue}
                inputRef={setInputRef}
                clearButtonMode={showClear ? 'whileEditing' : 'never'}
                clearButtonLabel={ariaLabels?.clearButton || 'Clear input'}
                onClear={clearSuggestions}
                name={inputName || id}
                id={id}
                {...finalInputProps}
                enterKeyHint={enterKeyHint}
              />
            </div>
          </div>
        </div>
      );
    };

    return (
      <div
        className={getClassName(
          theme.container,
          suggestionsCount && theme.containerOpen,
        )}
      >
        {renderInput()}

        {showSuggestions &&
          (isDesktop ? (
            <FloatingPortal>
              <div
                ref={refs.setFloating}
                style={floatingStyles}
                className={getClassName(
                  theme.suggestionsContainer,
                  isDesktop && theme.desktopSuggestionsContainer,
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
                  {...getMenuProps({
                    ...(ariaLabels?.resultsList && {
                      'aria-label': ariaLabels.resultsList,
                    }),
                  })}
                  className={getClassName(
                    theme.suggestionsList,
                    isDesktop && theme.desktopSuggestionsList,
                  )}
                >
                  {renderList()}
                </ul>
              </div>
            </FloatingPortal>
          ) : (
            <div
              className={getClassName(
                theme.suggestionsContainer,
                showSuggestions && theme.suggestionsContainerOpen,
              )}
            >
              <ul
                {...getMenuProps({
                  ...(ariaLabels?.resultsList && {
                    'aria-label': ariaLabels.resultsList,
                  }),
                })}
                className={getClassName(theme.suggestionsList)}
              >
                {renderList()}
              </ul>
            </div>
          ))}
      </div>
    );
  },
);

export default BpkAutosuggest;
