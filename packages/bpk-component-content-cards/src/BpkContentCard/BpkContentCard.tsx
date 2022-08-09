import React from 'react';
import BpkText from 'bpk-component-text';
import BpkImage from 'bpk-component-image';
import { cssModules } from 'bpk-react-utils';

import STYLES from './BpkContentCard.module.scss';

const getClassName = cssModules(STYLES);

type CardLayout = 'HORIZONTAL' | 'VERTICAL';

type Props = {
  card: {
    imageLink?: string;
    imageAlt?: string;
    headline?: string;
    description?: string;
    ctaLink?: string;
  };
  layout: CardLayout;
};

const BpkContentCard = ({ card, layout }: Props) => (
  <a
    className={getClassName(
      'bpk-content-cards__card-link',
      layout === 'HORIZONTAL'
        ? 'bpk-content-cards__card-horizontal'
        : 'bpk-content-cards__card-vertical',
    )}
    href={card.ctaLink}
    target="_blank"
    rel="noreferrer"
  >
    <div className={getClassName('bpk-content-cards__image-container')}>
      <img
        className={getClassName('bpk-content-cards__image')}
        alt={card.imageAlt}
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

export default BpkContentCard;
