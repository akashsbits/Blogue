import Blog from "../models/blog.js";

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ googleId: req.user.sub });

    res.status(200).json({ blog: blogs });
  } catch (err) {
    res.status(500).json({ error: "Unable to get blogs" });
  }
};

const getABlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      googleId: req.user.sub,
      _id: req.params.id,
    });

    res.status(200).json({ blog });
  } catch (err) {
    res.status(500).json({ error: "Unable to get the blog" });
  }
};

const addABlog = async (req, res) => {
  const { title, content } = req.body;

  const blog = new Blog({ title, content, googleId: req.user.sub });

  try {
    await blog.save();

    res.status(201).json({ blog });
  } catch (err) {
    res.status(500).json({ error: "Unable to save the blog" });
  }
};

export { getAllBlogs, addABlog, getABlog };
