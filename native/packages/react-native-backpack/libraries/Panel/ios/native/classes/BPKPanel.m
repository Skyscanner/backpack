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
#import "BPKPanel.h"

#import <Backpack/Spacing.h>
#import <Backpack/Color.h>
#import <Backpack/Radii.h>

NS_ASSUME_NONNULL_BEGIN
@interface BPKPanel()
@property (assign) UIEdgeInsets originalLayoutMargins;

- (void)setup;
@end


@implementation BPKPanel

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

- (void)setPadded:(BOOL)padded {
    if (padded) {
        self.layoutMargins = self.originalLayoutMargins;
    } else {
        self.layoutMargins = UIEdgeInsetsZero;
    }
    
    _padded = padded;
}

#pragma mark - Private

- (void)setup {
    self.originalLayoutMargins = self.layoutMargins;
    self.padded = YES;
    self.backgroundColor = [BPKColor white];
    self.layer.cornerRadius = BPKBorderRadiusSm;
    self.layer.masksToBounds = YES;
    self.layer.borderColor = [BPKColor gray100].CGColor;
    self.layer.borderWidth = 1.0;
}

@end
NS_ASSUME_NONNULL_END
