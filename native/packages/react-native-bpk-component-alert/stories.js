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

/* @flow */

import React from 'react';
import BpkButton from 'react-native-bpk-component-button';
import { storiesOf, action } from '@storybook/react-native';

import BpkAlert from './index';
import CenterDecorator from '../../storybook/CenterDecorator';

const showAlert = () => {
  BpkAlert.alert(
    'Alert title',
    'Alert message',
    [
      {
        text: 'Cancel',
        onPress: () => action('negative button press'),
        style: 'cancel',
      },
      { text: 'Ok', onPress: () => action('positive button press') },
    ],
    { cancelable: false },
  );
};

const showAlertWithThreeButtons = () => {
  BpkAlert.alert(
    'Alert title',
    'Alert message',
    [
      {
        text: 'Cancel',
        onPress: () => action('negative button pressed'),
        style: 'cancel',
      },
      { text: 'Default', onPress: () => action('positive button press') },
      {
        text: 'Destructive',
        onPress: () => action('Destructive button press'),
        style: 'destructive',
      },
    ],
    { cancelable: false },
  );
};

const showCancelableAlert = () => {
  BpkAlert.alert(
    'Alert title',
    'Alert message',
    [
      {
        text: 'Cancel',
        onPress: () => action('negative button press'),
        style: 'cancel',
      },
      { text: 'Ok', onPress: () => action('positive button press') },
    ],
    { cancelable: true },
  );
};

const showOverflowingAlert = () => {
  BpkAlert.alert(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit \n ' +
      'Suspendisse a massa ac turpis suscipit varius. Quisque ac luctus diam.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n ' +
      'Suspendisse a massa ac turpis suscipit varius. Quisque ac luctus diam.,\n ' +
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n ' +
      'Suspendisse a massa ac turpis suscipit varius.\n ' +
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n ' +
      'Suspendisse a massa ac turpis suscipit varius.\n ' +
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n ' +
      'Suspendisse a massa ac turpis suscipit varius.\n ' +
      'Quisque ac luctus diam. Morbi odio ligula, placerat sagittis nulla et,\n ' +
      'dapibus ullamcorper urna.\n ' +
      'Vestibulum pretium enim turpis, vel commodo erat vehicula vel. \n ' +
      'Quisque ac luctus diam. Morbi odio ligula, placerat sagittis nulla et,\n ' +
      'dapibus ullamcorper urna.\n ' +
      'Vestibulum pretium enim turpis, vel commodo erat vehicula vel. \n ' +
      'Quisque ac luctus diam. Morbi odio ligula, placerat sagittis nulla et,\n ' +
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n ' +
      'Suspendisse a massa ac turpis suscipit varius.\n ' +
      'Quisque ac luctus diam. Morbi odio ligula, placerat sagittis nulla et,\n ' +
      'dapibus ullamcorper urna.\n ' +
      'Vestibulum pretium enim turpis, vel commodo erat vehicula vel. \n ' +
      'Quisque ac luctus diam. Morbi odio ligula, placerat sagittis nulla et,\n ' +
      'dapibus ullamcorper urna.\n ' +
      'Vestibulum pretium enim turpis, vel commodo erat vehicula vel. \n ' +
      'Quisque ac luctus diam. Morbi odio ligula, placerat sagittis nulla et,\n ' +
      'dapibus ullamcorper urna.',
    [
      {
        text: 'No',
        onPress: () => action('negative button press'),
        style: 'cancel',
      },
      { text: 'Yes', onPress: () => action('positive button press') },
    ],
    { cancelable: true },
  );
};

const AlertTrigger = (props: { alert: () => mixed }) => (
  <BpkButton title="Show alert" onPress={props.alert} />
);

storiesOf('react-native-bpk-component-alert', module)
  .addDecorator(CenterDecorator)
  .add('docs:default', () => <AlertTrigger alert={showAlert} />)
  .add('docs:three-button', () => (
    <AlertTrigger alert={showAlertWithThreeButtons} />
  ))
  .add('docs:cancelable', () => <AlertTrigger alert={showCancelableAlert} />)
  .add('overflowing', () => <AlertTrigger alert={showOverflowingAlert} />);
