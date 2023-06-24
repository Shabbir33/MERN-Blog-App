const express = require("express")
const postController = require("../controller/postController");
const multer = require("multer")
const uploadMiddleware = multer({dest: './uploads/'})


const router = express.Router();

router.route("/").get(postController.getPosts);

router.route("/:id").get(postController.getSinglePost);

router.route("/edit/:id").patch(uploadMiddleware.single('file'), postController.editPost)

router.route("/create").post(uploadMiddleware.single('file'), postController.createPost);



module.exports = router;