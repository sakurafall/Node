import express from 'express';
import { signup, login } from '../controllers/userController.js';
import validate from '../middlewares/validate.js';
import { signupBodySchema, loginBodySchema } from '../schemas/userSchema.js';

const router = express.Router();

router.post('/signup', validate({ body: signupBodySchema }), signup);
router.post('/login', validate({ body: loginBodySchema }), login);

export default router;
