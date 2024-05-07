const express = require('express')
const router = express.Router()
const multer = require('multer')
const userdatas = require('../model/userdata')
const Jobapplyfromdata = require('../model/Jobapplyfromdata')
const Postjob = require('../model/Postjob')
const Notification = require('../model/notificationtable')

const {postjobgetapi, postjobpostapi} = require('../controllers/Alljobs')
const  bcrypt = require('bcryptjs')
const jwt  = require('jsonwebtoken')
const path = require('path'); // Import the path module
const auth = require('../middleware/auth')
const UserProfile = require('../model/Userprofileschama')
const Companyprofiledata = require('../model/Companyprofiledata')
const key = "sonu#12345"
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    },
})

const cv = multer.diskStorage({
    destination: (req, file, cb) => {
        const destinationPath = path.join(__dirname,'..', 'Cv'); 
     
        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});


const upload =multer({ storage: storage }) 
const cvfiles =multer({ storage: cv }) 


router.get('/', (req,res)=>{

    res.send('server running sucessfully in nodejs  working ')

})
router.post('/login', async (req, res) => {
    const {  username, password } = req.body;
    try {

        const phoneNumber = !isNaN(username) ? parseInt(username) : null;

        const userdata = await userdatas.findOne({ $or: [
               
                { email: username },
                { phone: phoneNumber }
            ] });

 if (!userdata) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Use bcryptjs instead of bcrypt for password comparison
        const isMatch = await bcrypt.compare(password, userdata.password);
      
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const tokens = jwt.sign({ _id: userdata._id.toString() }, key, { expiresIn: '10h' });
     
        userdata.token = tokens;
        await userdata.save();




        res.status(200).json({ message: 'Login successful', user: userdata });

    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: 'Internal server error' });
    }

});


router.get('/profile', auth, (req, res) => {

    res.json({ data: req.user, success: true });
  });


router.post('/register', upload.single('file'), async (req, res, next) => {
   
    const {username, phone,password,email,catagory}= req.body
    
   
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

   
    try {
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

    
        const newUser = new userdatas({
            catagory: catagory,
            username: username,
            password: hashedPassword,
            email: email,
            phone: phone,
            file: req.file.path // Assuming you want to store the filename in the database
        });

        // Save the user data to the database
        await newUser.save();

        res.status(201).send('User data saved successfully.');
    } catch (error) {
        console.error('Error saving user data:', error);
        res.status(500).send('Error saving user data.');
    }
  
});


router.route('/postjob').post(auth, postjobpostapi).get(auth,postjobgetapi);


router.get('/alljobs', async(req,res)=>{
   
    
    try {

        
        const jobs = await Postjob.find({});
    res.status(200).json({massage :"successfully ",data :jobs , succse: true});


 } catch (error) {

    console.error('Error retrieving jobs:', error);
        res.status(500).json({ error: 'Internal server error' });
 }

})

router.get('/getjobs/:id',auth, async(req,res)=>{

    
    const {id}= req.params

    try {
    const jobs = await Postjob.find({_id:id});
    res.status(200).json({massage :"successfully ",data :jobs , succse: true});


 } catch (error) {

    console.error('Error retrieving jobs:', error);
        res.status(500).json({ error: 'Internal server error' });
 }

})

router.get('/postapplyjobfrom/:id',auth, async(req,res)=>{

    const {id}= req.params

    try {
    const jobs = await Postjob.find({_id:id});
    res.status(200).json({massage :"successfully ",data :jobs , succse: true});


 } catch (error) {

    console.error('Error retrieving jobs:', error);
        res.status(500).json({ error: 'Internal server error' });
 }

})


