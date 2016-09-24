const FramptonBuild = require('frampton-build');
const packages = {
  'frampton-browser' : { trees: null }
};

const build = new FramptonBuild({
  name : 'frampton-browser',
  packages : packages
});

module.exports = build.getDistTree();
