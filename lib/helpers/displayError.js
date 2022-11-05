const chalk = require( "chalk" );
const { info } = console;

/**
 * ### displayError
 * logs an styled error message
 *
 * @param {string} errorMessage
 */
const displayError = ( errorMessage ) => {
  info( chalk.red( "*" ), chalk.bold.red( errorMessage ) );
};

module.exports = displayError;
