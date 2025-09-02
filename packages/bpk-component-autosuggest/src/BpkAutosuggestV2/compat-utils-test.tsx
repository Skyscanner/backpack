import type { ChangeEvent, FocusEvent, HTMLProps } from 'react';

import {
  patchInputPropsLegacySupport,
  patchAutosuggestPropsLegacySupport,
} from './compat-utils';

describe('patchInputPropsLegacySupport', () => {
  it('should wrap legacy onChange(e, { newValue })', () => {
    const legacyHandler = jest.fn((e: Event, data: { newValue: string }) => {});
    const props: HTMLProps<HTMLInputElement> = {
      onChange: legacyHandler as any,
    };

    const patched = patchInputPropsLegacySupport(props);

    const fakeEvent = {
      nativeEvent: new Event('input'),
      target: { value: 'abc' },
    } as unknown as ChangeEvent<HTMLInputElement>;

    patched.onChange?.(fakeEvent);

    expect(legacyHandler).toHaveBeenCalledTimes(1);
    const [calledEvent, calledData] = legacyHandler.mock.calls[0];
    expect(typeof calledEvent).toBe('object');
    expect(calledData).toEqual({ newValue: 'abc' });
  });

  it('should wrap legacy onBlur(e, { highlightedSuggestion })', () => {
    const legacyHandler = jest.fn(
      (e: Event, data: { highlightedSuggestion?: any }) => {},
    );
    const highlighted = { name: 'suggestion' };
    const props: HTMLProps<HTMLInputElement> = {
      onBlur: legacyHandler as any,
    };

    const patched = patchInputPropsLegacySupport(props, {
      getHighlightedSuggestion: () => highlighted,
    });

    const fakeEvent = {
      nativeEvent: new FocusEvent('blur'),
    } as unknown as FocusEvent<HTMLInputElement>;

    patched.onBlur?.(fakeEvent);

    expect(legacyHandler).toHaveBeenCalledTimes(1);
    const [calledEvent, calledData] = legacyHandler.mock.calls[0];
    expect(typeof calledEvent).toBe('object');
    expect(calledData).toEqual({ highlightedSuggestion: highlighted });
  });
});

describe('patchAutosuggestPropsLegacySupport', () => {
  it('should wrap legacy onSuggestionSelected(e, { suggestion })', () => {
    const legacyHandler = jest.fn(
      (e: Event | null, data: { suggestion: string }) => {},
    );
    const { onSuggestionSelected } = patchAutosuggestPropsLegacySupport({
      onSuggestionSelected: legacyHandler,
    });

    onSuggestionSelected?.({ suggestion: 'foo', inputValue: 'bar' });

    expect(legacyHandler).toHaveBeenCalledTimes(1);
    const [calledEvent, calledData] = legacyHandler.mock.calls[0];
    expect(calledEvent).toBe(null);
    expect(calledData).toEqual({ suggestion: 'foo' });
  });

  it('should wrap legacy onInputValueChange(e, { newValue })', () => {
    const legacyHandler = jest.fn(
      (e: Event | null, data: { newValue: string }) => {},
    );
    const { onInputValueChange } = patchAutosuggestPropsLegacySupport({
      onInputValueChange: legacyHandler,
    });

    onInputValueChange?.({ method: 'type', newValue: 'abc' });

    expect(legacyHandler).toHaveBeenCalledTimes(1);
    const [calledEvent, calledData] = legacyHandler.mock.calls[0];
    expect(calledEvent).toBe(null);
    expect(calledData).toEqual({ newValue: 'abc' });
  });
});
