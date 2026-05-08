/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import BpkCardV2, { CARD_V2_SURFACE_COLORS } from '@skyscanner/backpack-web/bpk-component-card';
import BpkButton from '@skyscanner/backpack-web/bpk-component-button';
import BpkSmallAircraftIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/aircraft';
import withButtonAlignment from '@skyscanner/backpack-web/bpk-component-icon/withButtonAlignment';
import { BpkBox, BpkStack, BpkSpacing, BACKGROUND_COLORS } from '@skyscanner/backpack-web/bpk-component-layout';
import BpkPrice from '@skyscanner/backpack-web/bpk-component-price';
import { BpkText, TEXT_COLORS, TEXT_STYLES } from '@skyscanner/backpack-web/bpk-component-text';

const AlignedAircraftIcon = withButtonAlignment(BpkSmallAircraftIcon);

type FlightLegProps = {
  airlineLogo: string;
  airlineName: string;
  departureTime: string;
  departureAirport: string;
  duration: string;
  stops: string;
  arrivalTime: string;
  arrivalAirport: string;
};

const FlightLeg = ({
  airlineLogo,
  airlineName,
  arrivalAirport,
  arrivalTime,
  departureAirport,
  departureTime,
  duration,
  stops,
}: FlightLegProps) => (
  <BpkStack direction="row" align="center" gap={BpkSpacing.Base}>
    <img src={airlineLogo} alt={airlineName} width={48} height={16} />

    {/* Departure */}
    <BpkStack direction="column" align="start" gap={BpkSpacing.None}>
      <BpkText textStyle={TEXT_STYLES.xl} tagName="span">
        {departureTime}
      </BpkText>
      <BpkText
        textStyle={TEXT_STYLES.footnote}
        color={TEXT_COLORS.textSecondary}
        tagName="span"
      >
        {departureAirport}
      </BpkText>
    </BpkStack>

    {/* Route */}
    <BpkStack
      direction="column"
      align="center"
      gap={BpkSpacing.Sm}
      flexGrow={1}
    >
      <BpkText
        textStyle={TEXT_STYLES.caption}
        color={TEXT_COLORS.textSecondary}
        tagName="span"
      >
        {duration}
      </BpkText>
      <BpkStack direction="row" align="center" gap={BpkSpacing.None} width="100%">
        <BpkBox
          flex={1}
          height="1px"
          backgroundColor={BACKGROUND_COLORS.surfaceContrast}
        />
        <AlignedAircraftIcon />
      </BpkStack>
      <BpkText
        textStyle={TEXT_STYLES.caption}
        color={TEXT_COLORS.textLink}
        tagName="span"
      >
        {stops}
      </BpkText>
    </BpkStack>

    {/* Arrival */}
    <BpkStack direction="column" align="end" gap={BpkSpacing.None}>
      <BpkText textStyle={TEXT_STYLES.xl} tagName="span">
        {arrivalTime}
      </BpkText>
      <BpkText
        textStyle={TEXT_STYLES.footnote}
        color={TEXT_COLORS.textSecondary}
        tagName="span"
      >
        {arrivalAirport}
      </BpkText>
    </BpkStack>
  </BpkStack>
);

const FlightCard = () => (
  <BpkCardV2.Root bgColor={CARD_V2_SURFACE_COLORS.surfaceDefault}>
    <BpkCardV2.Body
      templateColumns={{ base: '1fr', tablet: '7fr auto 3fr' }}
    >
      {/* Left: two stacked flight legs */}
      <BpkCardV2.Section>
        <BpkStack direction="column" gap={BpkSpacing.Base}>
          <FlightLeg
            airlineLogo="https://logos.skyscnr.com/images/airlines/favicon/LX.png"
            airlineName="SWISS"
            departureTime="08:10"
            departureAirport="LHR"
            duration="06h 20"
            stops="Direct"
            arrivalTime="23:15"
            arrivalAirport="SIN"
          />
          <FlightLeg
            airlineLogo="https://logos.skyscnr.com/images/airlines/favicon/LX.png"
            airlineName="SWISS"
            departureTime="08:10"
            departureAirport="LHR"
            duration="06h 20"
            stops="Direct"
            arrivalTime="23:15"
            arrivalAirport="SIN"
          />
        </BpkStack>
      </BpkCardV2.Section>

      <BpkCardV2.Divider />

      {/* Right: price + select */}
      <BpkCardV2.Section>
        <BpkStack
          direction="column"
          align="end"
          justify="space-between"
          height="100%"
          gap={BpkSpacing.Base}
        >
          <BpkPrice
            align="right"
            size="large"
            leadingText="12 deals from"
            price="£762"
            trailingText="£1,523 total"
          />
          <BpkButton fullWidth onClick={() => {}}>
            Select
          </BpkButton>
        </BpkStack>
      </BpkCardV2.Section>
    </BpkCardV2.Body>
  </BpkCardV2.Root>
);

export default FlightCard;
