const Post = require("../../models/post");
const User = require("../../models/user");

module.exports = {
  create: async (req, res) => {
    try {
      const user_id = req.user.id;

      const formData = { ...req.body, user: user_id };
      const postNew = new Post(formData);
      const savePost = await postNew.save();

      const userByID = await User.findById(user_id);
      userByID.post.push(savePost);
      const user = await userByID.save();
      res.status(200).json(savePost);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findOne({ _id: req.params.id });
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  userByPost: async (req, res) => {
    try {
      const { id } = req.params;
      const userByPost = await User.findById(id).populate("post");

      res.status(200).json(userByPost);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};
