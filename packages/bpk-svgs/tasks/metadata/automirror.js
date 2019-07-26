const fs = require('fs');
const path = require('path');

const infoFile = path.join(__dirname, 'auto-mirrored-icons.txt');

const withAutoMirrorData = () => {
  const info = fs.readFileSync(infoFile, 'utf8').split('\n');
  return item =>
    Object.assign(
      item,
      Object.assign(item.data, {
        autoMirror: !!info.find(i => i === item.icon),
      }),
    );
};

export default withAutoMirrorData;
