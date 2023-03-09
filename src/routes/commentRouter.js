import express from 'express'
import comment from '../controllers/commentController.js';

const router = express.Router();

router.post('/:id', comment.createComment)
router.post('/', (req, res) => res.status(400).json({ 

        message: "Specify the blog to comment on" 
        
    })
)

export default router