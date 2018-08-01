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
#import "NavigationViewController.h"
#import <React/RCTDevMenu.h>

@interface NavigationViewController ()
@property (nonatomic, strong) RCTDevMenuItem *devMenuItem;
@end

@implementation NavigationViewController

RCT_EXPORT_MODULE();
@synthesize bridge = _bridge;

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

- (void)setBridge:(RCTBridge *)bridge {
  _bridge = bridge;

  [_bridge.devMenu addItem:self.devMenuItem];
}

- (RCTDevMenuItem *)devMenuItem
{
  if (!_devMenuItem) {
    __weak typeof(self) weakSelf = self;
    _devMenuItem =
    [RCTDevMenuItem buttonItemWithTitleBlock:^NSString *{
      return @"Toggle Navigation Bar";} handler:^{
        [weakSelf setNavigationBarHidden:!weakSelf.navigationBar.isHidden animated:YES];
      }];
  }

  return _devMenuItem;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
