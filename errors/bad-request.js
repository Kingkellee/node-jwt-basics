const CustomAPIError = require('./custom-error');

class BadRequest extends CustomAPIError {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = BadRequest;
