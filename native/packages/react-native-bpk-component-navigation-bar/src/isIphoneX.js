import { DeviceInfo } from 'react-native';

export default (() => {
  const { width, height } = DeviceInfo.Dimensions.window;
  return width === 375 && height === 812;
})();
