const moment = require('moment');

let generateMessage = (from, text, userId) => {
  return {
    userId,
    from,
    text,
    createdAt: moment().valueOf()
  };
};

module.exports = { generateMessage };
