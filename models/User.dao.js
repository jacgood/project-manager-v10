const mongoose = require('mongoose');
const UserSchema = require('./User');

UserSchema.statics = {
  create: function (data, cb) {
    var user = new this(data);
    user.save(cb);
  },

  get: function (query, cb) {
    this.find(query, cb);
  },

  getByID: function (query, cb) {
    this.findById(query, cb);
  },

  update: function (query, updateData, cb) {
    this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb);
  },

  delete: function (query, cb) {
    this.findOneAndDelete(query, cb);
  },
};

var userModel = mongoose.model('Users', UserSchema);
module.exports = userModel;
