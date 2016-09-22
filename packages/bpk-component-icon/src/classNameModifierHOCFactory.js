import React from 'react'

export default (displayName, classNamesToAdd = []) => {
  return ComposedComponent => {
    const ClassNameModifierHOC = (props) => {
      let classNames = []
      const { className, ...rest } = props

      className ? classNames.push(className) : null
      classNames = classNamesToAdd.length ? classNames.concat(classNamesToAdd) : classNames

      return <ComposedComponent className={classNames.join(' ')} {...rest} />
    }

    const composedComponentName = ComposedComponent.displayName || ComposedComponent.name || 'Component'

    ClassNameModifierHOC.displayName = `${displayName}(${composedComponentName})`

    return ClassNameModifierHOC
  }
}
