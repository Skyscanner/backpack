import React from 'react';
import { storiesOf } from '@kadira/storybook';

import { BpkGridContainer, BpkGridRow, BpkGridColumn } from './index';

storiesOf('bpk-component-grid', module)
  .add('Example', () => (
    <BpkGridContainer debug>
      <BpkGridRow>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={2} debug>2</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={3} debug>3</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={4} debug>4</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={5} debug>5</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={6} debug>6</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={7} debug>7</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={8} debug>8</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={9} debug>9</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={10} debug>10</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={11} debug>11</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={12} debug>12</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={6} debug>6</BpkGridColumn>
        <BpkGridColumn width={6} debug>6</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={3} debug>3</BpkGridColumn>
        <BpkGridColumn width={3} debug>3</BpkGridColumn>
        <BpkGridColumn width={3} debug>3</BpkGridColumn>
        <BpkGridColumn width={3} debug>3</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={4} debug>4</BpkGridColumn>
        <BpkGridColumn width={4} debug>4</BpkGridColumn>
        <BpkGridColumn width={4} debug>4</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={1} offset={11} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={1} offset={10} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={1} offset={9} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={1} offset={8} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={1} offset={7} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={1} offset={6} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={1} offset={5} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={1} offset={4} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={1} offset={3} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={1} offset={2} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={1} offset={1} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
      </BpkGridRow>
    </BpkGridContainer>
  ))
  .add('Full width example', () => (
    <BpkGridContainer fullWidth debug>
      <BpkGridRow>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={2} debug>2</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={3} debug>3</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={4} debug>4</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={5} debug>5</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={6} debug>6</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={7} debug>7</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={8} debug>8</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={9} debug>9</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={10} debug>10</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={11} debug>11</BpkGridColumn>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={12} debug>12</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={6} debug>6</BpkGridColumn>
        <BpkGridColumn width={6} debug>6</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={3} debug>3</BpkGridColumn>
        <BpkGridColumn width={3} debug>3</BpkGridColumn>
        <BpkGridColumn width={3} debug>3</BpkGridColumn>
        <BpkGridColumn width={3} debug>3</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={4} debug>4</BpkGridColumn>
        <BpkGridColumn width={4} debug>4</BpkGridColumn>
        <BpkGridColumn width={4} debug>4</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={1} offset={11} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={1} offset={10} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={1} offset={9} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={1} offset={8} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={1} offset={7} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={1} offset={6} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={1} offset={5} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={1} offset={4} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={1} offset={3} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={1} offset={2} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={1} offset={1} debug>1</BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={1} debug>1</BpkGridColumn>
      </BpkGridRow>
    </BpkGridContainer>
  ))
  .add('Home page example', () => (
    <BpkGridContainer debug>
      <BpkGridRow>
        <BpkGridColumn width={8} tabletWidth={12} debug>
          Search controls
        </BpkGridColumn>
        <BpkGridColumn width={4} tabletWidth={0} debug>
          MPU
        </BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={12} debug>
          Provider logos
        </BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={4} mobileWidth={12} debug>
          Content panel
        </BpkGridColumn>
        <BpkGridColumn width={4} mobileWidth={12} debug>
          Content panel
        </BpkGridColumn>
        <BpkGridColumn width={4} mobileWidth={12} debug>
          Content panel
        </BpkGridColumn>
      </BpkGridRow>
      <BpkGridRow>
        <BpkGridColumn width={3} tabletWidth={6} mobileWidth={12} debug>
          Confidence statement
        </BpkGridColumn>
        <BpkGridColumn width={3} tabletWidth={6} mobileWidth={12} debug>
          Confidence statement
        </BpkGridColumn>
        <BpkGridColumn width={3} tabletWidth={6} mobileWidth={12} debug>
          Confidence statement
        </BpkGridColumn>
        <BpkGridColumn width={3} tabletWidth={6} mobileWidth={12} debug>
          Confidence statement
        </BpkGridColumn>
      </BpkGridRow>
    </BpkGridContainer>
  ))
  .add('Day view example', () => (
    <BpkGridContainer debug>
      <BpkGridRow>
        <BpkGridColumn width={9} tabletWidth={12} debug>
          Day view
        </BpkGridColumn>
        <BpkGridColumn width={3} tabletWidth={0} debug>
          Adverts
        </BpkGridColumn>
      </BpkGridRow>
    </BpkGridContainer>
  ));
