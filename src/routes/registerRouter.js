import express from "express"
import registerController from "../controllers/registerController.js"

// The router method
const router = express.Router()


router.post("/", registerController)



export default router
