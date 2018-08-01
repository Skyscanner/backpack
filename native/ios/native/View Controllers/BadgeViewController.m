//
//  BadgeViewController.m
//  Backpack Native
//
//  Created by Hugo Tunius on 01/08/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "BadgeViewController.h"

#import <Backpack/Color.h>
#import <Backpack/Font.h>

@interface BadgeViewController ()
@property (strong, nonatomic) IBOutletCollection(UIView) NSArray *darkViews;
@property (strong, nonatomic) IBOutletCollection(UILabel) NSArray *labels;

@end

@implementation BadgeViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    for (UIStackView *v in self.darkViews) {
        v.backgroundColor = [BPKColor gray700];
    }

    for (UILabel *label in self.labels) {
        label.font = [BPKFont textSm];
        label.textColor = [BPKColor gray700];
    }

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
