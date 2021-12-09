/*
    *  Custom error yang mengindikasikan eror karena masalah yang terjadi pada client. 
    * ClientError ini bersifat abstrak karena client error bisa lebih spesifik. 
    *  Sehingga, sebaiknya Anda tidak membangkitkan error dengan menggunakan class ini secara langsung,
    *  tetapi gunakanlah turunannya.

*/


const ClientError = require('./ClientError');
     
class InvariantError extends ClientError {
  constructor(message) {
    super(message);
    this.name = 'InvariantError';
  } 
}
module.exports = InvariantError;