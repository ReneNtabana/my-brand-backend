
import {Blog} from "../models/blogsModel.js";
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import cloudinary from "cloudinary"
import dotenv from "dotenv"

dotenv.config();

class blogController {
    //crud operations
  
    // Get a specific blog
    static async getBlog(req, res) {
      try {
        const { id } = req.params;
  
        const blog = await Blog.findOne({ _id: id });

        if (!blog) {
          return res.status(404).json({
            message: `Blog with id of ${id} was not found`,
          });
        } else {
          return res.status(200).json({
            message: 'Blog successfully fetched',
            data: blog,
          });
        }
      } catch (error) {
        res.status(500).json({
          message: 'Encountered a Server Error',
          message: error.message,
        });
      }
    }
  
    //creating a blog
  
    static async createBlog(req, res) {
      cloudinary.config({
        cloud_name: 'dlw8ohn6p',
        api_key: '858592235543923',
        api_secret: '8W18Bv_01ebm21Y41WNreeKuceM7',
      });
      try {
        const storage = new CloudinaryStorage({
          cloudinary,
          params: {
            folder: 'blogs-image',
            allowed_formats: ['jpg', 'png', 'jpeg'],
          },
        });
        const upload = multer({ storage }).single('imageUrl');
        upload(req, res, async (err) => {
          if (err) {
            return console.log(err);
          }
          const { title, author, body, imageUrl } = req.body;
          const newBlog = await Blog.create({
            title,
            author,
            body,
            imageUrl,
            //imageUrl: req.file.path, //! Commented out for swagger presentation
          });
          // console.log(req.file.path);
          res.status(200).json({
            message: 'Blog Created successfully',
            data: newBlog,
          });
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: 'Server error 1.0',
          message: error.message,
        });
      }
    }
  
    // * READ all blogs
    static async getBlogs(req, res) {
      try {
        const blogs = await Blog.find();
        res.status(200).json({
          message: `Here are all the blogs, total is ${blogs.length} blogs`,
          data: blogs,
        });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: error.message,
        });
      }
    }
  
    // * UPDATE a blog
    static async updateBlog(req, res) {
      try {
        const { id } = req.params;
        // const blogId = id;
        const { title, author, body, imageUrl } = req.body;
        const blogToUpdate = await Blog.findOne({ _id: id });
  
        if (!blogToUpdate) {
          return res.status(404).json({
            message: `Blog with id ${id} was not found`,
          });
        } else {
          const blogUpdated = await Blog.findByIdAndUpdate(
            id,
            { title, author, body, imageUrl },
            { new: true },
          );
          res.status(200).json({
            message: 'Blog Updated Successfully',
            data: blogUpdated,
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: error.message,
        });
      }
    }
  
    // * DELETE a blog
    static async deleteBlog(req, res) {
      const { id } = req.params;
      const blogId = await Blog.findOne({ _id: id });
  
      try {
        if (!blogId) {
          res.status(401).json({
            message: `Blog with id ${id} was not found`,
          });
        } else {
          await Blog.findByIdAndDelete(id);
          res.status(200).json({
            message: 'The blog is successfully deleted',
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({
          message: error.message,
        });
      }
    }
  }
  
  export default blogController;
