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

import { useState } from 'react';
import type { ReactElement, ReactNode } from 'react';

import BpkButton from '../../packages/bpk-component-button';
import BpkDialog, {
  HEADER_ICON_TYPES,
} from '../../packages/bpk-component-dialog';
import InfoIcon from '../../packages/bpk-component-icon/lg/information-circle';
import TickIcon from '../../packages/bpk-component-icon/lg/tick';
import TrashIcon from '../../packages/bpk-component-icon/lg/trash';
import BpkText, { TEXT_STYLES } from '../../packages/bpk-component-text';
import { cssModules, withDefaultProps } from '../../packages/bpk-react-utils';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

const Paragraph = withDefaultProps(BpkText, {
  textStyle: TEXT_STYLES.bodyDefault,
  tagName: 'p',
  className: getClassName('bpk-dialog-paragraph'),
});

type Props = {
  children: ReactElement;
  dismissible?: boolean;
  initallyOpen?: boolean;
  headerIcon?: ReactNode;
  headerIconType?: (typeof HEADER_ICON_TYPES)[keyof typeof HEADER_ICON_TYPES];
  flare?: boolean;
};

const DialogContainer = (props: Props) => {
  const { children, dismissible = true, initallyOpen = false, ...rest } = props;
  const [isOpenState, setIsOpen] = useState(initallyOpen);
  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div id="dialog-container">
      <div id="pagewrap">
        <BpkButton onClick={onOpen}>Open dialog</BpkButton>
      </div>
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      <BpkDialog
        closeLabel="Close dialog"
        id="my-dialog"
        ariaLabel="example dialog to showcase component"
        isOpen={isOpenState}
        onClose={onClose}
        getApplicationElement={() => document.getElementById('pagewrap')}
        renderTarget={() => document.getElementById('dialog-container')}
        dismissible={dismissible}
        {...rest}
      >
        {children}
        <BpkButton onClick={onClose}>Close</BpkButton>
      </BpkDialog>
    </div>
  );
};

const DefaultExample = () => (
  <DialogContainer initallyOpen>
    <Paragraph>
      This is a default dialog. You can put anything you want in here.
    </Paragraph>
  </DialogContainer>
);

const WithPrimaryIconExample = () => (
  <div>
    <span>Primary Icon Dialog</span>
    <DialogContainer headerIcon={<TickIcon />} initallyOpen dismissible={false}>
      <Paragraph>
        This is a default dialog with an icon. You can put anything you want in
        here.
      </Paragraph>
    </DialogContainer>
  </div>
);

const WithWarningIconExample = () => (
  <div>
    <span>Warning Icon Dialog</span>
    <DialogContainer
      headerIcon={<InfoIcon />}
      headerIconType={HEADER_ICON_TYPES.warning}
      initallyOpen
      dismissible={false}
    >
      <Paragraph>
        This is a warning dialog with an icon. You can put anything you want in
        here.
      </Paragraph>
    </DialogContainer>
  </div>
);

const WithDestructiveIconExample = () => (
  <div>
    <span>Destructive Icon Dialog</span>
    <DialogContainer
      headerIcon={<TrashIcon />}
      headerIconType={HEADER_ICON_TYPES.destructive}
      initallyOpen
      dismissible={false}
    >
      <Paragraph>
        This is a destructive dialog with an icon. You can put anything you want
        in here.
      </Paragraph>
    </DialogContainer>
  </div>
);

const NotDismissibleExample = () => (
  <DialogContainer dismissible={false} initallyOpen>
    <Paragraph>
      This is not dismissible. To close it you must bind the `onClose` function
      to a component inside the dialog, like the button below.
    </Paragraph>
  </DialogContainer>
);

const WithFlareExample = () => (
  <DialogContainer dismissible={false} flare initallyOpen>
    <Paragraph>
      This is a dialog with a flare view added as the header.
    </Paragraph>
  </DialogContainer>
);

export {
  DefaultExample,
  WithPrimaryIconExample,
  WithWarningIconExample,
  WithDestructiveIconExample,
  NotDismissibleExample,
  WithFlareExample,
};
