var express = require("express");
const { rethrow } = require("jade/lib/runtime");
var router = express.Router();

const MAX_PAGE_SIZE = 50;
const START_PAGE = 0;

/* GET home page. */
router.get("/admin_get_users", async function (req, res, next) {
  if (
    !(
      req.session.isSession == true &&
      req.session.userData.roles.includes("admin") == true
    )
  ) {
    res.error("ROLE_ERROR");
    return;
  }

  let data = {
    queryLength: 0,
    items: {},
  };

  let perPage = Number(req.query?.perPage || MAX_PAGE_SIZE);
  let currentPage = Number(req.query?.currentPage || START_PAGE);
  let searchQuery = req.query?.searchQuery || "";

  await req.mysqlConnection
    .asyncQuery(req.mysqlConnection.SQL_BASE.getUsersCount, [
      searchQuery,
      searchQuery,
    ])
    .then(
      (result) => {
        data.queryLength = result[0].queryLength;
      },
      (err) => {
        res.error("SQL", err);
        console.log(err);
        return;
      }
    );

  await req.mysqlConnection
    .asyncQuery(req.mysqlConnection.SQL_BASE.getUsers, [
      searchQuery,
      searchQuery,
      currentPage * perPage,
      perPage,
    ])
    .then(
      async (result) => {
        result.forEach((element) => {
          if (element.confirmed == 1) {
            element.confirmed = true;
          } else {
            element.confirmed = false;
          }
          if (element.blocked == 1) {
            element.blocked = true;
          } else {
            element.blocked = false;
          }
          data.items[element.uid] = element;
          data.items[element.uid].extended = JSON.parse(element.extended);
          data.items[element.uid].roles = JSON.parse(element.roles);
        });

        await req.mysqlConnection
          .asyncQuery(req.mysqlConnection.SQL_BASE.adminGetSessions, [])
          .then(
            (result) => {
              result.forEach((element) => {
                if (data.items[element.uid] != undefined) {
                  data.items[element.uid].sessions = element.sessions;
                }
              });
            },
            (error) => {
              console.log(error);
            }
          );

        res.result.data = data;
        res.ok();
      },
      (err) => {
        res.error("SQL", err);
        console.log(err);
      }
    );
});

module.exports = router;
