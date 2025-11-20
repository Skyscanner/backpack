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
import { Children, useState } from 'react';

import {
  lineHeightBase,
  iconSizeSm,
} from '@skyscanner/bpk-foundations-web/tokens/base.es6';

import { BpkButtonV2 } from '../../packages/bpk-component-button';
import {
  withAlignment,
  withRtlSupport,
} from '../../packages/bpk-component-icon';
import ArrowIcon from '../../packages/bpk-component-icon/sm/long-arrow-left';
import BpkModal, {
  MODAL_STYLING,
  type BpkModalProps,
} from '../../packages/bpk-component-modal';
import { BpkNavigationBarButtonLink } from '../../packages/bpk-component-navigation-bar';
import BpkText, { TEXT_STYLES } from '../../packages/bpk-component-text';
import { cssModules, withDefaultProps } from '../../packages/bpk-react-utils';

import STYLES from './examples.module.scss';

const ArrowIconWithRtl = withAlignment(
  withRtlSupport(ArrowIcon),
  lineHeightBase,
  iconSizeSm,
);
const getClassName = cssModules(STYLES);

const Paragraph = withDefaultProps(BpkText, {
  textStyle: TEXT_STYLES.bodyDefault,
  tagName: 'p',
  className: getClassName('bpk-modal-paragraph'),
});

const content = [
  <Paragraph>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut egestas sit amet
    nisi nec ultrices. In efficitur justo ac tristique ultricies. Mauris luctus
    felis arcu, a porttitor turpis aliquet faucibus. Aenean nibh nulla, dictum
    sit amet efficitur cursus, molestie vitae enim. Aenean vel nunc purus.
    Vestibulum consectetur luctus eros ac bibendum. Donec pretium nunc mi, sed
    iaculis nibh aliquet in. Integer ut accumsan orci, non hendrerit nunc.
    Quisque ante enim, convallis lacinia arcu eu, tincidunt dignissim nunc.
    Nulla facilisi. Curabitur mattis sapien imperdiet, dignissim ligula id,
    maximus erat. Morbi sed eros vitae augue accumsan dictum sit amet eu lectus.
    Integer vitae consectetur libero, sed porttitor urna.
  </Paragraph>,
  <Paragraph>
    In arcu leo, bibendum in vestibulum quis, vulputate sed nisl. Donec sit amet
    turpis quis metus viverra rutrum id id elit. Duis luctus, mauris ut accumsan
    vehicula, magna lorem posuere velit, nec laoreet magna ante ut nulla.
    Vivamus vestibulum bibendum purus quis dictum. In accumsan convallis tempor.
    Proin porta massa et metus viverra feugiat. Aenean blandit pellentesque
    nunc, in interdum magna molestie non. Suspendisse pretium lectus et libero
    fringilla placerat. Aliquam pellentesque odio non maximus egestas. Nam
    feugiat mi ac neque sodales, in euismod dolor varius.
  </Paragraph>,
  <Paragraph>
    Aenean tempus tempus lorem in consequat. Quisque nec felis vitae mi commodo
    ultricies sit amet in lectus. Praesent imperdiet auctor nisl sit amet
    ultricies. Donec posuere placerat nulla a scelerisque. Nulla sit amet
    eleifend magna. Ut eu cursus metus, id pulvinar lectus. Proin euismod sed ex
    vel dignissim. Donec faucibus nec risus eu pellentesque. Cras vulputate
    varius volutpat. Duis ut nisi nulla. Duis volutpat lectus purus. Aliquam
    placerat dignissim mauris vitae interdum. Donec venenatis mattis mi eu
    facilisis. Maecenas pellentesque eros elementum, tincidunt tortor ac,
    fringilla massa. Cras sed orci nec erat porttitor lacinia vitae sed arcu.
  </Paragraph>,
  <Paragraph>
    Nunc lobortis arcu eget tellus tincidunt commodo. Phasellus ac tortor
    turpis. Cras ac quam non metus iaculis sollicitudin. Vestibulum ante ipsum
    primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi
    aliquam consectetur nisl at fermentum. Phasellus nisi arcu, fermentum ut
    malesuada eu, ultrices nec enim. Donec eleifend eros mauris, eu rutrum
    tellus suscipit ac. Pellentesque finibus mollis arcu, non tempor lorem
    gravida at. Nam laoreet neque quis gravida blandit. Mauris pharetra urna
    hendrerit pretium auctor. Aliquam erat volutpat. Class aptent taciti
    sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
    Fusce quis felis non lectus egestas pretium id sed erat. Aliquam dapibus
    erat sit amet facilisis luctus.
  </Paragraph>,
  <Paragraph>
    Vestibulum convallis ut nulla in iaculis. Aliquam erat volutpat. Nullam non
    semper sem. Ut gravida est eu nisi condimentum, lobortis gravida ipsum
    tincidunt. Duis lacinia tincidunt suscipit. Maecenas tincidunt quam ipsum,
    non sodales ante placerat in. Suspendisse malesuada auctor erat, vel
    pulvinar erat dignissim vitae.
  </Paragraph>,
];
type ContainerProps = {
  title?: string;
  buttonLabel?: string;
  id?: string;
  wrapperProps?: Object;
  isOpen?: boolean;
} & Omit<BpkModalProps, 'getApplicationElement' | 'id' | 'isOpen'>;

