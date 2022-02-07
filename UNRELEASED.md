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