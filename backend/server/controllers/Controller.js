const Model = require("../models/Model");
const UserModel = require("../models/UserModel");

const Controller = {
  create: function (request, response) {
    console.log(request.body);
    // console.log(request.body);
    Model.create(request.body)
      .then((resp) => {
        UserModel.update(resp.ownerId, resp);
        response.statusMessage = "success";
        response.status(201).json({ resp });
      })
      .catch((error) => {
        response.json(error);
      });
  },
  getAll: function (request, response) {
    Model.getAll()
      .then((resp) => {
        response.statusMessage = "success";
        response.status(200).json({ resp });
      })
      .catch((error) => {
        response.json(error);
      });
  },
  getOne: function (request, response) {
    console.log("request =>", request.params);
    Model.getOne(request.params)
      .then((resp) => {
        if (resp === null) throw new Error("Not Found");
        console.log("response => ", resp);
        response.statusMessage = "success";
        response.status(200).json({ resp });
      })
      .catch((error) => {
        console.log(error);
        response.status(404).json(error);
      });
  },
  update: function (request, response) {
    console.log("request.params: ", request.params);
    console.log("request.body: ", request.body);

    if (Object.keys(request.body).length === 0) {
      response.statusMessage =
        "You need to provide at least one field to update the record";
      response.status(406).end();
    } else {
      Model.getOne(request.params)
        .then((result) => {
          if (result === null) {
            throw new Error("Not Found");
          } else {
            Model.update({ _id: request.params.id }, request.body).then(
              (result) => {
                response.status(202).json(result);
              }
            );
          }
        })
        .catch((error) => {
          response.statusMessage = error.message;
          response.status(404).end();
        });
    }
  },
  delete: function (request, response) {
    console.log("Model.delete", request.params);
    Model.getOne(request.params)
      .then((resp) => {
        if (resp === null) {
          throw new Error("Not Found");
        } else {
          console.log("DELETING:", resp);
          Model.delete({ _id: resp._id }).then((resp) => {
            response.status(204).end();
          });
        }
      })
      .catch((error) => {
        response.statusMessage = error.message;
        response.status(404).end();
      });
  },
};

module.exports = Controller;
