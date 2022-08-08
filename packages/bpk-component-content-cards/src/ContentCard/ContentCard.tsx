import React from 'react';
import BpkText from 'bpk-component-text';
import { cssModules } from 'bpk-react-utils';

import STYLES from './ContentCard.module.scss';

const getClassName = cssModules(STYLES);

type CardLayout = 'HORIZONTAL' | 'VERTICAL';

type Props = {
  card: {
    imageLink?: string;
    headline?: string;
    description?: string;
    ctaLink?: string;
  };
  layout: CardLayout;
};

const ContentCard = ({ card, layout }: Props) => (
  <a
    className={[
      getClassName('bpk-content-cards__card-link'),
      layout === 'HORIZONTAL'
        ? getClassName('bpk-content-cards__card-horizontal')
        : getClassName('bpk-content-cards__card-vertical'),
    ].join(' ')}
    href={card.ctaLink}
    target="_blank"
    rel="noreferrer"
  >
    <div className={getClassName('bpk-content-cards__image-aspect-ratio')}>
      <img
        className={getClassName('bpk-content-cards__image')}
        alt=""
        src={card.imageLink}
        loading="lazy"
      />
    </div>
    <div>
      <BpkText
        className={getClassName('bpk-content-cards__headline')}
        tagName="h3"
      >
        {card.headline}
      </BpkText>
      <BpkText
        className={getClassName('bpk-content-cards__description')}
        tagName="p"
      >
        {card.description}
      </BpkText>
    </div>
  </a>
);

export default ContentCard;
