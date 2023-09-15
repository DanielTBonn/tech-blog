const { User } = require ('../models');

const userData = [
    {
        id: 1,
        username: 'DanielTBonn',
        password: 'password1'
    },
    {
        id: 2,
        username: 'lernatio',
        password: 'password2'
    },
    {
        id: 3,
        username: 'torretaylor',
        password: 'password3'
    },
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;