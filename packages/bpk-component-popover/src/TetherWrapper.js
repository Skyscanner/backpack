import Tether from 'tether';

// We extend tether to hook into the position function in order to expose
// a `position` event on the tether object. Useful for repositioning arrows
// etc. See http://tether.io/advanced/extending_tether/.
Tether.modules.push({
  position(props) {
    this.trigger('position', props);
  },
});

export default Tether;
