import React from 'react';
import { TransitionInitialMount } from 'bpk-react-utils';

import './bpk-modal.scss';

const BpkModalScrim = () => {
  const className = 'bpk-modal-scrim';

  return (
    <TransitionInitialMount classNamePrefix={className} transitionTimeout={200}>
      <div className={className} />
    </TransitionInitialMount>
  );
};

export default BpkModalScrim;
