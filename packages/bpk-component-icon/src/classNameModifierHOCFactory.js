import React, { PropTypes } from 'react';

export default (displayName, classNamesToAdd = []) => (ComposedComponent) => {
  const ClassNameModifierHOC = (props) => {
    let classNames = [];
    const { className, ...rest } = props;

    if (className) { classNames.push(className); }
    classNames = classNamesToAdd.length ? classNames.concat(classNamesToAdd) : classNames;

    return <ComposedComponent className={classNames.join(' ')} {...rest} />;
  };

  ClassNameModifierHOC.propTypes = {
    className: PropTypes.string,
  };

  ClassNameModifierHOC.defaultProps = {
    className: null,
  };

  const composedComponentName = ComposedComponent.displayName || ComposedComponent.name || 'Component';

  ClassNameModifierHOC.displayName = `${displayName}(${composedComponentName})`;

  return ClassNameModifierHOC;
};
