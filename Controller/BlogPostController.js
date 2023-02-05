const { BlogPost } = require("../Models/Blog.model");

// current user all  postes 
const getPosts = async (req, res) => {
    const { userId } = req.body;
    try {
        if (userId) {
            const posts = await BlogPost.find({ userId });
            res.send(posts);
        }
    } catch (error) {
        res.send({ message: err })
    }
}

// create new post 
const createPost = async (req, res) => {
    const { userId } = req.body;

    const new_Post = new BlogPost(req.body)
    await new_Post.save();
    res.send("Posted successfully.")

}

// delete own post  
const deletePost = async (req, res) => {
    const { id } = req.params;
    if (id) {
        const blogPost = await BlogPost
            .findOneAndDelete({ _id: id, userId: req.body.userId });
        res.send("Post deleted.")
    } else {
        res.send("Post doesn't exists.")
    }
}

// update own post 
const updatePost = async (req, res) => {
    const { id } = req.params;
    const filter = { _id: id, userId: req.body.userId };
    const update = req.body;

    const post = await BlogPost
        .findOneAndUpdate(filter, update);
    if (post) {
        post = { ...post, ...req.body }
        res.send("Post updated.")
    } else {
        res.send("Post doesn't exists.")
    }

}


module.exports = {
    getPosts,
    createPost,
    deletePost,
    updatePost
}