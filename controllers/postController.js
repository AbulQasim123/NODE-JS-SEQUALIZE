const { Post } = require('../models');

const createPost = async (req, res) => {
    try {
        const { title, body } = req.body;
        if (!title || !body) return res.status(400).json({ status: false, message: 'title and body required' });
        const post = await Post.create({ title, body, userId: req.user.id });
        res.status(201).json({ status: true, data: post });
    } catch (err) {
        res.status(500).json({ status: false, message: 'Create failed', error: err.message });
    }
};

const listPosts = async (req, res) => {
    try {
        const posts = await Post.findAll();
        if (posts.length === 0) return res.status(404).json({ status: false, message: 'No posts found' });
        res.status(200).json({ status: true, data: posts });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: err.message });
    }
};

const getPost = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findByPk(id);
        if (!post) return res.status(404).json({ status: false, message: 'Post not found' });
        res.status(200).json({ status: true, data: post });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Server error', error: err.message });
    }
};

const updatePost = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findByPk(id);
        if (!post) return res.status(404).json({ status: false, message: 'Post not found' });

        if (post.userId !== req.user.id) return res.status(403).json({ status: false, message: 'Not allowed' });

        const { title, body } = req.body;
        await post.update({ title: title ?? post.title, body: body ?? post.body });
        res.json(post);
    } catch (err) {
        res.status(500).json({ status: false, message: 'Update failed', error: err.message });
    }
};

const deletePost = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findByPk(id);
        if (!post) return res.status(404).json({ status: false, message: 'Post not found' });

        if (post.userId !== req.user.id) return res.status(403).json({ status: false, message: 'Not allowed' });

        await post.destroy();
        res.status(200).json({ status: true, message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ status: false, message: 'Delete failed', error: err.message });
    }
};

module.exports = { createPost, listPosts, getPost, updatePost, deletePost };
