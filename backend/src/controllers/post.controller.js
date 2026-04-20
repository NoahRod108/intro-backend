import { Post } from "../models/post.model.js";

const createPost = async (req, res) => {
  try {
    const { name, description, age } = req.body;

    if (!name || !description || !age) {
      return res.status(400).json({ message: "Include all fields!" });
    }

    const post = await Post.create({ name, description, age });

    res.status(201).json({
      message: "Post created successfully!",
      post: post,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const getPosts = async (req, res) => {
  try {
    const getPosts = await Post.find();

    res.status(200).json(getPosts);
  } catch (error) {
    res.status(500).json({ message: "Internal server error: ", error });
  }
};

const updatePost = async (req, res) => {
  try {
    // Check if body is empty
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No data provided for update!" });
    }

    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!post) res.status(404).json({ message: "Post not found!" });

    res.status(200).json({ message: "Post updated!", post: post });
  } catch (error) {
    res.status(500).json({ message: "Internal server error: ", error });
  }
};

const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletePost)
      return res.status(404).json({ message: "Post not found!" });

    res.status(200).json({ message: "Post deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error: ", error });
  }
};

export { createPost, getPosts, updatePost, deletePost };
