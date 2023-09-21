const router = require('express').Router();
const { User, BlogPost } = require('../../models');



router.get('/', async (req, res) => {
    try {
      const blogPostData = await BlogPost.findAll();
      res.status(200).json(blogPostData);
    } catch (err) {
      res.status(500).json(err);
      console.log('An Error Occured.');
      console.log(err);
      console.log(req.body);
    }
});

router.get('/:id', async (req, res) => {
    try {
      const blogPostData = await BlogPost.findByPk(req.params.id)
      res.status(200).json(blogPostData);
    } catch (err) {
      res.status(500).json(err);
      console.log('An Error Occured.');
      console.log(err);
      console.log(req.body);
    }
});

router.post('/addblogpost', async (req, res) => {
    try {
      const username = await User.findByPk(req.session.user_id, {
        attributes: [
          "username"
        ]
      });
      const user = username.get({ plain: true });

      console.log("THIS IS A USERNAME", user.username);
      const blogPostData = await BlogPost.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id,
        username: user.username
      });
      res.status(200).json(blogPostData);
    } catch (err) {
      res.status(500).json(err);
      console.log('An Error Occured.');
      console.log(err);
      console.log(req.body);
    }
  });

router.put('/updateblogpost', async (req, res) => {
    try {
        const blogPostData = await BlogPost.update({
            title: req.body.title,
            content: req.body.content
        },
        {
            where: {
            id: req.body.id
            }
        });

        if (!blogPostData) {
            res.status(404).json({"message": "No blogposts with this id." });
            return;
        }
        console.log("Successfully updated!")
        res.status(200).json(blogPostData);

    } catch (err) {
        res.status(500).json(err);
        console.log('An Error Occured.');
        console.log(err);
        console.log(req.body);
    }
});

router.delete('/deleteblogpost/:id', async (req, res) => {
    try {
        const blogPostData = await BlogPost.destroy({
            where: {
            id: req.params.id
            }
        });

        if (!blogPostData) {
            res.status(404).json({"message": "No blogposts with this id." });
            return;
        }
        console.log("Successfully deleted!")
        res.status(200).json(blogPostData);

    } catch (err) {
        res.status(500).json(err);
        console.log('An Error Occured.');
        console.log(err);
        console.log(req.body);
    }
});

module.exports = router;