import PropTypes from 'prop-types';
import React, { Component, Children, cloneElement } from 'react';

import BpkAccordion from './BpkAccordion';

const getInitiallyExpanded = (children) => {
  const accordionItems = Children.toArray(children);
  const result = accordionItems.reduceRight((prev, item) => (item.props.expanded ? item : prev), {});
  return (result || {}).key || null;
};

class BpkAccordionContainerSingle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: getInitiallyExpanded(this.props.children),
    };

    this.openAccordionItem = this.openAccordionItem.bind(this);
    this.renderAccordionItem = this.renderAccordionItem.bind(this);
  }

  openAccordionItem(key) {
    this.setState({ expanded: key });
  }

  renderAccordionItem(accordionItem) {
    const expanded = this.state.expanded === accordionItem.key;
    const onClick = () => this.openAccordionItem(accordionItem.key);

    return cloneElement(accordionItem, { expanded, onClick });
  }

  render() {
    const { children } = this.props;

    return (
      <BpkAccordion>
        {Children.toArray(children).map(this.renderAccordionItem)}
      </BpkAccordion>
    );
  }
}

BpkAccordionContainerSingle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BpkAccordionContainerSingle;
