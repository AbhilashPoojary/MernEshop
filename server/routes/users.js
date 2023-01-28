const router = require("express").Router();
const { allUsers } = require("../controllers/users");

router.post("/all", allUsers);

module.exports = router;
