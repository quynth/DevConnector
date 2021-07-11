const express = require("express");
const router = express.Router();

//@route   POST  api/users/register
//@desc    Register a user
//@access  Public
router.post("/register", (req, res) =>
  res.json({
    msg: "User route works!",
  })
);

module.exports = router;
