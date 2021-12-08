const UserController = require("./../controllers/UserController");
const express = require("express");
const UserRouter = express.Router();

UserRouter.route("/create-user").post(UserController.createUser);
UserRouter.route("/user/:id").put(UserController.updateUser);
UserRouter.route("/login").post(UserController.logIn);
UserRouter.route("/validate-user/:id").get(UserController.validateUser);
UserRouter.route("/logout").get(UserController.logOut);

module.exports = UserRouter;
