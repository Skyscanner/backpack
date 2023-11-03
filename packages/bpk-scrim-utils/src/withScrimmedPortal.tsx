/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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

import type { ComponentType} from 'react';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import withScrim from './withScrim';
import type { Props as ScrimProps } from './withScrim';

export type Props = ScrimProps & {
    renderTarget?: (() => HTMLElement | null) | null;
};

const getPortalElement = (target: (() => HTMLElement | null) | null | undefined) => {
    const portalElement = target && typeof target === 'function' ? target() : null;

    if (portalElement) {
        return portalElement;
    }

    if (document.body) {
        return document.body;
    }
    throw new Error('Render target and fallback unavailable');
}

const withScrimmedPortal = (WrappedComponent: ComponentType<ScrimProps>) => {
    const Scrimmed = withScrim(WrappedComponent);
    let portalElement = document.body;

    const ScrimmedComponent = ({ renderTarget, ...rest}: Props) => {
        const [isPortalReady, setIsPortalReady] = useState(false);

        useEffect(() => {
            portalElement = getPortalElement(renderTarget);
            setIsPortalReady(true);
          }, []);

        return createPortal(<Scrimmed {...rest} isPortalReady={isPortalReady} />, portalElement);
    }

    return ScrimmedComponent;
}

export default withScrimmedPortal;
