const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/RoleController');
const UserController = require('../controllers/UserController');

// GET all roles
router.get('/', RoleController.getAllRoles);

// GET role by ID
router.get('/:id', RoleController.getRoleById);

// DELETE role (soft delete)
router.delete('/:id', RoleController.deleteRole);

// GET all users by role ID
router.get('/:id/users', UserController.getUsersByRoleId);

module.exports = router;
