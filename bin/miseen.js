#!/usr/bin/env node

const { cosmiconfig } = require( "cosmiconfig" );
const chalk = require( "chalk" );

// imports: lib
const miseen = require( "../lib" );
const displayError = require( "../lib/helpers/displayError" );
const { IS_VALID_PERMISSION_MODE } = require( "../lib/helpers/regexTests" );

const { info } = console;

/**
* HELPERS
*/
/**
 * @param {unknown} action
 * @param {string} actionName
 * @return {{ default: string | string[] } | { [key: string]: string | string[] } | null}
 */
const extraValidation = ( item, arrayOfProps ) => {
  if ( arrayOfProps.length === 0 ) return true;
  return arrayOfProps.filter( ( prop ) => {
    return prop.regex.test( item[prop.name] );
  } ).length > 0;
};

const validateAction = ( action, actionName, propsValidation = [] ) => {
  if ( Array.isArray( action ) ) {
    const onlyValidConfigItens = action.filter( ( item, index ) => {
      const isValidItem = item.path && typeof item.path === "string" && extraValidation( item, propsValidation );
      if ( !isValidItem ) {
        info(
          chalk.gray( "* (" + actionName + "[" + index + "]) " + JSON.stringify( item ) + " is not a valid config" )
        );
        if ( !item.path ) {
          info(
            chalk.gray( "    * item.path undefined" )
          );
        }
      }
      return isValidItem;
    } );

    if ( onlyValidConfigItens.length === 0 ) return null;

    return onlyValidConfigItens;
  }

  return null;
};

/**
 * @param {{
 *  chmod?: unknown,
 *  mkdir?: unknown,
 * }} config
 * @return {*}
 */
const getConfig = ( config ) => {
  let validConfig = {};

  if ( config.chmod ) {
    validConfig.chmod = validateAction( config.chmod, "config.chmod", [{ name: "mode", regex: IS_VALID_PERMISSION_MODE }] );
  }

  if ( config.mkdir ) {
    validConfig.mkdir = validateAction( config.mkdir, "config.mkdir" );
  }

  return validConfig;
};

/**
* ----------------------------------------------------------
*/

const runScript = () => {
  const scriptParams = process.argv;
  // Script start message
  info( chalk.gray( "> mise en package" ) );

  const explorer = cosmiconfig( "miseen" );

  explorer.search()
    .then( ( result ) => {
      if ( result === null ) {
        return displayError( "configuration missing" );
      }

      const config = getConfig( result.config );
      miseen( config, scriptParams );
    } )
    .catch( ( error ) => {
      info( chalk.red( error ) );
    } );
};

runScript();
