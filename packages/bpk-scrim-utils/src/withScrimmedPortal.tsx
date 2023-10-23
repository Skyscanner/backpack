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

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import withScrim from './withScrim';
import type { Props as ScrimProps } from './withScrim';

type Props = ScrimProps & {
    renderTarget?: () => HTMLElement;
};

const getPortalElement = (target: (() => HTMLElement) | undefined) => {
    const portalElement = target && typeof target === 'function' ? target() : null;
    
    if (portalElement) {
        return portalElement;
    }
    
    if (document.body) {
        return document.body;
    }
    throw new Error('Render target and fallback unavailable');
}

const withScrimmedPortal = (WrappedComponent: any) => {
    const Scrimmed = withScrim(WrappedComponent);

    const ScrimmedComponent = ({ renderTarget, ...rest}: Props) => {
        const node = useRef<HTMLDivElement | null>(null);

        if (!node.current) {
            node.current = document.createElement('div');
        }

        useEffect(() => {
            const portalElement = getPortalElement(renderTarget);
            
            if (node.current) {
                portalElement.appendChild(node.current);
            }
        
            return () => {
              if (node.current) {
                portalElement.removeChild(node.current);
              }
            };
          }, []);
        
        return createPortal(<Scrimmed {...rest} />, node.current);
        }
    
    return ScrimmedComponent;
}

export default withScrimmedPortal;