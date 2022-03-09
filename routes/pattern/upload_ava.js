var express = require("express");
var router = express.Router();

router.post("/upload_ava", function (req, res, next) {
  if (req?.session?.isSession == true) {
    var file_name = "ava_" + req.session.userData.uid;
    if (req.files.new_ava.mimetype == "image/jpeg") {
      file_name += ".jpg";
    } else if (req.files.new_ava.mimetype == "image/png") {
      file_name += ".png";
    } else {
      res.error("BAD_TOKEN");
      return;
    }

    req.files.new_ava.mv("public_node/avatars/" + file_name);
    let ava_url = file_name;

    let extended = req.session.userData.extended;
    extended.ava_url = ava_url;

    res.result.userData = req.session.userData;
    res.result.userData.extended = extended;

    req.mysqlConnection.query(
      req.mysqlConnection.SQL_BASE.saveProfile,
      [JSON.stringify(extended), req.session.userData.token],
      (err, result) => {
        if (err) {
          res.error("SQL", err);
        } else {
          res.ok();
        }
      }
    );
  } else {
    res.error("BAD_TOKEN");
  }
});

module.exports = router;
