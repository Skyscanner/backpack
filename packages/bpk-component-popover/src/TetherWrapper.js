import Tether from 'tether';

Tether.modules.push({
  position(props) {
    this.trigger('position', props);
  },
});

export default Tether;
