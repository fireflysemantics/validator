require('mkdirp').sync('dist');
require('cpy')('package.json', 'dist');
require('recursive-copy')("target/src/", "dist");