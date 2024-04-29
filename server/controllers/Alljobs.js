const Companyprofiledata = require('../model/Companyprofiledata');
const Postjob = require('../model/Postjob')

const postjobpostapi = async (req,res)=>{

    try {
        const formData = req.body;
        const userId = req.user.id; 
        const company = await Companyprofiledata.findOne({companyId:userId})
        if(!company)
        {
            return res.status(404).json({ error: 'company  not found' });
        }
    
        const job = new Postjob({
            userId: userId,
            logo: company.logo,
            companyName: company.companyName,
            emailAddress: company.emailAddress,
            phoneNumber: company.phoneNumber,
            websiteLink: company.websiteLink,
            ...formData
        });
        
        await job.save();
        res.status(201).json({ message: 'Job details saved successfully' });
    } catch (error) {
        console.error('Error saving job:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const postjobgetapi = async (req,res)=>
{

    try {
        const userId = req.user.id;
        const jobs = await Postjob.find({ userId: userId });
        res.status(200).json(jobs);
    } catch (error) {
        console.error('Error retrieving jobs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports ={postjobgetapi, postjobpostapi}