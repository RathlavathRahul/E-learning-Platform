const Profile = require("../models/Profile");
const User = require("../models/User");

exports.updateProfile = async (req, res) => {
  try {
    // get data
    const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
    //get userId
    const id = req.user.id;
    //valiate data
    if (!contactNumber || !gender || !id) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    //find profile
    const userDetails = await User.findById(id);
    const profileId = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);
    //update profile
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.gender = gender;
    profileDetails.contactNumber = contactNumber;
    await profileDetails.save();

    //  await Profile.findByIdAndUpdate(profileId, {
    //   dateOfBirth,
    //   about,
    //   gender,
    //   contactNumber
    //});

    //return response
    return res.status(200).json({
      success: true,
      message: "Profile details updated Successfully",
      profileDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// deleteAccount
//how can we schedule this deletion operation instead delting it immediately-->cron jobs
exports.deleteAccount = async (req, res) => {
  try {
    //get Id
    const id = req.user.id;
    //validation
    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    //delete profile
    await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });
    // delete account
    await User.findByIdAndDelete({ _id: id });
    //todo:unenroll user from ALL enrolled courses
    //return response
    return res.status(200).json({
      success: true,
      message: "User Deleted Successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User cannot be deleted",
    });
  }
};

// get all user details
exports.getAllUserDetails = async (req, res) => {
  try {
    // get user id
    const id = req.user.id;
    // validation
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();
    // return response
    return res.status(200).json({
      success: true,
      message: "User Data Fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
