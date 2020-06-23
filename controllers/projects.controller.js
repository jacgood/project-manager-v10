const Projects = require('../models/Project.dao');
const validateNewProjectInput = require('../validation/createProject');

exports.createProject = function (req, res, next) {
  // Form validation
  const { errors, isValid } = validateNewProjectInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newProject = new Projects({
    title: req.body.title,
    description: req.body.description,
    assignedUser: req.body.assignedUser,
    client: req.body.client,
    dueDate: req.body.dueDate,
  });

  Projects.create(newProject, function (err, project) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      message: 'Project created successfully',
    });
  });
};

exports.getProjects = function (req, res, next) {
  Projects.get({}, function (err, projects) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      projects: projects,
    });
  });
};

exports.getProject = function (req, res, next) {
  Projects.get({ _id: req.params.id }, function (err, projects) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      projects: projects,
    });
  });
};

exports.updateProject = function (req, res, next) {
  Projects.update({ _id: req.params.id }, req.body, function (err, project) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      message: 'Project updated successfully',
    });
  });
};

exports.removeProject = function (req, res, next) {
  Projects.delete({ _id: req.params.id }, function (err, proejct) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      message: 'Project deleted successfully',
    });
  });
};
