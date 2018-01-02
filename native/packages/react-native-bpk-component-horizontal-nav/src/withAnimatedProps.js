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

/*
 Higher order component that takes a component and an array of property names,
 then converts said properties into instances of Animated.Value, then adds
 a componentWillReceiveProps listener so that when they change, they are updated
 with an animation.

 Sample usage:

 const myComponent (props) = <Animated.View style={{ width: props.someProp }} />;
 const animatedComponent = withAnimatedProps(myComponent, ['someProp']);

 Now when `someProp` changes, it will be animated.
 */

import React from 'react';
import { Animated } from 'react-native';
import { animationDurationSm } from 'bpk-tokens/tokens/base.react.native';

const withAnimatedProps = (Component, propsToMonitor) =>
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      propsToMonitor.forEach(prop => {
        this.state[prop] = new Animated.Value(props[prop]);
      });
    }
    componentWillReceiveProps(nextProps) {
      const animations = propsToMonitor.map(prop =>
        Animated.timing(this.state[prop], {
          toValue: nextProps[prop],
          duration: animationDurationSm,
        }),
      );
      Animated.parallel(animations).start();
    }
    render() {
      const newProps = {};
      propsToMonitor.forEach(prop => {
        newProps[prop] = this.state[prop];
      });
      return <Component {...this.props} {...newProps} />;
    }
  };

export default withAnimatedProps;
