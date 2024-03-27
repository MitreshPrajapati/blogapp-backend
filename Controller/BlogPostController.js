const { BlogPost } = require("../Models/Blog.model");
const cloudinary = require('../cloudinary');
// current user all  postes 

// get specific Post by post id
const getPostById = async (req, res) => {
    const { id } = req.params;
    if (id) {
        const blogPost = await BlogPost
            .findById(id);
        res.send(blogPost)
    } else {
        res.send("Post doesn't exists.")
    }
}

// getAllPosts
const getPosts = async (req, res) => {
    // const { userId } = req.body;
    try {

        const posts = await BlogPost.find().sort({ createdAt: 'desc' });

        // if (posts.length > 0) {
        res.send(posts);
        // }
        // res.send({ message: "No posts found." })

    } catch (error) {
        res.send({ message: error })
    }
}

//getUserPosts
const getUserPosts = async (req, res) => {
    // const id = JSON.parse(localStorage.getItem("reqUser"));
    try {
        const posts = await BlogPost.find().sort({ createdAt: 'desc' });
        // if (posts.length > 0) {
        res.send(posts);
        // }
        // res.send({ message: "No posts found." })
    } catch (error) {
        res.send({ message: error })
    }
}

const getOwnPostsOnly = async (req, res) => {
    const { userId } = req.body;
    try {

        const posts = await BlogPost.find({ userId }).sort({ createdAt: 'desc' });
        res.send(posts);

    } catch (error) {
        res.send({ message: err })
    }
}

// create new post 
const createPost = async (req, res) => {
    const { userId, user_name } = req.body;
    // const uploader = async (path) => await cloudinary.uploads(path, 'Images')
    // console.log(req)
    // if (req.method === 'POST') {

    // const urls = [];
    // const files = req.files;

    // const { path } = req.files[0];
    // const newPath = await uploader(path);
    // urls.push(newPath);
    // fs.unlinkSync(path);

    // console.log(req.body);
    // req.body.images = req.body.avatar;
    // const {avatar, ...otherdetails}= req.body;
    // console.log(otherdetails);
    const new_Post = new BlogPost(req.body)
    await new_Post.save();
    res.send("Posted successfully.")
    // }
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

    const update = req.body;

    const post = await BlogPost
        .findByIdAndUpdate(id, update);

    if (post) {

        res.send("Post updated.")
    } else {
        res.send("Post doesn't exists.")
    }

}

const handlePostLike = async (req, res) => {
    const { id } = req.params;
    const userId = req.body.userId;
    const post = await BlogPost.findById(id);
    if (post) {
        let alreadyLiked = post.likes.includes(userId);
        if (!alreadyLiked) {
            await post.updateOne({ $push: { likes: userId } })
            res.send("Post Liked.")
        } else {
            await post.updateOne({ $pull: { likes: userId } })
            res.send("Post Unliked.")
        }
    } else {
        res.send("Post doesn't exists.")
    }

}


module.exports = {
    getPostById,
    getPosts,
    getUserPosts,
    createPost,
    deletePost,
    updatePost,
    getOwnPostsOnly,
    handlePostLike,
}