const mongoose = require('mongoose'),
      MyError = require('./MyError');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title missing."],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    rel: 'User',
  },
  subtitle: {
    type: String
  },
  description: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    // required: [true, "Category missing."],
  },
  picture: {
    type: String,
  },
  goal: {
    type: Number,
    required: [true, "Goal missing."],
  },
  campaignStart: {
    type: Date,
    required: [true, "Campaign start missing."],
  },
  campaignEnd: {
    type: Date,
    required: [true, "Campaign end missing."],
  },
  bActive: {
    type: Boolean,
    default: true,
    select: false,
  },
}, {
  timestamps: true,
})

projectSchema.statics.getAll = async function(page, pageSize) {
  page = parseInt(page) || 1;
  pageSize = parseInt(pageSize) || 10;

  pageSize = pageSize > 0 ? pageSize : 10; 
  page = page > 0 ? page - 1: 0;
  
  const [projects, count] = Promise.all([
    this.find({bActive: true})
           .skip(page * pageSize)
           .limit(pageSize)
           .populate('owner')
           .exec(),
    this.countDocuments({bActive: true})
  ])

  return {projects, page, totalPages: Math.ceil(count/pageSize)}
}

projectSchema.statics.getOneById = async function(projectId) {
  const project = await this.findOne({bActive: true, _id: projectId}).populate('owner').exec();

  if(!project) {
    return Promise.reject(new MyError(404, "Project not found."));
  }

  return project;
}

projectSchema.statics.deactivate = async function(projectId, userId) {
  const project = await this.findOneAndUpdate({_id: projectId, owner: userId, bActive: true}, {bActive: true}, {new: true}).exec();

  if(!project) {
    return Promise.reject(new MyError(404, "Project not found."));
  }
  return project;
}

projectSchema.statics.updateProject = async function(projectId, userId, projectData) {
  const project = await this.findOneAndUpdate({_id: projectId, owner: userId, bActive: true}, projectData, {new: true}).exec();

  if(!project) {
    return Promise.reject(new MyError(404, "Project not found."));
  }
  return project;
}

module.exports = mongoose.model('Project', projectSchema);