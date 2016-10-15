import React from 'react';
import Helmet from 'react-helmet';

import BpkHeading from 'bpk-component-heading';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';

import Lozenge from './Lozenge';

const pageTitle = 'Grid Column Demo';

const GridColumnDemoPage = () => (
  <BpkGridContainer>
    <Helmet title={pageTitle} />
    <BpkGridRow>
      <BpkGridColumn width={12}>
        <div style={{ textAlign: 'center' }}>
          <BpkHeading level="h1">{pageTitle}</BpkHeading>
        </div>
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn width={1} mobileWidth={0}>
        <Lozenge>1</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={0} mobileWidth={12}>
        <Lozenge>12</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={11} mobileWidth={0}>
        <Lozenge>11</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={0} mobileWidth={12}>
        <Lozenge>12</Lozenge>
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn width={2} mobileWidth={0}>
        <Lozenge>2</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={0} mobileWidth={12}>
        <Lozenge>12</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={10} mobileWidth={0}>
        <Lozenge>10</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={0} mobileWidth={12}>
        <Lozenge>12</Lozenge>
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn width={3} mobileWidth={0}>
        <Lozenge>3</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={0} mobileWidth={12}>
        <Lozenge>12</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={9} mobileWidth={0}>
        <Lozenge>9</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={0} mobileWidth={12}>
        <Lozenge>12</Lozenge>
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn width={4} mobileWidth={0}>
        <Lozenge>4</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={0} mobileWidth={12}>
        <Lozenge>12</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={8} mobileWidth={0}>
        <Lozenge>8</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={0} mobileWidth={12}>
        <Lozenge>12</Lozenge>
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn width={5} mobileWidth={0}>
        <Lozenge>5</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={0} mobileWidth={12}>
        <Lozenge>12</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={7} mobileWidth={0}>
        <Lozenge>7</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={0} mobileWidth={12}>
        <Lozenge>12</Lozenge>
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn width={6} mobileWidth={0}>
        <Lozenge>6</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={0} mobileWidth={12}>
        <Lozenge>12</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={6} mobileWidth={0}>
        <Lozenge>6</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={0} mobileWidth={12}>
        <Lozenge>12</Lozenge>
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn width={7} mobileWidth={0}>
        <Lozenge>7</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={0} mobileWidth={12}>
        <Lozenge>12</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={5} mobileWidth={0}>
        <Lozenge>5</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={0} mobileWidth={12}>
        <Lozenge>12</Lozenge>
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn width={8} mobileWidth={0}>
        <Lozenge>8</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={0} mobileWidth={12}>
        <Lozenge>12</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={4} mobileWidth={0}>
        <Lozenge>4</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={0} mobileWidth={12}>
        <Lozenge>12</Lozenge>
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn width={9} mobileWidth={0}>
        <Lozenge>9</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={0} mobileWidth={12}>
        <Lozenge>12</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={3} mobileWidth={0}>
        <Lozenge>3</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={0} mobileWidth={12}>
        <Lozenge>12</Lozenge>
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn width={10} mobileWidth={0}>
        <Lozenge>10</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={0} mobileWidth={12}>
        <Lozenge>12</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={2} mobileWidth={0}>
        <Lozenge>2</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={0} mobileWidth={12}>
        <Lozenge>12</Lozenge>
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn width={11} mobileWidth={0}>
        <Lozenge>11</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={0} mobileWidth={12}>
        <Lozenge>12</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={1} mobileWidth={0}>
        <Lozenge>1</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={0} mobileWidth={12}>
        <Lozenge>12</Lozenge>
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn width={12} mobileWidth={0}>
        <Lozenge>12</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={0} mobileWidth={12}>
        <Lozenge>12</Lozenge>
      </BpkGridColumn>
    </BpkGridRow>
  </BpkGridContainer>
);

export default GridColumnDemoPage;
