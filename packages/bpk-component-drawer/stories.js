/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { cssModules, withDefaultProps } from 'bpk-react-utils';

import BpkButton from 'bpk-component-button';
import BpkText from 'bpk-component-text';

import BpkDrawer from './index';

import STYLES from './stories.css';

const getClassName = cssModules(STYLES);

const Paragraph = withDefaultProps(BpkText, {
  textStyle: 'base',
  tagName: 'p',
  className: getClassName('bpk-drawer-paragraph'),
});

class DrawerContainer extends Component {
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
    const { buttonText, ...rest } = this.props;

    return (
      <div id="drawer-container">
        <div id="pagewrap">
          <BpkButton onClick={this.onOpen}>{buttonText}</BpkButton>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut egestas
            sit amet nisi nec ultrices. In efficitur justo ac tristique
            ultricies. Mauris luctus felis arcu, a porttitor turpis aliquet
            faucibus. Aenean nibh nulla, dictum sit amet efficitur cursus,
            molestie vitae enim. Aenean vel nunc purus. Vestibulum consectetur
            luctus eros ac bibendum. Donec pretium nunc mi, sed iaculis nibh
            aliquet in. Integer ut accumsan orci, non hendrerit nunc. Quisque
            ante enim, convallis lacinia arcu eu, tincidunt dignissim nunc.
            Nulla facilisi. Curabitur mattis sapien imperdiet, dignissim ligula
            id, maximus erat. Morbi sed eros vitae augue accumsan dictum sit
            amet eu lectus. Integer vitae consectetur libero, sed porttitor
            urna.
          </Paragraph>
          <Paragraph>
            In arcu leo, bibendum in vestibulum quis, vulputate sed nisl. Donec
            sit amet turpis quis metus viverra rutrum id id elit. Duis luctus,
            mauris ut accumsan vehicula, magna lorem posuere velit, nec laoreet
            magna ante ut nulla. Vivamus vestibulum bibendum purus quis dictum.
            In accumsan convallis tempor. Proin porta massa et metus viverra
            feugiat. Aenean blandit pellentesque nunc, in interdum magna
            molestie non. Suspendisse pretium lectus et libero fringilla
            placerat. Aliquam pellentesque odio non maximus egestas. Nam feugiat
            mi ac neque sodales, in euismod dolor varius.
          </Paragraph>
          <Paragraph>
            Aenean tempus tempus lorem in consequat. Quisque nec felis vitae mi
            commodo ultricies sit amet in lectus. Praesent imperdiet auctor nisl
            sit amet ultricies. Donec posuere placerat nulla a scelerisque.
            Nulla sit amet eleifend magna. Ut eu cursus metus, id pulvinar
            lectus. Proin euismod sed ex vel dignissim. Donec faucibus nec risus
            eu pellentesque. Cras vulputate varius volutpat. Duis ut nisi nulla.
            Duis volutpat lectus purus. Aliquam placerat dignissim mauris vitae
            interdum. Donec venenatis mattis mi eu facilisis. Maecenas
            pellentesque eros elementum, tincidunt tortor ac, fringilla massa.
            Cras sed orci nec erat porttitor lacinia vitae sed arcu.
          </Paragraph>
          <Paragraph>
            Nunc lobortis arcu eget tellus tincidunt commodo. Phasellus ac
            tortor turpis. Cras ac quam non metus iaculis sollicitudin.
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia Curae; Morbi aliquam consectetur nisl at fermentum.
            Phasellus nisi arcu, fermentum ut malesuada eu, ultrices nec enim.
            Donec eleifend eros mauris, eu rutrum tellus suscipit ac.
            Pellentesque finibus mollis arcu, non tempor lorem gravida at. Nam
            laoreet neque quis gravida blandit. Mauris pharetra urna hendrerit
            pretium auctor. Aliquam erat volutpat. Class aptent taciti sociosqu
            ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce
            quis felis non lectus egestas pretium id sed erat. Aliquam dapibus
            erat sit amet facilisis luctus.
          </Paragraph>
          <Paragraph>
            Vestibulum convallis ut nulla in iaculis. Aliquam erat volutpat.
            Nullam non semper sem. Ut gravida est eu nisi condimentum, lobortis
            gravida ipsum tincidunt. Duis lacinia tincidunt suscipit. Maecenas
            tincidunt quam ipsum, non sodales ante placerat in. Suspendisse
            malesuada auctor erat, vel pulvinar erat dignissim vitae.
          </Paragraph>
        </div>
        <BpkDrawer
          id="my-drawer"
          className="my-classname"
          isOpen={this.state.isOpen}
          onClose={this.onClose}
          renderTarget={() => document.getElementById('drawer-container')}
          {...rest}
        />
      </div>
    );
  }
}

DrawerContainer.propTypes = {
  buttonText: PropTypes.string.isRequired,
};

