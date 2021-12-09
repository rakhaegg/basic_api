/*
    *  mengelola resource notes menggunakan PostgreSQ

*/
const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');

const { mapDBToModel } = require('../../utils');
const NotFoundError = require('../../exceptions/NotFoundError');

class NotesService {
    constructor() {
        this._pool = new Pool();
    }



    async addNote({ title, body, tags }) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text: 'INSERT INTO notes VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
            values: [id, title, body, tags, createdAt, updatedAt],
        };


        const result = await this._pool.query(query);

        /*
          * Untuk memastikan notes berhasil dimasukan ke database, 
          * kita bisa evaluasi nilai dari results.rows[0].id (karena kita melakukan returning id pada query).
          * Jika nilai id tidak undefined, itu berarti catatan berhasil dimasukan dan kembalikan fungsi dengan nilai id. 
          * Jika tidak maka throw InvariantError.

        */
        if (!result.rows[0].id) {
            throw new InvariantError('Catatan gagal ditambahkan');
        }

        return result.rows[0].id;
    }


    async getNotes() {
        const result = await this._pool.query('SELECT * FROM notes');
        return result.rows.map(mapDBToModel);
    }

    async getNoteById(id) {
        const query = {
            text: 'SELECT * FROM notes WHERE id = $1',
            values: [id],
        };
        const result = await this._pool.query(query);

        // * mudian periksa nilai result.rows, bila nilainya 0 (false) maka bangkitkan NotFoundError. 
        // * Bila tidak, maka kembalikan dengan result.rows[0] yang sudah di-mapping dengan fungsi mapDBToModel.
        if (!result.rows.length) {
            throw new NotFoundError('Catatan tidak ditemukan');
        }

        return result.rows.map(mapDBToModel)[0];
    }
    async editNoteById(id, { title, body, tags }) {
        const updatedAt = new Date().toISOString();
        const query = {
          text: 'UPDATE notes SET title = $1, body = $2, tags = $3, updated_at = $4 WHERE id = $5 RETURNING id',
          values: [title, body, tags, updatedAt, id],
        };
        
        const result = await this._pool.query(query);
        

        // * Sama seperti sebelumnya, periksa nilai result.rows bila nilainya 0 (false) maka bangkitkan NotFoundError. 
        // * Di fungsi editNoteById kita tidak perlu mengembalikan nilai apa pun.

        if (!result.rows.length) {
          throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan');
        }
      }

      async deleteNoteById(id) {
        const query = {
          text: 'DELETE FROM notes WHERE id = $1 RETURNING id',
          values: [id],
        };
        
        const result = await this._pool.query(query);
        /*
            * Seperti biasa, periksa nilai result.rows bila nilainya 0 (false) maka bangkitkan NotFoundError. 
            * Fungsi ini juga tidak perlu mengembalikan nilai apa pun.

        */
        if (!result.rows.length) {
          throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan');
        }
      }
}
module.exports = NotesService;