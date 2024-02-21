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

import { Component, Children } from 'react';
import type { ReactNode } from 'react';

import { action } from '../bpk-storybook-utils';
import { cssModules, withDefaultProps } from '../../packages/bpk-react-utils';
import BpkButton from '../../packages/bpk-component-button';
import BpkText, { TEXT_STYLES } from '../../packages/bpk-component-text';
import BpkBottomSheet from '../../packages/bpk-component-bottom-sheet';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

const Paragraph = withDefaultProps(BpkText, {
  textStyle: TEXT_STYLES.bodyDefault,
  tagName: 'p',
  className: getClassName('bpk-bottom-sheet-paragraph'),
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

class BottomSheetContainer extends Component<
  {
    children: ReactNode,
  },
  {
    isOpen: boolean,
  }
> {

  constructor() {
    super();

    this.state = {
      isOpen: false,
    };
  }

  onOpen = () => {
    this.setState({
      isOpen: true,
    });
  };

  onClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    const { children, ...rest } =
      this.props;

    return (
      <div id="bottom-sheet-container">
        <div id="pagewrap">
          <BpkButton onClick={this.onOpen}>
            Open bottom sheet
          </BpkButton>
          <BpkBottomSheet
            id="my-bottom-sheet"
            isOpen={this.state.isOpen}
            onClose={this.onClose}
            {...rest}
          >
            {children}
          </BpkBottomSheet>
        </div>
      </div>
    );
  }
}

const DefaultExample = () => (
  <BottomSheetContainer title="Bottom Sheet title" closeLabel="Close Bottom Sheet">
    This is a default bottom sheet. You can put anything you want in here.
  </BottomSheetContainer>
);

const BackdropClickCloseExample = () => (
  <BottomSheetContainer title="Bottom Sheet title" closeLabel="Close Bottom Sheet" closeOnScrimClick>
    This is a default bottom sheet. You can put anything you want in here.
  </BottomSheetContainer>
);

const EscapeCloseExample = () => (
  <BottomSheetContainer title="Bottom Sheet title" closeLabel="Close Bottom Sheet" closeOnEscPressed>
    This is a default bottom sheet. You can put anything you want in here.
  </BottomSheetContainer>
);

const OverflowingExample = () => (
  <BottomSheetContainer title="Bottom Sheet title" closeLabel="Close Bottom Sheet">
    <>{Children.toArray(content)}</>
  </BottomSheetContainer>
);

const NoHeaderExample = () => (
  <BottomSheetContainer
    closeLabel="Close Bottom Sheet"
  >
    This is a default bottom sheet. You can put anything you want in here.
  </BottomSheetContainer>
);

const NoHeaderWithActionButtonExample = () => (
  <BottomSheetContainer
    closeLabel="Close Bottom Sheet" actionText="Action" onAction={action('Action clicked')}
  >
    This is a default bottom sheet. You can put anything you want in here.
  </BottomSheetContainer>
);

const ActionButtonExample = () => (
  <BottomSheetContainer title="Bottom Sheet title" closeLabel="Close Bottom Sheet" actionText="Action" onAction={action('Action clicked')}>
    This is a default bottom sheet. You can put anything you want in here.
  </BottomSheetContainer>
);

const WideExample = () => (
  <BottomSheetContainer title="Bottom Sheet title" closeLabel="Close Bottom Sheet" wide>
    This is a wide bottom sheet.
  </BottomSheetContainer>
);

export {
  DefaultExample,
  BackdropClickCloseExample,
  EscapeCloseExample,
  OverflowingExample,
  NoHeaderExample,
  NoHeaderWithActionButtonExample,
  ActionButtonExample,
  WideExample
};
