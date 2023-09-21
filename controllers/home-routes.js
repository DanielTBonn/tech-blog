const router = require('express').Router();
const { User, BlogPost, Comment } = require('../models');
// const { getAuthor } = require('../utils/helpers');
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
            'username',
            'user_id',
            'createdAt'
          ]
        }
      ]
    });

    const blogPosts = blogPostData.map((blogpost) =>
    blogpost.get({ plain: true})
    );

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
            'username',
            'createdAt',
          ],
        },
      ],
    });

    const user = userData.get({ plain: true });
    res.render('dashboard', { 
      user,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// GET blogpost by id
router.get('/blogpost/:id', async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
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
            'username',
            'createdAt'
          ]
        }
      ]
    });
    const blogPost = blogPostData.get({ plain: true});

    let checkId = false;
    if (req.session.user_id === blogPost.user_id) {
      checkId = true;
    }

    res.render('blogpost', {
      blogPost,
      logged_in: req.session.logged_in,
      checkId
    });
  } catch (err) {
    res.status(500).json(err);
    console.log('There was an error.');
    console.log(err);
  }
})

// routes to a page that allows the user to add a blogpost
router.get('/addblogpost', withAuth, async(req, res) => {
  try {
    res.render('addblogpost');
  } catch (err) {
    res.status(500).json(err);
    console.log('There was an error.');
    console.log(err);
  }
})

// routes to the page requesting to update a blogpost by the user
router.get('/updateblogpost/:id', withAuth, async(req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
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
            'createdAt',
            'user_id'
          ]
        }
      ]
    });
    const blogPost = blogPostData.get({ plain: true});

    res.render('updateblogpost',
    {
      blogPost,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
    console.log('There was an error.');
    console.log(err);
  }
})

// routes to the delete blogpost page
router.get('/deleteblogpost', withAuth, async(req, res) => {
  try{
    res.render('deleteblogpost');
  } catch (err) {
    res.status(500).json(err);
    console.log('There was an error.');
    console.log(err);
  }
})

// Login route
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// Sign up route
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
})

module.exports = router;
