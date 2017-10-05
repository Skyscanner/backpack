require 'json'
version = JSON.parse(File.read('package.json'))["version"]

Pod::Spec.new do |s|
  s.name           = "BpkIcon"
  s.version        = version
  s.summary        = "Backpack's collection of icons."
  s.homepage       = "https://github.com/Skyscanner/backpack/tree/master/packages/react-native-bpk-component-icon"
  s.license        = "Apache License 2.0"
  s.author         = { "Backpack" => "backpack@skyscanner.net" }
  s.resources      = "./node_modules/bpk-svgs/dist/font/*.ttf"
  s.preserve_paths = "**/*.js"
  s.dependency 'React'
end
