const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middlewares/isAdmin');
const adminUsersController = require('../controllers/adminUsers.controller');
const adminMediaController = require('../controllers/adminMedia.controller');

// All /api/admin routes must pass isAdmin middleware
router.use(isAdmin);

// --- User Management ---
router.get('/users', adminUsersController.getAllUsers);
router.patch('/users/:id/ban', adminUsersController.toggleBan);
router.patch('/users/:id/role', adminUsersController.toggleRole);
router.delete('/users/:id', adminUsersController.deleteUser);

// --- Custom Movies CRUD ---
router.post('/movies', adminMediaController.createMovie);
router.get('/movies', adminMediaController.getMovies);
router.put('/movies/:id', adminMediaController.updateMovie);
router.delete('/movies/:id', adminMediaController.deleteMovie);

// --- Custom TV Shows CRUD ---
router.post('/tv', adminMediaController.createTvShow);
router.get('/tv', adminMediaController.getTvShows);
router.put('/tv/:id', adminMediaController.updateTvShow);
router.delete('/tv/:id', adminMediaController.deleteTvShow);

module.exports = router;
