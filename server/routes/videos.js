import express from "express";
import {
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
} from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//create a video
router.post("/", verifyToken, addVideo);

//Update a video

router.put("/:id", verifyToken, updateVideo);

//Delete a video

router.delete("/:id", verifyToken, deleteVideo);

//Get a video

router.get("/find/:id", getVideo);

//Increase Views

router.put("/view");
router.put("/trend");
router.put("/random");
router.put("/sub");

export default router;
