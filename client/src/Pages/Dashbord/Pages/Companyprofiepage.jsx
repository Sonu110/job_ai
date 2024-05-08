import React, { useEffect, useState } from 'react';
import { FaCheckCircle } from "react-icons/fa";
import Noprofile from '../../../components/Noprofile';

const Companyprofiepage = () => {
  const [formData, setFormData] = useState({});
  console.log(formData);

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/comapny-profile`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const companyProfileData = await response.json();
          setFormData(companyProfileData[0]);
        } else {
          toast.error('Error fetching company profile data!');
          console.error('Error fetching company profile data:', response.statusText);
        }
      } catch (error) {
        toast.error('Error fetching company profile data!');
        console.error('Error fetching company profile data:', error);
      }
    };

    fetchCompanyProfile();
  }, []);

  return (
    <div className=" min-h-screen flex items-center w-full">

        <div className=" w-full mx-auto pt-24 p-6  bg-white rounded-lg shadow-lg">
      {Object.keys(formData).length>0  ? (
        <>
          <div className="flex items-center justify-between mb-4">
            <img  src={`${import.meta.env.VITE_API_URL}/${formData?.logo}`} alt="Company Logo" className="w-20 h-20 object-cover rounded-full" />
            <div>
              {
                formData.validcomapny ?   <span className=' text-green-500 '><FaCheckCircle></FaCheckCircle></span> : null
              }
            
              <h1 className="text-2xl font-bold">{formData.companyName}</h1>
              <p className="text-gray-600">{formData.emailAddress}</p>
              <p className="text-gray-600">{formData.phoneNumber}</p>
              <a href={formData.websiteLink} className="text-blue-500 underline">
                Visit Website
              </a>
            </div>
          </div>
          <p className="text-gray-800">{formData.aboutCompany}</p>
          <div className="flex space-x-4 mt-4">
            {formData.socialNetworks &&
              formData.socialNetworks.map((socialLink, index) => (
                <a key={index} href={socialLink.link} className="text-blue-500 underline">
                  {socialLink.name}
                </a>
              ))}
          </div>
          <p className="text-gray-800 mt-4">
            {formData.completeAddress}, {formData.city}, {formData.country}
          </p>
          {formData.validCompany && <p className="text-green-500 font-bold mt-2">Valid Company</p>}
        </>
      )
    :
    <Noprofile></Noprofile>
    }
    </div>

    </div>

  );
};

export default Companyprofiepage;
