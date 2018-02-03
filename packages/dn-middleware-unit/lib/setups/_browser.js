require('babel-polyfill');
const utils = require('ntils');
const jsdom = require('jsdom');

require('babel-core/register')({
  babelrc: true,
  cache: true,
  presets: [
    require.resolve('babel-preset-es2015'),
    require.resolve('babel-preset-react'),
    require.resolve('babel-preset-stage-0')
  ],
  plugins: [
    require.resolve('babel-plugin-add-module-exports'),
    require.resolve('babel-plugin-typecheck'),
    require.resolve('babel-plugin-transform-decorators-legacy')
  ]
});

//mock brownser
const JSDOM = jsdom.JSDOM;
const dom = new JSDOM(
  '<!doctype html><html><body><div class="root"></div></body></html>'
);
global.window = dom.window;
global.doument = window.doument;
global.navigator = global.navigatorf || { userAgent: 'node.js' };
utils.each(window, function (name, value) {
  if (global[name]) return;
  global[name] = value;
});

//ignore
const noop = function () { return; };
require.extensions['.css'] = noop;
require.extensions['.less'] = noop;
require.extensions['.sass'] = noop;
require.extensions['.scss'] = noop;
require.extensions['.png'] = noop;
require.extensions['.jpg'] = noop;
require.extensions['.jpeg'] = noop;
require.extensions['.gif'] = noop;
require.extensions['.svg'] = noop;

require('./_common');