const seedUsers = require('./user-seeds');
const seedBlogPosts = require('./blogpost-seeds');
const seedComments = require('./comment-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedUsers();
    console.log('\n----- USERS SEEDED-----\n');
    await seedBlogPosts();
    console.log('\n----- BLOGPOSTS SEEDED -----\n');
    await seedComments();
    console.log('\n----- COMMENTS SEEDED -----\n');
    
    process.exit(0);
}

seedAll();