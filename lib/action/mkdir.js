const fs = require( "fs" );
const path = require( "path" );
const chalk = require( "chalk" );

const { info } = console;

const root = "./";

/**
 * @param {string} dir folder path to be created
 */
function createFolder ( dir ) {
  const folderPath = path.resolve( root, dir );
  if ( !fs.existsSync( folderPath ) ) {
    fs.mkdirSync( folderPath );
    info(
      chalk.gray( ">" ),
      chalk.bgWhite.black( "/" + dir ),
      chalk.gray( "created" ),
    );
  }
}

/**
 * @param {string[]} splittedPath
 * @param {number} index
 */
function resolvePathBuildString ( splittedPath, index ) {
  const finalPath = [];
  splittedPath.map( ( partialPath, i ) => {
    if ( i <= index ) {
      finalPath.push( partialPath );
    }
  } );

  return finalPath.join( "/" );
}

/**
 * @param {string | string[]} createFolderPath
 */
function resolvePath ( createFolderPath ) {
  const HAS_MULTIPLE_PATHS = createFolderPath.split( "/" ).filter( ( string ) => string.trim() !== "" );

  if ( HAS_MULTIPLE_PATHS.length === 1 ) {
    createFolder( createFolderPath );
  } else if ( HAS_MULTIPLE_PATHS.length > 1 ) {
    HAS_MULTIPLE_PATHS.map( ( _, index ) => {
      createFolder( resolvePathBuildString( HAS_MULTIPLE_PATHS, index ) );
    } );
  }
}

function action ( routine ) {
  if ( typeof routine === "string" ) {
    resolvePath( routine );
  } else if ( Array.isArray( routine ) ) {
    routine.map( ( folderPath ) => {
      resolvePath( folderPath );
    } );
  }
}

module.exports = action;
