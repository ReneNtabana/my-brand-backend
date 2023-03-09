import { Blog } from '../models/blogsModel.js';
import jwt from 'jsonwebtoken';

class comment {
  static async createComment(req, res) {
    const { id } = req.params;
    let _id = id;
    const { userName } = req.body;
    const { comment } = req.body;
    const objectToPush = { name: userName, comment: comment };
    const blogToComment = await Blog.findByIdAndUpdate(
      _id,
      { $push: { comments: objectToPush } },
      { new: true },
    );
    res.status(200).json({
      message: 'Comment successfully added',
      data: blogToComment,
    });
  }
}

export default comment;