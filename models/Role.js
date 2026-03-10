const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    description: {
      type: String,
      default: ""
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// Query middleware to exclude soft deleted documents
RoleSchema.query.notDeleted = function() {
  return this.where({ isDeleted: false });
};

RoleSchema.pre(/^find/, function() {
  if (!this.options._recursed) {
    this.where({ isDeleted: false });
  }
});

module.exports = mongoose.model('Role', RoleSchema);
