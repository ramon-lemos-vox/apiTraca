const { Pool } = require('pg');
//prod
const pool = new Pool({
  user: 'voxcity',
  host: '186.237.57.35',
  database: 'vox',
  password: 'iZFTzPJFsY6D',
  port: 5432,
});
//dev
// const pool = new Pool({
//   user: 'postgres',
//   host: 'vox.cipfybrqddsy.us-east-1.rds.amazonaws.com',
//   database: 'Vox-Dev',
//   password: 'inova0453',
//   port: 5432,
//   ssl: {
//     rejectUnauthorized: false, // Ajuste conforme necessário
//   },
// });

async function connectDB() {
  try {
    await pool.connect(); 
    console.log('Conectado ao PostgreSQL');
  } catch (err) {
    console.error('Erro ao conectar ao PostgreSQL', err.stack);
    throw err; 
  }
}

async function runQuery(query, params = []) {
  const client = await pool.connect(); 
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

async function addUser({ name, email, status, passwordHash, profile, tenantId }) {
  try {
    const query = `
      INSERT INTO "Users" 
        (name, email, status, "passwordHash", "tokenVersion", profile, "tenantId", "createdAt", "updatedAt", configs)
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW(), $8)
      RETURNING *;
    `;

    const values = [
      name,          
      email,         
      status,        
      passwordHash,  
      0,             
      profile || 'user',  
      tenantId,      
      {}             
    ];

    const result = await runQuery(query, values);
    console.log('Usuário adicionado com sucesso:', result);
  } catch (err) {
    console.error('Erro ao adicionar o usuário:', err);
  }
}

async function getAllUsers() {
  try {
    const query = `
      SELECT * FROM "users";
    `;
    
    const result = await runQuery(query); 
    console.log('Usuários encontrados:', result);
    return result;
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    throw err;
  }
}


async function disconnectDB() {
  await pool.end(); 
  console.log('Conexão com PostgreSQL encerrada');
}

module.exports = { connectDB, runQuery, disconnectDB, addUser, getAllUsers };
