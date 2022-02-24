const CustomAPIError = require('./custom-error');

class UnautheticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnautheticatedError;
