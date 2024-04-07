const express = require('express');
const Chatrouting = express.Router();
const userdatas = require('../model/userdata');

Chatrouting.get('/chatuserdata/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Assuming job seekers have the category 'job_seeker'
        const jobSeekers = await userdatas.find({ catagory: 'job_seeker', _id: { $ne: id } });
        res.status(200).json({ message: "Successfully retrieved job seekers", data: jobSeekers, success: true });
    } catch (error) {
        console.error('Error retrieving job seekers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

Chatrouting.get('/massageuserdata/:id', async (req, res) => {
    try {   
        const { id } = req.params;

        
        // Assuming job seekers have the category 'job_seeker'
        const jobSeekers = await userdatas.findById(id);
       
        res.status(200).json({ message: "Successfully retrieved job seekers", data: jobSeekers, success: true });
    } catch (error) {
        console.error('Error retrieving job seekers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = { Chatrouting };
