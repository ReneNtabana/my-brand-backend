import jwt from "jsonwebtoken";

const verifyIsAdmin = (req, res, next) => {
    // Checking if the request has an authorization header
    const {token} = req.cookies;

    // The condition
    if(!token){
        return res.status(401).json({
                    message: "No token provided"
                })
    } else {
        // const token = authHeader.split(" ")[1];
        // console.log(token)

        // condition
        try {
            const verifiedUser = jwt.verify(token, process.env.SECRET, {expiresIn: '1d'});
            if(!verifiedUser.isAdmin){
                return res.status(401).json({
                    message: "User not Authorized"
                })
            } 
            next();

        } catch (error) {
            res.status(500).json({
                message: error.message
            })
        }
    }

};

export default verifyIsAdmin;