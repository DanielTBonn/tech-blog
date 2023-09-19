const { User, BlogPost, Comment } = require('../models'); 


module.exports = {
    getAuthor: async (user_id) => {
        const userData = await User.findByPk(user_id, {
            attributes: ['username']
        })
        // const author = userData.get({ plain: true});
        // return author.username;
        // console.log(userData)
    },
    // checkUser: async (user_id) {
    //     const blogPostData = await BlogPost
    // }
    format_date: (date) => {
        return date.toLocaleDateString();
      }

};