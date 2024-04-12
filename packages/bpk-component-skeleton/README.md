# bpk-component-skeleton

> Backpack skeleton component.

## Installation

Check the main [Readme](https://github.com/skyscanner/backpack#usage) for a complete installation guide.

## Usage

```js
import BpkSkeleton, {
  SKELETON_TYPES,
  SIZE_TYPES, 
  IMAGE_SKELETON_STYLE 
} from '../../packages/bpk-component-skeleton';

export default () => (
  <div>
    <BpkSkeleton type={SKELETON_TYPES.image} size={{width: '7rem', height: '6rem'}} ariaLabel='loading' style={IMAGE_SKELETON_STYLE.rounded} />
    <BpkSkeleton type={SKELETON_TYPES.bodyText} size={SIZE_TYPES.small} ariaLabel='loading' />
  </div>
);
```
