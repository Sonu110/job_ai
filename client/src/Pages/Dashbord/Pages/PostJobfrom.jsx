import React from 'react'

function PostJobfrom() {
  return (
    <div>

<div className=" mx-auto p-6 pt-24 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Post Form</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="jobTitle" className="block text-gray-800 font-bold mb-1">Job Title</label>
          <input type="text" id="jobTitle" name="jobTitle" className="w-full border border-gray-300 p-2 rounded-lg" placeholder="Enter job title" />
        </div>
        <div>
          <label htmlFor="jobDescription" className="block text-gray-800 font-bold mb-1">Job Description</label>
          <textarea id="jobDescription" name="jobDescription" rows="4" className="w-full border border-gray-300 p-2 rounded-lg" placeholder="Enter job description"></textarea>
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-800 font-bold mb-1">Email Address</label>
          <input type="email" id="email" name="email" className="w-full border border-gray-300 p-2 rounded-lg" placeholder="Enter your email address" />
        </div>
        <div>
          <label htmlFor="username" className="block text-gray-800 font-bold mb-1">Username</label>
          <input type="text" id="username" name="username" className="w-full border border-gray-300 p-2 rounded-lg" placeholder="Enter your username" />
        </div>
        <div>
          <label htmlFor="specialisms" className="block text-gray-800 font-bold mb-1">Specialisms</label>
          <input type="text" id="specialisms" name="specialisms" className="w-full border border-gray-300 p-2 rounded-lg" placeholder="Enter specialisms" />
        </div>
        <div>
          <label htmlFor="retail" className="block text-gray-800 font-bold mb-1">Retail Job Type</label>
          <select id="retail" name="retail" className="w-full border border-gray-300 p-2 rounded-lg">
            <option value="fullTime">Full Time</option>
            <option value="partTime">Part Time</option>
          </select>
        </div>
        <div>
          <label htmlFor="salary" className="block text-gray-800 font-bold mb-1">Offered Salary</label>
          <input type="text" id="salary" name="salary" className="w-full border border-gray-300 p-2 rounded-lg" placeholder="Enter offered salary" />
        </div>
        <div>
          <label htmlFor="careerLevel" className="block text-gray-800 font-bold mb-1">Career Level</label>
          <input type="text" id="careerLevel" name="careerLevel" className="w-full border border-gray-300 p-2 rounded-lg" placeholder="Enter career level" />
        </div>
        <div>
          <label htmlFor="experience" className="block text-gray-800 font-bold mb-1">Experience</label>
          <input type="text" id="experience" name="experience" className="w-full border border-gray-300 p-2 rounded-lg" placeholder="Enter experience" />
        </div>
        <div>
          <label htmlFor="gender" className="block text-gray-800 font-bold mb-1">Gender</label>
          <input type="text" id="gender" name="gender" className="w-full border border-gray-300 p-2 rounded-lg" placeholder="Enter gender" />
        </div>
        <div>
          <label htmlFor="industry" className="block text-gray-800 font-bold mb-1">Industry</label>
          <select id="industry" name="industry" className="w-full border border-gray-300 p-2 rounded-lg">
            <option value="it">IT</option>
            <option value="healthcare">Healthcare</option>
          </select>
        </div>
        <div>
          <label htmlFor="qualification" className="block text-gray-800 font-bold mb-1">Qualification</label>
          <select id="qualification" name="qualification" className="w-full border border-gray-300 p-2 rounded-lg">
            <option value="bachelor">Bachelor</option>
            <option value="master">Master</option>
          </select>
        </div>
        <div>
          <label htmlFor="deadline" className="block text-gray-800 font-bold mb-1">Application Deadline Date</label>
          <input type="date" id="deadline" name="deadline" className="w-full border border-gray-300 p-2 rounded-lg" />
        </div>
        <div>
          <label htmlFor="country" className="block text-gray-800 font-bold mb-1">Country</label>
          <input type="text" id="country" name="country" className="w-full border border-gray-300 p-2 rounded-lg" placeholder="Enter country" />
        </div>
        <div>
          <label htmlFor="city" className="block text-gray-800 font-bold mb-1">City</label>
          <input type="text" id="city" name="city" className="w-full border border-gray-300 p-2 rounded-lg" placeholder="Enter city" />
        </div>
        <div>
          <label htmlFor="address" className="block text-gray-800 font-bold mb-1">Complete Address</label>
          <input type="text" id="address" name="address" className="w-full border border-gray-300 p-2 rounded-lg" placeholder="Enter complete address" />
        </div>
        <button type="submit" className="w-full rounded-3xl bg-blue-500 text-white font-semibold py-2">Submit</button>
      </form>
    </div>

    </div>
  )
}

export default PostJobfrom