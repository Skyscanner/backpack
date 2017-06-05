const center = (scale) => {
  let offset = scale.bandwidth() / 2;
  if (scale.round()) {
    offset = Math.round(offset);
  }
  return d => scale(d) + offset;
};

const identity = x => x;

const remToPx = (value) => {
  let parsed = null;

  if (/rem$/.test(value)) {
    parsed = parseFloat(value.replace(/rem/, '')) * 16;
  }

  return parsed || null;
};

export {
  center,
  identity,
  remToPx,
};
