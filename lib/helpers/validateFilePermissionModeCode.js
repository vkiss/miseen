const { IS_VALID_PERMISSION_MODE } = require( "./regexTests" );


/**
 * validateFilePermissionModeCode
 *
 * @param {unknown} mode
 * @return {{ error: string | null, isValid: boolean }}
 */
const validateFilePermissionModeCode = ( mode ) => {
  const modeString = String( mode ).trim();
  const isValid = IS_VALID_PERMISSION_MODE.test( modeString );
  return {
    error: isValid ? null : `"${mode}" is not an acceptable file permission mode`,
    isValid: isValid,
  };
};

module.exports = validateFilePermissionModeCode;
