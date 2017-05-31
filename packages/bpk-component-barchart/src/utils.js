const center = (scale) => {
  let offset = scale.bandwidth() / 2;
  if (scale.round()) {
    offset = Math.round(offset);
  }
  return d => scale(d) + offset;
};

const identity = x => x;

export {
  center,
  identity,
};
