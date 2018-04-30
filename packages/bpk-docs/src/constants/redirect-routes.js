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
  '/components/web/text': ROUTES.NEO_TEXT,
  '/components/web/links': ROUTES.NEO_LINK,
  '/components/web/lists': ROUTES.NEO_LIST,
  '/components/web/description-lists': ROUTES.NEO_DESCRIPTION_LIST,
  '/components/web/tables': ROUTES.NEO_TABLE,
  '/components/web/blockquotes': ROUTES.NEO_BLOCKQUOTE,
  '/components/web/code': ROUTES.NEO_CODE,
  '/components/web/buttons': ROUTES.NEO_BUTTON,
  '/components/web/icons': ROUTES.NEO_ICON,
  '/components/web/spinners': ROUTES.NEO_SPINNER,
  '/components/web/forms': ROUTES.NEO_FORM,
  '/components/web/cards': ROUTES.NEO_CARD,
  '/components/web/chips': ROUTES.NEO_CHIP,
  '/components/web/badge': ROUTES.NEO_BADGE,
  '/components/web/panels': ROUTES.NEO_PANEL,
  '/components/web/images': ROUTES.NEO_IMAGE,
  '/components/web/banner-alerts': ROUTES.NEO_BANNER_ALERT,
  '/components/web/mobile-scroll-container': ROUTES.NEO_MOBILE_SCROLL_CONTAINER,
  '/components/web/modals': ROUTES.NEO_MODAL,
  '/components/web/autosuggest': ROUTES.NEO_AUTOSUGGEST,
  '/components/web/popovers': ROUTES.NEO_POPOVER,
  '/components/web/calendar': ROUTES.NEO_CALENDAR,
  '/components/web/datepicker': ROUTES.NEO_DATEPICKER,
  '/components/web/tooltips': ROUTES.NEO_TOOLTIP,
  '/components/web/accordions': ROUTES.NEO_ACCORDION,
  '/components/web/nudgers': ROUTES.NEO_NUDGER,
  '/components/web/progress': ROUTES.NEO_PROGRESS,
  '/components/web/tickets': ROUTES.NEO_TICKET,
  '/components/web/horizontal-nav': ROUTES.NEO_HORIZONTAL_NAV,
  '/components/web/fieldsets': ROUTES.NEO_FIELDSET,
  '/components/web/barcharts': ROUTES.NEO_BARCHART,
  '/components/web/pagination': ROUTES.NEO_PAGINATION,
  '/components/web/star-rating': ROUTES.NEO_STAR_RATING,
  '/components/web/breakpoints': ROUTES.NEO_BREAKPOINT,
  '/components/web/horizontal-grid': ROUTES.NEO_HORIZONTAL_GRID,
  '/components/web/sliders': ROUTES.NEO_SLIDER,
  '/components/web/drawer': ROUTES.NEO_DRAWER,
  '/components/web/dialogs': ROUTES.NEO_DIALOG,
};

const NEO_NATIVE_REDIRECTS = {
  '/components/native/banner-alerts': ROUTES.NEO_BANNER_ALERT,
  '/components/native/badge': ROUTES.NEO_BADGE,
  '/components/native/button': ROUTES.NEO_BUTTON,
  '/components/native/button-link': ROUTES.NEO_BUTTON_LINK,
  '/components/native/cards': ROUTES.NEO_CARD,
  '/components/native/flat-list': ROUTES.NEO_FLAT_LIST,
  '/components/native': ROUTES.COMPONENTS,
  '/components/native/horizontal-nav': ROUTES.NEO_HORIZONTAL_NAV,
  '/components/native/icons': ROUTES.NEO_ICON,
  '/components/native/text-input': ROUTES.NEO_TEXT_INPUT,
  '/components/native/nudger': ROUTES.NEO_NUDGER,
  '/components/native/navigation-bar': ROUTES.NEO_NAVIGATION_BAR,
  '/components/native/panels': ROUTES.NEO_PANEL,
  '/components/native/pagination-dots': ROUTES.NEO_PAGINATION_DOT,
  '/components/native/phone-input': ROUTES.NEO_PHONE_INPUT,
  '/components/native/picker': ROUTES.NEO_PICKER,
  '/components/native/progress': ROUTES.NEO_PROGRESS,
  '/components/native/section-list': ROUTES.NEO_SECTION_LIST,
  '/components/native/spinners': ROUTES.NEO_SPINNER,
  '/components/native/star-rating': ROUTES.NEO_STAR_RATING,
  '/components/native/switches': ROUTES.NEO_SWITCH,
  '/components/native/text': ROUTES.NEO_TEXT,
  '/components/native/touchable-overlay': ROUTES.NEO_TOUCHABLE_OVERLAY,
  '/components/native/touchable-native-feedback':
    ROUTES.NEO_TOUCHABLE_NATIVE_FEEDBACK,
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
