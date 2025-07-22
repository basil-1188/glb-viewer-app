const mongoose = require('mongoose');
const GlbModel = require('../models/GlbModel');
const path = require('path');
const fs = require('fs').promises;

exports.uploadModel = async (req, res) => {
  try {
    if (!req.file) {
      console.log('No file uploaded');
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const glbModel = new GlbModel({
      name: req.file.originalname,
      path: req.file.path
    });
    await glbModel.save();
    console.log('Model saved to glbmodels:', glbModel);
    res.status(201).json({ message: 'Model uploaded successfully' });
  } catch (error) {
    console.error('Error uploading model:', error);
    res.status(500).json({ message: 'Error uploading model', error });
  }
};

exports.getModels = async (req, res) => {
  try {
    const models = await GlbModel.find();
    console.log('Fetched models from glbmodels in database test:', models);
    if (models.length === 0) {
      console.log('No models found in glbmodels collection');
    }
    res.status(200).json(models);
  } catch (error) {
    console.error('Error fetching models:', error);
    res.status(500).json({ message: 'Error fetching models', error });
  }
};

exports.getModelFile = async (req, res) => {
  try {
    const modelId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(modelId)) {
      console.log('Invalid model ID:', modelId);
      return res.status(400).json({ message: 'Invalid model ID' });
    }
    const model = await GlbModel.findById(modelId);
    if (!model) {
      console.log('Model not found for ID:', modelId);
      return res.status(404).json({ message: 'Model not found' });
    }
    const filePath = path.resolve(__dirname, '..', model.path);
    console.log('Attempting to fetch file for model:', model, 'at path:', filePath);
    
    try {
      await fs.access(filePath);
    } catch (error) {
      console.log('File not found at path:', filePath);
      return res.status(404).json({ message: 'File not found on server' });
    }
    
    res.set('Content-Type', 'model/gltf-binary');
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', filePath, err);
        res.status(500).json({ message: 'Error sending file', err });
      }
    });
  } catch (error) {
    console.error('Error fetching model file for ID:', req.params.id, error);
    res.status(500).json({ message: 'Error fetching model file', error });
  }
};