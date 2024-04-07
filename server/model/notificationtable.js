const mongoose = require('mongoose');

// Define schema for the notification table
const NotificationSchema = new mongoose.Schema({
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }, // Reference to the Company model
    applair: { type: mongoose.Schema.Types.ObjectId, ref: 'Jobseeker' }, // Reference to the Jobseeker model
    notificationid :{ type: mongoose.Schema.Types.ObjectId, ref: 'notifactionid' },
    name: { type: String, required: true },
    jobDescription: { type: String, required: true },
    user:{type:Boolean , require: true , default: false , ref:"usernotifaction"},
    createdAt: { type: Date, default: Date.now }, // Add a createdAt field with default value
});

// Create a model for the notification table
const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
