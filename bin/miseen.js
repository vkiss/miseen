#!/usr/bin/env node

const { cosmiconfig } = require( "cosmiconfig" );
const chalk = require( "chalk" );

// imports: lib
const miseen = require( "../lib" );
const displayError = require( "../lib/helpers/displayError" );

const { info } = console;

/**
* HELPERS
*/
/**
 * @param {unknown} action
 * @param {string} actionName
 * @return {{ default: string | string[] } | { [key: string]: string | string[] } | null}
 */
const validateAction = ( action, actionName ) => {
  let actionObject = {};

  if ( Array.isArray( action ) ) {
    actionObject = {
      default: action
    };
  } else if ( typeof action === "string" ) {
    actionObject = {
      default: [action]
    };
  } else if ( typeof action === "object" ) {
    const isInvalidMkdirCollection = Object.keys( action ).map( ( key ) => typeof action[key] === "string" || Array.isArray( action[key] ) ).includes( false );
    if ( isInvalidMkdirCollection ) {
      displayError( actionName + " is invalid" );
    } else {
      actionObject = action;
    }
  } else {
    displayError( actionName + " is invalid" );
  }

  if ( Object.keys( actionObject ).length === 0 ) return null;

  return actionObject;
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
    validConfig.chmod = validateAction( config.chmod, "config.chmod" );
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
  // Script start message
  info( chalk.gray( "> mise en package" ) );

  const explorer = cosmiconfig( "miseen" );

  explorer.search()
    .then( ( result ) => {
      if ( result === null ) {
        return displayError( "configuration missing" );
      }

      const config = getConfig( result.config );
      miseen( config );
    } )
    .catch( ( error ) => {
      info( chalk.red( error ) );
    } );
};

runScript();
