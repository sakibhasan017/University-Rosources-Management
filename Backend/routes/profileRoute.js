import express from "express";
import upload from "../config/multer.js";
import { addProfile, fetchProfiles, updateProfile, deleteProfile,fetchSingleProfile, verifySecretKey } from "../controllers/profileController.js";

const profileRouter = express.Router();

profileRouter.post("/add", upload.single("img"), addProfile);
profileRouter.get("/list", fetchProfiles);
profileRouter.patch("/update/:id", upload.single("img"), updateProfile);
profileRouter.delete("/delete/:id", deleteProfile);
profileRouter.get("/single/:id",fetchSingleProfile);
profileRouter.post("/verify/:id",verifySecretKey);

export default profileRouter;
