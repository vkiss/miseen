#!/usr/bin/env node

const { cosmiconfig } = require( "cosmiconfig" );
const chalk = require( "chalk" );
const miseen = require( "../lib" );

const { info } = console;

/**
* HELPERS
*/

const displayError = ( title ) => {
  info( chalk.red( "*" ), chalk.bold.red( title ) );
};

const getConfig = ( config ) => {
  let validConfig = {};

  if ( config.mkdir ) {
    if ( Array.isArray( config.mkdir ) ) {
      validConfig.mkdir = {
        default: config.mkdir
      };
    } else if ( typeof config.mkdir === "string" ) {
      validConfig.mkdir = {
        default: [config.mkdir]
      };
    } else if ( typeof config.mkdir === "object" ) {
      const isInvalidMkdirCollection = Object.keys( config.mkdir ).map( ( key ) => typeof config.mkdir[key] === "string" || Array.isArray( config.mkdir[key] ) ).includes( false );
      if ( isInvalidMkdirCollection ) {
        displayError( "miseen.mkdir is invalid" );
      } else {
        validConfig.mkdir = config.mkdir;
      }
    } else {
      displayError( "miseen.mkdir is invalid" );
    }
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
