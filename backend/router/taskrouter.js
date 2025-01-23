import express from "express";
import { isauthenticated } from "../middleware/auth.js";
import { createTask, deleteTask, getmytasks, updatetasks } from "../controllers/taskcontroller.js";

const router  = express.Router();

router.post("/add", isauthenticated, createTask)
router.get("/my",isauthenticated, getmytasks )
router.delete("/delete/:id", isauthenticated, deleteTask)
router.put("/update/:id", isauthenticated, updatetasks)
export default router;