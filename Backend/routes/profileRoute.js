import express from "express";
import upload from "../config/multer.js";
import { addProfile, fetchProfiles, updateProfile, deleteProfile,fetchSingleProfile, verifySecretKey, resetSecretKey, changeSecretByAdmin } from "../controllers/profileController.js";

const profileRouter = express.Router();

profileRouter.post("/add", upload.single("img"), addProfile);
profileRouter.get("/list", fetchProfiles);
profileRouter.patch("/update/:id", upload.single("img"), updateProfile);
profileRouter.delete("/delete/:id", deleteProfile);
profileRouter.get("/single/:id",fetchSingleProfile);
profileRouter.post("/verify/:id",verifySecretKey);
profileRouter.post("/reset-secret/:id", resetSecretKey);
profileRouter.post("/change-secret-admin/:id", changeSecretByAdmin);

export default profileRouter;
