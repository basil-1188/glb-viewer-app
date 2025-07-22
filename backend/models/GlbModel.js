const mongoose = require('mongoose');

const glbModelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  path: { type: String, required: true }
});

module.exports = mongoose.model('GlbModel', glbModelSchema);