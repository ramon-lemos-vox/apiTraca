const { Pool } = require('pg');


// ------------------------------------------------------------

class ConnectionDB {
  constructor() {
    this.pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    });
  }

  // Método para conectar ao banco de dados
  async connectDB() {
    try {
      await this.pool.connect();
      console.log('Conectado ao PostgreSQL');
    } catch (err) {
      console.error('Erro ao conectar ao PostgreSQL', err.stack);
      throw err;
    }
  }

  // Método para desconectar do banco de dados
  async disconnectDB() {
    try {
      await this.pool.end();
      console.log('Conexão com PostgreSQL encerrada');
    } catch (err) {
      console.error('Erro ao encerrar a conexão com PostgreSQL', err.stack);
      throw err;
    }
  }

  // Método genérico para executar queries
  async runQuery(query, params = []) {
    const client = await this.pool.connect();
    try {
      const res = await client.query(query, params);
      return res.rows;
    } catch (err) {
      console.error('Erro ao executar a consulta', err.stack);
      throw err;
    } finally {
      client.release();
    }
  }
}


// ------------------------------------------------------------
module.exports = ConnectionDB;
