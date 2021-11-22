/**
 * @description A function that facilitates the response of a successful request
 * @param {Response} res http response object
 * @param {Number} [status=200] http success status code, defaults to 200
 * @param {String} message custom success message
 * @param {Object} data custom success message
 * @returns {Response} http response with success status and message
 */

 exports.successResponse = (res, status = 200, message, data) => {
  const resBody = { status: 'success', message, data };

  return res.status(status).json(resBody);
};