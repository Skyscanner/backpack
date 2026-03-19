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

import { useState } from 'react';

import BpkButton from '../../packages/bpk-component-button';
import {
  BpkBox,
  BpkBreakpoint,
  BpkFlex,
  BpkProvider,
  BpkSpacing,
  BpkVStack,
} from '../../packages/bpk-component-layout';
import { BpkModalV3 } from '../../packages/bpk-component-modal';
import BpkText, { TEXT_STYLES } from '../../packages/bpk-component-text';
import BpkVisuallyHidden from '../../packages/bpk-component-visually-hidden';
import { ArkLocaleProvider } from '../../packages/bpk-react-utils';

const IMAGE_SRC =
  'https://content.skyscnr.com/m/7470cf6a4ee49c26/original/Carousel-placeholder-4.jpg';

const ModalContainer = ({
  buttonLabel = 'Open modal',
  children,
}: {
  buttonLabel?: string;
  children: (props: {
    open: boolean;
    onOpenChange: (details: { open: boolean }) => void;
  }) => React.ReactNode;
}) => {
  const [open, setOpen] = useState(true);
  const onOpenChange = (details: { open: boolean }) => setOpen(details.open);

  return (
    <BpkProvider>
      <ArkLocaleProvider>
        <BpkButton onClick={() => setOpen(true)}>{buttonLabel}</BpkButton>
        {children({ open, onOpenChange })}
      </ArkLocaleProvider>
    </BpkProvider>
  );
};

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut egestas sit amet
nisi nec ultrices. In efficitur justo ac tristique ultricies. Mauris luctus
felis arcu, a porttitor turpis aliquet faucibus. Aenean nibh nulla, dictum
sit amet efficitur cursus, molestie vitae enim. Aenean vel nunc purus.
Vestibulum consectetur luctus eros ac bibendum. Donec pretium nunc mi, sed
iaculis nibh aliquet in. Integer ut accumsan orci, non hendrerit nunc.
Quisque ante enim, convallis lacinia arcu eu, tincidunt dignissim nunc.
Nulla facilisi. Curabitur mattis sapien imperdiet, dignissim ligula id,
maximus erat. Morbi sed eros vitae augue accumsan dictum sit amet eu lectus.
Integer vitae consectetur libero, sed porttitor urna.`;

const DefaultExample = () => (
  <ModalContainer>
    {({ onOpenChange, open }) => (
      <BpkModalV3.Root open={open} onOpenChange={onOpenChange}>
        <BpkModalV3.Scrim />
        <BpkModalV3.Content>
          <BpkModalV3.Header>
            <BpkModalV3.Title>
              <BpkText textStyle={TEXT_STYLES.label1} tagName="span">
                Default modal
              </BpkText>
            </BpkModalV3.Title>
            <BpkModalV3.CloseTrigger label="Close" />
          </BpkModalV3.Header>
          <BpkModalV3.Body>
            <BpkBox padding={BpkSpacing.LG}>
              <BpkText textStyle={TEXT_STYLES.bodyDefault} tagName="p">
                This is a default centred modal. It displays as a centred
                dialog on desktop and becomes full-screen on mobile viewports.
              </BpkText>
            </BpkBox>
          </BpkModalV3.Body>
        </BpkModalV3.Content>
      </BpkModalV3.Root>
    )}
  </ModalContainer>
);

const SheetExample = () => (
  <ModalContainer>
    {({ onOpenChange, open }) => (
      <BpkModalV3.Root
        open={open}
        onOpenChange={onOpenChange}
        type="sheet"
      >
        <BpkModalV3.Scrim />
        <BpkModalV3.Content>
          <BpkModalV3.Header>
            <BpkModalV3.Title>
              <BpkText textStyle={TEXT_STYLES.label1} tagName="span">
                Sheet modal
              </BpkText>
            </BpkModalV3.Title>
            <BpkModalV3.CloseTrigger label="Close" />
          </BpkModalV3.Header>
          <BpkModalV3.Body>
            <BpkBox padding={BpkSpacing.LG}>
              <BpkText textStyle={TEXT_STYLES.bodyDefault} tagName="p">
                This is a sheet modal. It anchors to the bottom of the viewport
                and spans the full width.
              </BpkText>
            </BpkBox>
          </BpkModalV3.Body>
        </BpkModalV3.Content>
      </BpkModalV3.Root>
    )}
  </ModalContainer>
);

const FullExample = () => (
  <ModalContainer>
    {({ onOpenChange, open }) => (
      <BpkModalV3.Root
        open={open}
        onOpenChange={onOpenChange}
        type="full"
      >
        <BpkModalV3.Scrim />
        <BpkModalV3.Content>
          <BpkModalV3.Header>
            <BpkModalV3.Title>
              <BpkText textStyle={TEXT_STYLES.label1} tagName="span">
                Full screen modal
              </BpkText>
            </BpkModalV3.Title>
            <BpkModalV3.CloseTrigger label="Close" />
          </BpkModalV3.Header>
          <BpkModalV3.Body>
            <BpkBox padding={BpkSpacing.LG}>
              <BpkText textStyle={TEXT_STYLES.bodyDefault} tagName="p">
                This is a full-screen modal. It fills the entire viewport with
                no border radius.
              </BpkText>
            </BpkBox>
          </BpkModalV3.Body>
        </BpkModalV3.Content>
      </BpkModalV3.Root>
    )}
  </ModalContainer>
);

const LongTitleExample = () => (
  <ModalContainer>
    {({ onOpenChange, open }) => (
      <BpkModalV3.Root open={open} onOpenChange={onOpenChange}>
        <BpkModalV3.Scrim />
        <BpkModalV3.Content>
          <BpkModalV3.Header>
            <BpkModalV3.Title>
              <BpkText textStyle={TEXT_STYLES.label1} tagName="span">
                We have to remember what&apos;s important in life: friends,
                waffles, and work. Or waffles, friends, work. But work has to
                come third.
              </BpkText>
            </BpkModalV3.Title>
            <BpkModalV3.CloseTrigger label="Close" />
          </BpkModalV3.Header>
          <BpkModalV3.Body>
            <BpkBox padding={BpkSpacing.LG}>
              <BpkText textStyle={TEXT_STYLES.bodyDefault} tagName="p">
                This modal has a very long title to test how the header handles
                text overflow alongside the close button.
              </BpkText>
            </BpkBox>
          </BpkModalV3.Body>
        </BpkModalV3.Content>
      </BpkModalV3.Root>
    )}
  </ModalContainer>
);

const OverflowingExample = () => (
  <ModalContainer>
    {({ onOpenChange, open }) => (
      <BpkModalV3.Root open={open} onOpenChange={onOpenChange}>
        <BpkModalV3.Scrim />
        <BpkModalV3.Content>
          <BpkModalV3.Header>
            <BpkModalV3.Title>
              <BpkText textStyle={TEXT_STYLES.label1} tagName="span">
                Overflowing content
              </BpkText>
            </BpkModalV3.Title>
            <BpkModalV3.CloseTrigger label="Close" />
          </BpkModalV3.Header>
          <BpkModalV3.Body>
            <BpkVStack gap={BpkSpacing.Base} padding={BpkSpacing.LG}>
              {Array.from({ length: 5 }, (_, i) => (
                <BpkText
                  key={i}
                  textStyle={TEXT_STYLES.bodyDefault}
                  tagName="p"
                >
                  {loremIpsum}
                </BpkText>
              ))}
            </BpkVStack>
          </BpkModalV3.Body>
        </BpkModalV3.Content>
      </BpkModalV3.Root>
    )}
  </ModalContainer>
);

const MultipleModalsExample = () => (
  <>
    <ModalContainer buttonLabel="Open modal 1">
      {({ onOpenChange, open }) => (
        <BpkModalV3.Root open={open} onOpenChange={onOpenChange}>
          <BpkModalV3.Scrim />
          <BpkModalV3.Content>
            <BpkModalV3.Header>
              <BpkModalV3.Title>
                <BpkText textStyle={TEXT_STYLES.label1} tagName="span">
                  Modal 1
                </BpkText>
              </BpkModalV3.Title>
              <BpkModalV3.CloseTrigger label="Close" />
            </BpkModalV3.Header>
            <BpkModalV3.Body>
              <BpkBox padding={BpkSpacing.LG}>
                <BpkText textStyle={TEXT_STYLES.bodyDefault} tagName="p">
                  This is the first modal. Multiple modals can be rendered on
                  the same page.
                </BpkText>
              </BpkBox>
            </BpkModalV3.Body>
          </BpkModalV3.Content>
        </BpkModalV3.Root>
      )}
    </ModalContainer>
    <br />
    <ModalContainer buttonLabel="Open modal 2">
      {({ onOpenChange, open }) => (
        <BpkModalV3.Root open={open} onOpenChange={onOpenChange}>
          <BpkModalV3.Scrim />
          <BpkModalV3.Content>
            <BpkModalV3.Header>
              <BpkModalV3.Title>
                <BpkText textStyle={TEXT_STYLES.label1} tagName="span">
                  Modal 2
                </BpkText>
              </BpkModalV3.Title>
              <BpkModalV3.CloseTrigger label="Close" />
            </BpkModalV3.Header>
            <BpkModalV3.Body>
              <BpkBox padding={BpkSpacing.LG}>
                <BpkText textStyle={TEXT_STYLES.bodyDefault} tagName="p">
                  This is the second modal.
                </BpkText>
              </BpkBox>
            </BpkModalV3.Body>
          </BpkModalV3.Content>
        </BpkModalV3.Root>
      )}
    </ModalContainer>
    <br />
    <ModalContainer buttonLabel="Open modal 3">
      {({ onOpenChange, open }) => (
        <BpkModalV3.Root open={open} onOpenChange={onOpenChange}>
          <BpkModalV3.Scrim />
          <BpkModalV3.Content>
            <BpkModalV3.Header>
              <BpkModalV3.Title>
                <BpkText textStyle={TEXT_STYLES.label1} tagName="span">
                  Modal 3
                </BpkText>
              </BpkModalV3.Title>
              <BpkModalV3.CloseTrigger label="Close" />
            </BpkModalV3.Header>
            <BpkModalV3.Body>
              <BpkBox padding={BpkSpacing.LG}>
                <BpkText textStyle={TEXT_STYLES.bodyDefault} tagName="p">
                  This is the third modal.
                </BpkText>
              </BpkBox>
            </BpkModalV3.Body>
          </BpkModalV3.Content>
        </BpkModalV3.Root>
      )}
    </ModalContainer>
  </>
);

const DefaultWithImageExample = () => (
  <ModalContainer>
    {({ onOpenChange, open }) => (
      <BpkModalV3.Root open={open} onOpenChange={onOpenChange}>
        <BpkModalV3.Scrim />
        <BpkModalV3.Content>
          <BpkModalV3.Title>
            <BpkVisuallyHidden>Image modal</BpkVisuallyHidden>
          </BpkModalV3.Title>
          <BpkFlex
            direction={{
              base: 'column-reverse',
              [BpkBreakpoint.SmallTablet]: 'row',
            }}
            minHeight={{
              base: '100%',
              [BpkBreakpoint.SmallTablet]: '20rem',
            }}
          >
            <BpkModalV3.Body>
              <BpkVStack gap={BpkSpacing.SM} padding={BpkSpacing.LG}>
                <BpkText textStyle={TEXT_STYLES.heading3} tagName="h3">
                  Explore Edinburgh
                </BpkText>
                <BpkText textStyle={TEXT_STYLES.bodyDefault} tagName="p">
                  Discover the historic capital of Scotland with its stunning
                  architecture, rich culture, and vibrant festivals.
                </BpkText>
              </BpkVStack>
            </BpkModalV3.Body>
            <BpkModalV3.HeroImage src={IMAGE_SRC} alt="">
              <BpkModalV3.CloseTrigger label="Close" onImage />
            </BpkModalV3.HeroImage>
          </BpkFlex>
        </BpkModalV3.Content>
      </BpkModalV3.Root>
    )}
  </ModalContainer>
);

const SheetWithImageExample = () => (
  <ModalContainer>
    {({ onOpenChange, open }) => (
      <BpkModalV3.Root
        open={open}
        onOpenChange={onOpenChange}
        type="sheet"
      >
        <BpkModalV3.Scrim />
        <BpkModalV3.Content>
          <BpkModalV3.Title>
            <BpkVisuallyHidden>Sheet image modal</BpkVisuallyHidden>
          </BpkModalV3.Title>
          <BpkModalV3.HeroImage src={IMAGE_SRC} alt="" height="12rem">
            <BpkModalV3.CloseTrigger label="Close" onImage />
          </BpkModalV3.HeroImage>
          <BpkModalV3.Body>
            <BpkVStack gap={BpkSpacing.SM} padding={BpkSpacing.LG}>
              <BpkText textStyle={TEXT_STYLES.heading3} tagName="h3">
                Weekend getaway
              </BpkText>
              <BpkText textStyle={TEXT_STYLES.bodyDefault} tagName="p">
                Find the best deals for your next weekend trip.
              </BpkText>
            </BpkVStack>
          </BpkModalV3.Body>
        </BpkModalV3.Content>
      </BpkModalV3.Root>
    )}
  </ModalContainer>
);

const SimpleHeadlineExample = () => (
  <ModalContainer>
    {({ onOpenChange, open }) => (
      <BpkModalV3.Root open={open} onOpenChange={onOpenChange}>
        <BpkModalV3.Scrim />
        <BpkModalV3.Content>
          <BpkModalV3.Header>
            <BpkModalV3.Title>
              <BpkText textStyle={TEXT_STYLES.label1} tagName="span">
                Simple headline
              </BpkText>
            </BpkModalV3.Title>
            <BpkModalV3.CloseTrigger label="Close" />
          </BpkModalV3.Header>
          <BpkModalV3.Body>
            <BpkBox padding={BpkSpacing.LG}>
              <BpkText textStyle={TEXT_STYLES.bodyDefault} tagName="p">
                This modal uses a plain text title with label-1 typography in
                the Header.
              </BpkText>
            </BpkBox>
          </BpkModalV3.Body>
        </BpkModalV3.Content>
      </BpkModalV3.Root>
    )}
  </ModalContainer>
);

const CustomHeadlineExample = () => (
  <ModalContainer>
    {({ onOpenChange, open }) => (
      <BpkModalV3.Root open={open} onOpenChange={onOpenChange}>
        <BpkModalV3.Scrim />
        <BpkModalV3.Content>
          <BpkModalV3.Header>
            <BpkModalV3.Title>
              <BpkText textStyle={TEXT_STYLES.heading2} tagName="span">
                Your dream trip awaits
              </BpkText>
            </BpkModalV3.Title>
            <BpkModalV3.CloseTrigger label="Close" />
          </BpkModalV3.Header>
          <BpkModalV3.Body>
            <BpkBox padding={BpkSpacing.LG}>
              <BpkText textStyle={TEXT_STYLES.bodyDefault} tagName="p">
                This modal demonstrates a custom headline with larger hero text.
                The Title component is a semantic wrapper that allows any
                typography styling.
              </BpkText>
            </BpkBox>
          </BpkModalV3.Body>
        </BpkModalV3.Content>
      </BpkModalV3.Root>
    )}
  </ModalContainer>
);

const NoHeaderExample = () => (
  <ModalContainer>
    {({ onOpenChange, open }) => (
      <BpkModalV3.Root open={open} onOpenChange={onOpenChange}>
        <BpkModalV3.Scrim />
        <BpkModalV3.Content>
          {/*
            When no visible title is needed, use BpkVisuallyHidden inside the
            Title. The Header still provides layout spacing for the close button.
          */}
          <BpkModalV3.Header>
            <BpkModalV3.Title>
              <BpkVisuallyHidden>Accessible dialog name</BpkVisuallyHidden>
            </BpkModalV3.Title>
            <BpkModalV3.CloseTrigger label="Close" />
          </BpkModalV3.Header>
          <BpkModalV3.Body>
            <BpkBox padding={BpkSpacing.LG}>
              <BpkText textStyle={TEXT_STYLES.bodyDefault} tagName="p">
                This modal has no visible title. BpkVisuallyHidden wraps the
                Title text to provide an accessible dialog name for screen
                readers while the Header handles close button layout.
              </BpkText>
            </BpkBox>
          </BpkModalV3.Body>
        </BpkModalV3.Content>
      </BpkModalV3.Root>
    )}
  </ModalContainer>
);

export {
  DefaultExample,
  SheetExample,
  FullExample,
  LongTitleExample,
  OverflowingExample,
  MultipleModalsExample,
  DefaultWithImageExample,
  SheetWithImageExample,
  SimpleHeadlineExample,
  CustomHeadlineExample,
  NoHeaderExample,
};
