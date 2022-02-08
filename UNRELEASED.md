**Breaking:**
  - bpk-mixins:
  - bpk-component-text:
    - Removed margins from `bpk-heading` mixins. Should you require margins in your headings, you will need to supply them yourself using spacing tokens. See below for an example.
      ```css
      /* Old */
      .MyHeading {
        @include bpk-heading-1;
      }

      /* New */
      $bpk-spacing-v2: true;
      
      .MyHeading {
        margin-top: bpk-spacing-sm();
        margin-bottom: bpk-spacing-sm();

        @include bpk-heading-1;
      }
      ```
      **Note:** If you have not or in progress of upgrading to the new spacing system, you will need to enable the v2 system by providing `$bpk-spacing-v2: true` in your `.scss` file in order to enable the v2 spacing.

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
