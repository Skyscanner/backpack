import getScriptDirection from './getScriptDirection';

const tryFlipAttachmentString = (value) => {
  if (value.indexOf('right') !== -1) {
    return value.replace('right', 'left');
  }

  return value.replace('left', 'right');
};

const transform = (tetherOptions) => {
  const isRTL = getScriptDirection() === 'rtl';
  const { attachment, targetAttachment, ...rest } = tetherOptions;

  const options = {};

  if (attachment) {
    options.attachment = isRTL
      ? tryFlipAttachmentString(attachment)
      : attachment;
  }

  if (targetAttachment) {
    options.targetAttachment = isRTL
      ? tryFlipAttachmentString(targetAttachment)
      : targetAttachment;
  }

  return { ...options, ...rest };
};


export default transform;
export { getScriptDirection };
