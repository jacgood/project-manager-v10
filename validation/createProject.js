const Validator = require('validator');
const isEmpty = require('is-empty');

function validateNewProjectInput(data) {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.title = !isEmpty(data.title) ? data.title : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  data.assignedUser = !isEmpty(data.assignedUser) ? data.assignedUser : '';
  data.client = !isEmpty(data.client) ? data.client : '';
  data.dueDate = !isEmpty(data.dueDate) ? data.dueDate : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'Description field is required';
  }

  if (Validator.isEmpty(data.assignedUser)) {
    errors.assignedUser = 'Assigned User field is required';
  }

  if (Validator.isEmpty(data.client)) {
    errors.client = 'Client field is required';
  }

  if (Validator.isEmpty(data.dueDate)) {
    errors.dueDate = 'Due date field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

module.exports = validateNewProjectInput;
