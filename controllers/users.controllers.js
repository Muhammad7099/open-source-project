const User = require("../models/User");

module.exports.usersController = {
  addUser: async (req, res) => {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
    });
    res.json("success added user");
  },
};
