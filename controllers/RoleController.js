const Role = require('../models/Role');

// GET all roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find({ isDeleted: false });
    res.status(200).json({
      success: true,
      data: roles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET role by ID
exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id).where({ isDeleted: false });
    
    if (!role) {
      return res.status(404).json({
        success: false,
        message: 'Role not found'
      });
    }

    res.status(200).json({
      success: true,
      data: role
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE role (soft delete)
exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id).where({ isDeleted: false });
    
    if (!role) {
      return res.status(404).json({
        success: false,
        message: 'Role not found'
      });
    }

    role.isDeleted = true;
    await role.save();

    res.status(200).json({
      success: true,
      message: 'Role deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
