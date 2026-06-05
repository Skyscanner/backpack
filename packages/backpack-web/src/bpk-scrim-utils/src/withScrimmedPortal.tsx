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
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import BpkScrim from './BpkScrim';
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
    throw new Error('Render target and fallback unavailable.');
}

const withScrimmedPortal = (WrappedComponent: ComponentType<ScrimProps>) => {
    const Scrimmed = withScrim(WrappedComponent);

    const ScrimmedComponent = ({ renderTarget, ...rest}: Props) => {
        const [isPortalReady, setIsPortalReady] = useState(false);

        useEffect(() => {
            setIsPortalReady(true);
          }, []);

        /**
         * The following code runs only on the client - only once the component has been mounted.
         */
        if (isPortalReady) {
            const portalElement = getPortalElement(renderTarget);
            return createPortal(<Scrimmed {...rest} isPortalReady={isPortalReady} />, portalElement);
        }

        /**
         * The following code will run on both server and on the intial render on the client.
         * This is to ensure the snapshotted markup (initial render before the component has been mounted) is the same on both server and client.
         * This is the recommended approach from React for those cases that require rendering something different on the server and the client
         * https://react.dev/reference/react-dom/hydrate#handling-different-client-and-server-content
         */
        return <BpkScrim />;
    }

    return ScrimmedComponent;
}

export default withScrimmedPortal;
