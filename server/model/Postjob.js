const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: 'user' },
    jobTitle: String,
    jobLocation: String,
    openings: Number,
    totalExp: Number,
    salary: Number,
    bonus: String,
    jobDescription: String,
    skills: [String],
    jobCategory: String,
    jobType: String,
    personal: [String],
    education: [String],
    additional: [String],


    logo: String,
    companyName: String,
    emailAddress: String,
    phoneNumber: String,
    websiteLink: String,


    applieduser: [{ type: mongoose.Schema.ObjectId, ref: "applieduser" }]
  },
{
  timestamps : true
});
  
  const Postjob = mongoose.model('Postjob', jobSchema);
 module.exports = Postjob