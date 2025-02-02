const mongoose = require("mongoose");

const tagsSchema = new mongoose.Scheme({
  name: {
    type: String,
    reuired: true,
  },
  description: {
    type: String,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
});
module.exports = mongoose.model("Tag", tagsSchema);
