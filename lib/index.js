// actions
const changeFilePermissionRoutine = require( "./action/chmod" );
const miseenCreateFolderRoutine = require( "./action/mkdir" );

// helpers
const displayError = require( "./helpers/displayError" );

function miseen ( config ) {
  const { chmod, mkdir } = config;

  if ( mkdir && mkdir.default ) {
    miseenCreateFolderRoutine( mkdir.default );
  } else if ( mkdir && !mkdir.default ) {
    displayError( "miseen.mkdir only accepts string or an array of strings, revisit your configuration" );
  }

  if ( chmod && chmod.default ) {
    changeFilePermissionRoutine( chmod.default );
  }
}

module.exports = miseen;
