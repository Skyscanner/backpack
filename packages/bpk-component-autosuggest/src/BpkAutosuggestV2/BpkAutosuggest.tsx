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
  ReactElement,
  HTMLProps,
  MutableRefObject,
  ReactNode,
  InputHTMLAttributes,
  FocusEvent,
  Ref,
  SyntheticEvent,
} from 'react';

import {
  useFloating,
  offset,
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
  onClear?: (e: SyntheticEvent<HTMLButtonElement>) => void;
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

export const defaultTheme = {
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
    const originalInputOnPreviewRef = useRef<string | null>(null);
    const hasInteractedRef = useRef(false);
    const hasLoadedInitiallyRef = useRef(false);
    const committedSelectionRef = useRef(false);
    const savedHighlightedIndexRef = useRef<number | null>(null);

    const suggestionsCount = suggestions.length;
    const hasSuggestions = suggestionsCount > 0;

    const flattenedSuggestions = multiSection
      ? suggestions.flatMap((section) => getSectionSuggestions?.(section) ?? [])
      : suggestions;

    const getTargetHighlightedIndex = (
      currentHighlightedIndex: number | null | undefined,
      isMenuOpening: boolean,
      isArrowKeyNavigation = false,
    ) => {
      if (
        isMenuOpening &&
        !isArrowKeyNavigation &&
        highlightFirstSuggestion &&
        flattenedSuggestions.length > 0
      ) {
        return 0;
      }

      if (
        currentHighlightedIndex !== null &&
        currentHighlightedIndex !== undefined &&
        currentHighlightedIndex >= 0
      ) {
        return currentHighlightedIndex;
      }

      if (
        savedHighlightedIndexRef.current !== null &&
        savedHighlightedIndexRef.current >= 0
      ) {
        return savedHighlightedIndexRef.current;
      }

      return currentHighlightedIndex;
    };

    function stateReducer(
      state: UseComboboxState<any>,
      actionAndChanges: UseComboboxStateChangeOptions<any>,
    ): Partial<UseComboboxState<any>> {
      const { changes, type } = actionAndChanges;

      const shouldForceKeepOpen =
        alwaysRenderSuggestions && hasSuggestions && changes.isOpen === false;

      if (shouldForceKeepOpen) {
        return {
          ...changes,
          isOpen: true,
        };
      }

      const isMenuOpening = changes.isOpen === true && state.isOpen === false;

      switch (type) {
        case useCombobox.stateChangeTypes.InputClick: {
          const targetHighlightedIndex = getTargetHighlightedIndex(
            state.highlightedIndex,
            isMenuOpening,
          );
          return {
            ...changes,
            isOpen: state.isOpen,
            highlightedIndex: targetHighlightedIndex ?? -1,
          };
        }
        default: {
          const forceOpen = !isDesktop && !!changes.inputValue;
          const isArrowKeyNavigation =
            type === useCombobox.stateChangeTypes.InputKeyDownArrowDown ||
            type === useCombobox.stateChangeTypes.InputKeyDownArrowUp;

          const targetHighlightedIndex = getTargetHighlightedIndex(
            changes.highlightedIndex,
            isMenuOpening,
            isArrowKeyNavigation,
          );
          return {
            ...changes,
            isOpen: forceOpen ? true : changes.isOpen,
            highlightedIndex: targetHighlightedIndex ?? changes.highlightedIndex,
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
      selectItem,
      setInputValue,
    } = useCombobox({
      stateReducer,
      items: flattenedSuggestions,
      itemToString(suggestion) {
        return suggestion ? getSuggestionValue(suggestion) : '';
      },
      async onInputValueChange(changes) {
        const { inputValue: newInputValue, isOpen: newIsOpen, type } = changes;
        onInputValueChange?.({
          method: type,
          newValue: newInputValue ?? '',
        });

        if (type === useCombobox.stateChangeTypes.InputChange) {
          if (newInputValue && newInputValue.length > 0) {
            if (newIsOpen) {
              onSuggestionsFetchRequested(newInputValue);
            }
          } else {
            // Clear old suggestions before requesting defaults
            onSuggestionsClearRequested?.();
            onSuggestionsFetchRequested('');
          }
        }
      },
      onSelectedItemChange(changes) {
        const { selectedItem } = changes;
        if (selectedItem) {
          const newValue = getSuggestionValue(selectedItem);
          setInputValue(newValue);
          originalInputOnPreviewRef.current = null;
          committedSelectionRef.current = true;
          hasInteractedRef.current = true;
          onSuggestionSelected?.({
            suggestion: selectedItem,
            inputValue: newValue,
          });

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
      onHighlightedIndexChange(changes) {
        const { highlightedIndex: newIndex, type } = changes;
        const currentSuggestion =
          newIndex != null && newIndex >= 0
            ? (flattenedSuggestions?.[newIndex] ?? null)
            : null;

        onSuggestionHighlighted?.({ suggestion: currentSuggestion });

        const isArrowKey =
          type === useCombobox.stateChangeTypes.InputKeyDownArrowDown ||
          type === useCombobox.stateChangeTypes.InputKeyDownArrowUp;

        if (isArrowKey) {
          if (currentSuggestion) {
            if (originalInputOnPreviewRef.current === null) {
              originalInputOnPreviewRef.current = inputValue ?? '';
            }
            const previewValue = getSuggestionValue(currentSuggestion);
            if (previewValue !== inputValue) {
              setInputValue(previewValue);
            }
          } else if (originalInputOnPreviewRef.current !== null) {
            if ((inputValue ?? '') !== originalInputOnPreviewRef.current) {
              setInputValue(originalInputOnPreviewRef.current);
            }
            originalInputOnPreviewRef.current = null;
          }
        }
      },
    });

    const { context, floatingStyles, refs } = useFloating({
      placement: 'bottom-start',
      // Use fixed strategy on desktop to avoid stacking context issues with table headers
      // Fixed positioning is relative to viewport, not affected by parent transforms/overflows
      ...(isDesktop && { strategy: 'fixed' }),
      middleware: isDesktop
        ? [
            offset(4),
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
      // Prevent defaultValue from overwriting input after interaction or selection
      if (hasInteractedRef.current || committedSelectionRef.current) {
        return;
      }
      setInputValue(defaultValue ?? '');
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
      // Save highlighted index to allow auto-selection on blur
      savedHighlightedIndexRef.current = highlightedIndex;

      const currentSuggestion =
        highlightedIndex != null && highlightedIndex >= 0
          ? (flattenedSuggestions?.[highlightedIndex] ?? null)
          : null;

      if (!currentSuggestion && originalInputOnPreviewRef.current !== null) {
        if ((inputValue ?? '') !== originalInputOnPreviewRef.current) {
          setInputValue(originalInputOnPreviewRef.current);
        }
        originalInputOnPreviewRef.current = null;
      }

      onSuggestionHighlighted?.({ suggestion: currentSuggestion });
    }, [
      highlightedIndex,
      flattenedSuggestions,
      onSuggestionHighlighted,
      inputValue,
      setInputValue,
    ]);

    const handleInputInteraction = () => {
      if (isOpen) {
        if (originalInputOnPreviewRef.current !== null) {
          originalInputOnPreviewRef.current = null;
        }
        return;
      }

      hasInteractedRef.current = true;
      // Reset committed selection to allow auto-select on blur
      committedSelectionRef.current = false;

      // Keep the preview value (from arrow keys) when clicking the input
      if (originalInputOnPreviewRef.current !== null) {
        originalInputOnPreviewRef.current = null;
      }

      onSuggestionsClearRequested?.();

      if (shouldRenderSuggestions) {
        shouldRenderSuggestions(inputValue);
      }

      if (!isOpen && inputValue.length) {
        onSuggestionsFetchRequested(inputValue);
        openMenu();
      } else if (alwaysRenderSuggestions && !inputValue) {
        onSuggestionsFetchRequested('');
        if (!isOpen) {
          openMenu();
        }
      } else if (!isOpen) {
        openMenu();
        onClick?.();
      } else {
        onClick?.();
      }

      // Track desktop homepage interaction (mobile interaction is tracked via modal entry)
      if (isDesktop) {
        onLoad?.(inputValue);
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
      onSuggestionsClearRequested?.();
      onSuggestionsFetchRequested('');
      if (!isOpen) {
        openMenu();
      }
      if (alwaysRenderSuggestions) {
        hasLoadedInitiallyRef.current = true;
      }
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

        // Build stable unique key (prefer entityId/id, fallback to index)
        const suggestionItem = suggestion as {
          entityId?: string | number;
          id?: string | number;
        };
        const suggestionId =
          suggestionItem.entityId ?? suggestionItem.id ?? globalIndex;
        const suggestionKey = sectionId
          ? `${sectionId}-${suggestionId}`
          : `item-${suggestionId}`;

        return (
          <li
            key={suggestionKey}
            aria-labelledby={sectionId && itemId ? `${sectionId} ${itemId}` : undefined}
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
            {sectionTitleElement && (
              <div id={sectionId} className={theme.sectionTitle}>
                {sectionTitleElement}
              </div>
            )}
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
      const inputAriaLabel = inputValue || inputProps.placeholder;

      const {
        className: inputClassName,
        name: inputName,
        onClick: inputOnClick,
        onKeyDown: inputOnKeyDown,
        type: typeFromInputProps,
        ...restInputProps
      } = inputProps;

      const {
        onBlur: downshiftOnBlur,
        ref: downshiftInputRef,
        value,
        ...finalInputProps
      } = getInputProps(
        {
          ref: forwardedRef,
          onClick: handleInputInteraction,
          onFocus: handleInputInteraction,
          'aria-describedby': ariaDescribedByLabelId,
          'aria-label': inputAriaLabel,
          className: inputClassName || theme.input,
          ...restInputProps,
        },
        {
          // Suppress the warning because we manually handle the ref
          suppressRefError: true,
        },
      );

      const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        // Call Downshift's onBlur first
        downshiftOnBlur?.(e);
        // Call original onBlur if provided
        restInputProps.onBlur?.(e);

        if (!isDesktop) {
          return;
        }

        if (committedSelectionRef.current) {
          return;
        }

        // Auto-select the highlighted suggestion on blur using the saved index
        const savedIndex = savedHighlightedIndexRef.current;
        let highlightedSuggestion: any = null;

        if (
          savedIndex != null &&
          savedIndex >= 0 &&
          flattenedSuggestions[savedIndex]
        ) {
          // User highlighted a specific suggestion with arrow keys
          highlightedSuggestion = flattenedSuggestions[savedIndex];
        } else if (
          highlightFirstSuggestion &&
          flattenedSuggestions.length > 0 &&
          (savedIndex === -1 || savedIndex === null)
        ) {
          // First suggestion is highlighted by default (highlightFirstSuggestion is true)
          const [firstSuggestion] = flattenedSuggestions;
          highlightedSuggestion = firstSuggestion;
        }

        if (highlightedSuggestion) {
          // Use setTimeout to ensure selectItem runs after the blur event completes
          setTimeout(() => {
            selectItem(highlightedSuggestion);
          }, 0);
        }
      };

      const setInputRef = (node: HTMLInputElement | null) => {
        if (refs.reference?.current === node) return;

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

      if (renderInputComponent) {
        return renderInputComponent({
          ...finalInputProps,
          ref: setInputRef,
          enterKeyHint,
          onBlur: handleBlur,
          onClear: clearSuggestions,
          value: inputValue ?? '',
        });
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
                value={inputValue}
                inputRef={setInputRef}
                clearButtonMode={showClear ? 'whileEditing' : 'never'}
                clearButtonLabel={ariaLabels?.clearButton || 'Clear input'}
                name={inputName || id}
                id={id}
                {...finalInputProps}
                onBlur={handleBlur}
                enterKeyHint={enterKeyHint}
                onClear={clearSuggestions}
              />
            </div>
          </div>
        </div>
      );
    };
    const containerWrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (containerWrapperRef.current) {
        refs.setReference(containerWrapperRef.current);
      }
    }, [refs]);

    // Call getMenuProps on every render to satisfy Downshift.
    // When hidden, use suppressRefError to avoid ref warnings.
    if (!showSuggestions) {
      getMenuProps({}, { suppressRefError: true });
    }

    return (
      <div
        ref={containerWrapperRef}
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
