const User = require('../models/User');

// GET all users with optional username filter
exports.getAllUsers = async (req, res) => {
  try {
    const { username } = req.query;
    let query = { isDeleted: false };

    if (username) {
      query.username = { $regex: username, $options: 'i' }; // Case-insensitive includes
    }

    const users = await User.find(query).populate('role');
    
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .where({ isDeleted: false })
      .populate('role');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE user (soft delete)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).where({ isDeleted: false });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.isDeleted = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// POST enable user (update status to true)
exports.enableUser = async (req, res) => {
  try {
    const { email, username } = req.body;

    if (!email || !username) {
      return res.status(400).json({
        success: false,
        message: 'Email and username are required'
      });
    }

    const user = await User.findOne({
      email,
      username,
      isDeleted: false
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found with provided email and username'
      });
    }

    user.status = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'User enabled successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// POST disable user (update status to false)
exports.disableUser = async (req, res) => {
  try {
    const { email, username } = req.body;

    if (!email || !username) {
      return res.status(400).json({
        success: false,
        message: 'Email and username are required'
      });
    }

    const user = await User.findOne({
      email,
      username,
      isDeleted: false
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found with provided email and username'
      });
    }

    user.status = false;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'User disabled successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET all users by role ID
exports.getUsersByRoleId = async (req, res) => {
  try {
    const { roleId } = req.params;

    const users = await User.find({
      role: roleId,
      isDeleted: false
    }).populate('role');

    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
