import React from 'react';
import renderer from 'react-test-renderer';
import classNameModifierHOCFactory from './classNameModifierHOCFactory';

describe('classNameModifierHOCFactory', () => {
  it('should render correctly', () => {
    const withTestClass = classNameModifierHOCFactory('withTestClass', ['test-class']);
    const MyComponent = props => <div {...props}>test</div>;
    const MyTestClassComponent = withTestClass(MyComponent);

    const tree = renderer.create(<MyTestClassComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with multiple classNames', () => {
    const withTestClass = classNameModifierHOCFactory('withTestClass', ['test-class-1', 'test-class-2']);
    const MyComponent = props => <div {...props}>test</div>;
    const MyTestClassComponent = withTestClass(MyComponent);

    const tree = renderer.create(<MyTestClassComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with additional className', () => {
    const withTestClass = classNameModifierHOCFactory('withTestClass', ['test-class']);
    const MyComponent = props => <div {...props}>test</div>;
    const MyTestClassComponent = withTestClass(MyComponent);

    const tree = renderer.create(<MyTestClassComponent className="additional-test-class" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with multiple classNames and additional className', () => {
    const withTestClass = classNameModifierHOCFactory('withTestClass', ['test-class-1', 'test-class-2']);
    const MyComponent = props => <div {...props}>test</div>;
    const MyTestClassComponent = withTestClass(MyComponent);

    const tree = renderer.create(<MyTestClassComponent className="additional-test-class" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with no classNames', () => {
    const withTestClass = classNameModifierHOCFactory('withTestClass');
    const MyComponent = props => <div {...props}>test</div>;
    const MyTestClassComponent = withTestClass(MyComponent);

    const tree = renderer.create(<MyTestClassComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

