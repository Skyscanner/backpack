/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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

// Deprecated routes, kept here for redirects
export default {
  '/components/bonds': ROUTES.TOKENS,
  '/components/bonds/colors': ROUTES.COLORS,
  '/components/bonds/typesetting': ROUTES.TYPESETTING,
  '/components/bonds/radii': ROUTES.RADII,
  '/components/bonds/shadows': ROUTES.SHADOWS,
  '/components/bonds/borders': ROUTES.BORDERS,
  '/components/bonds/layout': ROUTES.LAYOUT,
  '/components/bonds/animation': ROUTES.ANIMATION,
  '/components/atoms': ROUTES.WEB_COMPONENTS,
  '/components/atoms/typography': ROUTES.TYPOGRAPHY,
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
  '/components/native/button': ROUTES.NATIVE_BUTTONS,
  '/components/native/text-input': ROUTES.NATIVE_INPUTS,
};
