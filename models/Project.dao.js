const mongoose = require('mongoose');
const ProjectSchema = require('./Project');

ProjectSchema.statics = {
  create: function (data, cb) {
    var project = new this(data);
    project.save(cb);
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

var projectModel = mongoose.model('Projects', ProjectSchema);
module.exports = projectModel;
