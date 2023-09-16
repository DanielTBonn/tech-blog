const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');

// BlogPost has one User
BlogPost.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// user has many blogposts 
User.hasMany(BlogPost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

BlogPost.hasMany(Comment, {
    foreignKey: 'blogpost_id',
    onDelete: 'CASCADE'
})

module.exports = {
    User,
    BlogPost,
    Comment
}