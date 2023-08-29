import express from "express";
import PostController from "../controllers/PostMessage";

const router = express.Router();

router.get("/posts", PostController.getPosts);
router.get('/posts/:id', PostController.getPost);
router.post('/posts', PostController.createPost);
router.delete('/posts/:id', PostController.deletePost);
router.patch('/posts/:id', PostController.updatePost);
export default router;
