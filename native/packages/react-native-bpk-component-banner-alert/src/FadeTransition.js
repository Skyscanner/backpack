import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  ViewPropTypes,
} from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

/**
 * Used to wrap in child components of ReactTransitionGroup, to specify the animation for enter / leave.
 */
class FadeTransition extends Component {
  constructor() {
    super();

    this.state = {
      progress: new Animated.Value(0.01),
    };
  }

  componentWillAppear(callback) {
    this.componentWillEnter(callback);
  }

  componentWillEnter(callback) {
    Animated.timing(this.state.progress, {
      toValue: 1,
      delay: this.props.inDelay,
      easing: this.props.easing,
      duration: this.props.inDuration,
    }).start(callback);
  }

  componentWillLeave(callback) {
    Animated.timing(this.state.progress, {
      toValue: 0.01,
      delay: this.props.outDelay,
      easing: this.props.easing,
      duration: this.props.outDuration,
    }).start(callback);
  }

  render() {
    const animation = {
      opacity: this.state.progress,
    };

    return (
      <Animated.View
        pointerEvents={this.props.pointerEvents}
        style={[styles.container, this.props.style, animation]}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

FadeTransition.defaultProps = {
  easing: Easing.linear(),
  inDelay: 0,
  inDuration: 4000,
  outDelay: 0,
  outDuration: 4000,
  pointerEvents: 'box-none',
  style: null,
  children: null,
};

FadeTransition.propTypes = {
  easing: PropTypes.func,
  inDelay: PropTypes.number,
  inDuration: PropTypes.number,
  outDelay: PropTypes.number,
  outDuration: PropTypes.number,
  pointerEvents: PropTypes.string,
  style: ViewPropTypes.style,
  children: PropTypes.node,
};

export default FadeTransition;
