const DB = require('./ConnectionDB');

// _______________________________________________________________________________________________________________________________________________________


class UsersDB extends DB {
    constructor() {
        super();
    }

    async getAllUsers() {
        try {
          const query = `
            SELECT * FROM "users";
          `;
          
          const result = await this.runQuery(query); 
          console.log('Usuários encontrados:', result);
          return result;
        } catch (err) {
          console.error('Erro ao buscar usuários:', err);
          throw err;
        }
      }

}

module.exports = UsersDB;