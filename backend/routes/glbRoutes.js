const express = require('express');
const router = express.Router();
const glbController = require('../controllers/glbController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.post('/', upload.single('model'), glbController.uploadModel);
router.get('/', glbController.getModels);
router.get('/:id', glbController.getModelFile);

module.exports = router;