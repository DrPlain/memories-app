import mongoose from 'mongoose';
import PostMessage from "../models/PostMessage";
import { Response, Request } from "express";
import { handleError } from "../utils";

export default class PostController {
  static async getPosts(req: Request, res: Response) {
    try {
      const allPosts = await PostMessage.find({});
      return res.status(200).json(allPosts);
    } catch (error: unknown) {
      const message = handleError(error);
      return res.status(500).json({message: message})
    }
    
  }

  static async createPost(req: Request, res: Response) {
    try {
      const messageObject = PostMessage.build(req.body);
      const result = await messageObject.save();
      return res.status(201).json(result);
    } catch (error: unknown) {
        const message = handleError(error);
        return res.status(409).json({message})      
    }
    
  }

  static async getPost(req:Request, res:Response) {
    const {id: _id} = req.params;
    if (!_id) return res.status(404).json({error: 'user id is required'});
    if (mongoose.isValidObjectId(_id) === false) return res.status(404).json({message: 'invalid id type'});

    try {
        const post = await PostMessage.findById(_id);
        if (post) {
            return res.status(200).json(post)
         } else {
            res.status(404).json({message: `No post found with id ${_id}`})
        }
    } catch (error: unknown) {
        const message = handleError(error)
        return res.status(404).json({message: message});
    }
}

static async deletePost(req:Request, res:Response) {
    const {id: _id} = req.params;
    if (!_id) return res.status(404).json({error: 'user id is required'});
    if (mongoose.isValidObjectId(_id) === false) return res.status(404).json({message: 'invalid id type'});

    try {
        const result = await PostMessage.findByIdAndDelete(_id);
        result ? res.status(200).json({message: `post with id ${result.id} successfully deleted`}) : res.status(404).json({message: `No post found with id ${_id}`})
    } catch (error: unknown) {
        const message = handleError(error);
        return res.status(404).json({message: message});
    }
}

static async updatePost(req:Request, res:Response) {
    const {id: _id} = req.params;

    // TODO: Restrict user parameters that can be updated and handle necessary validation
    const updateData = req.body;
    if (!_id) return res.status(404).json({error: 'user id is required'});
    if (mongoose.isValidObjectId(_id) === false) return res.status(404).json({message: 'invalid id type'});

    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, updateData, {new: true});
        updatedPost ? res.status(200).json(updatedPost) : res.status(404).json({message: `No post found with id ${_id}`})
    } catch (error) {
        const message = handleError(error);
        return res.status(404).json({message: message});
    }
}
}
