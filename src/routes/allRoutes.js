import { Router } from 'express';
import blogsRouter from './blogsRouter.js';
import registerRouter from './registerRouter.js';
import loginRouter from './loginRouter.js';
import logout from '../routes/logoutRouter.js';
import messageRouter from '../routes/messageRouter.js';
import commentRouter from '../routes/commentRouter.js';

const router = Router();

router.use('/blogs', blogsRouter);
router.use('/register', registerRouter);
router.use('/login', loginRouter);
router.use('/logout', logout);
router.use('/messages', messageRouter);
router.use('/comment', commentRouter);

router.use((req, res) => {
  return res.status(404).json({
    message: 'Page Not Found',
  });
});

export default router;