const { Comment } = require('../models');

const commentData = [
    {
        id: 1,
        content: 'You make a great point!',
        username: 'lernatio',
        user_id: 2,
        blogpost_id: 1
    },
    {
        id: 2,
        content: `Can't argue with that!`,
        username: 'torretaylor',
        user_id: 3,
        blogpost_id: 1
    },
    {
        id: 3,
        content: 'Excited to see what else you post!',
        username: 'DanielTBonn',
        user_id: 1,
        blogpost_id: 4
    },
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;