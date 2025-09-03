import type { HTMLProps, ChangeEvent, FocusEvent } from 'react';

// --- Legacy Input Props Compatibility ---

// Used inside BpkAutosuggest.tsx:
// const safeInputProps = patchInputPropsLegacySupport(inputProps, { getHighlightedSuggestion: ... });
// const { onSuggestionSelected: safeOnSuggestionSelected, onInputValueChange: safeOnInputValueChange } = patchAutosuggestPropsLegacySupport(...)
export function patchInputPropsLegacySupport(
  inputProps: HTMLProps<HTMLInputElement>,
  context?: { getHighlightedSuggestion?: () => any },
): HTMLProps<HTMLInputElement> {
  const { onBlur, onChange, ...rest } = inputProps;
  const patched: HTMLProps<HTMLInputElement> = { ...rest };

  if (typeof onChange === 'function' && onChange.length >= 2) {
    patched.onChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      const syntheticEvent = {
        nativeEvent: new Event('input'),
        target: { value: newValue },
      } as unknown as Event;

      (onChange as any)(syntheticEvent, { newValue });
    };
  } else {
    patched.onChange = onChange;
  }

  if (typeof onBlur === 'function' && onBlur.length >= 2) {
    patched.onBlur = (e: FocusEvent<HTMLInputElement>) => {
      const highlighted = context?.getHighlightedSuggestion?.();
      const syntheticEvent = {
        nativeEvent: new Event('blur'),
      } as unknown as Event;

      (onBlur as any)(syntheticEvent, { highlightedSuggestion: highlighted });
    };
  } else {
    patched.onBlur = onBlur;
  }

  return patched;
}

// --- Legacy Top-Level Props Compatibility ---

export function patchAutosuggestPropsLegacySupport<T>(props: {
  onSuggestionSelected?:
    | ((data?: { suggestion?: T; inputValue: string }) => void)
    | ((e: any, data: { suggestion: T }) => void);
  onInputValueChange?:
    | ((data: { method: string; newValue: string }) => void)
    | ((e: any, data: { newValue: string }) => void);
}): {
  onSuggestionSelected?: (data?: {
    suggestion?: T;
    inputValue: string;
  }) => void;
  onInputValueChange?: (data: { method: string; newValue: string }) => void;
} {
  const { onInputValueChange, onSuggestionSelected } = props;
  const result: any = {};

  if (
    typeof onSuggestionSelected === 'function' &&
    onSuggestionSelected.length >= 2
  ) {
    result.onSuggestionSelected = (data?: {
      suggestion?: T;
      inputValue: string;
    }) => {
      const syntheticEvent = {
        preventDefault: () => {},
      } as unknown as Event;

      (onSuggestionSelected as any)(syntheticEvent, {
        suggestion: data?.suggestion,
      });
    };
  } else {
    result.onSuggestionSelected = onSuggestionSelected;
  }

  if (
    typeof onInputValueChange === 'function' &&
    onInputValueChange.length >= 2
  ) {
    result.onInputValueChange = (data: {
      method: string;
      newValue: string;
    }) => {
      const syntheticEvent = {
        type: 'input',
      } as unknown as Event;

      (onInputValueChange as any)(syntheticEvent, {
        newValue: data.newValue,
      });
    };
  } else {
    result.onInputValueChange = onInputValueChange;
  }

  return result;
}
