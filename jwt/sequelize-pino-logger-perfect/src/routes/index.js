import express from 'express';
import userRoute from './userRoute.js';
import todoRoute from './todoRoute.js';

const router = express.Router();

router.use('/auth', userRoute);
router.use('/todos', todoRoute);

export default router;
