const router = require('express').Router();
const { User, BlogPost, Comment } = require('../models');
const { getAuthor } = require('../utils/helpers');
const withAuth  = require('../utils/auth')

// GET all blogpost for homepage
router.get('/', async (req, res) => {
  try {

    const blogPostData = await BlogPost.findAll({
      include : [
        {
          model: User,
          attributes: [
            'username'
          ]
        },
        {
          model: Comment,
          attributes: [
            'content',
            'date_posted',
            'user_id'
          ]
        }
      ]
    });

    const blogPosts = blogPostData.map((blogpost) =>
    blogpost.get({ plain: true})
    );
    
    // console.log(blogPosts);
    // console.log(blogPosts[0].comments[0].user_id);
    // const author =  await getAuthor(blogPosts[0].comments[0].user_id);
    // console.log('AUTHOR: ',author)

    res.render('homepage'
    , 
    {
      blogPosts,
      logged_in: req.session.logged_in
    }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET current user posts
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      include: [
        {
          model: BlogPost,
          attributes: [
            'id',
            'title',
            'content',
            'date_posted',
          ],
        },
      ],
    });

    const user = userData.get({ plain: true });
    console.log(user);
    // TODO: Send over the 'loggedIn' session variable to the 'gallery' template
    res.render('dashboard', { 
      user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// // GET one painting
// router.get('/painting/:id', async (req, res) => {
//   try {
//     const dbPaintingData = await Painting.findByPk(req.params.id);

//     const painting = dbPaintingData.get({ plain: true });
//     // TODO: Send over the 'loggedIn' session variable to the 'homepage' template
//     res.render('painting', { painting, loggedIn: req.session.loggedIn });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// // Login route
router.get('/login', (req, res) => {
  // TODO: Add a comment describing the functionality of this if statement
  // redirects you to homepage if logged_in is true, otherwise renders /login page
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
