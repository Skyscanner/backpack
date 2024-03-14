import BpkCard from '../bpk-component-card';

const mockCards = (numberOfCards: number) =>
  [...Array(numberOfCards)].map((k, v) => <BpkCard>{`Card ${v}`}</BpkCard>);

export default mockCards;
