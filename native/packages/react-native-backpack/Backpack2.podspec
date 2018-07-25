# Backpack - Skyscanner's Design System

# Copyright 2018 Skyscanner Ltd

# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at

#   http://www.apache.org/licenses/LICENSE-2.0
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
require 'json'
version = JSON.parse(File.read('package.json'))['version']

define_react_native_subspec = Proc.new do |name, root_spec|
  # Define subspec for native iOS code
  root_spec.subspec name do |ss|
    ss.source_files = "libraries/#{name}/ios/native/classes/**/*.{h,m}"
    ss.public_header_files = "libraries/#{name}/ios/native/classes/*.h"

    # Define additional subspec for React Native bindings
    ss.subspec 'React' do |rs|
      rs.source_files = "libraries/#{name}/ios/react/classes/**/*.{h,m}"
      rs.public_header_files = "libraries/#{name}/ios/react/classes/*.h"

      rs.dependency 'React'
    end
  end
end

Pod::Spec.new do |s|
  # TODO: `Backpack2` is a temporary name. We should use `Backpack` instead, but
  # to do that we need to merge the existing pod from `backpack-ios` into this
  # project.
  s.name             = 'Backpack2'
  s.version          = version
  s.summary          = "Skyscanner's Design System Backpack for iOS"
  s.description      = <<-DESC
  The Skyscanner Design System, Backpack, for iOS apps
                       DESC
  s.homepage         = 'https://github.com/Skyscanner/backpack'
  s.license          = { type: 'Apache-2.0', file: '../../../LICENSE' }
  s.source = {
    git: 'https://github.com/Skyscanner/backpack.git',
    tag: "react-native-backpack@#{s.version}"
  }
  s.author           = {
    'Backpack Design System' => 'backpack@skyscanner.net'
  }
  s.ios.deployment_target = '9.0'
  s.frameworks = 'UIKit', 'Foundation'

  define_react_native_subspec.call('Panel', s)
end
