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
import React from 'react';
import addons from '@storybook/addons';
import { RTL_EVENT } from '../constants';

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rtlEnabled: false,
    };
  }

  toggleRtl = () => {
    this.setState(prevState => ({
      rtlEnabled: !prevState.rtlEnabled,
    }));
    const channel = addons.getChannel();
    channel.emit(RTL_EVENT, this.state.rtlEnabled);
  };

  render() {
    return (
      <div>
        <button type="button" onClick={this.toggleRtl}>
          {this.state.rtlEnabled ? 'Disable' : 'Enable'} RTL
        </button>
      </div>
    );
  }
}

// Register the addon with a unique name.
addons.register('rtl-toggle', api => {
  // Also need to set a unique name to the panel.
  addons.addPanel('rtl-toggle/panel', {
    title: 'RTL',
    render: () => <Panel channel={addons.getChannel()} api={api} />,
  });
});
