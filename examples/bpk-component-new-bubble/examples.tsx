import STYLES from './examples.module.scss';

const getClassNames = cssModules(STYLES);

import { cssModules } from '../../packages/bpk-react-utils';
import BpkNavigationTabGroup, {
  type BpkNavigationTabGroupProps,
} from '../../packages/bpk-component-navigation-tab-group';
import {
  NAVIGATION_TAB_GROUP_TYPES
} from '../../packages/bpk-component-navigation-tab-group/src/BpkNavigationTabGroup';
import BpkText from '../../packages/bpk-component-text';

const renderTabLabel = (text: string) => {
  if (text === 'Packages') {
    // Only apply to the 4th tab
    return (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <BpkText>{text}</BpkText>
        <div
          style={{
            position: 'absolute',
            top: -10,
            right: -20,
            backgroundColor: '#d92b77',
            color: '#fff',
            padding: '2px 6px',
            borderRadius: '12px',
            fontSize: '10px',
            fontWeight: 600,
          }}
        >
          New
        </div>
      </div>
    );
  }

  return text; // unchanged for others
};

const tabsWithBlankTarget: BpkNavigationTabGroupProps['tabs'] = [
  { id: 'air', text: 'Flights', href: '/', target: '_blank' },
  { id: 'hotel', text: 'Hotels', href: '/hotel', target: '_blank' },
  { id: 'car', text: 'Car hire', href: '/carhire', target: '_blank' },
  { id: 'explore', text: 'Explore', href: '/Explore', target: '_blank' },
];

const NewBubbleExample = () => {


};

export {
  NewBubbleExample,
};
