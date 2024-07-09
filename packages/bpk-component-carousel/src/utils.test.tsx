import { renderHook } from '@testing-library/react-hooks';

import { useScrollToInitialImage } from './utils';

describe('useScrollToInitialImage', () => {
  it('should scroll to initial image on mount', () => {
    const imagesRef = {
      current: [document.createElement('div'), document.createElement('div')],
    };
    const initialImageIndex = 0;

    renderHook(() => useScrollToInitialImage(initialImageIndex, imagesRef));

    expect(
      imagesRef.current[initialImageIndex].scrollIntoView,
    ).toHaveBeenCalledTimes(1);
  });
});
