const express = require("express");
const router = express.Router();
const linkform = require("../models/linkForm");
//*route
router.get("/", async (req, res) => {
  res.render("index");
});

router.get("/link-maker", async (req, res) => {
  res.render("linkmaker");
});

router.post("/link-maker", async (req, res) => {
  const formData = req.body;
  await linkform
    .create(formData)
    .then((createdDocument) => {
      const linkAddress = createdDocument.address;
      res.redirect(`/copy-link?add=${linkAddress}`);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal Server Error");
    });
});
router.get("/copy-link", async (req, res) => {

  const address = req.query.add;
  const baseLink = `${req.protocol}://${req.get('host')}`;
  res.render("copylink" ,{baseLink,address});
});


router.get("/bunklink/:address", async (req, res) => {
  const address = req.params.address;
  let formDetails = await linkform.findOne({ address: address});
  res.render("votingpage", {formDetails});
});

router.put('/bunklink/:address', async (req, res) => {
  const address = req.params.address;
  const { type } = req.body;

  try {

    const post = await linkform.findOne({ address: address});

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }


   
    if (type === 'upvote') {
      post.agreeCount += 1;
    } else if (type === 'downvote') {
      post.disagreeCount += 1;
    } else {
      return res.status(400).json({ error: 'Invalid vote type' });
    }

    await post.save();

    res.json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get("/about" , async (req, res) => {

  res.render("about")
});

router.get("/idea-by" , async (req, res) => {

  res.render("ideaby")
});
module.exports = router;
