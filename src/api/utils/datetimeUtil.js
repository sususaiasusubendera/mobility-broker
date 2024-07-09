const moment = require("moment-timezone");

const parseForDate = (isoDate) => {
  const isoDateString = isoDate;
  const timeZone = "Asia/Jakarta"; //WIB

  const date = moment.tz(isoDateString, timeZone);

  return date.format("DD-MM-YYYY");
};

const parseForTime = (isoDate) => {
  const isoDateString = isoDate;
  const timeZone = "Asia/Jakarta"; //WIB

  const date = moment.tz(isoDateString, timeZone);

  return date.format("HH:mm:ss");
};

module.exports = {
  parseForDate,
  parseForTime,
};
