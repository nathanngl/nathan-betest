const express = require("express");
const router = express.Router();

const validatToken = require("../middleware/validateToken");

const UserController = require("../controllers/userController");
const UserService = require("../services/userService");
const UserRepository = require("../repositories/userRepository");
const UserModel = require("../models/userModel");

const userRepository = new UserRepository(UserModel);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.get("/", [validatToken], async (req, res, next) => {
  try {
    await userController.getUsers(req, res);
  } catch (error) {
    next(error);
  }
});

router.get("/:refId", [validatToken], async (req, res, next) => {
  try {
    await userController.getUserByID(req, res);
  } catch (error) {
    next(error);
  }
});

router.post("/create", [validatToken], async (req, res, next) => {
  try {
    await userController.createUser(req, res);
  } catch (error) {
    next(error);
  }
});

router.put("/update/:refId", [validatToken], async (req, res, next) => {
  try {
    await userController.updateUser(req, res);
  } catch (error) {
    next(error);
  }
});

router.delete("/delete/:refId", [validatToken], async (req, res, next) => {
  try {
    await userController.deleteUser(req, res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
