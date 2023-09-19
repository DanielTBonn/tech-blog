const router = require('express').Router();
const { BlogPost } = require('../../models');



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
      const blogPostData = await BlogPost.create({
        title: req.body.title,
        content: req.body.content,
        date_posted: '9/14/2023',
        user_id: req.session.user_id,
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

module.exports = router;