const mongoose = require('mongoose');
const userProfileSchema = new mongoose.Schema({
    fullName: String,
    jobTitle: String,
    location: String,
    rate: String,
    memberSince: String,
    about: String,
    experienceList: [{ title: String, duration: String, description: String }],
    educationList: [{ degree: String, fieldOfStudy: String, school: String, duration: String, description: String }],
    portfolio: String,
    contactEmail: String,
    contactPhone: String
  });

  const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;