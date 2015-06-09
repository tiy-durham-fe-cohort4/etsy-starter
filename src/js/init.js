'use strict';

// Add jQuery as a global. Not great, but pretty much the only way to use
// jQuery plugins that aren't browserify friendly. 
global.jQuery = require('jquery');

// Require parsleyjs, which itself needs jQuery!
require('parsleyjs');

var router = require('./router');
var bulk = require('bulk-require');

// Require all controllers (which register their own routes)
bulk(__dirname, ['controllers/**/*.js']);

// Start the router
router.init();