router.post('/submitapplyjobform/:id', auth, cvfiles.single('cv'), async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        
        const findjob = await Postjob.findById(id);
        if (!findjob) {
            return res.status(404).json({ error: 'Job not found' });
        }

        const existingApplication = await Postjob.findOne({ applieduser:userId });
        if (existingApplication) {
            return res.status(400).json({ error: 'You have already applied for this job.' });
        }
    
        const updatedUser = await userdatas.findByIdAndUpdate(findjob.userId, { $push: { Notification: 1 } }, { new: true });

        const newJobApplication = new Jobapplyfromdata({
            companyId: findjob.userId,
            applair: userId,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            experience: req.body.experience,
            jobDescription: req.body.jobDescription,
            cv: req.file ? req.file.path : null, // Assuming file path or URL for CV
        });
  


        


        // Save the job application data to the database
        const savedJobApplication = await newJobApplication.save();

        const notification = new Notification({
            companyId: findjob.userId,
            applair: userId,
            notificationid:id,
            user:false,
            name: req.body.name,
            jobDescription: req.body.jobDescription,


            // You can customize the message as needed
        });
        await notification.save();
        
        const io = req.app.get('socketio');
      
        console.log('Before emitting jobCountUpdated to room:', findjob.userId.toString());
        io.to(findjob.userId.toString()).emit('jobCountUpdated', { count: updatedUser.Notification.length });
        console.log('After emitting jobCountUpdated to room:', findjob.userId.toString());
      
        const updatedJob = await Postjob.findByIdAndUpdate(id, { $push: { applieduser: userId } }, { new: true });
        // Return success response with the saved job application data
   
        res.status(201).json(savedJobApplication);
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


  router.get('/alljobappliedform/:id',auth,async (req,res)=>{

    try {
        

        const {id} = req.params;
        const userId = req.user.id;

          // Find the job that contains the provided ID in the applieduser array
          const job = await Postjob.find({ applieduser: userId || id!==undefined});

          if (!job) {
              return res.status(404).json({ error: 'Job not found' });
          }
  
          res.status(200).json(job);

    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
})

router.get('/allcandidateappliedform',auth,async (req,res)=>{

    try {
     
console.log("api wokring");
  const userId = req.user.id;
          // Find the job that contains the provided ID in the applieduser array
          
          const job = await Jobapplyfromdata.find({ companyId: userId }).sort({ createdAt: -1 });;

          if (!job) {
              return res.status(404).json({ error: 'Job not found' });
          }
  
          res.status(200).json(job);

    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
})

router.get('/allselectedcandidate',auth,async (req,res)=>{

    try {
        

  const userId = req.user.id;
        
          
          const job = await Jobapplyfromdata.find(
            {

                $and:[

                    { companyId: userId },
                    {approved:true}
                ]
            }
        
        ).sort({ createdAt: -1 });;

          if (!job) {
              return res.status(404).json({ error: 'Job not found' });
          }
  
          res.status(200).json(job);

    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
})




router.route('/getjobnotifaction/:id').get(auth,async (req,res)=>{
    try {
        const { id } = req.params;
        const userId = req.user.id;
      console.log("api working is get ");
    
        const Notifications = await Notification.find({ applair: userId || id!==undefined , user: true });
     
        if (!Notifications || Notifications.length === 0) {
            return res.status(404).json({ error: 'Job not found' });
        }
    
        res.status(200).json(Notifications);
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    

}).post( auth, async (req, res) => {
  

    try {
        const { activityId, toggleState, activity } = req.body;
    
  
        const finduser = await userdatas.findById( activity.companyId);
        if (!finduser) {
            return res.status(404).json({ error: 'finduser not found' });
        }
        const updatejob = await Jobapplyfromdata.findOneAndUpdate(
            { _id: activityId },
            { $set: { approved: toggleState } }, // Use $set to explicitly set the approved field
            { new: true } // Return the modified document
        );
     

        
        if (!toggleState) {
            // If toggle is turned off, remove the corresponding notification
            const deletedNotification = await Notification.findOneAndDelete({ notificationid: activityId });
            
            // Check if the notification was successfully deleted
            if (deletedNotification) {
                console.log('Deleted Notification:', deletedNotification);
            } else {
                console.log('Notification not found or not deleted');
            }
            
            // Decrease notification count if toggleState is false
            const updatedUser = await userdatas.findByIdAndUpdate(activity.applair, { $pop: { Notification: 1 } }, { new: true });

            const io = req.app.get('socketio');
            io.to(activity.applair.toString()).emit('jobCountUpdated', { count: updatedUser.Notification.length });
        }
        else
        {
            const notification = new Notification({
                companyId: activity.companyId,
                applair: activity.applair,
                notificationid:activityId,
                user:toggleState,
                name: finduser.username,
                jobDescription: activity.jobDescription,
                // You can customize the message as needed
            });
            await notification.save();

        
        const updatedUser = await userdatas.findByIdAndUpdate(activity.applair, { $push: { Notification: 1 } }, { new: true });
        const io = req.app.get('socketio');
      
        io.to( activity.applair.toString()).emit('jobCountUpdated', { count: updatedUser.Notification.length });
        }
   
   
        res.status(201).json({success:true});
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}).delete(auth, async (req, res) => {
    try {
        const { id } = req.params;

        // Delete all notifications for the specified company ID
        const updatedUser = await userdatas.findByIdAndUpdate(
             id,
            { $set: { Notification: [] } }, // Set the Notification array to an empty array
            { new: true }
        );
        const io = req.app.get('socketio');
      
        io.to( id.toString()).emit('jobCountUpdated', { count: updatedUser.Notification.length });
        
        const result = await Notification.deleteMany({ applair: id , user: true });

        // Check if any notifications were deleted
        if (result.deletedCount > 0) {
            res.status(200).json({ success: true, message: 'All notifications cleared successfully' });
        } else {
            res.status(404).json({ success: false, message: 'No notifications found to clear' });
        }
    } catch (error) {
        console.error('Error clearing notifications:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.route('/allcandidatenotifaction/:id').get(auth,async (req,res)=>{

    try {
        
    

        const {id} = req.params;
        const userId = req.user.id;
 
        
          const notifaction = await Notification.find({ companyId: userId|| id!==undefined  , user: false}).sort({ createdAt: -1 });
        
          if (!notifaction) {
              return res.status(404).json({ error: 'Job not found' });
          }
  
          res.status(200).json(notifaction);

    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}).delete(auth, async (req, res) => {
    try {
        const { id } = req.params;

        // Delete all notifications for the specified company ID
        const updatedUser = await userdatas.findByIdAndUpdate(
          id,
            { $set: { Notification: [] } }, // Set the Notification array to an empty array
            { new: true }
        );
        const io = req.app.get('socketio');
      
        io.to( id.toString()).emit('jobCountUpdated', { count: updatedUser.Notification.length });
        
        const result = await Notification.deleteMany({ companyId: id , user: false });
        // Check if any notifications were deleted
        if (result.deletedCount > 0) {
            res.status(200).json({ success: true, message: 'All notifications cleared successfully' });
        } else {
            res.status(404).json({ success: false, message: 'No notifications found to clear' });
        }
    } catch (error) {
        console.error('Error clearing notifications:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// ============== all UserProfile page =========
router.route('/userprofiledata').post(auth, upload.single('file'), async (req, res) => {
    try {

        const existingUser = await UserProfile.find({ userId: req.user.id });

        // Check if the length of the existingUser array is greater than 0
        if (existingUser.length > 0) {
            return res.status(409).json({ error: ' already User existing' });
        }
      
      const { fullName, jobTitle, location, rate, memberSince, about, portfolio, contactEmail, contactPhone } = req.body;
      const { file } = req.file; // Assuming multer middleware is used to handle file uploads
  

      const experienceList = req.body.experienceList;
      const educationList = req.body.educationList;
     
      const userProfileData = {
        userId: req.user.id,
        fullName,
        jobTitle,
        location,
        rate,
        memberSince,
        about,
        experienceList,
        educationList,
        portfolio,
        contactEmail,
        contactPhone,
        profilePicture: file ? file.path : null 
      };
  
     
      const userProfile = new UserProfile(userProfileData);
  
      await userProfile.save();
    
  
      res.status(201).json({ message: 'User profile created successfully' });
    } catch (error) {
      console.error('Error creating user profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}).get(auth,async (req,res)=>{
     try {
      
        const userId = req.user.id;
        const userdata = await UserProfile.find({ userId: userId });
        if (!userdata || userdata.length === 0) {
            return res.status(401).json("user not found");
        }

        res.status(200).json(userdata);
    } catch (error) {
        console.error('Error retrieving user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}).put(auth, upload.single('file'),  async (req, res) => {
    try {
      const userId = req.user.id;
      const { fullName, jobTitle, location, rate, about, portfolio, contactEmail, contactPhone, experienceList, educationList } = req.body;
  
      // Parse the experienceList and educationList from JSON strings to arrays of objects
      const parsedExperienceList = JSON.parse(experienceList);
      const parsedEducationList = JSON.parse(educationList);
  
      // Check if a file was uploaded
      let profilePicture = null;
      
      if (req.file) {
        profilePicture = req.file.path;
      }
  
      // Update the user profile in the database
      const userProfile = await UserProfile.findOneAndUpdate(
        { userId: userId },
        {
          fullName,
          jobTitle,
          location,
          rate,
          about,
          experienceList: parsedExperienceList,
          educationList: parsedEducationList,
          portfolio,
          contactEmail,
          contactPhone,
          profilePicture, // Pass the profile picture path, or null if no file was uploaded
        },
        { new: true } // Return the updated document
      );
  
      res.status(200).json({ message: 'User profile updated successfully', userProfile });
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// ============================ /// comapny profile page api ///==============


router.route('/comapny-profile').post(auth, upload.single('logo'), async (req, res) => {
    const userId = req.user.id;


    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    try {
      // Create a new company profile
      const newProfile = new Companyprofiledata({
        companyId : userId,
        logo: req.file.filename,
        companyName: req.body.companyName,
        emailAddress: req.body.emailAddress,
        phoneNumber: req.body.phoneNumber,
        websiteLink: req.body.websiteLink,
        aboutCompany: req.body.aboutCompany,
        socialNetworks: JSON.parse(req.body.socialNetworks),
        country: req.body.country,
        city: req.body.city,
        completeAddress: req.body.completeAddress
      });
  
      // Save the profile to the database
      await newProfile.save();
  
      res.status(200).json({ message: 'Profile saved successfully' });
    } catch (error) {
      console.error('Error saving profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }).get(auth,async (req,res)=>
  {
    try {
        console.log("api working");
      
        const userId = req.user.id;
        const companydata = await Companyprofiledata.find({ companyId: userId });
        if (!companydata || companydata.length === 0) {
            return res.status(401).json("user not found");
        }

        res.status(200).json(companydata);
    } catch (error) {
        console.error('Error retrieving user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }


  }).put(auth, upload.single('logo'), async (req, res) => {
      
      try {
        const userId = req.user.id;// Assuming you have authentication middleware that sets req.user
      // Fetch the existing company profile from the database
      const existingProfile = await Companyprofiledata.find({ companyId: userId });
      
      if (!existingProfile) {
        return res.status(404).json({ error: 'Company profile not found' });
      }
      console.log(existingProfile);
      const profileToUpdate = existingProfile[0];
  
      // Update the company profile with the data from the request body
      profileToUpdate.companyName = req.body.companyName || profileToUpdate.companyName;
      profileToUpdate.emailAddress = req.body.emailAddress || profileToUpdate.emailAddress;
      profileToUpdate.phoneNumber = req.body.phoneNumber || profileToUpdate.phoneNumber;
      profileToUpdate.websiteLink = req.body.websiteLink || profileToUpdate.websiteLink;
      profileToUpdate.aboutCompany = req.body.aboutCompany || profileToUpdate.aboutCompany;
      profileToUpdate.socialNetworks = JSON.parse( req.body.socialNetworks) || profileToUpdate.socialNetworks;
      profileToUpdate.country = req.body.country || profileToUpdate.country;
      profileToUpdate.city = req.body.city || profileToUpdate.city;
      profileToUpdate.completeAddress = req.body.completeAddress || profileToUpdate.completeAddress;
  
      // Check if a logo file was uploaded
      if (req.file) {
        profileToUpdate.logo = req.file.path; // Assuming 'logo' is the field name for the logo file
      }
  
      // Save the updated company profile
      const updatedProfile = await profileToUpdate.save();

      res.json(updatedProfile);
    } catch (error) {
      console.error('Error updating company profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  router.get('/comapny-jobdata',auth,async (req, res) => {
    const userId = req.user.id;
    try {
      // Create a new company profile
      const jobs = await Postjob.find({userId:userId})
      res.status(200).json({ success: true, data: jobs });
    } catch (error) {
      console.error('Error saving profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });





  //// end //////



//   ============================ all user related job api ===============

router.get('/shotlistjobsdata', auth, async (req, res) => {
    const userId = req.user.id;
    try {
        // Find shortlisted jobs for the current user
        const jobs = await Jobapplyfromdata.find({
            applair: userId,
            approved: true
        });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({ error: 'No shortlisted jobs found' });
        }

        // Extract company IDs from the shortlisted jobs
        const companyIds = jobs.map(job => job.companyId);

        // Find company profiles based on the extracted company IDs
        const companies = await Companyprofiledata.find({ companyId: { $in: companyIds } });

        if (!companies || companies.length === 0) {
            return res.status(404).json({ error: 'No company profiles found' });
        }

        res.status(200).json({ success: true, data: jobs, companies: companies });
    } catch (error) {
        console.error('Error retrieving shortlisted jobs data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})






// =============== end ==============



module.exports = { router }