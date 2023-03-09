class logout {
    static async logout(req,res){
        res.clearCookie("token");
        return res.status(200).json({
            message: "You are now logged out"
        })
    }
}

export default logout