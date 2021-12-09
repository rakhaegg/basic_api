/*
     * Custom error yang mengindikasikan eror karena resource yang diminta client tidak ditemukan.


*/
const ClientError = require('./ClientError');
     
class NotFoundError extends ClientError {
  constructor(message) {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}
module.exports = NotFoundError;