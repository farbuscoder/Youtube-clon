import User from "../models/User.js";
import { createError } from "../error.js";

export const update = async (req, res, next) => {
  //CHECK IF THE PARAMS ID MATCHS THE USER ID
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json("User has been deleted.");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(404, "You can update only your account"));
  }
};

export const deleteUser = async (req, res, next) => {
  //CHECK IF THE PARAMS ID MATCHS THE USER ID
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(404, "You can delete only your account"));
  }
};
export const getUser = async (req, res, next) => {
  //CHECK IF THE PARAMS ID MATCHS THE USER ID
  if (req.params.id === req.user.id) {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
};
export const subscribe = async (req, res, next) => {
  // CHECK IF THE PARAMS ID MATCHS THE USER ID
  if (req.params.id === req.user.id) {
    try {
      // FIND THE USER AND ADDS ANOTHER ID TO THE SUBSCRIBEDUSERS ARRAY
      await User.findById(req.user.id, {
        $push: { subscribedUsers: req.params.id },
      });

      // FIND THE USER THATS MATCHS WITH THE PARAMS ID AND INCREASE ITS SUBSCRIBERS BY ONE
      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: 1 },
      });
      res.status(200).json("Subscription successful");
    } catch (err) {
      next(err);
    }
  }
};
export const unsubscribe = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      // FIND THE USER AND REMOVE ANOTHER ID TO THE SUBSCRIBEDUSERS ARRAY
      await User.findById(req.user.id, {
        $pull: { subscribedUsers: req.params.id },
      });

      // FIND THE USER THATS MATCHS WITH THE PARAMS ID AND DECREASE ITS SUBSCRIBERS BY ONE
      await User.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: -1 },
      });
      res.status(200).json("Unsubscription successful");
    } catch (err) {
      next(err);
    }
  }
};
export const like = (req, res, next) => {};
export const dislike = (req, res, next) => {};
