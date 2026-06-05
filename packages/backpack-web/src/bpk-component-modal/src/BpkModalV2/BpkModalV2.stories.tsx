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

import BpkButton from '../../../bpk-component-button';
import BpkText, { TEXT_STYLES } from '../../../bpk-component-text';
import { cssModules, withDefaultProps } from '../../../bpk-react-utils';
import { MODAL_STYLING } from '../BpkModalInner';

import { BpkModalV2 } from './BpkModal';

import type { Props as BpkModalProps } from './BpkModal';
import type { Meta } from '@storybook/react';

import STYLES from './BpkModalV2.stories.module.scss';

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

const ModalContainer = (
  props: Omit<
    BpkModalProps,
    'id' | 'isOpen' | 'ariaLabelledby' | 'closeLabel' | 'onClose'
  > & { initiallyOpen: boolean },
) => {
  const [isOpen, setOpen] = useState(props.initiallyOpen || false);

  return (
    <div id="modal-container">
      <div id="pagewrap">
        <BpkButton onClick={() => setOpen(true)}>Open modal</BpkButton>
      </div>
      <BpkModalV2
        id="bpk-modal"
        ariaLabelledby="bpk-modal-label-my-dialog"
        closeLabel="Close modal"
        onClose={() => setOpen(false)}
        isOpen={isOpen}
        {...props}
      >
        {props.children}
      </BpkModalV2>
    </div>
  );
};

const DefaultExample = () => (
  <ModalContainer title="Modal Title" initiallyOpen>
    <Paragraph>
      This is a default modal using the HTML dialog element. You can put
      anything you want in here.
    </Paragraph>
  </ModalContainer>
);

const ContrastExample = () => (
  <ModalContainer
    title="Modal title"
    modalStyle={MODAL_STYLING.surfaceContrast}
    initiallyOpen
  >
    This is a contrast modal. You can put anything you want in here.
  </ModalContainer>
);

const LongTitleExample = () => (
  <ModalContainer
    title="We have to remember what's important in life: friends, waffles, and work. Or waffles, friends, work. But work has to come third."
    initiallyOpen
  >
    <Paragraph>
      This is a default modal using the HTML dialog element. You can put
      anything you want in here.
    </Paragraph>
  </ModalContainer>
);

const HeaderNoTitleExample = () => (
  <ModalContainer initiallyOpen>
    <Paragraph>
      This is a modal using the HTML dialog element without a header. You can
      put anything you want in here.
    </Paragraph>
  </ModalContainer>
);

const OverflowingExample = () => (
  <ModalContainer title="Modal Title" initiallyOpen>
    {' '}
    <Paragraph>{Children.toArray(content)}</Paragraph>
  </ModalContainer>
);

const OverflowingNoTitleExample = () => (
  <ModalContainer initiallyOpen>
    <Paragraph>{Children.toArray(content)}</Paragraph>
  </ModalContainer>
);

const WideExample = () => (
  <ModalContainer title="Modal title" wide initiallyOpen>
    This is a wide modal. You can put anything you want in here.
  </ModalContainer>
);

const WideNoTitleExample = () => (
  <ModalContainer wide initiallyOpen>
    This is a wide modal. You can put anything you want in here.
  </ModalContainer>
);

const NoPaddingExample = () => (
  <ModalContainer title="Modal title" padded initiallyOpen>
    This is a default modal. You can put anything you want in here.
  </ModalContainer>
);

const NoPaddingNoTitleExample = () => (
  <ModalContainer padded initiallyOpen>
    This is a modal without padding. You can put anything you want in here.
  </ModalContainer>
);

const FullScreenOnDesktopExample = () => (
  <ModalContainer title="Modal title" fullScreenOnDesktop initiallyOpen>
    This is a full screen modal for desktop. You can put anything you want in
    here.
  </ModalContainer>
);

const FullScreenOnDesktopNoTitleExample = () => (
  <ModalContainer fullScreenOnDesktop initiallyOpen>
    This is a full screen modal for mobile without title. You can put anything
    you want in here.
  </ModalContainer>
);

const NoFullScreenOnMobileExample = () => (
  <ModalContainer title="Modal title" noFullScreenOnMobile initiallyOpen>
    This is a no full screen modal for mobile. You can put anything you want in
    here.
  </ModalContainer>
);

const NoFullScreenOnMobileNoTitleExample = () => (
  <ModalContainer noFullScreenOnMobile initiallyOpen>
    This is a no full screen modal for mobile without title. You can put
    anything you want in here.
  </ModalContainer>
);

