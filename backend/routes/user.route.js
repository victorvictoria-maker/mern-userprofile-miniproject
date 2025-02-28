import express from "express";
import { getSingleUser, getUsers } from "../controllers/user.controller.js";

const router = express.Router();

// GET THE 20 USERS
router.get("/", getUsers);

// GET A SINGLE USER
router.get("/:id", getSingleUser);

export default router;
