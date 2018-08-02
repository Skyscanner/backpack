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
#import "BPKBadge.h"

#import <Backpack/Spacing.h>
#import <Backpack/Color.h>
#import <Backpack/Radii.h>
#import <Backpack/Font.h>

NS_ASSUME_NONNULL_BEGIN
@interface BPKBadge()
@property(nonatomic, strong) UILabel *label;

- (void)setup;
@end


@implementation BPKBadge

- (instancetype)initWithType:(BPKBadgeType)type message:(NSString *)message {
    self = [self initWithFrame:CGRectZero];

    if (self) {
        self.type = type;
        self.message = message;
    }

    return self;
}

- (instancetype)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame];

    if (self) {
        [self setup];
    }

    return self;
}

- (nullable instancetype)initWithCoder:(NSCoder *)aDecoder {
    self = [super initWithCoder:aDecoder];

    if (self) {
        [self setup];
    }

    return self;
}

- (void)setType:(BPKBadgeType)type {
    _type = type;

    self.layer.borderWidth = 0.0;
    switch (type) {
        case BPKBadgeTypeSuccess:
            self.backgroundColor = [BPKColor green500];
            break;
        case BPKBadgeTypeWarning:
            self.backgroundColor = [BPKColor yellow500];
            break;
        case BPKBadgeTypeDestructive:
            self.backgroundColor = [BPKColor red500];
            break;
        case BPKBadgeTypeLight:
            self.backgroundColor = [BPKColor gray50];
            break;
        case BPKBadgeTypeInverse:
            self.backgroundColor = [BPKColor white];
            break;
        case BPKBadgeTypeOutline:
            self.backgroundColor = [[BPKColor white] colorWithAlphaComponent:0.2];
            self.layer.borderColor = [BPKColor white].CGColor;
            self.layer.borderWidth = 1.0;
            break;
        default:
            break;
    }

    if (type == BPKBadgeTypeOutline || type == BPKBadgeTypeDestructive) {
        self.label.textColor = [BPKColor white];
    } else {
        self.label.textColor = [BPKColor gray700];
    }
}

- (void)setMessage:(NSString *)message {
    self.label.text = message;
}

- (NSString *)message {
    return self.label.text;
}

#pragma mark - Private

- (void)setup {
    UILabel *label = [[UILabel alloc] initWithFrame:CGRectZero];
    label.font = [BPKFont textXs];
    [self addSubview:label];
    label.translatesAutoresizingMaskIntoConstraints = NO;

    [label.leadingAnchor constraintEqualToAnchor:self.leadingAnchor constant:BPKSpacingMd].active = YES;
    [self.trailingAnchor constraintEqualToAnchor:label.trailingAnchor constant:BPKSpacingMd].active = YES;
    [label.topAnchor constraintEqualToAnchor:self.topAnchor constant:BPKSpacingSm].active = YES;
    [self.bottomAnchor constraintEqualToAnchor:label.bottomAnchor constant:BPKSpacingSm].active = YES;
    self.label = label;

    self.type = BPKBadgeTypeSuccess;
    self.layer.cornerRadius = BPKBorderRadiusSm;
    self.layer.masksToBounds = YES;
}

@end
NS_ASSUME_NONNULL_END
