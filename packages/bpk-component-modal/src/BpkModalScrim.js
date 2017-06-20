import React from 'react';
import { TransitionInitialMount, cssModules } from 'bpk-react-utils';

import STYLES from './bpk-modal-scrim.scss';

const getClassName = cssModules(STYLES);

const BpkModalScrim = () => (
  <TransitionInitialMount
    appearClassName={getClassName('bpk-modal-scrim--appear')}
    appearActiveClassName={getClassName('bpk-modal-scrim--appear-active')}
    transitionTimeout={200}
  >
    <div className={getClassName('bpk-modal-scrim')} />
  </TransitionInitialMount>
);

export default BpkModalScrim;
