const express = require('express');
const router = express.Router();
const camgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
//const Campground = require('../models/campground');

const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });


const { validateCampground, isLoggedIn, isAuthor } = require('../middleware');

router.route('/')
    .get(catchAsync(camgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(camgrounds.createCampground));

router.get('/new', isLoggedIn, camgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(camgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(camgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(camgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(camgrounds.renderEditForm));


 module.exports = router;
