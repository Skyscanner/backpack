import { cssModules } from 'bpk-react-utils';

import STYLES from './bpk-icon.scss';
import classNameModifierHOCFactory from './classNameModifierHOCFactory';

const getClassName = cssModules(STYLES);

export default classNameModifierHOCFactory('withRtlSupport', [getClassName('bpk-icon--rtl-support')]);
