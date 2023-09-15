const router = require('express').Router();
const { User, BlogPost } = require('../models');

// GET all galleries for homepage
router.get('/', async (req, res) => {
  try {

    const blogPostData = await BlogPost.findAll({})
    // const dbGalleryData = await Gallery.findAll({
    //   include: [
    //     {
    //       model: Painting,
    //       attributes: ['filename', 'description'],
    //     },
    //   ],
    // });

    const blogPosts = blogPostData.map((blogpost) =>
      blogpost.get({ plain: true})
    );
    // const galleries = dbGalleryData.map((gallery) =>
    //   gallery.get({ plain: true })
    // );
    // TODO: Send over the 'loggedIn' session variable to the 'homepage' template
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

// // GET one gallery
// router.get('/gallery/:id', async (req, res) => {
//   try {
//     const dbGalleryData = await Gallery.findByPk(req.params.id, {
//       include: [
//         {
//           model: Painting,
//           attributes: [
//             'id',
//             'title',
//             'artist',
//             'exhibition_date',
//             'filename',
//             'description',
//           ],
//         },
//       ],
//     });

//     const gallery = dbGalleryData.get({ plain: true });
//     // TODO: Send over the 'loggedIn' session variable to the 'gallery' template
//     res.render('gallery', { gallery, loggedIn: req.session.loggedIn });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

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
