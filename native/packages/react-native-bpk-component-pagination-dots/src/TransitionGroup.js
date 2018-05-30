import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';

/**
 * light port of `ReactTransitionGroup` to work in react-native, this component is heavily based on react v15.3.0
 * version of `ReactTransitionGroup`
 */
class TransitionGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      children: this.getChildMapping(props.children),
    };
  }

  componentWillMount() {
    this.currentlyTransitioningKeys = {};
    this.keysToEnter = [];
    this.keysToLeave = [];
  }

  componentDidMount() {
    const initialChildMapping = this.state.children;

    Object.keys(initialChildMapping).forEach(key => {
      this.performAppear(key);
    });
  }

  getChildMapping(children) {
    if (React.Children.count(children) === 0) {
      return {};
    }

    const mapping = {};
    React.Children.toArray(children).forEach(node => {
      mapping[node.key] = node;
    });

    return mapping;
  }

  componentWillReceiveProps(nextProps) {
    const nextChildMapping = this.getChildMapping(nextProps.children);
    const prevChildMapping = this.state.children;

    const newChildren = {
      ...prevChildMapping,
      ...nextChildMapping,
    };

    const sortedChildren = {};

    Object.keys(newChildren)
      .sort()
      .forEach(key => {
        sortedChildren[key] = newChildren[key];
      });

    this.setState({
      children: sortedChildren,
    });

    Object.keys(nextChildMapping).forEach(key => {
      const hasPrev = prevChildMapping && prevChildMapping.hasOwnProperty(key);
      if (
        nextChildMapping[key] &&
        !hasPrev &&
        !this.currentlyTransitioningKeys[key]
      ) {
        this.keysToEnter.push(key);
      }
    });

    Object.keys(prevChildMapping).forEach(key => {
      const hasNext = nextChildMapping && nextChildMapping.hasOwnProperty(key);
      if (
        prevChildMapping[key] &&
        !hasNext &&
        !this.currentlyTransitioningKeys[key]
      ) {
        this.keysToLeave.push(key);
      }
    });
  }

  componentDidUpdate() {
    const keysToEnter = this.keysToEnter;
    this.keysToEnter = [];
    keysToEnter.forEach(key => {
      this.performEnter(key);
    });

    const keysToLeave = this.keysToLeave;
    this.keysToLeave = [];
    keysToLeave.forEach(key => {
      this.performLeave(key);
    });
  }

  performAppear(key) {
    this.currentlyTransitioningKeys[key] = true;

    const component = this.refs[key];

    if (component && component.componentWillAppear) {
      component.componentWillAppear(this.handleDoneAppearing.bind(this, key));
    } else {
      this.handleDoneAppearing(key);
    }
  }

  handleDoneAppearing(key) {
    const component = this.refs[key];
    if (component && component.componentDidAppear) {
      component.componentDidAppear();
    }

    delete this.currentlyTransitioningKeys[key];

    const currentChildMapping = this.getChildMapping(this.props.children);
    if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
      // This was removed before it had fully appeared. Remove it.
      this.performLeave(key);
    }
  }

  performEnter(key) {
    this.currentlyTransitioningKeys[key] = true;

    const component = this.refs[key];

    if (component && component.componentWillEnter) {
      component.componentWillEnter(this.handleDoneEntering.bind(this, key));
    } else {
      this.handleDoneEntering(key);
    }
  }

  handleDoneEntering(key) {
    const component = this.refs[key];
    if (component && component.componentDidEnter) {
      component.componentDidEnter();
    }

    delete this.currentlyTransitioningKeys[key];

    const currentChildMapping = this.getChildMapping(this.props.children);

    if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
      // This was removed before it had fully entered. Remove it.
      this.performLeave(key);
    }
  }

  performLeave(key) {
    this.currentlyTransitioningKeys[key] = true;

    const component = this.refs[key];
    if (component && component.componentWillLeave) {
      component.componentWillLeave(this.handleDoneLeaving.bind(this, key));
    } else {
      // Note that this is somewhat dangerous b/c it calls setState()
      // again, effectively mutating the component before all the work
      // is done.
      this.handleDoneLeaving(key);
    }
  }

  handleDoneLeaving(key) {
    const component = this.refs[key];

    if (component && component.componentDidLeave) {
      component.componentDidLeave();
    }

    delete this.currentlyTransitioningKeys[key];

    const currentChildMapping = this.getChildMapping(this.props.children);

    if (currentChildMapping && currentChildMapping.hasOwnProperty(key)) {
      // This entered again before it fully left. Add it again.
      this.performEnter(key);
    } else {
      const newChildren = {
        ...this.state.children,
      };

      delete newChildren[key];

      this.setState({
        children: newChildren,
      });
    }
  }

  render() {
    const childrenToRender = [];
    Object.keys(this.state.children).forEach(key => {
      const child = this.state.children[key];
      if (child) {
        // You may need to apply reactive updates to a child as it is leaving.
        // The normal React way to do it won't work since the child will have
        // already been removed. In case you need this behavior you can provide
        // a childFactory function to wrap every child, even the ones that are
        // leaving.
        childrenToRender.push(
          React.cloneElement(child, {
            ref: key,
            key,
          }),
        );
      }
    });

    return <View {...this.props}>{childrenToRender}</View>;
  }
}

TransitionGroup.defaultProps = {
  pointerEvents: 'box-none',
};

TransitionGroup.propTypes = {
  pointerEvents: PropTypes.string,
};

export default TransitionGroup;
