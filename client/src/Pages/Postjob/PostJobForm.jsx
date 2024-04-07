import React, { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
const PostJobForm = () => {

  const [loading , setLoading] = useState(false)
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobLocation: '',
    openings: '',
    totalExp: '',
    salary: '',
    bonus: '',
    jobDescription: '',
    skills: '',
    companyName: '',
    contactPerson: '',
    phoneNumber: '',
    email: '',
    contactProfile: '',
    organizationSize: '',
    jobAddress: '',
    personal: [],
    education: [],
    additional: []
  });

  const handleChange = (e, index, type) => {
    const { name, value } = e.target;
    if (type === 'personal') {
      const personalData = [...formData.personal];
      personalData[index] = value;
      setFormData(prevState => ({
        ...prevState,
        personal: personalData
      }));
    } else if (type === 'education') {
      const educationData = [...formData.education];
      educationData[index] = value;
      setFormData(prevState => ({
        ...prevState,
        education: educationData
      }));
    } else if (type === 'additional') {
      const additionalData = [...formData.additional];
      additionalData[index] = value;
      setFormData(prevState => ({
        ...prevState,
        additional: additionalData
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleAddInput = (type) => {
    if (type === 'personal') {
      setFormData(prevState => ({
        ...prevState,
        personal: [...prevState.personal, '']
      }));
    } else if (type === 'education') {
      setFormData(prevState => ({
        ...prevState,
        education: [...prevState.education, '']
      }));
    } else if (type === 'additional') {
      setFormData(prevState => ({
        ...prevState,
        additional: [...prevState.additional, '']
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Make an HTTP request to send form data to the backend
    setLoading(true)
    const token = localStorage.getItem('token');
    try {
      
    
    const response = await fetch(`${import.meta.env.VITE_API_URL}/postjob`, {
      method: 'POST',
      body: new URLSearchParams(formData),
      
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      console.log('Form data sent successfully');
      
      toast.success('successfully login')

      
    } else {
      console.error('Error sending form data');
    
      toast.success('error in  login')

    }
  }
  catch(error)
  {
console.log("server error ", error);
  }
    finally
    {
      setLoading(false)
    }
  };






  return (
    <div className=" mx-auto p-6 pt-24  bg-gray-50">
        <form onSubmit={handleSubmit}>
      <h1 className="text-3xl font-bold mb-4">Post a Job</h1>
      <div className="bg-white p-4 shadow-md rounded-lg mb-4">
        <h2 className="text-xl font-bold mb-2">Basic Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          
          <div>
            <label htmlFor="jobTitle" className="block text-gray-800 font-bold mb-2">Job Title</label>
            <input type="text" id="jobTitle" name="jobTitle" className="w-full border border-gray-300 p-2 rounded-lg" placeholder="Enter job title"
             value={formData.jobTitle} onChange={handleChange}
            
            />
          </div>
          <div>
            <label htmlFor="jobLocation" className="block text-gray-800 font-bold mb-2">Job Location</label>
            <input type="text" id="jobLocation" name="jobLocation" className="w-full border border-gray-300 p-2 rounded-lg" placeholder="Enter job location"
            
            value={formData.jobLocation} onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="openings" className="block text-gray-800 font-bold mb-2">No Of Openings</label>
            <input type="number" id="openings" name="openings" className="w-full border border-gray-300 p-2 rounded-lg" placeholder="Enter number of openings"
             value={formData.openings} onChange={handleChange}
            
            />
          </div>
        </div>
      </div>
      <div className="bg-white p-4 shadow-md rounded-lg mb-4">
        <h2 className="text-xl font-bold mb-2">Candidate Requirement</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="totalExp" className="block text-gray-800 font-bold mb-2">Total Experience of Candidate</label>
            <input type="number" id="totalExp" name="totalExp" className="w-full border border-gray-300 p-2 rounded-lg" placeholder="Enter total experience required" 
            
            value={formData.totalExp} onChange={handleChange}
            
            />
          </div>
          <div>
            <label htmlFor="salary" className="block text-gray-800 font-bold mb-2">Monthly In-hand Salary</label>
            <input type="number" id="salary" name="salary" className="w-full border border-gray-300 p-2 rounded-lg" placeholder="Enter monthly salary" value={formData.salary} onChange={handleChange}  />
          </div>
          <div>
            <label htmlFor="bonus" className="block text-gray-800 font-bold mb-2">Do you offer bonus in addition to monthly salary</label>
            <input type="text" id="bonus" name="bonus" className="w-full border border-gray-300 p-2 rounded-lg" placeholder="Enter bonus details"  value={formData.bonus} onChange={handleChange}  />
          </div>
          <div>
            <label htmlFor="jobDescription" className="block text-gray-800 font-bold mb-2">Job Info / Job Description</label>
            <textarea id="jobDescription" name="jobDescription" rows="5" className="w-full border border-gray-300 p-2 rounded-lg" placeholder="Enter job description"  value={formData.jobDescription} onChange={handleChange}></textarea>
          </div>
          <div>
            <label htmlFor="skills" className="block text-gray-800 font-bold mb-2">Skills</label>
            <input type="text" id="skills" name="skills" className="w-full border border-gray-300 p-2 rounded-lg" placeholder="Enter required skills"  value={formData.skills} onChange={handleChange} />
          </div>
        </div>
        <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Personal Details</h2>
        <div className="flex">
        {formData.personal.map((value, index) => (
              <input
                key={index}
                type="text"
                name={`personal_${index}`}
                value={value}
                onChange={(e) => handleChange(e, index, 'personal')}
                placeholder="Personal Details"
                className="w-full border p-2 rounded-lg mb-2"
              />
            ))}

        <div className=' p-3 bg-red-300 cursor-pointer' onClick={() => handleAddInput('personal')}>
          +
        </div>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Education</h2>
        <div className="flex">
        {formData.education.map((value, index) => (
              <input
                key={index}
                type="text"
                name={`education_${index}`}
                value={value}
                onChange={(e) => handleChange(e, index, 'education')}
                placeholder="Personal Details"
                className="w-full border p-2 rounded-lg mb-2"
              />
            ))}

        <div className=' p-3 bg-red-300 cursor-pointer' onClick={() => handleAddInput('education')}>
          +
        </div>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Additional Info</h2>
        <div className="flex">

        {formData.additional.map((value, index) => (
              <input
                key={index}
                type="text"
                name={`additional_${index}`}
                value={value}
                onChange={(e) => handleChange(e, index, 'additional')}
                placeholder="Personal Details"
                className="w-full border p-2 rounded-lg mb-2"
              />
            ))}

        <div className=' p-3 bg-red-300 cursor-pointer' onClick={() => handleAddInput('additional')}>
          +
        </div>
        </div>
      </div>
      </div>
      

     








      <div className="bg-white p-4 shadow-md rounded-lg mb-4">
        <h2 className="text-xl font-bold mb-2">About Your Company</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="companyName" className="block text-gray-800 font-bold mb-2">Company Name</label>
            <input type="text" id="companyName" name="companyName" className="w-full border border-gray-300 p-2 rounded-lg" placeholder="Enter company name"   value={formData.companyName} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="contactPerson" className="block text-gray-800 font-bold mb-2">Contact Person Name</label>
            <input type="text" id="contactPerson" name="contactPerson" className="w-full border border-gray-300 p-2 rounded-lg" placeholder="Enter contact person name"   value={formData.contactPerson} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-gray-800 font-bold mb-2">Phone Number</label>
            <input type="text" id="phoneNumber" name="phoneNumber" className="w-full border border-gray-300 p-2 rounded-lg" placeholder="Enter phone number"   value={formData.phoneNumber} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-800 font-bold mb-2">Email Id</label>
            <input type="email" id="email" name="email" className="w-full border border-gray-300 p-2 rounded-lg" placeholder="Enter email address"   value={formData.email} onChange={handleChange}/>
          </div>
          <div>
            <label htmlFor="contactProfile" className="block text-gray-800 font-bold mb-2">Contact Person Profile</label>
            <input type="text" id="contactProfile" name="contactProfile" className="w-full border border-gray-300 p-2 rounded-lg" placeholder="Enter contact person profile"    value={formData.contactProfile} onChange={handleChange}/>
          </div>
          <div>
            <label htmlFor="organizationSize" className="block text-gray-800 font-bold mb-2">Size of Organization</label>
            <input type="text" id="organizationSize" name="organizationSize" className="w-full border border-gray-300 p-2 rounded-lg" placeholder="Enter organization size"   value={formData.organizationSize} onChange={handleChange}/>
          </div>
          <div>
            <label htmlFor="jobAddress" className="block text-gray-800 font-bold mb-2">Job Address</label>
            <input type="text" id="jobAddress" name="jobAddress" className="w-full border border-gray-300 p-2 rounded-lg" placeholder="Enter job address"  value={formData.jobAddress} onChange={handleChange} />
          </div>
        </div>
      </div>
          <input type="submit" value={` ${ !loading ? "Post job" :" Posting job ......."} `}  className=" w-full bg-blue-700 text-white border border-gray-300 p-2 rounded-lg cursor-pointer"/>
          <ToastContainer></ToastContainer>
          </form>

    </div>
  );
};

export default PostJobForm;