import React from 'react';
import Helmet from 'react-helmet';

import BpkHeading from 'bpk-component-heading';
import { BpkGridContainer, BpkGridRow, BpkGridColumn } from 'bpk-component-grid';

import Lozenge from './Lozenge';

const pageTitle = 'Grid Offset Demo';

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
      <BpkGridColumn width={11} offset={1} mobileWidth={0}>
        <Lozenge>11, offset by 1</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={0} mobileWidth={12}>
        <Lozenge>12</Lozenge>
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn width={10} offset={2} mobileWidth={0}>
        <Lozenge>10, offset by 2</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={0} mobileWidth={12}>
        <Lozenge>12</Lozenge>
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn width={9} offset={3} mobileWidth={0}>
        <Lozenge>9, offset by 3</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={0} mobileWidth={12}>
        <Lozenge>12</Lozenge>
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn width={8} offset={4} mobileWidth={0}>
        <Lozenge>8, offset by 4</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={0} mobileWidth={12}>
        <Lozenge>12</Lozenge>
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn width={7} offset={5} mobileWidth={0}>
        <Lozenge>7, offset by 5</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={0} mobileWidth={12}>
        <Lozenge>12</Lozenge>
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn width={6} offset={6} mobileWidth={0}>
        <Lozenge>6, offset by 6</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={0} mobileWidth={12}>
        <Lozenge>12</Lozenge>
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn width={5} offset={7} mobileWidth={0}>
        <Lozenge>5, offset by 7</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={0} mobileWidth={12}>
        <Lozenge>12</Lozenge>
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn width={4} offset={8} mobileWidth={0}>
        <Lozenge>4, offset by 8</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={0} mobileWidth={12}>
        <Lozenge>12</Lozenge>
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn width={3} offset={9} mobileWidth={0}>
        <Lozenge>3, offset by 9</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={0} mobileWidth={12}>
        <Lozenge>12</Lozenge>
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn width={2} offset={10} mobileWidth={0}>
        <Lozenge>2, offset by 10</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={0} mobileWidth={12}>
        <Lozenge>12</Lozenge>
      </BpkGridColumn>
    </BpkGridRow>
    <BpkGridRow>
      <BpkGridColumn width={1} offset={11} mobileWidth={0}>
        <Lozenge>1, offset by 11</Lozenge>
      </BpkGridColumn>
      <BpkGridColumn width={0} mobileWidth={12}>
        <Lozenge>12</Lozenge>
      </BpkGridColumn>
    </BpkGridRow>
  </BpkGridContainer>
);

export default GridColumnDemoPage;
