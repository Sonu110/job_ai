import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Selecton from '../../../components/Selecton';

function JobProfilupdateform() {
  const [formData, setFormData] = useState({
    fullName: '',
    jobTitle: '',
    location: '',
    rate: '',
    about: '',
    experienceList: [{ title: '', duration: '', description: '' }],
    educationList: [{ degree: '', fieldOfStudy: '', school: '', duration: '', description: '' }],
    portfolio: [],
    contactEmail: '',
    contactPhone: '',
    profilePicture: null
  });

  const [newPortfolio, setNewPortfolio] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/userprofiledata`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const userProfile = data[0]; // Assuming the API returns a single user profile
          setFormData(userProfile);
        
        } else {
          toast.error('Error fetching user profile data');
        }
      } catch (error) {
        console.error('Error fetching user profile data:', error);
        toast.error('Error fetching user profile data');
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
   
    setFormData({
      ...formData,
      profilePicture: file,
      profilePicturePreview: URL.createObjectURL(file) 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const formDataToSend = { ...formData };
  
      // Create a FormData object for file uploads
      const formDataFile = new FormData();
  
      // Append profile picture separately if it exists
      if (formDataToSend.profilePicture) {
        formDataFile.append("file", formDataToSend.profilePicture);
      }
  
      // Remove profile picture from form data to prevent duplication
      delete formDataToSend.profilePicture;
      delete formDataToSend.profilePicturePreview;
  
      // Serialize experienceList and educationList
      formDataToSend.experienceList = JSON.stringify(formDataToSend.experienceList);
      formDataToSend.educationList = JSON.stringify(formDataToSend.educationList);
  
      // Append other form data to FormData object
      for (const key in formDataToSend) {
        if (formDataToSend.hasOwnProperty(key)) {
          formDataFile.append(key, formDataToSend[key]);
        }
      }
  
      const response = await fetch(`${import.meta.env.VITE_API_URL}/userprofiledata`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formDataFile,
      });
  
      if (response.ok) {
        toast.success('User profile updated successfully');
      } else {
        toast.error('Error updating user profile');
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
      toast.error('Error updating user profile');
    } finally {
      setLoading(false);
    }
  };
  
  

  const addExperience = () => {
    setFormData({
      ...formData,
      experienceList: [...formData.experienceList, { title: '', duration: '', description: '' }]
    });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      educationList: [...formData.educationList, { degree: '', fieldOfStudy: '', school: '', duration: '', description: '' }]
    });
  };

  const addPortfolio = () => {
    setFormData({
      ...formData,
      portfolio: [...formData.portfolio, newPortfolio]
    });
    setNewPortfolio('');
  };

  return (
    <div>

      {
        loading ? <Selecton></Selecton>: 
      
       (formData.fullName.length >0 ? (
    <div className="mx-auto p-6 min-h-screen bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 pt-32">Update User Profile</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Input fields for basic information */}
        <input type="text" name="fullName" placeholder="Full Name" className="w-full border p-2 rounded-md" value={formData.fullName} onChange={handleChange} />
        <input type="text" name="jobTitle" placeholder="Job Title" className="w-full border p-2 rounded-md" value={formData.jobTitle} onChange={handleChange} />
        <input type="text" name="location" placeholder="Location" className="w-full border p-2 rounded-md" value={formData.location} onChange={handleChange} />
        <input type="text" name="rate" placeholder="Salary you expect" className="w-full border p-2 rounded-md" value={formData.rate} onChange={handleChange} />
        <textarea name="about" placeholder="About" rows="3" className="w-full border p-2 rounded-md" value={formData.about} onChange={handleChange}></textarea>
        
        {/* Section for experiences */}
        <h2 className="text-lg font-semibold mb-2">Experiences</h2>
        {formData.experienceList.map((experience, index) => (
          <div key={index} className="space-y-2">
            <input type="text" placeholder="Title" className="w-full border p-2 rounded-md" value={experience.title} onChange={(e) => handleChangeExperience(index, e)} />
            <input type="text" placeholder="Duration" className="w-full border p-2 rounded-md" value={experience.duration} onChange={(e) => handleChangeExperience(index, e)} />
            <textarea placeholder="Description" rows="2" className="w-full border p-2 rounded-md" value={experience.description} onChange={(e) => handleChangeExperience(index, e)}></textarea>
          </div>
        ))}
        <button type="button" onClick={addExperience} className="text-blue-500">
          Add Experience
        </button>
        
       {/* Section for education */}
<h2 className="text-lg font-semibold mb-2">Education</h2>
{formData.educationList.map((education, index) => (
  <div key={index} className="space-y-2">
    <input type="text" placeholder="Degree" className="w-full border p-2 rounded-md" value={education.degree} onChange={(e) => handleChangeEducation(index, e)} />
    <input type="text" placeholder="Field of Study" className="w-full border p-2 rounded-md" value={education.fieldOfStudy} onChange={(e) => handleChangeEducation(index, e)} />
    <input type="text" placeholder="School" className="w-full border p-2 rounded-md" value={education.school} onChange={(e) => handleChangeEducation(index, e)} />
    <input type="text" placeholder="Duration" className="w-full border p-2 rounded-md" value={education.duration} onChange={(e) => handleChangeEducation(index, e)} />
    <textarea placeholder="Description" rows="2" className="w-full border p-2 rounded-md" value={education.description} onChange={(e) => handleChangeEducation(index, e)}></textarea>
  </div>
))}
<button type="button" onClick={addEducation} className="text-blue-500">
  Add Education
</button>
        {/* Section for adding portfolio */}
        <h2 className="text-lg font-semibold mb-2">Portfolio</h2>
        {formData.portfolio.map((item, index) => (
          <div key={index}>
            <input type="text" placeholder="Portfolio" className="w-full border p-2 rounded-md" value={item} onChange={(e) => handleChangePortfolio(index, e)} />
          </div>
        ))}
        <input type="text" placeholder="Add Portfolio" className="w-full border p-2 rounded-md" value={newPortfolio} onChange={(e) => setNewPortfolio(e.target.value)} />
        <button onClick={addPortfolio} className="text-blue-500">
          Add Portfolio
        </button>

        {/* Input fields for remaining information */}
        <input type="email" name="contactEmail" placeholder="Contact Email" className="w-full border p-2 rounded-md" value={formData.contactEmail} onChange={handleChange} />
        <input type="text" name="contactPhone" placeholder="Contact Phone" className="w-full border p-2 rounded-md" value={formData.contactPhone} onChange={handleChange} />
        <label htmlFor="profilePicture" className="block">Profile Picture</label>
        <input 
          type="file" 
          id="file"
          name="file" 
          accept="image/*" 
          onChange={handleProfilePictureChange} 
          className="w-full border p-2 rounded-md" 
        />
        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700" type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </button>
        <ToastContainer></ToastContainer>
      </form>
    </div>
  
):(
  <p>Data not present</p>
)
        )
  }


    </div>
  );
}

export default JobProfilupdateform;
