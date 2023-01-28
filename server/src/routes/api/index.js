import { Router } from 'express';
import usersRoutes from './users';
import messagesRoutes from './messages';
import solutionsRoutes from './solutions';
import updateRoutes from './update';
const router = Router();

router.use('/users', usersRoutes);
router.use('/messages', messagesRoutes);
router.use('/solutions', solutionsRoutes);
router.use('/update', updateRoutes);

export default router;
