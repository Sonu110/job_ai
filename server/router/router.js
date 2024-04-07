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

    res.send('server running sucess fully ')

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

          // Find the job that contains the provided ID in the applieduser array
          const job = await Postjob.find({ applieduser: id });

          if (!job) {
              return res.status(404).json({ error: 'Job not found' });
          }
  
          res.status(200).json(job);

    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
})

router.get('/allcandidateappliedform/:id',auth,async (req,res)=>{

    try {
        

        const {id} = req.params;

          // Find the job that contains the provided ID in the applieduser array
          
          const job = await Jobapplyfromdata.find({ companyId: id }).sort({ createdAt: -1 });;

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

        console.log("ithe id is", id);
        // const updatedJobs = await Postjob.updateMany(
        //     { applieduser: id }, // Find all documents where userId is present in applieduser array
        //     { $set: { applieduser: [] } }, // Remove userId from applieduser array if present
        //     { multi: true } // Apply the update to multiple documents
        // );
  
    
        const Notifications = await Notification.find({ applair: id , user: true });
     
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

      
     
        
          const notifaction = await Notification.find({ companyId: id  , user: false}).sort({ createdAt: -1 });
        
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


module.exports = { router }