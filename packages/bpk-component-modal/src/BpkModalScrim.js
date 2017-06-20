import React from 'react';
import { TransitionInitialMount } from 'bpk-react-utils';

import './bpk-modal.scss';

const BpkModalScrim = () => (
  <TransitionInitialMount
    appearClassName="bpk-modal-scrim--appear"
    appearActiveClassName="bpk-modal-scrim--appear-active"
    transitionTimeout={200}
  >
    <div className="bpk-modal-scrim" />
  </TransitionInitialMount>
);

export default BpkModalScrim;
