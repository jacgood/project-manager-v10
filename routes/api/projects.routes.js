const router = require('express').Router();
const Projects = require('../../controllers/projects.controller');

router.post('/', Projects.createProject);
router.get('/', Projects.getProjects);
router.get('/:id', Projects.getProject);
router.put('/:id', Projects.updateProject);
router.delete('/:id', Projects.removeProject);

module.exports = router;
