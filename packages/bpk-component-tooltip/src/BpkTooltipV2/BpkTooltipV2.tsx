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

/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import { useEffect, useState, cloneElement } from 'react';
import {createPortal} from 'react-dom';
import { useFloatingPortalNode, useFloating, useHover, useFocus, useInteractions } from '@floating-ui/react';

const BpkTooltipComponent = ({anchor}) => {    
    const [isOpen, setIsOpen] = useState(false);
    const {context, refs} = useFloating({
        open: isOpen,
        onOpenChange(isOpen) {
            setIsOpen(isOpen);
        },
      });

    const hover = useHover(context);
    const focus = useFocus(context);    
    
    const {getFloatingProps, getReferenceProps} = useInteractions([
        hover,
        focus,
    ]);
    
    const targetWithProps = cloneElement(anchor, {
        tabIndex: '0',
        ...getReferenceProps({
            ref: refs.setReference,
            onClick() {
                console.log("CLICKED");
            } 
        }),
      });    
    
    useEffect(() => {
        console.log('isOpen in useEffect', isOpen);
    },[isOpen, context]);
 
    return (
      <>
      {targetWithProps}
        {isOpen && <div
            ref={refs.setFloating}
            {...getFloatingProps()}
            >
          Tooltip
        </div>}
      </>
    );
  }

const BpkTooltipPortal = ({children}) => {
    const portalNode = useFloatingPortalNode({
      // Accepts `id` and `root` props
    });
   
    if (portalNode) {
      return createPortal(children, portalNode);
    }
   
    return null;
  }

const BpkTooltip = ({target}) => (
        <BpkTooltipPortal>
                <BpkTooltipComponent anchor={target} />
            </BpkTooltipPortal>
    )

export default BpkTooltip;