const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({

  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: 'user' },

  fullName: {
    type: String,
    required: true
  },
  jobTitle: String,
  location: String,
  rate: Number,
  about: String,
  experienceList: [{
    title: String,
    duration: String,
    description: String
  }],
  educationList: [{
    degree: String,
    fieldOfStudy: String,
    school: String,
    duration: String,
    description: String
  }],
  portfolio: [String],
  contactEmail: String,
  contactPhone: String,
  profilePicture: String  // Assuming you store the URL of the profile picture
},
{timestamps:true}
);

// Create a model based on the schema
const UserProfile = mongoose.model('UserProfile', userProfileSchema);


module.exports = UserProfile;