import React from 'react';

import './bpk-modal.scss';
import TransitionInitialMount from './TransitionInitialMount';

const BpkModalScrim = () => {
  const className = 'bpk-modal-scrim';

  return (
    <TransitionInitialMount classNamePrefix={className} transitionTimeout={200}>
      <div className={className} />
    </TransitionInitialMount>
  );
};

export default BpkModalScrim;
