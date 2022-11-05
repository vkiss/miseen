const fs = require( "fs" );

/**
 * @param {string} path
 */
module.exports = ( path ) => fs.lstatSync( path ).isDirectory() ;
