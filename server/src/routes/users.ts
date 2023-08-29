import express from 'express';
import UserController from '../controllers/User';

const router = express.Router();

router.post('/users', UserController.create);
router.get('/users/:id', UserController.getUser);
router.delete('/users/:id', UserController.deleteUser);
router.patch('/users/:id', UserController.updateUser);

export default router