var express = require("express");
var router = express.Router();

/* GET home page. */
router.post("/check_token", function (req, res, next) {
  const sleep = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

  sleep.then(() => {
    if (req.session.isSession == false) {
      res.error("BAD_TOKEN");
    } else {
      res.ok();
    }
  });
});

module.exports = router;
