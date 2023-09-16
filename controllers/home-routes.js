const router = require('express').Router();
const { User, BlogPost, Comment } = require('../models');

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
    })

    const blogPosts = blogPostData.map((blogpost) =>
      blogpost.get({ plain: true})
    );

    console.log(blogPosts);
    console.log(blogPosts[0].comments);

    res.render('homepage'
    , 
    {
      blogPosts,
    //   loggedIn: req.session.loggedIn
    }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET user posts
router.get('/users/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
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
      user
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
// router.get('/login', (req, res) => {
//   // If the user is already logged in, redirect to the homepage
//   if (req.session.loggedIn) {
//     res.redirect('/');
//     return;
//   }
//   // Otherwise, render the 'login' template
//   res.render('login');
// });

module.exports = router;
