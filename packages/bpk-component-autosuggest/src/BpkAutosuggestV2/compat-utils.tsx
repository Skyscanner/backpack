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
      (onChange as any)(e.nativeEvent, { newValue: e.target.value });
    };
  } else {
    patched.onChange = onChange;
  }
  if (typeof onBlur === 'function' && onBlur.length >= 2) {
    patched.onBlur = (e: FocusEvent<HTMLInputElement>) => {
      const highlighted = context?.getHighlightedSuggestion?.();
      (onBlur as any)(e.nativeEvent, { highlightedSuggestion: highlighted });
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
      (onSuggestionSelected as any)(null, { suggestion: data?.suggestion });
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
      (onInputValueChange as any)(null, { newValue: data.newValue });
    };
  } else {
    result.onInputValueChange = onInputValueChange;
  }
  return result;
}
