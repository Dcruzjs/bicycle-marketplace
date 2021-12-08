const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: [3, "The name must be at least 3 characters long."],
    },
    description: {
      type: String,
      required: true,
      min: [3, "The name must be at least 3 characters long."],
    },
    location: {
      type: String,
      required: true,
      min: [2, "The name must be at least 2 characters long."],
    },
    price: {
      type: Number,
      required: true,
    },
    ownerEmail: {
      type: String,
      required: true,
    },
    ownerId: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

const SchemaModel = mongoose.model("objs", Schema);

const Model = {
  create: function (Obj) {
    return SchemaModel.create(Obj);
  },
  getAll: function () {
    return SchemaModel.find();
  },
  getOne: function (id) {
    console.log("SchemaModelModel =>:", id);
    return SchemaModel.findOne({ _id: id.id });
  },
  update: function (condition, fieldsToUpdate) {
    return SchemaModel.findOneAndUpdate(
      condition,
      { $set: fieldsToUpdate },
      { new: true }
    );
  },
  delete: function (id) {
    return SchemaModel.remove(id);
  },
};

module.exports = Model;
