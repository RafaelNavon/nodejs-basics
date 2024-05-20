const ms = require("ms");

const timestamps = [60000, 2 * 60000, -3 * 60000, ms("10 hours")];

timestamps.forEach((timestamp) => {
  console.log(ms(timestamp, { long: true }));
});
