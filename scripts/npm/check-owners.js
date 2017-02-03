/* eslint-disable no-console */
/* eslint-disable comma-dangle */

const fs = require('fs');
const http = require('http');
const Q = require('q');

const readdir = Q.denodeify(fs.readdir);
const maintainers = fs.readFileSync('NPM_OWNERS', { encoding: 'utf-8' })
                      .split('\n')
                      .filter(s => s.trim() !== '')
                      .sort();

const getPackageMaintainers = (pkg) => {
  const deferred = Q.defer();
  http.get(`http://registry.npmjs.org/${pkg}/`, (res) => {
    let body = '';
    res.setEncoding('utf8');
    res.on('data', (d) => {
      body += d;
    });
    res.on('error', deferred.reject);
    res.on('end', () => {
      const pkgData = JSON.parse(body);

      if (pkgData.maintainers) {
        deferred.resolve({
          name: pkg,
          maintainers: pkgData.maintainers.map(m => m.name),
          new: false,
        });
      } else {
        deferred.resolve({
          name: pkg,
          new: true,
        });
      }
    });
  });
  return deferred.promise;
};

const verifyMaintainers = (data) => {
  if (data.new) {
    console.log(`${data.name} ⁇\n  Package does not seem to be in NPM registry (yet)`);
    return;
  }
  if (data.maintainers.sort().join('') === maintainers.join('')) {
    // all good
    console.log(`${data.name} ✔︎`);
  } else {
    console.log(
      `${data.name}\n  Expected\n    ${maintainers.join(', ')}\n  but got\n    ${data.maintainers.sort().join(', ')}`
    );
    process.exitCode = 1;
  }
};

console.log(`Maintainers are:\n  ${maintainers.join('\n  ')}\n`);

readdir('packages/')
  .then(packages => Q.all(packages.map(getPackageMaintainers)))
  .then(packages => packages.forEach(verifyMaintainers))
  .then(() => {
    if (process.exitCode !== 0) {
      console.log('\nPlease fix your maintainer list before publishing.');
    }
  });
