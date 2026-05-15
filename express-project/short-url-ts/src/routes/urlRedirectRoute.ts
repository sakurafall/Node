import express, { type Router } from 'express';
import { getOriginURL } from '../controllers/urlRedirectController.js';

const urlRedirectRouter: Router = express.Router();

urlRedirectRouter.route('/:urlCode').get(getOriginURL);

export default urlRedirectRouter;