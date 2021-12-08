/*
     Custom error yang mengindikasikan eror karena kesalahan bisnis logic pada data yang dikirimkan oleh client. 
     Kesalahan validasi data merupakan salah satu InvariantError.

*/
const ClientError = require('./ClientError');
     
class InvariantError extends ClientError {
  constructor(message) {
    super(message);
    this.name = 'InvariantError';
  } 
}
module.exports = InvariantError;