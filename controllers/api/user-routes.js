const router = require('express').Router();
const { User, BlogPost, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {

        const userData = await User.findAll();
        // const users = userData.get({ plain: true});
        // console.log(users);
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
        console.log('An Error Occured.');
        console.log(err);
    }
    
})

router.post('/login', async (req, res) => {
  try {
    // TODO: Add a comment describing the functionality of this expression
    // retrieves the user with a unique email in the database
    const userData = await User.findOne({ where: { username: req.body.username } });

    console.log(userData);
    console.log(userData.username)
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    // TODO: Add a comment describing the functionality of this expression
    // checks the password inputted by the user against the actual password in the database
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }


    // TODO: Add a comment describing the functionality of this method
    // saves the data to session storage to be used for further functionality
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        console.log(req.body)
        console.log(`Succesfully created user ${req.params.username}!`);
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
        console.log('An Error Occured.');
        console.log(err);
    }
})

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // TODO: Add a comment describing the functionality of this method
    // Ends the current session
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post('/comment', async (req, res) => {
    try {
        const commentData = await Comment.create({
            content: req.body.comment,
            date_posted: '9/14/2023',
            user_id: req.session.user_id,
            blogpost_id: req.body.blogId
        });
        console.log(req.body);
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
        console.log('An Error Occured.');
        console.log(err);
        console.log(req.body);
    }
    
    
})

module.exports = router;
