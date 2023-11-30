set -e

cd packages

for dir in */
do
  if [ $dir != bpk-mixins-next/ ] && [ $dir != bpk-mixins/ ] && [ $dir != node_modules/ ];
  then
    echo $dir
     sass-migrator --load-path=node_modules module "${dir}**/*.scss"
     sass-migrator --load-path=node_modules division "${dir}**/*.scss"
     sass-migrator --load-path=node_modules namespace --rename 'bpk-mixins-next to mixins' "${dir}**/*.scss"
  fi
done
