const express = require('express');
const ThoughtController = require('../controllers/ThoughtsController.js');
const router = express.Router();
const ThoughtsController = require('../controllers/ThoughtsController.js');

//helpers
const checkAuth = require('../helpers/auth.js').checkAuth;

//controller
router.get('/', ThoughtsController.showAll);
router.get('/dashboard',checkAuth, ThoughtController.dashboard);
router.get('/add', checkAuth, ThoughtController.addThought);
router.post('/add', checkAuth, ThoughtController.addThoughtPost);
router.post('/remove', checkAuth, ThoughtsController.removeThought);
router.get('/edit/:id', checkAuth, ThoughtController.updateThought);
router.post('/edit',checkAuth, ThoughtController.updateThoughtPost);

module.exports = router;