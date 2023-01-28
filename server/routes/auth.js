const router = require("express").Router();
const { reqister, login } = require("../controllers/auth");

router.post("/reqister", reqister);
router.post("/login", login);

module.exports = router;