storiesOf('bpk-component-drawer', module)
  .add('Default', () => (
    <DrawerContainer
      title="Drawer title"
      closeLabel="Close drawer"
      buttonText="Open drawer"
      getApplicationElement={() => document.getElementById('pagewrap')}
    >
      This is a default drawer. You can put anything you want in here.
    </DrawerContainer>
  ))
  .add('Overflowing', () => (
    <DrawerContainer
      title="Drawer title"
      closeLabel="Close drawer"
      buttonText="Open overflowing drawer"
      getApplicationElement={() => document.getElementById('pagewrap')}
    >
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lacus
        nunc, tempor eget dapibus eget, ultrices sit amet nunc. Maecenas aliquet
        quam nec dui hendrerit, dictum fermentum turpis finibus. Proin ante
        purus, blandit id quam vitae, dignissim venenatis felis. Donec congue
        sem ac felis semper, at efficitur enim pulvinar. Nunc molestie in orci
        sit amet vestibulum. Ut mattis ante ac lacus ornare, nec sagittis ex
        finibus. Fusce condimentum dolor ac dignissim rutrum. Vivamus laoreet in
        lectus eu congue. Aliquam mollis, mauris in tincidunt gravida, orci urna
        porta sapien, ac facilisis leo eros et elit. Vivamus fermentum neque
        metus, et convallis lectus ultricies in. Phasellus eget erat in nibh
        pretium convallis. Fusce sed semper ante. Phasellus eget elementum
        lacus.
      </Paragraph>
      <Paragraph>
        Nunc pretium erat nec ante faucibus molestie. Vestibulum ultrices purus
        quis lorem consectetur sollicitudin. Mauris dapibus ac libero et
        bibendum. In malesuada eget nisl ac bibendum. Etiam ac nulla egestas,
        luctus eros quis, ornare libero. Fusce a lacinia dolor. Nullam auctor
        finibus dui, sit amet luctus nibh blandit in. Maecenas justo tortor,
        faucibus ut ante ac, eleifend ornare nisl. Quisque tempus, metus sit
        amet fringilla tristique, urna mi tincidunt nulla, et tristique eros
        mauris sed ex. Sed lorem odio, elementum congue tellus vitae, suscipit
        hendrerit ipsum.
      </Paragraph>
      <Paragraph>
        Curabitur a posuere dolor. Maecenas accumsan magna nec risus facilisis
        tristique. Aliquam mollis lectus ac mi scelerisque condimentum. Sed id
        est ut felis euismod maximus. Fusce sit amet erat imperdiet, lacinia
        libero vitae, eleifend erat. Integer cursus, est vitae hendrerit
        eleifend, justo ipsum mattis neque, vitae consectetur arcu massa vitae
        orci. Sed rhoncus nisi id est tristique, finibus convallis ligula
        rutrum. Pellentesque volutpat, neque eget consequat commodo, diam orci
        aliquam ex, eget ornare nulla ipsum ac eros. Nunc quis tempus diam.
        Mauris congue fringilla ligula id lacinia. Donec vulputate eleifend
        pellentesque. Cras ut imperdiet metus, ut imperdiet nulla. Fusce a metus
        lacinia, ullamcorper ante eu, semper urna. Vestibulum eu velit eu ipsum
        dictum volutpat nec rutrum augue.
      </Paragraph>
      <Paragraph>
        Vestibulum eu posuere erat. Ut id turpis nibh. Aenean congue mi eu
        scelerisque bibendum. Curabitur vel metus elementum, laoreet erat in,
        pellentesque magna. Morbi consectetur lectus eu quam bibendum viverra.
        Donec sed est ut nunc facilisis dictum. Praesent lacinia neque ante, in
        pellentesque ante tempus sit amet. Fusce vehicula tincidunt auctor.
        Quisque ornare, diam et ultricies blandit, augue ipsum congue eros, a
        volutpat tellus massa in sem. Etiam interdum nibh nec orci molestie
        pretium.
      </Paragraph>
      <Paragraph>
        Quisque eleifend ullamcorper metus, eget auctor eros varius ut. Proin
        faucibus non mauris quis pharetra. Curabitur porttitor enim et
        sollicitudin feugiat. Morbi suscipit molestie risus, eu sodales lacus
        accumsan eu. Proin eget consequat turpis. Cras auctor magna id quam
        mattis, ac sollicitudin erat viverra. Aliquam sit amet blandit quam, vel
        facilisis ipsum. Maecenas at risus semper, venenatis orci vitae, aliquam
        velit.
      </Paragraph>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lacus
        nunc, tempor eget dapibus eget, ultrices sit amet nunc. Maecenas aliquet
        quam nec dui hendrerit, dictum fermentum turpis finibus. Proin ante
        purus, blandit id quam vitae, dignissim venenatis felis. Donec congue
        sem ac felis semper, at efficitur enim pulvinar. Nunc molestie in orci
        sit amet vestibulum. Ut mattis ante ac lacus ornare, nec sagittis ex
        finibus. Fusce condimentum dolor ac dignissim rutrum. Vivamus laoreet in
        lectus eu congue. Aliquam mollis, mauris in tincidunt gravida, orci urna
        porta sapien, ac facilisis leo eros et elit. Vivamus fermentum neque
        metus, et convallis lectus ultricies in. Phasellus eget erat in nibh
        pretium convallis. Fusce sed semper ante. Phasellus eget elementum
        lacus.
      </Paragraph>
      <Paragraph>
        Nunc pretium erat nec ante faucibus molestie. Vestibulum ultrices purus
        quis lorem consectetur sollicitudin. Mauris dapibus ac libero et
        bibendum. In malesuada eget nisl ac bibendum. Etiam ac nulla egestas,
        luctus eros quis, ornare libero. Fusce a lacinia dolor. Nullam auctor
        finibus dui, sit amet luctus nibh blandit in. Maecenas justo tortor,
        faucibus ut ante ac, eleifend ornare nisl. Quisque tempus, metus sit
        amet fringilla tristique, urna mi tincidunt nulla, et tristique eros
        mauris sed ex. Sed lorem odio, elementum congue tellus vitae, suscipit
        hendrerit ipsum.
      </Paragraph>
      <Paragraph>
        Curabitur a posuere dolor. Maecenas accumsan magna nec risus facilisis
        tristique. Aliquam mollis lectus ac mi scelerisque condimentum. Sed id
        est ut felis euismod maximus. Fusce sit amet erat imperdiet, lacinia
        libero vitae, eleifend erat. Integer cursus, est vitae hendrerit
        eleifend, justo ipsum mattis neque, vitae consectetur arcu massa vitae
        orci. Sed rhoncus nisi id est tristique, finibus convallis ligula
        rutrum. Pellentesque volutpat, neque eget consequat commodo, diam orci
        aliquam ex, eget ornare nulla ipsum ac eros. Nunc quis tempus diam.
        Mauris congue fringilla ligula id lacinia. Donec vulputate eleifend
        pellentesque. Cras ut imperdiet metus, ut imperdiet nulla. Fusce a metus
        lacinia, ullamcorper ante eu, semper urna. Vestibulum eu velit eu ipsum
        dictum volutpat nec rutrum augue.
      </Paragraph>
      <Paragraph>
        Vestibulum eu posuere erat. Ut id turpis nibh. Aenean congue mi eu
        scelerisque bibendum. Curabitur vel metus elementum, laoreet erat in,
        pellentesque magna. Morbi consectetur lectus eu quam bibendum viverra.
        Donec sed est ut nunc facilisis dictum. Praesent lacinia neque ante, in
        pellentesque ante tempus sit amet. Fusce vehicula tincidunt auctor.
        Quisque ornare, diam et ultricies blandit, augue ipsum congue eros, a
        volutpat tellus massa in sem. Etiam interdum nibh nec orci molestie
        pretium.
      </Paragraph>
      <Paragraph>
        Quisque eleifend ullamcorper metus, eget auctor eros varius ut. Proin
        faucibus non mauris quis pharetra. Curabitur porttitor enim et
        sollicitudin feugiat. Morbi suscipit molestie risus, eu sodales lacus
        accumsan eu. Proin eget consequat turpis. Cras auctor magna id quam
        mattis, ac sollicitudin erat viverra. Aliquam sit amet blandit quam, vel
        facilisis ipsum. Maecenas at risus semper, venenatis orci vitae, aliquam
        velit.
      </Paragraph>
    </DrawerContainer>
  ))
  .add('Close button text', () => (
    <DrawerContainer
      title="Drawer title"
      closeText="Done"
      buttonText="Open drawer"
      getApplicationElement={() => document.getElementById('pagewrap')}
    >
      This is a default drawer. You can put anything you want in here.
    </DrawerContainer>
  ))
  .add('With visually hidden title', () => (
    <DrawerContainer
      title="Drawer title"
      hideTitle
      closeLabel="Close drawer"
      buttonText="Open drawer"
      getApplicationElement={() => document.getElementById('pagewrap')}
    >
      This is a default drawer. You can put anything you want in here.
    </DrawerContainer>
  ))
  .add('With full height content', () => (
    <DrawerContainer
      title="Drawer title"
      closeLabel="Close drawer"
      buttonText="Open drawer"
      getApplicationElement={() => document.getElementById('pagewrap')}
      contentClassName={getClassName('bpk-drawer-content-container')}
    >
      This is a flex drawer. You can put anything you want in here.
      <BpkButton secondary className={getClassName('bpk-drawer-button')}>
        I don&apos;t do anything.
      </BpkButton>
    </DrawerContainer>
  ));
