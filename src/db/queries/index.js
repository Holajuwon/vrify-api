module.exports = {
  /**
   * @description Creates the user table
   */
  createUserTable: `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      first_name VARCHAR NOT NULL,
      last_name VARCHAR NOT NULL,
      email VARCHAR NOT NULL UNIQUE,
      password VARCHAR NOT NULL,
      is_verified BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );  
  `,
  /**
   * @description Creates new user
   * @param {string} email email of the user
   * @param {string} first_name first name of the user
   * @param {string} last_name last name of the user
   * @param {string} password password of the user
   * @returns {string} returns the created user
   */
  createUser: `
    INSERT INTO users (email, first_name, last_name, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `,
  /**
   * @description Gets a user by email
   * @param {string} email email of the user
   * @returns {string} returns the user with the email
   */
  findUserByEmail: `
    SELECT * FROM users WHERE email = $1;
  `,
  /**
   * @description Gets a user by id
   * @param {number} id id of the user
   * @returns {string} returns the user with the id
   */
  findUserById: `
    SELECT * FROM users WHERE id = $1;
  `,

  updateUser: `
    UPDATE users SET first_name = $1, last_name = $2, email = $3, password = $4, updated_at = NOW()
    WHERE id = $5
    RETURNING *;
  `,
  deleteUser: `
    DELETE FROM users WHERE id = $1;
  `,
  updatePassword: `
    UPDATE users SET password = $1, updated_at = NOW()
    WHERE id = $2
    RETURNING email, id;
  `,
  /**
   * @description - verifies a user account
   * @param {number} email email of the user
   * @returns {<promise>} returns the user
   */
  verifyUser: `
    UPDATE users SET is_verified = true, updated_at = NOW()
    WHERE email = $1
    RETURNING *;
  `,
};
