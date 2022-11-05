const chalk = require( "chalk" );
const fs = require( "fs" );
const path = require( "path" );

// helpers
const displayError = require( "../helpers/displayError" );
const getListOfFilesFromFolder = require( "../helpers/getListOfFilesFromFolder" );
const isFolder = require( "../helpers/isFolder" );
const { IS_VALID_PERMISSION_MODE } = require( "../helpers/regexTests" );
const validateFilePermissionModeCode = require( "../helpers/validateFilePermissionModeCode" );

const {info} = console;

const root = "./";

/**
 * @param {string} filePath
 * @param {number} mode
 */
function changeFilePermission ( filePath, mode ) {
  const modeValidation = validateFilePermissionModeCode( mode );
  // mode param validation
  if ( modeValidation.error ) {
    displayError( modeValidation.error );
    return;
  }

  ( async () => {
    try {
      const { fd } = await fs.promises.open( path.resolve( root, filePath ), "r" );
      const stats = await fs.promises.stat( path.resolve( root, filePath ) );
      const fileMode = Number( "0o" + mode );

      fs.fchmod( fd, fileMode, ( err ) => {
        if ( err ) throw err;

        info(
          chalk.gray( ">" ),
          chalk.bgMagentaBright.white( filePath ),
          chalk.gray( "permission change to 777" )
        );
      } );
    } catch ( error ) {
      info( error );
    }
  } )();
}

/**
 * @param {{ mode: number | path: string }[]} validItem
 */
function isFileOrFolderRouter ( itemsArray ) {
  itemsArray.map( ( item ) => {
    if ( isFolder( item.path ) ) {
      const files = getListOfFilesFromFolder( item.path );
      files.map( ( fileInsideFolderPath ) => {
        changeFilePermission( item.path + "/" + fileInsideFolderPath, item.mode );
      } );
    } else {
      changeFilePermission( item.path, item.mode );
    }
  } );
}

function action ( batchFiles ) {
  if ( !Array.isArray( batchFiles ) ) {
    displayError( "miseen.chmod is invalid" );
    return;
  }

  const onlyValidConfigItens = batchFiles.filter( ( item ) => {
    const isValidItem = item.path && typeof item.path === "string" && item.mode && IS_VALID_PERMISSION_MODE.test( item.mode );
    if ( !isValidItem ) {
      if ( !IS_VALID_PERMISSION_MODE.test( item.mode ) ) {
        info(
          chalk.gray( "> tried to apply" ),
          chalk.bgWhite.black( `${item.mode}` ),
          chalk.gray( "to" ),
          chalk.bgWhite.black( `"${item.path}"` ),
          chalk.gray( "but is not a valid permission mode" ),
        );
      }
    }
    return isValidItem;
  } );

  if ( onlyValidConfigItens.length > 0 ) {
    isFileOrFolderRouter( onlyValidConfigItens );
  } else {
    displayError( "miseen.chmod is invalid" );
  }
}

module.exports = action;
