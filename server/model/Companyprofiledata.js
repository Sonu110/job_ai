const mongoose = require('mongoose');

const companyProfileSchema = new mongoose.Schema({
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'comapnyId' },
   
  logo: String,
  companyName: String,
  emailAddress: String,
  phoneNumber: String,
  websiteLink: String,
  aboutCompany: String,
  socialNetworks: [{
    name: String,
    link: String
  }],
  country: String,
  city: String,
  completeAddress: String,
  validcomapny : { type: Boolean, required: true, default:true },
},
{
  timestamps:true
});

module.exports = mongoose.model('CompanyProfile', companyProfileSchema);
