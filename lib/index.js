// actions
const changeFilePermissionRoutine = require( "./action/chmod" );
const miseenCreateFolderRoutine = require( "./action/mkdir" );

function miseen ( config, scriptParams ) {
  const { chmod, mkdir } = config;

  const HAS_PARAMS = scriptParams.length > 2;

  if (
    mkdir && !HAS_PARAMS
    || mkdir && HAS_PARAMS && scriptParams.includes( "mkdir" )
  ) {
    miseenCreateFolderRoutine( mkdir );
  }

  if (
    chmod && !HAS_PARAMS
    || chmod && HAS_PARAMS && scriptParams.includes( "chmod" )
  ) {
    changeFilePermissionRoutine( chmod );
  }
}

module.exports = miseen;
