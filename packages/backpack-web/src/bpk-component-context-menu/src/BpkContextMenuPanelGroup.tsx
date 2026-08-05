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

import { type ReactNode, useCallback, useState } from 'react';

import BpkContextMenuNavContext from './BpkContextMenuNavContext';

export type BpkContextMenuPanelGroupProps = {
  children: ReactNode;
};

const ROOT_PANEL = 'root';

const BpkContextMenuPanelGroup = ({
  children,
}: BpkContextMenuPanelGroupProps) => {
  const [stack, setStack] = useState<string[]>([ROOT_PANEL]);

  const navigate = useCallback((id: string) => {
    setStack((prev) => [...prev, id]);
  }, []);

  const goBack = useCallback(() => {
    setStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  return (
    <BpkContextMenuNavContext.Provider
      value={{
        activePanel: stack[stack.length - 1],
        navigate,
        goBack,
        canGoBack: stack.length > 1,
      }}
    >
      {children}
    </BpkContextMenuNavContext.Provider>
  );
};

export default BpkContextMenuPanelGroup;
