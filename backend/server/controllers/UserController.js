const UserModel = require("./../models/UserModel");
const bcrypt = require("bcryptjs");
// const flash = require("express-flash");

function validatePass(input) {
  // Geek@2021
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{8,}$/;
  return passRegex.test(input);
}

function validateEmail(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
}

const UserController = {
  createUser: function (req, res) {
    // console.log(req.body);
    const { password, ...userInfo } = req.body;
    const { email } = userInfo;

    UserModel.findOne({ email: email })
      .then((result) => {
        if (!validateEmail(email)) {
          throw new Error("Please fill a valid email address");
        }

        if (!validatePass(password)) {
          throw new Error(
            "Your password must be at least 8 characters, and include special characters, Upper and Lower case characters"
          );
        }

        if (result === null) {
          bcrypt
            .hash(password, 10)
            .then((encryptedPassword) => {
              userInfo.password = encryptedPassword;
              return userInfo;
            })
            .then((userInfo) => {
              console.log(userInfo);
              UserModel.create(userInfo)
                .then((result) => {
                  console.log("create user", result);

                  const userDB = result;
                  // delete userDB.password;
                  // console.log("user without pass =>", userDB);
                  req.session.user = userDB;
                  console.log("req.session.user =>", req.session.user);
                  res.status(201).json({ userDB });
                })
                .catch((error) => {
                  res.statusMessage = error.message;
                  res.status(406).end();
                });
            });
        } else {
          throw new Error("This email is already in use");
        }
      })
      .catch((error) => {
        res.statusMessage = error.message;
        res.status(406).end();
      });
  },
  updateUser: function (req, res) {
    console.log("request.params: ", request.params);
    console.log("request.body: ", request.body);

    if (Object.keys(request.body).length === 0) {
      response.statusMessage =
        "You need to provide at least one field to update the record";
      response.status(406).end();
    } else {
      UserModel.findOne({ _id: request.params.id })
        .then((result) => {
          if (result === null) {
            throw new Error("Not Found");
          } else {
            UserModel.update(result._id, request.body).then((result) => {
              response.status(202).json(result);
            });
          }
        })
        .catch((error) => {
          response.statusMessage = error.message;
          response.status(404).end();
        });
    }
  },
  validateUser: function (req, res) {
    console.log("validateUser =>", req.params.id);
    console.log("req.session.user=> ", req.session.user);
    if (req.session.user["_id"] === req.params.id) {
      // console.log("validateUser =>", req.session.user);
      res.status(200).json(req.session.user);
    } else {
      res.statusMessage = "You need to login to be here!";
      res.status(401).end();
    }
  },
  logOut: function (req, res) {
    req.session.destroy(() =>
      res.status(200).json({ message: "Successfuly destroyed session" })
    );
  },
  logIn: function (req, res) {
    console.log(req.body);

    UserModel.findOne({ email: req.body.email })
      .then((user) => {
        const userDB = user;
        console.log(userDB);
        if (user === null) {
          throw new Error("The user does not exist");
        }
        bcrypt
          .compare(req.body.password, user.password)
          .then((result) => {
            if (!result) {
              throw new Error("Wrong Credentials");
            } else {
              // const { password, ...user } = result;
              req.session.user = userDB;
              console.log("req.session.user =>", req.session.user);
              res.status(200).json({ userDB });
            }
            //
          })
          .catch((error) => {
            console.log(error);
            res.statusMessage = error.message;
            res.status(406).end();
          });
      })
      .catch((error) => {
        console.log(error);
        res.statusMessage = error.message;
        res.status(406).end();
      });
  },
  deleteUser: function (req, res) {
    let userName = req.params.userName;

    UserModel.getUserById(userName)
      .then((user) => {
        if (user === null) {
          throw new Error("That user doesn't exist");
        } else {
          UserModel.deleteUserById(userName).then((result) => {
            res.status(204).end();
          });
        }
      })
      .catch((error) => {
        res.statusMessage = error.message;
        res.status(404).end();
      });
  },
};
module.exports = UserController;
