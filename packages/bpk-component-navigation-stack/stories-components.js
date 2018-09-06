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

import BpkNavigationBar, {
  BpkNavigationBarIconButton,
} from 'bpk-component-navigation-bar';
import BpkButton from 'bpk-component-button';
import { cssModules } from 'bpk-react-utils';
import { withRtlSupport } from 'bpk-component-icon';
import React, {
  type Element,
  type ComponentType,
  type ElementConfig,
} from 'react';
import BpkLeftArrowIcon from 'bpk-component-icon/sm/long-arrow-left';
import BpkRightArrowIcon from 'bpk-component-icon/sm/long-arrow-right';

import STYLES from './stories.css';
import BpkNavigationStack from './index';

const LeftArrowIcon = withRtlSupport(BpkLeftArrowIcon);
const RightArrowIcon = withRtlSupport(BpkRightArrowIcon);

const getClassName = cssModules(STYLES);

export const View = ({
  children,
  index,
  pushView,
  popView,
  className,
  noNavBar,
  centered,
  ...rest
}: {
  children: ({
    index: number,
    pushView: ?(Element<any>) => mixed,
    popView: ?() => mixed,
  }) => ?Element<any>,
  index: number,
  pushView: ?(Element<any>) => mixed,
  popView: ?() => mixed,
  className: ?string,
  noNavBar: boolean,
  centered: boolean,
}) => (
  <section
    className={getClassName(
      'bpk-navigation-stack-view',
      index % 2 === 0 && 'bpk-navigation-stack-view--alternate',
      noNavBar && 'bpk-navigation-stack-view--no-nav-bar',
      centered && 'bpk-navigation-stack-view--centered',
      className,
    )}
    {...rest}
  >
    {children({ index, pushView, popView })}
  </section>
);

View.defaultProps = {
  index: 0,
  className: null,
  pushView: null,
  popView: null,
  noNavBar: false,
  centered: false,
};

export const SimpleNav = ({
  index,
  pushView,
  popView,
}: {
  index: number,
  pushView: ?(Element<any>) => mixed,
  popView: ?() => mixed,
}) => (
  <div>
    <BpkButton
      onClick={() =>
        pushView &&
        pushView(
          <View index={index + 1} centered>
            {props => <SimpleNav {...props} />}
          </View>,
        )
      }
    >
      Push view
    </BpkButton>
    {index > 0 ? (
      <BpkButton destructive onClick={() => popView && popView()}>
        Pop view
      </BpkButton>
    ) : null}
  </div>
);

export const NavigationBar = ({
  index,
  pushView,
  popView,
  nextView,
}: {
  index: number,
  pushView: ?(Element<any>) => mixed,
  popView: ?() => mixed,
  nextView: ?() => ?Element<any>,
}) => (
  <BpkNavigationBar
    id={`my-navigation-bar-${index}`}
    title={`View ${index + 1}`}
    leadingButton={
      index > 0 ? (
        <BpkNavigationBarIconButton
          onClick={() => popView && popView()}
          icon={LeftArrowIcon}
          label="Back"
        />
      ) : null
    }
    trailingButton={
      <BpkNavigationBarIconButton
        onClick={() =>
          pushView &&
          pushView(
            (nextView && nextView()) || (
              <View index={index + 1}>
                {props => <NavigationBar {...props} />}
              </View>
            ),
          )
        }
        icon={RightArrowIcon}
        label="Next"
      />
    }
  />
);

NavigationBar.defaultProps = {
  pushView: null,
  popView: null,
  nextView: null,
};

export const withNavigationBar = (
  Stack: ComponentType<ElementConfig<typeof BpkNavigationStack>>,
) => {
  const WithNavigationBar = ({
    views,
    pushView,
    popView,
    ...rest
  }: {
    views: Array<Element<any>>,
    pushView: ?(Element<any>) => mixed,
    popView: ?() => mixed,
  }) => (
    <div {...rest}>
      <NavigationBar
        index={views.length - 1}
        pushView={pushView}
        popView={popView}
        nextView={() => (
          <View index={views.length} noNavBar>
            {() => null}
          </View>
        )}
      />
      <Stack views={views} />
    </div>
  );

  WithNavigationBar.defaultProps = {
    pushView: null,
    popView: null,
  };

  return WithNavigationBar;
};
