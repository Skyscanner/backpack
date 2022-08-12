lerna clean --yes

rm -rf ./dist
mkdir "dist"
cd ./packages

for d in */
do
  cd "$d" || return
  if [ "$d" == "bpk-component-barchart/" ]
  then
      cp -R "../../node_modules/d3-array" "./d3-array"
      cp -R "../../node_modules/d3-color" "./d3-color"
      cp -R "../../node_modules/d3-format" "./d3-format"
      cp -R "../../node_modules/d3-interpolate" "./d3-interpolate"
      cp -R "../../node_modules/d3-scale" "./d3-scale"
      cp -R "../../node_modules/d3-time" "./d3-time"
      cp -R "../../node_modules/d3-time-format" "./d3-time-format"
      cp -R "../../node_modules/internmap" "./internmap"
  fi

  if [ "$d" == "bpk-component-flare/" ] || [ "$d" == "bpk-component-icon/" ]
  then
    npm run build
  fi

  rm -rf ./dist
  babel . --out-dir dist --config-file '../../babel.config.js'
  mv "dist" "../../dist/$d"

  if [ "$d" == "bpk-component-barchart/" ]
  then
      rm -rf "./d3-array"
      rm -rf "./d3-color"
      rm -rf "./d3-format"
      rm -rf "./d3-interpolate"
      rm -rf "./d3-scale"
      rm -rf "./d3-time"
      rm -rf "./d3-time-format"
      rm -rf "./internmap"
    fi

  cd ..
done

cp package.json "../dist/package.json"

cd ..
