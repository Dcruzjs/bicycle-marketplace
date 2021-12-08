const express = require("express");
const Controller = require("../controllers/Controller");
const Router = express.Router();

Router.route("/").get(Controller.getAll);
Router.route("/:id").get(Controller.getOne);
Router.route("/:id").put(Controller.update);
Router.route("/new").post(Controller.create);
Router.route("/remove/:id").delete(Controller.delete);

module.exports = Router;
