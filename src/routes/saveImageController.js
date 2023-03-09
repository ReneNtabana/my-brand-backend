import dotenv from 'dotenv'
import cloudinary from 'cloudinary'

class saveImage {

    static async save(req, res) {
        try {
            dotenv.config();
            cloudinary.config({
                cloud_name: `${process.env.CLOUD_NAME}`,
                api_key: `${process.env.CLOUDINARY_API_KEY}`,
                api_secret: `${process.env.CLOUDINARY_API_SECRET}`
        })
        cloudinary.uploader.upload(req.file.path, (result, err) => {
            if (result) {
                return res.status(200).json({
                    imageUrl: result.url
                })
            } 
            res.status(500).json({
                error: err
            });
        });
        } catch (error) {
            console.log(error)
        }
    }
}

export default saveImage