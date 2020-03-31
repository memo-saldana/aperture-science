const Project = require('../models/project'),
      ctr = {};

ctr.getAll = () => async (req, res, next) => {
  const {page, pageSize} = req.query;

  const body = await Project.getAll(page, pageSize);

  return res.status(200).json(body);
}

ctr.getOne = () => async (req, res, next) => {
  const {projectId} = req.params;

  const project = await Project.getOneById(projectId);

  return res.status(200).json({project});
}

ctr.create = () => async (req, res, next) => {
  const {projectData} = req.body;

  const project = new Project(projectData);

  await project.save();

  return res.status(200).json({project});
}

ctr.update = () => async (req, res, next) => {
  const {projectId} = req.params;
  const projectBody = req.params;

  const project = await Project.updateProject(projectId, projectBody);

  return res.status(200).json({project});
}

ctr.delete = () => async (req, res, next) => {
  const {projectId} = req.params;

  const project = await Project.deactivate(projectId);

  return res.status(200).json({project});
}

module.exports = ctr;