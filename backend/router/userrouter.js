import express from "express"
import { getuser, login, logout, register } from "../controllers/usercontroller.js";
import { isauthenticated } from "../middleware/auth.js";
const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.get("/me",isauthenticated, getuser)
router.get("/logout", isauthenticated, logout)
export default router;