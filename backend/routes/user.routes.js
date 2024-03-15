import express from 'express';
import { getUsersForSidebar } from '../controllers/user.controller.js';
import authProtect from '../middlewares/authProtect.middleware.js';

const router = express.Router();

router.get('/', authProtect, getUsersForSidebar);

export default router;