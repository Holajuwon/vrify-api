const {
  createUser,
  findUserByEmail,
  updatePassword,
  verifyUser,
} = require("../db/queries");
const { db } = require("../db");
const hashHandler = require("../utils/hashHandler");

module.exports = {
  /**
   * @description - Creates a new user
   * @param {string} email - The email of the user
   * @param {string} firstName - The first name of the user
   * @param {string} lastName - The last name of the user
   * @param {string} password - The password of the user
   * @returns {object} - The created user
   */
  createUser: ({ email, firstName, lastName, password }) => {
    let hashedPassword = hashHandler.generateHash(password);
    return db.one(createUser, [email, firstName, lastName, hashedPassword]);
  },

  /**
   * @description - find a user by email
   * @param {string} email - The email of the user
   * @returns {object} - The user with the given email
   */
  getUserByEmail: (email) => {
    return db.any(findUserByEmail, [email]);
  },

  updatePassword: (password, id) => {
    let hashedPassword = hashHandler.generateHash(password);
    return db.any(updatePassword, [hashedPassword, id]);
  },
  verifyAccount: (email) => {
    return db.any(verifyUser, [email]);
  },
};
