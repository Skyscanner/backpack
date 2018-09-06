/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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

/* @flow */

import React, { type Element, type Node } from 'react';
import ArrowIcon from 'bpk-component-icon/sm/long-arrow-left';
import ArrowRightIcon from 'bpk-component-icon/sm/long-arrow-right';
import { withRtlSupport } from 'bpk-component-icon';
import { updateOnDirectionChange } from 'bpk-component-rtl-toggle';
import BpkNavigationBar, {
  BpkNavigationBarIconButton,
} from 'bpk-component-navigation-bar';
import BpkNavigationStack, {
  withNavigationStackState,
} from 'bpk-component-navigation-stack';
import BpkButton from 'bpk-component-button';
import { cssModules } from 'bpk-react-utils';

import STYLES from './NavigationStackPage.css';

const getClassName = cssModules(STYLES);
const ArrowIconWithRtl = withRtlSupport(ArrowIcon);
const ArrowRightIconWithRtl = withRtlSupport(ArrowRightIcon);

const RtlAwareNavigationStack = updateOnDirectionChange(BpkNavigationStack);
export const StatefulNavigationStack = withNavigationStackState(
  RtlAwareNavigationStack,
);

const BarAndStack = ({
  views,
  pushView,
  popView,
  className,
}: {
  views: Array<Element<any>>,
  pushView: ?(Element<any>) => mixed,
  popView: ?() => mixed,
  className: ?string,
}) => (
  <div className={className}>
    <BpkNavigationBar
      id="default-bpk-nav"
      title={`View ${views.length}`}
      leadingButton={
        views.length > 1 ? (
          <BpkNavigationBarIconButton
            onClick={() => popView && popView()}
            icon={ArrowIconWithRtl}
            label="back"
          />
        ) : null
      }
      trailingButton={
        <BpkNavigationBarIconButton
          onClick={() => pushView && pushView(<View index={views.length} />)}
          icon={ArrowRightIconWithRtl}
          label="back"
        />
      }
    />
    <RtlAwareNavigationStack
      className={getClassName('bpk-navigation-stack-page__stack')}
      views={views}
    />
  </div>
);

BarAndStack.defaultProps = {
  popView: null,
  pushView: null,
  className: null,
};

export const StackWithNavBar = withNavigationStackState(BarAndStack, false);

export const View = ({
  children,
  index,
}: {
  children: ?Node,
  index: number,
}) => (
  <div
    className={getClassName(
      'bpk-navigation-stack-page__view',
      index % 2 === 0 && 'bpk-navigation-stack-page__view--alternate',
    )}
  >
    {children}
  </div>
);

View.defaultProps = {
  children: null,
};

export const SimplePage = ({
  index,
  pushView,
  popView,
  ...rest
}: {
  index: number,
  pushView: ?(Element<any>) => mixed,
  popView: ?() => mixed,
}) => (
  <View index={index}>
    <BpkButton
      onClick={() =>
        pushView &&
        pushView(
          <SimplePage
            index={index + 1}
            pushView={pushView}
            popView={popView}
            {...rest}
          />,
        )
      }
    >
      Push View
    </BpkButton>
    {index > 0 && (
      <BpkButton destructive onClick={() => popView && popView()}>
        Pop View
      </BpkButton>
    )}
  </View>
);

SimplePage.defaultProps = {
  popView: null,
  pushView: null,
};
