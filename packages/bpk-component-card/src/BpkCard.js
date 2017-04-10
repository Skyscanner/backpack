import BpkCardSimple from './BpkCardSimple';
import BpkCardTicket from './BpkCardTicket';

const BpkCard = props => (
  props.stub
    ? BpkCardTicket(props)
    : BpkCardSimple(props)
);

export default BpkCard;
