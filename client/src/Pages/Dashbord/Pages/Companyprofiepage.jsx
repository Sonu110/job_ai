import React from 'react';

const Companyprofiepage = () => {
    const profileData = {
        logo: 'https://source.unsplash.com/random',
        companyName: 'yrs company limited',
        emailAddress: 'sonukumar@gmail.com',
        phoneNumber: '4234234',
        websiteLink: 'http://localhost:5173/companydashboard/company-profile',
        aboutCompany: 'this is our company',
        socialNetworks: ['http://facebook.com', 'http://twitter.com', 'http://linkedin.com'],
        country: 'India',
        city: 'Delhi',
        completeAddress: 'Roshan Nagar',
        validCompany: true,
      };
    
      return (
        <div className="container mx-auto py-10">
          <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <img className="w-full h-auto" src={profileData.logo} alt="Company Logo" />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{profileData.companyName}</div>
              <p className="text-gray-700 text-base mb-4">Email: {profileData.emailAddress}</p>
              <p className="text-gray-700 text-base mb-4">Phone: {profileData.phoneNumber}</p>
              <p className="text-gray-700 text-base mb-4">Website: <a href={profileData.websiteLink} className="text-blue-500">{profileData.websiteLink}</a></p>
              <p className="text-gray-700 text-base mb-4">About: {profileData.aboutCompany}</p>
              <div className="text-gray-700 text-base mb-4">
                Social Networks: 
                {profileData.socialNetworks.map((socialLink, index) => (
                  <a key={index} href={socialLink} className="ml-2 text-blue-500">{socialLink}</a>
                ))}
              </div>
              <p className="text-gray-700 text-base mb-4">Location: {profileData.country}, {profileData.city}, {profileData.completeAddress}</p>
              <p className="text-gray-700 text-base mb-4">Valid Company: {profileData.validCompany ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </div>
      );
    };
    

export default Companyprofiepage;

