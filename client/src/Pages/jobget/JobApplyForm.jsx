import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
const JobApplyForm = () => {

    const [loading , setLoading] = useState(false)
const {id} = useParams()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    jobDescription: '',
    cv: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true)
    try {
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('experience', formData.experience);
        formDataToSend.append('jobDescription', formData.jobDescription);
        formDataToSend.append('cv', formData.cv);
    
        const response = await fetch(`${import.meta.env.VITE_API_URL}/submitapplyjobform/${id}`, {
          method: 'POST',
          body: formDataToSend,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const responseData = await response.json();
    
        if (response.ok) {
          // Handle successful submission
          console.log('Form submitted successfully');
          toast.success('successfully login')

        } else {
          // Handle error
          console.error('Failed to submit form');
          toast.error(responseData.error);
        }
      } catch (error) {
        toast.error('Internal server error');
        console.error('Error submitting form:', error);
      }
      finally
      {
        setLoading(false)
      }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, cv: e.target.files[0] });
  };

  return (
    <div className='bg-gray-100 min-h-screen pt-28 pb-10 p-4'>
      <div className="max-w-full md:max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Job Application Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Experience</label>
            <input type="text" name="experience" value={formData.experience} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Description</label>
            <textarea name="jobDescription" value={formData.jobDescription} onChange={handleChange} className="w-full border border-gray-300 rounded-md py-2 px-3"></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload CV</label>
            <input type="file" name="cv" onChange={handleFileChange} className="w-full border border-gray-300 rounded-md py-2 px-3" />
          </div>
          <div>
            <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600">
              
              {` ${ !loading ? "Submit Application" :" Submit Application ......."} `} 
            </button>
            <ToastContainer></ToastContainer>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApplyForm;
