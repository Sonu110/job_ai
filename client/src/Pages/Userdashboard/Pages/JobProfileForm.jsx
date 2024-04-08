import React, { useState } from 'react';


function JobProfileForm() {
  const [fullName, setFullName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [rate, setRate] = useState('');
  const [memberSince, setMemberSince] = useState('');
  const [about, setAbout] = useState('');
  const [experienceList, setExperienceList] = useState([{ title: '', duration: '', description: '' }]);
  const [educationList, setEducationList] = useState([
    { degree: '', fieldOfStudy: '', school: '', duration: '', description: '' }
  ]);
  
  const [portfolio, setPortfolio] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = {
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
      contactPhone
    };
  
    console.log(formData);
    try {
      const response = await fetch('/userprofiledata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Form submitted successfully!');
        // Reset form after successful submission if needed
        // setFullName('');
        // setJobTitle('');
        // ...
      } else {
        console.error('Error submitting form:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

  const addExperience = () => {
    setExperienceList([...experienceList, { title: '', duration: '', description: '' }]);
  };

  const addEducation = () => {
    setEducationList([...educationList, { degree: '', school: '', duration: '' , description :'' }]);
  };

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
        <input type="text" placeholder="Member Since" className="w-full border p-2 rounded-md" value={memberSince} onChange={(e) => setMemberSince(e.target.value)} />
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

        
        {/* Input fields for remaining information */}
        <input type="text" placeholder="Portfolio" className="w-full border p-2 rounded-md" value={portfolio} onChange={(e) => setPortfolio(e.target.value)} />
        <input type="email" placeholder="Contact Email" className="w-full border p-2 rounded-md" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
        <input type="text" placeholder="Contact Phone" className="w-full border p-2 rounded-md" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
        <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700" type="submit">
          Create User
        </button>
      </form>
    </div>
  );
}

export default JobProfileForm;
