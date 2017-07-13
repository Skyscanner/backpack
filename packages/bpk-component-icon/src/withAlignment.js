import React from 'react';

export default function withAlignment(WrappedComponent, lineHeight, iconHeight) {
  return (props) => {
    const lineHeightDecimal = `${lineHeight}`.replace('rem', '');
    const iconHeightDecimal = `${iconHeight}`.replace('rem', '');
    const marginTopCalculated = (Math.max(0, lineHeightDecimal - iconHeightDecimal) / 2) + 'rem';

    return (
      <WrappedComponent
        style={{ height: iconHeight, width: iconHeight, marginTop: marginTopCalculated, verticalAlign: 'top' }}
        {...props}
      />
    );
  };
}
