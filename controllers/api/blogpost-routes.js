const router = require('express').Router();
const { BlogPost } = require('../../models');

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
    where: {
    id: req.body.id
    })
} catch (err) {
    res.status(500).json(err);
    console.log('An Error Occured.');
    console.log(err);
    console.log(req.body);
}
});

module.exports = router;