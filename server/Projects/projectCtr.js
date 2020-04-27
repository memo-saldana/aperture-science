const Project = require('../models/project'),
      User = require('../models/user'),
      MyError = require('../middleware/MyError'),
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
  const projectData = req.body;
  const {userId} = req.params;
  console.log('projectData :>> ', projectData);
  let user = await User.findOne({_id: userId}).exec();

  if (!user) {
    throw new MyError(400, 'Owner does not exist')
  }
  const project = new Project({...projectData, owner: user});

  await project.save();

  return res.status(200).json({project});
}

ctr.update = () => async (req, res, next) => {
  const {userId, projectId} = req.params;
  const projectBody = req.params;

  let user = await User.findOne({_id: userId}).exec();

  if (!user) {
    throw new MyError(400, 'Owner does not exist')
  }
  const project = await Project.updateProject(projectId, user._id, projectBody);

  return res.status(200).json({project});
}

ctr.delete = () => async (req, res, next) => {
  const {userId, projectId} = req.params;

  let user = await User.findOne({_id: userId}).exec();

  if (!user) {
    throw new MyError(400, 'Owner does not exist')
  }
  const project = await Project.deactivate(projectId, user._id);

  return res.status(200).json({project});
}

module.exports = ctr;