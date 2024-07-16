import {saveRoute,loadRoute} from "../controllers/save.js"
import express from "express"

const router = express.Router()

router.post("/save", saveRoute)
router.get("/load", loadRoute)

export {router as route}