const NoHeaderExample = () => (
  <ModalContainer showHeader={false} initiallyOpen>
    This is a modal without header. You can put anything you want in here.
  </ModalContainer>
);

const MultipleModalsExample = () => (
  <>
    <ModalContainer title="Modal Title 1" initiallyOpen>
      <Paragraph>
        Modal 1: This is a default modal using the HTML dialog element. You can
        put anything you want in here.
      </Paragraph>
    </ModalContainer>
    <br />
    <ModalContainer title="Modal Title 2" initiallyOpen>
      <Paragraph>
        Modal 2: This is a default modal using the HTML dialog element. You can
        put anything you want in here.
      </Paragraph>
    </ModalContainer>
    <br />
    <ModalContainer title="Modal Title 3" initiallyOpen>
      <Paragraph>
        Modal 3: This is a default modal using the HTML dialog element. You can
        put anything you want in here.
      </Paragraph>
    </ModalContainer>
  </>
);

const meta = {
  title: 'bpk-component-modal-v2',
  component: BpkModalV2,
} satisfies Meta<typeof BpkModalV2>;

export default meta;

export const Default = {
  render: () => <DefaultExample />,
};

export const LongTitle = {
  render: () => <LongTitleExample />,
};

export const NoTitle = {
  render: () => <HeaderNoTitleExample />,
};

export const Overflowing = {
  render: () => <OverflowingExample />,
};

export const OverflowingNoTitle = {
  render: () => <OverflowingNoTitleExample />,
};

export const Wide = {
  render: () => <WideExample />,
};

export const WideNoTitle = {
  render: () => <WideNoTitleExample />,
};

export const NoPadding = {
  render: () => <NoPaddingExample />,
};

export const NoPaddingNoTitle = {
  render: () => <NoPaddingNoTitleExample />,
};

export const FullScreenOnDesktop = {
  render: () => <FullScreenOnDesktopExample />,
};

export const FullScreenOnDesktopNoTitle = {
  render: () => <FullScreenOnDesktopNoTitleExample />,
};

export const NoFullScreenOnMobile = {
  render: () => <NoFullScreenOnMobileExample />,
};

export const NoFullScreenOnMobileNoTitle = {
  render: () => <NoFullScreenOnMobileNoTitleExample />,
};

export const NoHeader = {
  render: () => <NoHeaderExample />,
};

export const MultipleModals = {
  render: () => <MultipleModalsExample />,
};

export const Contrast = {
  render: () => <ContrastExample />,
};

// Due to how iframes work we can pass a local url to load the stories above.
// Attempted to use a Custom Iframe component with a react portal and ref to
// render components but it didn't have the desired effect.
const VisualWrapper = ({
  id,
  zoomEnabled = false,
}: {
  id: string;
  zoomEnabled?: boolean;
}) => (
  <div style={{ height: '640px', width: '100%' }}>
    <iframe
      title={`Embedded Storybook ${id}`}
      src={`/iframe.html?id=${id}&viewMode=story&args=zoomEnabled:${zoomEnabled}`}
      aria-label="Embedded Storybook"
      referrerPolicy="origin"
      style={{ height: '100%', width: '100%', border: 0 }}
    />
  </div>
);

// Note that these stories won't work when published to https://backpack.github.io/storybook/
// due to the publicPath containing `/storybook` and the iframe src not including it.
export const VisualTestDefault = {
  render: () => (
    <>
      <VisualWrapper id="bpk-component-modal-v2--default" />
      <VisualWrapper id="bpk-component-modal-v2--contrast" />
      <VisualWrapper id="bpk-component-modal-v2--long-title" />
      <VisualWrapper id="bpk-component-modal-v2--no-title" />
    </>
  ),
  parameters: {
    layout: 'fullscreen',
    percy: {
      waitForTimeout: 10000,
    },
  },
};

export const VisualTestDefaultWithZoom = {
  render: () => (
    <>
      <VisualWrapper id="bpk-component-modal-v2--default" zoomEnabled />
      <VisualWrapper id="bpk-component-modal-v2--contrast" zoomEnabled />
      <VisualWrapper id="bpk-component-modal-v2--long-title" zoomEnabled />
      <VisualWrapper id="bpk-component-modal-v2--no-title" zoomEnabled />
    </>
  ),
  parameters: {
    layout: 'fullscreen',
    percy: {
      waitForTimeout: 10000,
    },
  },
  args: {
    zoomEnabled: true,
  },
};
