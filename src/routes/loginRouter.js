import express from "express"
import loginController from "../controllers/loginController.js"

// The router method
const router = express.Router()


router.post("/", loginController)



export default router