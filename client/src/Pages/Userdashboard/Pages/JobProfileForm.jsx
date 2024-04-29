import React, { useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


function JobProfileForm() {
  const [fullName, setFullName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [rate, setRate] = useState('');
 
  const [about, setAbout] = useState('');
  const [experienceList, setExperienceList] = useState([{ title: '', duration: '', description: '' }]);
  const [educationList, setEducationList] = useState([
    { degree: '', fieldOfStudy: '', school: '', duration: '', description: '' }
  ]);
  
  const [portfolio, setPortfolio] = useState([]);
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [newPortfolio, setNewPortfolio] = useState(''); // State for new portfolio input
  const [profilePicture, setProfilePicture] = useState(null)
  const[loading , setloading] =  useState(false)
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setloading(true)
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('jobTitle', jobTitle);
    formData.append('location', location);
    formData.append('rate', rate);
    formData.append('about', about);
    formData.append('portfolio', portfolio);
    formData.append('contactEmail', contactEmail);
    formData.append('contactPhone', contactPhone);
    formData.append('file', profilePicture);
  
    experienceList.forEach((experience, index) => {
      formData.append(`experienceList[${index}][title]`, experience.title);
      formData.append(`experienceList[${index}][duration]`, experience.duration);
      formData.append(`experienceList[${index}][description]`, experience.description);
    });
  
    educationList.forEach((education, index) => {
      formData.append(`educationList[${index}][degree]`, education.degree);
      formData.append(`educationList[${index}][fieldOfStudy]`, education.fieldOfStudy);
      formData.append(`educationList[${index}][school]`, education.school);
      formData.append(`educationList[${index}][duration]`, education.duration);
      formData.append(`educationList[${index}][description]`, education.description);
    });
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/userprofiledata`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body:   formData,
      });
      
      const data  = await response.json()
      if (response.ok) {
        console.log('Form submitted successfully!');
        toast.success("Form  data submit successfully")
       
      } else {
        console.error('Error submitting form:', response.statusText);
        toast.error("Error " + data.error)
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    finally
    {
      setloading(false)
      
    }
  };
  
  

  const addExperience 
  
  = () => {
    setExperienceList([...experienceList, { title: '', duration: '', description: '' }]);
  };

  const addEducation = () => {
    setEducationList([...educationList, { degree: '', school: '', duration: '' , description :'' }]);
  };



// Function to handle adding a new portfolio value
const addPortfolio = () => {
  setPortfolio([...portfolio, newPortfolio]); // Add newPortfolio to the portfolio array
  setNewPortfolio(''); // Clear the newPortfolio input field
}

  return (
    <div className="mx-auto p-6 min-h-screen bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 pt-32">Create User</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Input fields for basic information */}
        {/* Input fields for basic information */}
        <input type="text" placeholder="Full Name" className="w-full border p-2 rounded-md" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <input type="text" placeholder="Job Title" className="w-full border p-2 rounded-md" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
        <input type="text" placeholder="Location" className="w-full border p-2 rounded-md" value={location} onChange={(e) => setLocation(e.target.value)} />
        <input type="text" placeholder="Salary you expect" className="w-full border p-2 rounded-md" value={rate} onChange={(e) => setRate(e.target.value)} />
         <textarea placeholder="About" rows="3" className="w-full border p-2 rounded-md" value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
        
        {/* Section for experiences */}
        <h2 className="text-lg font-semibold mb-2">Experiences</h2>
        {experienceList.map((experience, index) => (
          <div key={index} className="space-y-2">
            <input type="text" placeholder="Title" className="w-full border p-2 rounded-md" value={experience.title} onChange={(e) => {
              const newList = [...experienceList];
              newList[index].title = e.target.value;
              setExperienceList(newList);
            }} />
            <input type="text" placeholder="Duration" className="w-full border p-2 rounded-md" value={experience.duration} onChange={(e) => {
              const newList = [...experienceList];
              newList[index].duration = e.target.value;
              setExperienceList(newList);
            }} />
            <textarea placeholder="Description" rows="2" className="w-full border p-2 rounded-md" value={experience.description} onChange={(e) => {
              const newList = [...experienceList];
              newList[index].description = e.target.value;
              setExperienceList(newList);
            }}></textarea>
          </div>
        ))}
        <button type="button" onClick={addExperience} className="text-blue-500">
          Add Experience
        </button>
        
        {/* Section for education */}
       {/* Section for education */}
<h2 className="text-lg font-semibold mb-2">Education</h2>
{educationList.map((education, index) => (
  <div key={index} className="space-y-2">
    <input
      type="text"
      placeholder="Degree"
      className="w-full border p-2 rounded-md"
      value={education.degree}
      onChange={(e) => {
        const newList = [...educationList];
        newList[index].degree = e.target.value;
        setEducationList(newList);
      }}
    />
    <input
      type="text"
      placeholder="Field of Study"
      className="w-full border p-2 rounded-md"
      value={education.fieldOfStudy}
      onChange={(e) => {
        const newList = [...educationList];
        newList[index].fieldOfStudy = e.target.value;
        setEducationList(newList);
      }}
    />
    <input
      type="text"
      placeholder="School"
      className="w-full border p-2 rounded-md"
      value={education.school}
      onChange={(e) => {
        const newList = [...educationList];
        newList[index].school = e.target.value;
        setEducationList(newList);
      }}
    />
    <input
      type="text"
      placeholder="Duration"
      className="w-full border p-2 rounded-md"
      value={education.duration}
      onChange={(e) => {
        const newList = [...educationList];
        newList[index].duration = e.target.value;
        setEducationList(newList);
      }}
    />
    <textarea
      placeholder="Description"
      rows="2"
      className="w-full border p-2 rounded-md"
      value={education.description}
      onChange={(e) => {
        const newList = [...educationList];
        newList[index].description = e.target.value;
        setEducationList(newList);
      }}
    ></textarea>
  </div>
))}
<button type="button" onClick={addEducation} className="text-blue-500">
  Add Education
</button>

<label htmlFor="profilePicture" className="block mt-2 mb-3">Add social media Links</label>
        
        {/* Input fields for remaining information */}
        {portfolio.map((item, index) => (
      <div key={index}>
        <input
          type="text"
          placeholder="Portfolio"
          className="w-full border p-2 rounded-md"
          value={item}
          onChange={(e) => {
            const newPortfolioList = [...portfolio];
            newPortfolioList[index] = e.target.value;
            setPortfolio(newPortfolioList);
          }}
        />
      </div>
    ))}
    {/* Input field for adding a new portfolio value */}
    <input
      type="text"
      placeholder="Add Portfolio"
      className="w-full border p-2 rounded-md"
      value={newPortfolio}
      onChange={(e) => setNewPortfolio(e.target.value)}
    />
    {/* Button to add a new portfolio value */}
    <button onClick={addPortfolio} className="text-blue-500">
      Add social media
    </button>
        <input type="email" placeholder="Contact Email" className="w-full border p-2 rounded-md" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
        <input type="text" placeholder="Contact Phone" className="w-full border p-2 rounded-md" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
        <label htmlFor="profilePicture" className="block">Profile Picture</label>
        <input 
          type="file" 
          id="file"
          name="file" // Ensure this is set to "file"// This id should match the value specified in upload.single('profilePicture')
          accept="image/*" 
        
          onChange={handleProfilePictureChange} 
          className="w-full border p-2 rounded-md" 
        />
        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700" type="submit">
        
        {
          loading  ? " Create User  ....": " Create User"
        }
       
        </button>
      <ToastContainer></ToastContainer>
      </form>
    </div>
  );
}

export default JobProfileForm;