const ModalContainer = (props: ContainerProps) => {
  const [isOpen, setIsOpen] = useState(props.isOpen || false);

  const { accessoryView, buttonLabel, children, wrapperProps, ...rest } = props;

  return (
    <div id="modal-container" {...wrapperProps}>
      <div id="pagewrap">
        <BpkButtonV2 onClick={() => setIsOpen(true)}>
          {buttonLabel || 'Open modal'}
        </BpkButtonV2>
        <BpkModal
          id="my-modal"
          className="my-classname"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          getApplicationElement={() => document.getElementById('pagewrap')}
          renderTarget={() => document.getElementById('modal-container')}
          accessoryView={accessoryView}
          {...rest}
        >
          {children}
        </BpkModal>
      </div>
    </div>
  );
};

const DefaultExample = (isOpen: boolean) => (
  <ModalContainer title="Modal title" closeLabel="Close modal" isOpen={isOpen}>
    This is a default modal. You can put anything you want in here.
  </ModalContainer>
);

const ContrastExample = (isOpen: boolean) => (
  <ModalContainer
    title="Modal title"
    closeLabel="Close modal"
    modalStyle={MODAL_STYLING.surfaceContrast}
    isOpen={isOpen}
  >
    This is a contrast modal. You can put anything you want in here.
  </ModalContainer>
);

const WideExample = (isOpen: boolean) => (
  <ModalContainer
    title="Modal title"
    closeLabel="Close modal"
    isOpen={isOpen}
    wide
  >
    This is a wide modal.
  </ModalContainer>
);

const OverflowingExample = (isOpen: boolean) => (
  <ModalContainer title="Modal title" closeLabel="Close modal" isOpen={isOpen}>
    {Children.toArray(content)}
  </ModalContainer>
);

const CloseButtonTextExample = (isOpen: boolean) => (
  <ModalContainer title="Modal title" closeText="Done" isOpen={isOpen}>
    This is a default modal. You can put anything you want in here.
  </ModalContainer>
);

const ContrastWithCloseButtonTextExample = (isOpen: boolean) => (
  <ModalContainer
    title="Modal title"
    modalStyle={MODAL_STYLING.surfaceContrast}
    isOpen={isOpen}
    closeText="Done"
  >
    This is a contrast modal. You can put anything you want in here.
  </ModalContainer>
);

const LongTitleExample = (isOpen: boolean) => (
  <ModalContainer
    title="We have to remember what's important in life: friends, waffles, and work. Or waffles, friends, work. But work has to come third."
    closeText="Done"
    isOpen={isOpen}
  >
    This is a default modal. You can put anything you want in here.
  </ModalContainer>
);

const NotFullScreenOnMobileExample = (isOpen: boolean) => (
  <ModalContainer
    title="Modal title"
    closeLabel="Close modal"
    fullScreenOnMobile={false}
    isOpen={isOpen}
  >
    This is a default modal. You can put anything you want in here.
  </ModalContainer>
);

const FullScreenExample = (isOpen: boolean) => (
  <ModalContainer
    title="Modal title"
    closeLabel="Close modal"
    fullScreen
    isOpen={isOpen}
  >
    This is a default modal. You can put anything you want in here.
  </ModalContainer>
);

const FullScreenOverflowingExample = (isOpen: boolean) => (
  <ModalContainer
    title="Modal title"
    closeLabel="Close modal"
    fullScreen
    isOpen={isOpen}
  >
    {Children.toArray(content)}
  </ModalContainer>
);

const NestedExample = (isOpen: boolean) => (
  <ModalContainer
    title="Modal title"
    closeLabel="Close modal"
    fullScreen
    isOpen={isOpen}
  >
    This is a full-screen modal. You can put anything you want in here,
    including other modals!
    <ModalContainer
      title="Inner modal title"
      closeLabel="Close modal"
      wrapperProps={{ id: 'inner-modal-container' }}
      buttonLabel="Open another modal from this modal"
      id="inner-modal"
      isOpen={isOpen}
      renderTarget={() => document.getElementById('inner-modal-container')}
    >
      This is a default modal. You can put anything you want in here.
    </ModalContainer>
  </ModalContainer>
);

const NoHeaderExample = (isOpen: boolean) => (
  <ModalContainer ariaLabel="Modal title" showHeader={false} isOpen={isOpen}>
    This is a default modal. You can put anything you want in here.
  </ModalContainer>
);

const NoPaddingExample = (isOpen: boolean) => (
  <ModalContainer
    title="Modal title"
    closeLabel="Close modal"
    padded={false}
    isOpen={isOpen}
  >
    This is a default modal. You can put anything you want in here.
  </ModalContainer>
);

const WithAccessoryViewExample = (isOpen: boolean) => (
  <ModalContainer
    title="Modal title"
    closeLabel="Close modal"
    accessoryView={
      <BpkNavigationBarButtonLink
        label="Close"
        onClick={() => {}}
        className={getClassName('bpk-modal__leading-button')}
      >
        <div>
          <BpkText>
            <ArrowIconWithRtl /> Back to results
          </BpkText>
        </div>
      </BpkNavigationBarButtonLink>
    }
    isOpen={isOpen}
  >
    The left hand button is intentally not functional. You can put anything you
    want in here.
  </ModalContainer>
);

export {
  DefaultExample,
  WideExample,
  OverflowingExample,
  CloseButtonTextExample,
  LongTitleExample,
  NotFullScreenOnMobileExample,
  FullScreenExample,
  FullScreenOverflowingExample,
  NestedExample,
  NoHeaderExample,
  NoPaddingExample,
  WithAccessoryViewExample,
  ContrastExample,
  ContrastWithCloseButtonTextExample,
};
