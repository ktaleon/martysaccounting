const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
  try {
    //res.json(req.user);
    const user = await pool.query(`SELECT first_name FROM users WHERE id = '${req.user}'`);
    res.json(user.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;