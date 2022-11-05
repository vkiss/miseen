
const chalk = require( "chalk" );
const miseenCreateFolderRoutine = require( "./action/mkdir" );

const { info } = console;

const displayError = ( title ) => {
  info( chalk.red( "*" ), chalk.bold.red( title ) );
};

function miseen ( config ) {
  const { mkdir } = config;

  if ( mkdir && mkdir.default ) {
    miseenCreateFolderRoutine( mkdir.default );
  } else if ( mkdir && !mkdir.default ) {
    displayError( "miseen.mkdir only accepts string or an array of strings, revisit your configuration" );
  }
}

module.exports = miseen;
