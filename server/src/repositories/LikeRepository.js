const db = require('../database');

class LikeRepository {
  async findAll({ user_id }) {
    const rows = await db.query(
      `
      SELECT *
      FROM likes
      WHERE user_id = $1
    `,
      [user_id]
    );
    return rows;
  }

  async findOne({ product_id, user_id }) {
    const [row] = await db.query(
      `
      SELECT *
      FROM likes
      WHERE product_id = $1 AND user_id = $2
      `,
      [product_id, user_id]
    );

    return row;
  }

  async create({ product_id, user_id }) {
    const [row] = await db.query(
      `
      INSERT INTO likes(product_id, user_id)
      VALUES($1, $2)
      RETURNING *
      `,
      [product_id, user_id]
    );

    return row;
  }

  async delete({ product_id, user_id }) {
    const [row] = await db.query(
      `
      DELETE FROM likes
      WHERE product_id = $1 AND user_id = $2
      `,
      [product_id, user_id]
    );

    return row;
  }
}

module.exports = new LikeRepository();
