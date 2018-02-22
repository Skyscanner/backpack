PACKAGE_ROOT = 'native/packages/react-native-bpk-component-navigation-bar-ios'.freeze

Pod::Spec.new do |s|
  s.name = 'BpkNavigationBariOS'
  s.version = '0.0.0' # TODO: This should be parsed from package.json
  s.homepage = 'http://github.com/skyscanner/backpack'
  s.platform = :ios, '9.0'
  s.source = { git: 'git@github.com:Skyscanner/backpack.git' }
  s.source_files = "#{PACKAGE_ROOT}/iOS/*.{h,m}"
  s.preserve_paths = "#{PACKAGE_ROOT}/src/**/*.js"
  s.dependency 'React'
end
