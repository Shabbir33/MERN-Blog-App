const fs = require("fs")
const Post = require("../models/Post")
const jwt = require("jsonwebtoken")

const createPost = async (req, res) => {
    const {originalname, path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);


    const token = req.cookies.Authorization;
    
    jwt.verify(token, process.env.SECRET, {}, async (err, info) => {
        if(err) throw err;

        const {title, summary, content} = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            coverImg:newPath, 
            author: info.sub,
        });  

        res.json(postDoc)

    })
}

const getPosts = async (req, res) => {
    res.json(
        {
            posts: await Post.find()
            .populate('author', ['username'])
            .sort({createdAt:-1})
            .limit(20)
        })
}

const getSinglePost = async (req, res) => {
    const {id} = req.params;
    const singlePost = await Post.findById(id).populate('author', ['username']);

    res.json({singlePost: singlePost})
}

const editPost = async (req, res) => {
    let newPath = null;
    if(req.file){
        const {originalname, path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path+'.'+ext;
        fs.renameSync(path, newPath);
    }

    const token = req.cookies.Authorization;
    
    jwt.verify(token, process.env.SECRET, {}, async (err, info) => {
        if(err) throw err;

        const {id, title, summary, content} = req.body;
        const postDoc = await Post.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.sub)
        if(!isAuthor){
            return res.status(400).json('You are not the Author of this Post.')
        }

        await postDoc.updateOne({
            title,
            summary,
            content,
            coverImg: newPath ? newPath : postDoc.coverImg,
        })
         

        res.json(postDoc)

    })

}

module.exports = {createPost, getPosts, getSinglePost, editPost}