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
#import "BPKNavigationBarManager.h"

#import <UIKIt/UIKit.h>

#import "BPKNavigationBar.h"

NS_ASSUME_NONNULL_BEGIN
@implementation BPKNavigationBarManager

RCT_EXPORT_MODULE()

RCT_EXPORT_VIEW_PROPERTY(prefersLargeTitles, BOOL)
RCT_EXPORT_VIEW_PROPERTY(tintColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(titleColor, UIColor)

RCT_CUSTOM_VIEW_PROPERTY(title, NSString, BPKNavigationBar) {
    UINavigationItem *item = [view topItem];
    item.title = [RCTConvert NSString:json];
}

RCT_EXPORT_VIEW_PROPERTY(leftButtonText, NSString)
RCT_EXPORT_VIEW_PROPERTY(onLeftButtonTap, RCTBubblingEventBlock)

RCT_EXPORT_VIEW_PROPERTY(rightButtonText, NSString)
RCT_EXPORT_VIEW_PROPERTY(onRightButtonTap, RCTBubblingEventBlock)


- (UIView *)view {
    return [BPKNavigationBar new];
}

@end
NS_ASSUME_NONNULL_END

