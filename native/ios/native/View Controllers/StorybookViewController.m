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

#import "StorybookViewController.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTI18nUtil.h>

@interface StorybookViewController ()
@end

@implementation StorybookViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    NSURL *jsCodeLocation;

    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

    RCTBridge *bridge = [[RCTBridge alloc] initWithBundleURL:jsCodeLocation moduleProvider:^NSArray<id<RCTBridgeModule>> *{
        return @[self.navigationController];
    } launchOptions:nil];

    RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge moduleName:@"native" initialProperties:nil];
    rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

    [self.view addSubview:rootView];
    rootView.translatesAutoresizingMaskIntoConstraints = NO;
    UILayoutGuide *margins = self.view.layoutMarginsGuide;
    [self.view.leadingAnchor constraintEqualToAnchor:rootView.leadingAnchor].active = YES;
    [self.view.trailingAnchor constraintEqualToAnchor:rootView.trailingAnchor].active = YES;
    [margins.topAnchor constraintEqualToAnchor:rootView.topAnchor].active = YES;
    [margins.bottomAnchor constraintEqualToAnchor:rootView.bottomAnchor].active = YES;

    [[RCTI18nUtil sharedInstance] allowRTL:YES];
}

@end
