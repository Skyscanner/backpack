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
#import "BPKNavigationBar.h"

#import <React/RCTComponent.h>

NS_ASSUME_NONNULL_BEGIN
@interface BPKNavigationBar() <UINavigationBarDelegate>
@property (nonatomic, copy, nullable) RCTBubblingEventBlock onLeftButtonTap;
@property (nonatomic, copy, nullable) RCTBubblingEventBlock onRightButtonTap;

- (void)didTapLeftButton:(id)sender;
- (void)didTapRightButton:(id)sender;
@end

@implementation BPKNavigationBar

- (instancetype)init {
    self = [super initWithFrame:CGRectZero];
    if (self) {
        UINavigationItem *navigationItem = [[UINavigationItem alloc] init];
        self.delegate = self;

        self.items = @[ navigationItem ];
    }

    return self;
}

- (void)setPrefersLargeTitles:(BOOL)prefersLargeTitles {
    if (@available(iOS 11.0, *)) {
        [super setPrefersLargeTitles:prefersLargeTitles];
    }
}

- (void)setTitleColor:(UIColor *__nullable)titleColor {
    if (_titleColor != titleColor) {
        _titleColor = titleColor;

        if (_titleColor) {
            NSDictionary *attributes = @{ NSForegroundColorAttributeName: titleColor };
            self.titleTextAttributes = attributes;
            self.largeTitleTextAttributes = attributes;
        }
    }
}

- (void)setLeftButtonText:(NSString *__nullable)leftButtonText {
    _leftButtonText = leftButtonText;
    UINavigationItem *item = self.topItem;

    if (_leftButtonText == nil) {
        item.leftBarButtonItem = nil;
        return;
    }

    UIBarButtonItem *leftButton = [[UIBarButtonItem alloc] initWithTitle:_leftButtonText style:UIBarButtonItemStylePlain target:self action:@selector(didTapLeftButton:)];

    item.leftBarButtonItem = leftButton;
}

- (void)setRightButtonText:(NSString *__nullable)rightButtonText {
    _rightButtonText = rightButtonText;

    UINavigationItem *item = self.topItem;

    if (_rightButtonText == nil) {
        item.rightBarButtonItem = nil;
        return;
    }
    UIBarButtonItem *button = [[UIBarButtonItem alloc] initWithTitle:_rightButtonText style:UIBarButtonItemStylePlain target:self action:@selector(didTapRightButton:)];

    item.rightBarButtonItem= button;
}

#pragma mark - Private

- (void)didTapLeftButton:(id)sender {
    if (!self.onLeftButtonTap) {
        return;
    }

    self.onLeftButtonTap(nil);
}

- (void)didTapRightButton:(id)sender {
    if (!self.onRightButtonTap) {
        return;
    }

    self.onRightButtonTap(nil);
}

#pragma mark - UINavigationBarDelegate

- (UIBarPosition)positionForBar:(id<UIBarPositioning>)bar {
    return UIBarPositionTop;
}

@end

NS_ASSUME_NONNULL_END
