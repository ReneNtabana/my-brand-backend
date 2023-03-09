import User from '../models/User.js'
import joi from "joi"

const validate = joi.object({
    email: joi.string().email().required().messages({
        'string.empty': 'Email can not be empty',
        'string.email': 'Please proveide valid email..',
        'any.required': 'Email is required'
    }),
    username: joi.string().required().messages({
        'string.empty': 'Please enter the username',
        'any.required': 'username field can not be empty'
    }),
    confirmPassword: joi.string().required().messages({
        'string.empty': 'Please enter the confirmation Password',
        'any.required': 'Password field can not be empty'
    }),
    password: joi.string().required().messages({
        'string.empty': 'Password field can not be empty',
        'any.required': 'Password field can not be empty'
    })
})
 
const validateEmailorUsername = (req, res, next) => {
    const { email, username } = req.body;
    const { error } = validate.validate( req.body );
    if(error){
    const errorDetails = error.details.map((detail) => detail.message).join(', ')
      return res.status(400).json({
        message: errorDetails,
      })
    }
    User.findOne({ $or: [{ email }, { username }] }, (theError, result) => {
        if (theError) {
            return res.status(500).json({
                message: theError.message
            })
        }
        if (result) {
            return response.error(res, 400, "username or email is already taken")
        }
        next(); 
    });
};

export default validateEmailorUsername