import { useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

export default function Companyprofile() {

  const [socialNetworks, setSocialNetworks] = useState([{ name: '', link: '' }]);
  const [logo, setLogo] = useState(null);
  const [formData, setFormData] = useState({
    companyName: '',
    emailAddress: '',
    phoneNumber: '',
    websiteLink: '',
    aboutCompany: '',
    country: '',
    city: '',
    completeAddress: ''
  });

  const handleAddSocialNetwork = () => {
    setSocialNetworks([...socialNetworks, { name: '', link: '' }]);
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSocialNetworks = [...socialNetworks];
    updatedSocialNetworks[index][name] = value;
    setSocialNetworks(updatedSocialNetworks);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('logo', logo);
    formDataToSend.append('companyName', formData.companyName);
    formDataToSend.append('emailAddress', formData.emailAddress);
    formDataToSend.append('phoneNumber', formData.phoneNumber);
    formDataToSend.append('websiteLink', formData.websiteLink);
    formDataToSend.append('aboutCompany', formData.aboutCompany);
    formDataToSend.append('socialNetworks', JSON.stringify(socialNetworks));
    formDataToSend.append('country', formData.country);
    formDataToSend.append('city', formData.city);
    formDataToSend.append('completeAddress', formData.completeAddress);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/comapny-profile`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body:  formDataToSend
      });

      if (response.ok) {
        console.log('Form submitted successfully!');
        toast.success('Form submitted successfully!');
      } else {
     
        toast.error('Form not submitted successfully!');
     
        console.error('Error submitting form:', response.statusText);
      }
    } catch (error) {
      toast.error('Form not submitted successfully!');
     
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <div className="p-6 pt-24 bg-white">
        <h1 className="text-3xl font-bold mb-4">My Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Browse Logo</label>
            <input
              type="file"
              accept=".jpg,.png"
              onChange={handleLogoChange}
              className="border border-gray-300 rounded-lg p-2 w-full"
            />
            <p className="text-sm text-gray-500">Max file size is 1MB, Minimum dimension: 330x300</p>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Company name</label>
            <input
              type="text"
              className="border border-gray-300 rounded-lg p-2 w-full"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              className="border border-gray-300 rounded-lg p-2 w-full"
              value={formData.emailAddress}
              onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              className="border border-gray-300 rounded-lg p-2 w-full"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Website link</label>
            <input
              type="url"
              className="border border-gray-300 rounded-lg p-2 w-full"
              value={formData.websiteLink}
              onChange={(e) => setFormData({ ...formData, websiteLink: e.target.value })}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">About Company</label>
            <textarea
              className="border border-gray-300 rounded-lg p-2 w-full h-32"
              value={formData.aboutCompany}
              onChange={(e) => setFormData({ ...formData, aboutCompany: e.target.value })}
            />
          </div>
          <div className="mb-6 ">
            <label className="block text-sm font-medium text-gray-700">Social Network</label>
            {socialNetworks.map((network, index) => (
              <div key={index} className="flex items-center space-x-4 flex-wrap">
                <input
                  type="text"
                  name="name"
                  placeholder="Social Network Name"
                  className="border border-gray-300 rounded-lg p-2"
                  value={network.name}
                  onChange={(e) => handleChange(index, e)}
                />
                <input
                  type="url"
                  name="link"
                  placeholder="Link"
                  className="border border-gray-300 rounded-lg p-2"
                  value={network.link}
                  onChange={(e) => handleChange(index, e)}
                />
                {index === socialNetworks.length - 1 && (
                  <button type="button" onClick={handleAddSocialNetwork} className="bg-blue-700 px-4 p-1 rounded-lg text-white">
                    +
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Contact Information</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Country"
                className="border border-gray-300 rounded-lg p-2"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              />
              <input
                type="text"
                placeholder="City"
                className="border border-gray-300 rounded-lg p-2"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
              <input
                type="text"
                placeholder="Complete Address"
                className="border border-gray-300 rounded-lg p-2 col-span-2"
                value={formData.completeAddress}
                onChange={(e) => setFormData({ ...formData, completeAddress: e.target.value })}
              />
            </div>
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded-lg mt-4">
            Save
          </button>
          
        <ToastContainer />
        </form>
      </div>
    </div>
  );
}
