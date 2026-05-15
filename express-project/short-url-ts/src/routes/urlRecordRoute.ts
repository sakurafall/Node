import express, { type Router } from 'express';
import { createURLRecord } from '../controllers/urlRecordController.ts';

const urlRecordRouter: Router = express.Router();

urlRecordRouter.route('/urlRecord').post(createURLRecord);

export default urlRecordRouter;