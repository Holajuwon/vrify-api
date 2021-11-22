const API_KEY = process.env.PAYSTACK_SECRET_KEY;
const axios = require("axios");
const url = process.env.PAYSTACK_URL;

/**
 * @description - verify account number using paystack api
 * @param {string} accountNumber user account number
 * @param {String} bankCode code of user's bank
 * @returns {Promise<object>} returns true if account number is valid
 */
module.exports = async (accountNumber, bankCode) => {
  try {
    let data = await axios({
      url: `${url}?account_number=${accountNumber}&bank_code=${bankCode}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    return data.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
