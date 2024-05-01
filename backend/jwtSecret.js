const crypto = require('crypto');

// Generate a random JWT secret
const generateJwtSecret = () => {
  return crypto.randomBytes(32).toString('hex');
};


module.exports = generateJwtSecret();
