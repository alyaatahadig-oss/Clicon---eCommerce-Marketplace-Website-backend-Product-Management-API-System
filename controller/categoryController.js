const Category = require("../models/categoryModel");

exports.getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

exports.getCategoryById = async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.json(category);
};

exports.createCategory = async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json(category);
};

exports.updateCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(category);
};

exports.deleteCategory = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.status(204).send();
};