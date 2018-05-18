/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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

import * as ROUTES from './routes';

const NEO_WEB_COMPONENT_REDIRECTS = {
  '/components/web/text': `${ROUTES.NEO_TEXT}?platform=web`,
  '/components/web/links': `${ROUTES.NEO_LINK}?platform=web`,
  '/components/web/lists': `${ROUTES.NEO_LIST}?platform=web`,
  '/components/web/description-lists': `${
    ROUTES.NEO_DESCRIPTION_LIST
  }?platform=web`,
  '/components/web/tables': `${ROUTES.NEO_TABLE}?platform=web`,
  '/components/web/blockquotes': `${ROUTES.NEO_BLOCKQUOTE}?platform=web`,
  '/components/web/code': `${ROUTES.NEO_CODE}?platform=web`,
  '/components/web/buttons': `${ROUTES.NEO_BUTTON}?platform=web`,
  '/components/web/icons': `${ROUTES.NEO_ICON}?platform=web`,
  '/components/web/spinners': `${ROUTES.NEO_SPINNER}?platform=web`,
  '/components/web/forms': `${ROUTES.NEO_FORM}?platform=web`,
  '/components/web/cards': `${ROUTES.NEO_CARD}?platform=web`,
  '/components/web/chips': `${ROUTES.NEO_CHIP}?platform=web`,
  '/components/web/badge': `${ROUTES.NEO_BADGE}?platform=web`,
  '/components/web/panels': `${ROUTES.NEO_PANEL}?platform=web`,
  '/components/web/images': `${ROUTES.NEO_IMAGE}?platform=web`,
  '/components/web/banner-alerts': `${ROUTES.NEO_BANNER_ALERT}?platform=web`,
  '/components/web/navigation-stack': `${
    ROUTES.NEO_NAVIGATION_STACK
  }?platform=web`,
  '/components/web/navigation-bar': `${ROUTES.NEO_NAVIGATION_BAR}?platform=web`,
  '/components/web/mobile-scroll-container': `${
    ROUTES.NEO_MOBILE_SCROLL_CONTAINER
  }?platform=web`,
  '/components/web/modals': `${ROUTES.NEO_MODAL}?platform=web`,
  '/components/web/autosuggest': `${ROUTES.NEO_AUTOSUGGEST}?platform=web`,
  '/components/web/popovers': `${ROUTES.NEO_POPOVER}?platform=web`,
  '/components/web/calendar': `${ROUTES.NEO_CALENDAR}?platform=web`,
  '/components/web/datepicker': `${ROUTES.NEO_DATEPICKER}?platform=web`,
  '/components/web/tooltips': `${ROUTES.NEO_TOOLTIP}?platform=web`,
  '/components/web/accordions': `${ROUTES.NEO_ACCORDION}?platform=web`,
  '/components/web/nudgers': `${ROUTES.NEO_NUDGER}?platform=web`,
  '/components/web/progress': `${ROUTES.NEO_PROGRESS}?platform=web`,
  '/components/web/tickets': `${ROUTES.NEO_TICKET}?platform=web`,
  '/components/web/horizontal-nav': `${ROUTES.NEO_HORIZONTAL_NAV}?platform=web`,
  '/components/web/fieldsets': `${ROUTES.NEO_FIELDSET}?platform=web`,
  '/components/web/barcharts': `${ROUTES.NEO_BARCHART}?platform=web`,
  '/components/web/pagination': `${ROUTES.NEO_PAGINATION}?platform=web`,
  '/components/web/star-rating': `${ROUTES.NEO_STAR_RATING}?platform=web`,
  '/components/web/breakpoints': `${ROUTES.NEO_BREAKPOINT}?platform=web`,
  '/components/web/horizontal-grid': `${
    ROUTES.NEO_HORIZONTAL_GRID
  }?platform=web`,
  '/components/web/sliders': `${ROUTES.NEO_SLIDER}?platform=web`,
  '/components/web/drawer': `${ROUTES.NEO_DRAWER}?platform=web`,
  '/components/web/dialogs': `${ROUTES.NEO_DIALOG}?platform=web`,
  '/components/web/section-list': `${ROUTES.NEO_SECTION_LIST}?platform=web`,
};

