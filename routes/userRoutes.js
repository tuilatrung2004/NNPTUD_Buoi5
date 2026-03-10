const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// GET all users with optional username filter
router.get('/', UserController.getAllUsers);

// GET user by ID
router.get('/:id', UserController.getUserById);

// DELETE user (soft delete)
router.delete('/:id', UserController.deleteUser);

// POST enable user
router.post('/enable', UserController.enableUser);

// POST disable user
router.post('/disable', UserController.disableUser);

module.exports = router;
