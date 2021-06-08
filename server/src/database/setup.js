const { query } = require('./index');

(async () => {
  await query(`  
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR NOT NULL UNIQUE,
      username VARCHAR NOT NULL UNIQUE,
      email VARCHAR NOT NULL UNIQUE,
      password VARCHAR NOT NULL
    );
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS likes (
      product_id VARCHAR NOT NULL,
      liked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      user_id VARCHAR NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);
})();
