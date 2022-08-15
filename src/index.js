const express = require("express");

const app = express();

app.get("/api/:date", function (req, res) {
  let time =  new Date(req.params.date);
  let utc;
  let unix;
  if (time.toString() === "Invalid Date") {
    if (parseInt(req.params.date)) {
      time = new Date(parseInt(req.params.date));
      utc = time.toUTCString();
      unix = time.getTime();
      return res.json({unix, utc});
    }
    return res.json({error: "Invalid Date"});
  }
  if (typeof req.params.date == 'String') {
    // time = new Date(req.params.date);
    utc = time.toUTCString();
    if (req.params.date.match(/-/g)) {
      unix = time.getTime();
    } else {
      unix = unix.valueOf();
    }
    return res.json({unix, utc})
  }
  utc = time.toUTCString();
  unix = time.valueOf();
  return res.json({unix, utc})
  // time = new Date(req.params.date)
})

app.get("/api/", function (req, res) {
  const unix = new Date()
  res.json({unix: unix.valueOf(), utc: unix.toUTCString() });
});

app.listen(5000, () => {
  console.log("server is running")
})