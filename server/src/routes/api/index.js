import { Router } from 'express';
import usersRoutes from './users';
import messagesRoutes from './messages';
import solutionsRoutes from './solutions';
const router = Router();

router.use('/users', usersRoutes);
router.use('/messages', messagesRoutes);
router.use('/solutions', solutionsRoutes);

export default router;
