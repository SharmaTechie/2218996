const { v4: uuidv4 } = require("uuid");

exports.generateUniqueCode = () => {
  return uuidv4().slice(0, 6);
};
