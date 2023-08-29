import {Request, Response} from 'express';
import mongoose from 'mongoose';
import { handleError } from '../utils';
import UserModel, {IUser} from '../models/User';

export default class User {
    static async create(req:Request, res:Response) {

        try {
            const formUser: IUser = req.body;
            const newUser = await UserModel.create(formUser);
            // const user = await newUser.save()
            res.status(201).json(newUser)
            
        } catch (error: unknown) {
            const message = handleError(error)
            res.status(209).json({error: message})
        }

    }

    static async getUser(req:Request, res:Response) {
        const {id: _id} = req.params;
        if (!_id) return res.status(404).json({error: 'user id is required'});
        if (mongoose.isValidObjectId(_id) === false) return res.status(404).json({message: 'invalid id type'});

        try {
            const user = await UserModel.findById(_id);
            if (user) {
                return res.status(200).json(user)
             } else {
                res.status(404).json({message: `No user found with id ${_id}`})
            }
        } catch (error: unknown) {
            const message = handleError(error)
            return res.status(404).json({message: message});
        }
    }

    static async deleteUser(req:Request, res:Response) {
        const {id: _id} = req.params;
        if (!_id) return res.status(404).json({error: 'user id is required'});
        if (mongoose.isValidObjectId(_id) === false) return res.status(404).json({message: 'invalid id type'});

        try {
            const result = await UserModel.findByIdAndDelete(_id);
            result ? res.status(200).json({message: `User with id ${result.id} successfully deleted`}) : res.status(404).json({message: `No user found with id ${_id}`})
        } catch (error: unknown) {
            const message = handleError(error);
            return res.status(404).json({message: message});
        }
    }

    static async updateUser(req:Request, res:Response) {
        const {id: _id} = req.params;

        // TODO: Restrict user parameters that can be updated and handle necessary validation
        const updateData = req.body;
        if (!_id) return res.status(404).json({error: 'user id is required'});
        if (mongoose.isValidObjectId(_id) === false) return res.status(404).json({message: 'invalid id type'});

        try {
            const updatedUser = await UserModel.findByIdAndUpdate(_id, updateData, {new: true});
            updatedUser ? res.status(200).json(updatedUser) : res.status(404).json({message: `No user found with id ${_id}`})
        } catch (error) {
            const message = handleError(error);
            return res.status(404).json({message: message});
        }
    }
}