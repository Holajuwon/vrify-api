const bcrypt = require("bcryptjs");

module.exports = {
  /**
   * @desc - hash password
   * @param {string} password
   * @returns {string} hashed password
   */
  generateHash(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  },
  /**
   * @desc - verify hash
   * @param {string} password
   * @param {string} passwordHash
   * @returns {Boolean} true if password matches hash
   */
  verifyHash(password, passwordHash) {
    return bcrypt.compareSync(password, passwordHash);
  },
};
