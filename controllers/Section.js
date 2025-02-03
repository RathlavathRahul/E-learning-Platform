const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
  try {
    //data fetch
    const { sectionName, courseId } = req.body;
    //data validation
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties",
      });
    }
    // create section
    const newSection = await Section.create({ sectionName });

    // update course with section obhectId
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    );
    //return response
    return res.status(200).json({
      success: true,
      message: "Section Created Successfully",
      updatedCourseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to create Section,please try again later",
      error: error.message,
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    //data input
    const { sectionName, sectionId } = req.body;
    // data validation
    if (!sectionName || !sectionId) {
      return res.stats(400).json({
        success: false,
        message: "Missing properties",
      });
    }
    //data update
    const section = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );
    //return response
    return res.status(200).json({
      success: true,
      message: "Section Updated SuccessFully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update Section,please try again later",
      error: error.message,
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    //get Id-->assuming we are sending Id using params
    const { sectionId } = req.params;

    //use findByIdAndDelete
    await Section.findByIdAndDelete(sectionId);
    //return response
    return res.status(200).json({
      success: true,
      message: "Deleted Section Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to Delete Section,please try again later",
      error: error.message,
    });
  }
};
