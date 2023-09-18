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
    format_date: (date) => {
        return date.toLocaleDateString();
      }

};