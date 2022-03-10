var express = require("express");
var router = express.Router();

/* GET home page. */
router.post("/check_token", async function (req, res, next) {
  console.log("c1");

  const sleep = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

  console.log("c2");

  sleep.then(() => {
    if (req.session.isSession == false) {
      res.error("BAD_TOKEN");
    } else {
      res.result.userData = req.session.userData;
      res.result.frontConfig = req.frontConfig;
      res.ok();
    }
  });

  console.log("c3");
});

module.exports = router;