const NEO_NATIVE_REDIRECTS = {
  '/components/native/banner-alerts': `${
    ROUTES.NEO_BANNER_ALERT
  }?platform=native`,
  '/components/native/badge': `${ROUTES.NEO_BADGE}?platform=native`,
  '/components/native/button': `${ROUTES.NEO_BUTTON}?platform=native`,
  '/components/native/button-link': `${ROUTES.NEO_BUTTON_LINK}?platform=native`,
  '/components/native/cards': `${ROUTES.NEO_CARD}?platform=native`,
  '/components/native/flat-list': `${ROUTES.NEO_FLAT_LIST}?platform=native`,
  '/components/native': ROUTES.COMPONENTS,
  '/components/native/horizontal-nav': `${
    ROUTES.NEO_HORIZONTAL_NAV
  }?platform=native`,
  '/components/native/icons': `${ROUTES.NEO_ICON}?platform=native`,
  '/components/native/text-input': `${ROUTES.NEO_TEXT_INPUT}?platform=native`,
  '/components/native/nudger': `${ROUTES.NEO_NUDGER}?platform=native`,
  '/components/native/navigation-stack': `${
    ROUTES.NEO_NAVIGATION_STACK
  }?platform=native`,
  '/components/native/navigation-bar': `${
    ROUTES.NEO_NAVIGATION_BAR
  }?platform=native`,
  '/components/native/panels': `${ROUTES.NEO_PANEL}?platform=native`,
  '/components/native/pagination-dots': `${
    ROUTES.NEO_PAGINATION_DOT
  }?platform=native`,
  '/components/native/phone-input': `${ROUTES.NEO_PHONE_INPUT}?platform=native`,
  '/components/native/picker': `${ROUTES.NEO_PICKER}?platform=native`,
  '/components/native/progress': `${ROUTES.NEO_PROGRESS}?platform=native`,
  '/components/native/section-list': `${
    ROUTES.NEO_SECTION_LIST
  }?platform=native`,
  '/components/native/select': `${ROUTES.NEO_SELECT}?platform=native`,
  '/components/native/spinners': `${ROUTES.NEO_SPINNER}?platform=native`,
  '/components/native/star-rating': `${ROUTES.NEO_STAR_RATING}?platform=native`,
  '/components/native/switches': `${ROUTES.NEO_SWITCH}?platform=native`,
  '/components/native/text': `${ROUTES.NEO_TEXT}?platform=native`,
  '/components/native/touchable-overlay': `${
    ROUTES.NEO_TOUCHABLE_OVERLAY
  }?platform=native`,
  '/components/native/touchable-native-feedback': `${
    ROUTES.NEO_TOUCHABLE_NATIVE_FEEDBACK
  }?platform=native`,
};

const NEO_REDIRECTS = process.env.BPK_NEO
  ? {
      '/components/utilities': ROUTES.COMPONENTS,
      '/components/web': ROUTES.COMPONENTS,
      '/components/native': ROUTES.COMPONENTS,
      '/components/utilities/alignment': ROUTES.NEO_ALIGNMENT,
      '/components/utilities/theming': ROUTES.NEO_THEMING,
      ...NEO_WEB_COMPONENT_REDIRECTS,
      ...NEO_NATIVE_REDIRECTS,
    }
  : {};

// Deprecated routes, kept here for redirects
export default {
  '/components/bonds': ROUTES.TOKENS,
  '/components/bonds/colors': ROUTES.COLORS,
  '/components/bonds/typesetting': ROUTES.TYPESETTING,
  '/components/bonds/radii': ROUTES.RADII,
  '/components/bonds/shadows': ROUTES.SHADOWS,
  '/components/bonds/borders': ROUTES.BORDERS,
  '/components/bonds/layout': ROUTES.SPACINGS,
  '/components/bonds/animation': ROUTES.ANIMATION,
  '/tokens/layout': ROUTES.SPACINGS,
  '/components/atoms': ROUTES.WEB_COMPONENTS,
  '/components/atoms/typography': ROUTES.TEXT,
  '/components/atoms/buttons': ROUTES.BUTTONS,
  '/components/atoms/icons': ROUTES.ICONS,
  '/components/atoms/spinners': ROUTES.SPINNERS,
  '/components/atoms/forms': ROUTES.FORMS,
  '/components/atoms/cards': ROUTES.CARDS,
  '/components/atoms/chips': ROUTES.CHIPS,
  '/components/atoms/badge': ROUTES.BADGE,
  '/components/atoms/panels': ROUTES.PANELS,
  '/components/atoms/images': ROUTES.IMAGES,
  '/components/molecules': ROUTES.WEB_COMPONENTS,
  '/components/molecules/notifications': ROUTES.BANNER_ALERTS,
  '/components/molecules/banner-alerts': ROUTES.BANNER_ALERTS,
  '/components/molecules/modals': ROUTES.MODALS,
  '/components/molecules/autosuggest': ROUTES.AUTOSUGGEST,
  '/components/molecules/popovers': ROUTES.POPOVERS,
  '/components/molecules/calendar': ROUTES.CALENDAR,
  '/components/molecules/datepicker': ROUTES.DATEPICKER,
  '/components/molecules/tooltips': ROUTES.TOOLTIPS,
  '/components/molecules/accordions': ROUTES.ACCORDIONS,
  '/components/molecules/nudgers': ROUTES.NUDGERS,
  '/components/molecules/progress': ROUTES.PROGRESS,
  '/components/molecules/tickets': ROUTES.TICKETS,
  '/components/molecules/horizontal-nav': ROUTES.HORIZONTAL_NAV,
  '/components/molecules/fieldsets': ROUTES.FIELDSETS,
  '/components/molecules/barcharts': ROUTES.BARCHARTS,
  '/components/molecules/star-rating': ROUTES.STAR_RATING,
  '/resources': ROUTES.GETTING_STARTED,
  '/components/web/typography': ROUTES.TEXT,
  ...NEO_REDIRECTS,
};
