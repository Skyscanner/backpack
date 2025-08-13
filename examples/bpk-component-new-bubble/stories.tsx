import { NewBubbleExample } from './examples';
import BpkNavigationTabGroup from '../../packages/bpk-component-navigation-tab-group';

export const VisualTest = NewBubbleExample;

export default {
  title: 'bpk-component-new-bubble',
  component: <></>,
};

export const VisualTestWithZoom = {
  render: VisualTest,
  args: {
    zoomEnabled: true
  }
};
