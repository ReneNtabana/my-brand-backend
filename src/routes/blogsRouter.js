import express from "express";
import blogsController from "../controllers/blogsController.js"
import verifyIsAdmin from '../middleware/verifyIsAdmin.js';
import cookieJwtAuth from '../middleware/cookieJwtAuth.js';
import upload from '../middleware/multer.js';
// import express from 'express';

// Router method
const router = express.Router();

router.get('/', blogsController.getBlogs);
router.get('/:id', blogsController.getBlog);
router.post(
  '/',
  upload.single('imageUrl'),
  verifyIsAdmin,
  blogsController.createBlog,
);
router.put('/:id', cookieJwtAuth, verifyIsAdmin, blogsController.updateBlog);
router.delete('/:id', cookieJwtAuth, verifyIsAdmin, blogsController.deleteBlog);

export default router;
