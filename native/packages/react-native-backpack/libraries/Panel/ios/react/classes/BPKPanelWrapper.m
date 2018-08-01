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

#import "BPKPanelWrapper.h"

#import <Backpack2/Panel.h>

#import <React/RCTUIManagerUtils.h>
#import <React/RCTUIManager.h>
#import <React/RCTShadowView.h>
#import <React/RCTComponent.h>

NS_ASSUME_NONNULL_BEGIN
@interface BPKPanelWrapper() <RCTComponent>
@property (nonatomic, strong) BPKPanel *inner;
- (void)setup;
@end

@implementation BPKPanelWrapper

- (instancetype)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame];

    if (self) {
        [self setup];
    }

    return self;
}

- (void)setPadded:(BOOL)padded {
    self.inner.padded = padded;
}

- (BOOL)padded {
    return self.inner.padded;
}

- (void)setup {
    BPKPanel *panel = [[BPKPanel alloc] initWithFrame:self.bounds];
    self.inner = panel;

    [self addSubview:panel];
    panel.translatesAutoresizingMaskIntoConstraints = NO;
    [panel.layoutMarginsGuide.leadingAnchor constraintEqualToAnchor:self.leadingAnchor].active = YES;
    [panel.layoutMarginsGuide.trailingAnchor constraintEqualToAnchor:self.trailingAnchor].active = YES;
    [panel.layoutMarginsGuide.topAnchor constraintEqualToAnchor:self.topAnchor].active = YES;
    [panel.layoutMarginsGuide.bottomAnchor constraintEqualToAnchor:self.bottomAnchor].active = YES;
}

#pragma mark - RCTComponent

- (void)insertReactSubview:(UIView *)subview atIndex:(NSInteger)atIndex {
    [super insertReactSubview:subview atIndex:0];

    [self.inner insertSubview:subview atIndex:0];
}

- (void)didUpdateReactSubviews {
    for (UIView *view in self.reactSubviews) {
        [self.inner addSubview:view];
    }
}

@end

NS_ASSUME_NONNULL_END

