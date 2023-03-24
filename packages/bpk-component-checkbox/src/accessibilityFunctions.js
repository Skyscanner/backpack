export const selectivelyHideNonLinkElements = (node) => {
  if (typeof node !== 'object') return <span aria-hidden>{node}</span>; // if the node isn't an object it's a string and should be hidden

  // reduce the individual elements within the label node
  // return the node unchanged if it's a link, otherwise wrap it in a span to be ignored by SR
  return node.props?.children.reduce((acc, el) => {
    if (el.props?.href || el.type === 'a') {
      return [...acc, el];
    }
    return [...acc, <span aria-hidden>{el}</span>];
  }, []);
};

export const reduceLabelNodeToString = (lbl) => {
  if (typeof lbl === 'string') return lbl; // if the label is a string already we don't need to collapse it down

  // reduce the contents of a non-string label (contains links) to a string
  // not performing this step results in <a> links being read as [object Object]
  return lbl.props?.children?.reduce((acc, el) => {
    if (typeof el === 'string') {
      return acc + el;
    }
    return acc + el.props.children;
  });
};
