/*

    *   Berkas NotesService.js bertanggung jawab untuk mengelola resource notes yang disimpan pada memory (array). 

*/


const { nanoid } = require('nanoid');

class NotesService {
    constructor() {
        this._notes = [];
    }

    // * Memasukkan catatan pada array
    addNote({ title, body, tags }) {

        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const newNote = {
            title, tags, body, id, createdAt, updatedAt,
        };

        this._notes.push(newNote);

        const isSuccess = this._notes.filter((note) => note.id === id).length > 0;

        if (!isSuccess) {
            throw new Error('Catatan gagal ditambahkan');
        }

        return id;

    }

    // * Membaca seluruh note 
    getNotes() {
        return this._notes;
    }

    // * Membaca note berdasarkan ID
    getNoteById(id) {
        const note = this._notes.filter((n) => n.id === id)[0];
        if (!note) {
            throw new Error('Catatan tidak ditemukan');
        }
        return note;
    }

    // * Mengubah data cattan yang disimpan 
    editNoteById(id, { title, body, tags }) {
        const index = this._notes.findIndex((note) => note.id === id);

        if (index === -1) {
            throw new Error('Gagal memperbarui catatan. Id tidak ditemukan');
        }

        const updatedAt = new Date().toISOString();

        this._notes[index] = {
            ...this._notes[index],
            title,
            tags,
            body,
            updatedAt,
        };
    }

    // * Menghapus notes dari array berdasarkn id yang diberikan 
    deleteNoteById(id) {
        const index = this._notes.findIndex((note) => note.id === id);
        if (index === -1) {
          throw new Error('Catatan gagal dihapus. Id tidak ditemukan');
        }
        this._notes.splice(index, 1);
      }
}

module.exports = NotesService;