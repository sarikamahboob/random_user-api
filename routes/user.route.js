const express = require("express");
const {
  randomUser,
  saveUser,
  updateMultipleUserInfo,
  allUser,
  updateUserInfo,
  userRemove,
} = require("../controllers/user.controller");

const router = express.Router();

router.route("/random").get(randomUser);
router.route("/all").get(allUser);
router.route("/save").post(saveUser);
router.route("/update/:id").patch(updateUserInfo);
router.route("/bulk-update").patch(updateMultipleUserInfo);
router.route("/delete/:id").delete(userRemove);

module.exports = router;
