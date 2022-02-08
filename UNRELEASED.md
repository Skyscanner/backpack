**Changed:**
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
