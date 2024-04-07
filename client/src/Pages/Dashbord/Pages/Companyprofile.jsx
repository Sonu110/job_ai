export default function Companyprofile() {
  return (
 <div>
    <div className="p-6 pt-24 bg-white">
      <h1 className="text-3xl font-bold mb-4">My Profile</h1>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Browse Logo</label>
        <input
          type="file"
          accept=".jpg,.png"
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
        <p className="text-sm text-gray-500">Max file size is 1MB, Minimum dimension: 330x300</p>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Browse Cover</label>
        <input
          type="file"
          accept=".jpg,.png"
          className="border border-gray-300 rounded-lg p-2 w-full"
        />
        <p className="text-sm text-gray-500">Max file size is 1MB, Minimum dimension: 330x300</p>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Company name</label>
        <input type="text" className="border border-gray-300 rounded-lg p-2 w-full" />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Email address</label>
        <input type="email" className="border border-gray-300 rounded-lg p-2 w-full" />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input type="tel" className="border border-gray-300 rounded-lg p-2 w-full" />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Website link</label>
        <input type="url" className="border border-gray-300 rounded-lg p-2 w-full" />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Team Size</label>
        <select className="border border-gray-300 rounded-lg p-2 w-full">
          <option>Select</option>
          <option>1-10</option>
          <option>11-50</option>
          <option>51-100</option>
          <option>100+</option>
        </select>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Multiple Select boxes</label>
        <select  className="border border-gray-300 rounded-lg p-2 w-full">
          <option>Select</option>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
      </div>
      <div className="mb-6">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          Allow In Search & Listing
        </label>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">About Company</label>
        <textarea className="border border-gray-300 rounded-lg p-2 w-full h-32" />
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
        Save
      </button>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Social Network</label>
        <div className="flex items-center space-x-4">
          <input type="text" placeholder="Facebook" className="border border-gray-300 rounded-lg p-2" />
          <input type="text" placeholder="Twitter" className="border border-gray-300 rounded-lg p-2" />
          <input type="text" placeholder="Linkedin" className="border border-gray-300 rounded-lg p-2" />
          <input type="text" placeholder="Google Plus" className="border border-gray-300 rounded-lg p-2" />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-4">
          Save
        </button>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Contact Information</label>
        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Country" className="border border-gray-300 rounded-lg p-2" />
          <input type="text" placeholder="City" className="border border-gray-300 rounded-lg p-2" />
          <input type="text" placeholder="Complete Address" className="border border-gray-300 rounded-lg p-2 col-span-2" />
          <input type="text" placeholder="Search Location" className="border border-gray-300 rounded-lg p-2 col-span-2" />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-4">
          Save
        </button>
      </div>
    </div>
 </div>
  )
}

