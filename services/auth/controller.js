const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Model = require('../user/model');
const getCommonController = require('../../common/controller');
const { hashPassword } = require('../../common/utils');

// custom or override controller below
const customControllers = {
  async signup(data) {
    try {
      const passwordHash = await hashPassword(data.password);
      const result = await Model.create({ ...data, password: passwordHash });
      return { result };
    } catch (error) {
      console.error(error);
      return { error };
    }
  },

  async login(data) {
    try {
      // check required fields
      const password = new Model.Password(data);
      await password.validate();

      // get user
      const user = await Model.findOne({ email: data.email });

      // compare passwords
      await bcrypt
        .compare(data.password, user.password)
        .then((valid) => {
          if (!valid) {
            throw new Error('Invalid email or password');
          }
        });

      // user token
      const token = await jwt.sign({ email: data.email }, process.env.JWT_SECRET);

      const result = {
        token,
        user,
      };
      return { result };
    } catch (error) {
      console.error(error);
      return { error };
    }
  },
};

const controller = getCommonController(Model, customControllers);

module.exports = controller;
