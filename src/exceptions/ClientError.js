/*
     Custom error yang mengindikasikan eror karena kesalahan bisnis logic pada data yang dikirimkan oleh client. 
     Kesalahan validasi data merupakan salah satu InvariantError.

*/

class ClientError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'ClientError';
    }
}
module.exports = ClientError;
