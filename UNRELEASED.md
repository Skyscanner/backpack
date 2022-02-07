**Changed:**
  - bpk-component-text:
    - Added support for new Typography mixins using the text API:
      - `bpk-caption`
      - `bpk-footnote`
      - `bpk-label-1`
      - `bpk-label-2`
      - `bpk-body-default`
      - `bpk-body-longform`
      - `bpk-subheading`
      - `bpk-hero-1`
      - `bpk-hero-2`
      - `bpk-hero-3`
      - `bpk-hero-4`
      - `bpk-hero-5`
    - `weight` property is now deprecated. If you are using the `weight` or `bold` properties, remove them and choose one of the new text styles instead to achieve the desired weight. 
  
  - bpk-component-paragraph:
    - This component is deprecated, this had previously been completed in 2017 but it was still being published to npm. So this change updates this.
    - Please use `bpk-component-text` instead to apply paragraph styles. See the changes below for migration.
      ```js
      // old
      <BpkParagraph>My paragraph.</BpkParagraph>

      // new 
      <BpkText tagName="p" textStyle="base">
        My paragraph.
      </BpkText>
      ```