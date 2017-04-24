import React, { PropTypes, Component } from 'react';

const isNumber = n => !isNaN(parseFloat(n)) && isFinite(n);

const isTransitionEndSupported = () => !!(typeof window !== 'undefined' && 'TransitionEvent' in window);

class AnimateHeight extends Component {
  constructor(props) {
    super(props);

    let height = 'auto';
    let overflow = 'visible';

    if (isNumber(this.props.height)) {
      height = this.props.height < 0 ? 0 : this.props.height;
      overflow = 'hidden';
    }

    this.state = {
      height,
      overflow,
    };

    this.onTransitionEnd = this.onTransitionEnd.bind(this);
  }

  componentDidMount() {
    if (this.contentElement && this.props.height === 0) {
      this.contentElement.style.display = 'none';
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      height,
    } = this.props;

    // Check if 'height' prop has changed
    if (this.contentElement && nextProps.height !== height) {
      // Cache content height
      this.contentElement.style.display = '';
      this.contentElement.style.overflow = 'hidden';
      const contentHeight = this.contentElement.offsetHeight;
      this.contentElement.style.overflow = '';

      let newHeight = null;
      let shouldSetTimeout = false;
      let timeoutHeight = null;
      let timeoutOverflow = 'hidden';
      let timeoutDuration = nextProps.duration;

      clearTimeout(this.timeoutID);

      if (isNumber(nextProps.height)) {
        // If new height is a number
        newHeight = nextProps.height < 0 ? 0 : nextProps.height;
      } else {
        // If not, animate to content height
        // and then reset to auto
        newHeight = contentHeight;
        shouldSetTimeout = true;
        timeoutHeight = 'auto';
        timeoutOverflow = 'visible';
      }

      if (this.state.height === 'auto') {
        // If previous height was 'auto'
        // set it explicitly to be able to use transition
        shouldSetTimeout = true;
        timeoutHeight = newHeight;

        newHeight = contentHeight;
        timeoutDuration = 50;
      }

      this.setState({
        height: newHeight,
        overflow: 'hidden',
      });

      if (shouldSetTimeout) {
        this.timeoutID = setTimeout(() => {
          this.setState({
            height: timeoutHeight,
            overflow: timeoutOverflow,
          });

          if (!isTransitionEndSupported()) {
            this.onTransitionEnd();
          }
        }, timeoutDuration);
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutID);
    this.timeoutID = null;
  }

  onTransitionEnd() {
    if (this.contentElement && this.props.height === 0) {
      this.contentElement.style.display = 'none';
    }
  }

  render() {
    const {
      children,
      duration,
      easing,
      style,
      ...rest
    } = this.props;

    const {
      height,
      overflow,
    } = this.state;

    const componentStyle = {
      ...style,
      height,
      overflow,
      WebkitTransition: `height ${duration}ms ${easing} `,
      MozTransition: `height ${duration}ms ${easing} `,
      OTransition: `height ${duration}ms ${easing} `,
      msTransition: `height ${duration}ms ${easing} `,
      transition: `height ${duration}ms ${easing} `,
    };

    delete rest.height;

    return (
      <div
        style={componentStyle}
        onTransitionEnd={this.onTransitionEnd}
        {...rest}
      >
        <div ref={(el) => { this.contentElement = el; }}>
          { children }
        </div>
      </div>
    );
  }
}

AnimateHeight.propTypes = {
  children: PropTypes.node.isRequired,
  duration: PropTypes.number.isRequired,
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  easing: PropTypes.string,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

AnimateHeight.defaultProps = {
  easing: 'ease',
  style: {},
};

export default AnimateHeight;
