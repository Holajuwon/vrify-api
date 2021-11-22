const { errorResponse } = require("../../utils/errorResponse");

module.exports = (data, type) => async (req, res, next) => {
  try {
    const getType = {
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
    };

    const options = { language: "{{key}}" };
    const result = getType[type];

    const isValid = await data.schema.validate(result, options);

    if (!isValid.error) {
      req[type] = isValid.value;
      return next();
    }

    const { message } = isValid.error.details[0];

    return errorResponse(req, res, 400, {
      errors: data.message,
      message: message.replace(/[\"]/gi, ""),
    });
  } catch (error) {
    next(error);
  }
};
