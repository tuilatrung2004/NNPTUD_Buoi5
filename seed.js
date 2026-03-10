const mongoose = require('mongoose');
require('dotenv').config();

const Role = require('./models/Role');
const User = require('./models/User');

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/user-role-db';

async function seedDatabase() {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully');

    // Clear existing data
    await Role.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Create Roles
    const roles = await Role.insertMany([
      {
        name: 'Admin',
        description: 'Administrator role with full access'
      },
      {
        name: 'User',
        description: 'Regular user role'
      },
      {
        name: 'Manager',
        description: 'Manager role with limited access'
      }
    ]);
    console.log('Roles created:', roles.length);

    // Create Users
    const users = await User.insertMany([
      {
        username: 'admin_user',
        password: 'admin@123',
        email: 'admin@example.com',
        fullName: 'Admin User',
        avatarUrl: 'https://i.sstatic.net/l60Hf.png',
        status: true,
        role: roles[0]._id, // Admin
        loginCount: 10
      },
      {
        username: 'john_doe',
        password: 'john@123',
        email: 'john@example.com',
        fullName: 'John Doe',
        avatarUrl: 'https://i.sstatic.net/l60Hf.png',
        status: true,
        role: roles[1]._id, // User
        loginCount: 5
      },
      {
        username: 'jane_smith',
        password: 'jane@123',
        email: 'jane@example.com',
        fullName: 'Jane Smith',
        avatarUrl: 'https://i.sstatic.net/l60Hf.png',
        status: false,
        role: roles[2]._id, // Manager
        loginCount: 8
      },
      {
        username: 'bob_wilson',
        password: 'bob@123',
        email: 'bob@example.com',
        fullName: 'Bob Wilson',
        avatarUrl: 'https://i.sstatic.net/l60Hf.png',
        status: true,
        role: roles[1]._id, // User
        loginCount: 3
      },
      {
        username: 'alice_johnson',
        password: 'alice@123',
        email: 'alice@example.com',
        fullName: 'Alice Johnson',
        avatarUrl: 'https://i.sstatic.net/l60Hf.png',
        status: false,
        role: roles[2]._id, // Manager
        loginCount: 0
      }
    ]);
    console.log('Users created:', users.length);

    console.log('\n=== Sample Data Created Successfully ===\n');
    console.log('Roles:');
    roles.forEach(role => console.log(`- ${role.name} (ID: ${role._id})`));
    
    console.log('\nUsers:');
    users.forEach(user => console.log(`- ${user.username} (${user.email}) - Status: ${user.status}`));

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
