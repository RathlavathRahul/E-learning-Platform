const SubSection = require("../models/Section");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// create subsection

exports.createSubSection = async (req, res) => {
  try {
    // fetch data from req body,
    const { sectionId, title, timeDuration, description } = req.body;
    // extract file/video
    const video = req.files.videoFile;
    //validation
    if (!sectionId || !title || !timeDuration || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    //upload video to cloudinary
    // this below uploadDetails gives secure url as response
    const upoladDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );
    // create subsection
    const SubSectionDetails = await SubSection.create({
      title: title,
      timeDuration: timeDuration,
      description: description,
      videoUrl: upoladDetails.secure_url,
    });
    // update section with this section
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $push: {
          subSection: SubSectionDetails._id,
        },
      },
      { new: tre }
    );
    // return response
    return res.status(200).json({
      success: true,
      message: "Sub Section Created Successfully",
      updatedSection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server Error",
      error: error.message,
    });
  }
};

//HW;update subSection
//HW:delet Sub section
