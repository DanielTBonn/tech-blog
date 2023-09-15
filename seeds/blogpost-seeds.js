const { BlogPost } = require ('../models');

const blogPostData = [
    {
        id: 1,
        title: 'First Blog Post!',
        content: 'MVC is really cool!',
        date_posted: '9/14/2023',
        user_id: 1
    },
    {
        id: 2,
        title: 'Second Blog Post!',
        content: 'Playing with servers is fun!',
        date_posted: '9/14/2023',
        user_id: 1
    },
    {
        id: 3,
        title: 'Third Blog Post!',
        content: 'Seeding user data is great!',
        date_posted: '9/14/2023',
        user_id: 1
    },
    {
        id: 4,
        title: 'Welcome to Lernatios blogposts!',
        content: 'Creating a course outline has been challenging, but rewarding!',
        date_posted: '9/14/2023',
        user_id: 2
    },
    {
        id: 5,
        title: 'Torres first post!',
        content: 'This class is one for the records!',
        date_posted: '9/14/2023',
        user_id: 3
    },
]

const seedBlogPosts = () => BlogPost.bulkCreate(blogPostData);

module.exports = seedBlogPosts;