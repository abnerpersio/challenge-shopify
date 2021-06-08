const db = require('../database');

class UserRepository {
  async findAll() {
    const rows = await db.query(`
      SELECT *
      FROM users
      ORDER BY username
    `);
    return rows;
  }

  async findByUsername(username) {
    const [row] = await db.query(
      `
      SELECT *
      FROM users
      WHERE username = $1
      `,
      [username]
    );
    return row;
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);
    return row;
  }

  async findByUserAndPassword({ username, password }) {
    const [row] = await db.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2',
      [username, password]
    );
    return row;
  }

  async create({ id, username, email, password }) {
    const [row] = await db.query(
      `
      INSERT INTO users(id, username, email, password)
      VALUES($1, $2, $3, $4)
      RETURNING *
      `,
      [id, username, email, password]
    );

    return row;
  }
}

module.exports = new UserRepository();
