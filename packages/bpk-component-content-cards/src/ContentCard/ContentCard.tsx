import PropTypes from 'prop-types';
import React from 'react';
import BpkText, { TEXT_STYLES } from 'bpk-component-text';
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
      getClassName('bpk-content-cards__cardLink'),
      layout === 'HORIZONTAL'
        ? getClassName('bpk-content-cards__cardHorizontal')
        : getClassName('bpk-content-cards__cardVertical'),
    ].join(' ')}
    href={card.ctaLink}
    target="_blank"
    rel="noreferrer"
  >
    <div
      className={getClassName(
        'bpk-content-cards__cardHorizontal__imageAspectRatio',
      )}
    >
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
