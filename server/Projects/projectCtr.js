const Project = require('../models/project'),
      User = require('../models/user'),
      MyError = require('../middleware/MyError'),
      ctr = {};

ctr.getAll = () => async (req, res, next) => {
  const {page, pageSize, category} = req.query;

  const body = await Project.getAll(page, pageSize, category, null);

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

  let user = await User.findOne({_id: userId}).exec();

  if (!user) {
    throw new MyError(400, 'Owner does not exist')
  }

  if(!user.stripeId) {
    throw new MyError(403, "Setup payment information first on your profile")
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

ctr.getForOneUser = () => async (req, res, next) => {
  const {userId} = req.params;
  
  let user = await User.findOne({_id: userId}).exec();

  if (!user) {
    throw new MyError(400, 'Owner does not exist')
  }
  const body = await Project.getAll(page, pageSize, category, user._id);

  return res.status(200).json(body); 
}

ctr.getStripeID = () => async (req, res, next) => {
  const {projectId} = req.params;

  const project = await Project.getOneById(projectId);

  return project.owner.stripeId ? 
    res.status(200).json({stripeId: project.owner.stripeId}) :
    res.status(400).json({message: "The owner of the project has not setup payment information."})

}

module.exports = ctr;