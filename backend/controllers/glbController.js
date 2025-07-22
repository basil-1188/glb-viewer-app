const GlbModel = require('../models/GlbModel');
const path = require('path');
const fs = require('fs');

exports.uploadModel = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const glbModel = new GlbModel({
      name: req.file.originalname,
      path: req.file.path
    });
    await glbModel.save();
    res.status(201).json({ message: 'Model uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading model', error });
  }
};

exports.getModels = async (req, res) => {
  try {
    const models = await GlbModel.find();
    res.status(200).json(models);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching models', error });
  }
};

exports.getModelFile = async (req, res) => {
  try {
    const model = await GlbModel.findById(req.params.id);
    if (!model) return res.status(404).json({ message: 'Model not found' });
    res.sendFile(path.resolve(model.path));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching model file', error });
  }
};