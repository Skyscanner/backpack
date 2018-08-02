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

#import "BPKBadgeWrapper.h"

#import <Backpack2/Badge.h>

#import <React/RCTUIManagerUtils.h>
#import <React/RCTUIManager.h>
#import <React/RCTShadowView.h>
#import <React/RCTComponent.h>

NS_ASSUME_NONNULL_BEGIN
@interface BPKBadgeWrapper() <RCTComponent>
@property (nonatomic, strong) BPKBadge *inner;
@property (nonatomic, weak) RCTBridge *bridge;

// Message
- (void)setMessage:(nullable NSString *)message;
- (nullable NSString *)message;

// Badge Type
- (void)setType:(BPKBadgeType)type;

- (void)setup;
@end

@implementation BPKBadgeWrapper

- (instancetype)initWithBridge:(RCTBridge *)bridge {
    self = [super initWithFrame:CGRectZero];

    if (self) {
        self.bridge = bridge;
        [self setup];
    }

    return self;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    self.inner.frame = self.bounds;

    CGSize size = [self.inner systemLayoutSizeFittingSize:UILayoutFittingExpandedSize];
    RCTExecuteOnUIManagerQueue(^{
        RCTShadowView *shadowView = [self.bridge.uiManager shadowViewForReactTag:self.reactTag];
        shadowView.intrinsicContentSize = size;
    });
}

#pragma mark - Setters/Getters

- (void)setMessage:(nullable NSString *)message {
    self.inner.message = message;
}

- (nullable NSString *)message {
    return self.inner.message;
}

- (void)setType:(BPKBadgeType)type {
    self.inner.type = type;
}

- (BPKBadgeType)type {
    return self.inner.type;
}

#pragma mark - Private

- (void)setup {
    BPKBadge *badge = [[BPKBadge alloc] initWithFrame:self.bounds];
    self.inner = badge;

    [self addSubview:badge];
    badge.translatesAutoresizingMaskIntoConstraints = NO;
}

@end

@implementation RCTConvert(BPKBadgeType)
RCT_ENUM_CONVERTER(BPKBadgeType, (@{ @"success" : @(BPKBadgeTypeSuccess),
                                     @"warning" : @(BPKBadgeTypeWarning),
                                     @"destructive" : @(BPKBadgeTypeDestructive),
                                     @"light" : @(BPKBadgeTypeLight),
                                     @"inverse" : @(BPKBadgeTypeInverse),
                                     @"outline" : @(BPKBadgeTypeOutline)}),
                   BPKBadgeTypeSuccess, integerValue)
@end


NS_ASSUME_NONNULL_END

