const fs = require( "fs" );

module.exports = ( folder ) => fs.readdirSync( folder );
