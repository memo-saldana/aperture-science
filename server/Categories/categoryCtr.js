const Category = require('../models/category'),
      ctr = {};

ctr.getAll = () => async (req, res, next) => {

  const body = await Category.find({}).exec();

  return res.status(200).json(body);
}

ctr.getOne = () => async (req, res, next) => {
  const {categoryId} = req.params;

  const category = await Category.findById(categoryId).exec();

  return res.status(200).json({category});
}

ctr.create = () => async (req, res, next) => {
  const {categoryData} = req.body;

  const category = new Category(categoryData);

  await category.save();

  return res.status(200).json({category});
}

ctr.update = () => async (req, res, next) => {
  const {categoryId} = req.params;
  const categoryBody = req.params;

  const category = await Category.findByIdAndUpdate(categoryId, categoryBody, {new: true}).exec();

  return res.status(200).json({category});
}

ctr.delete = () => async (req, res, next) => {
  const {categoryId} = req.params;

  const category = await Category.findByIdAndRemove(categoryId);

  return res.status(200).json({category});
}

module.exports = ctr;