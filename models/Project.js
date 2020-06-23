const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create Schema
const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  assignedUser: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  client: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    default: Date.now,
  },
  modifiedDate: {
    type: Date,
    default: Date.now,
  },
  objectives: [Schema.Types.ObjectId],
});
module.exports = ProjectSchema;
