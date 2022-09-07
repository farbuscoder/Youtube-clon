import Video from "../../server/models/Video.js";

//ADD VIDEO

export const addVideo = async (req, res, next) => {
  // CREATE NEW VIDEO OBJECT WITH USER ID AND REQUEST BODY
  const newVideo = new Video({ userId: req.user.id, ...req.body });

  try {
    // SAVE THE VIDEO OBJECT CREATED BEFORE
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (error) {
    next(error);
  }
};

// UPDATE VIDEO
export const updateVideo = async (req, res, next) => {
  try {
    // FIND THE VIDEO BY ID IN REQUEST PARAMS
    const video = await Video.findById(req.params.id);

    //CHECK IF THE VIDEO EXIST
    if (!video) return next(createError(404, "Video not found"));

    // CHECK IF THE USER ID IS THE SAME AS THE VIDEO.USERID
    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedVideo);
    } else {
      return next(createError(403, "You can update only your video"));
    }
  } catch (error) {
    next(error);
  }
};

//DELETE VIDEO
export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found"));
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json("The video has been deleted");
    } else {
      return next(createError(403, "You can delete only your video"));
    }
  } catch (error) {
    next(error);
  }
};

// GET VIDEO BY ID
export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);

    res.status(200).json(video);
  } catch (error) {}
};

//ADD VIEW
export const addView = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);

    res.status(200).json(video);
  } catch (error) {}
};
