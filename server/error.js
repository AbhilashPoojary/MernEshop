const createError = (status, message) => {
  console.log(status, message);
  const err = new Error();
  //same as err = {}
  err.status = status;
  err.message = message;
  return err;
};

module.exports = { createError };
