/*
 * Build Script
 * ============================================================================
 * author: Jack Galilee
 * ============================================================================
 * Provides task for minifying the library by concatenating and uglifying the
 * files in the specified order.
 */
var minify = require('jake-uglify').minify;

// Default task to minify the javascript library for use in other applications.
task('default', ['graph.min.js']);
desc('Minifiy Graph.js source directory.');
minify({'graph.min.js': [
  'src/Node.js',
  'src/Graph.js',
  'src/Connectors.js'
]});
