import React from 'react';
import { RxCross1 } from "react-icons/rx";
function Filter({ filters, onFilterChange, isFilterMenuOpen, toggleFilterMenu }) {
  // Handler for search title change
  const handleSearchTitleChange = (e) => {
    onFilterChange('searchTitle', e.target.value);
  };

  // Handler for category change
  const handleCategoryChange = (e) => {
    onFilterChange('category', e.target.value);
  };

  // Handler for job type change
  const handleJobTypeChange = (e) => {
    const isChecked = e.target.checked;
    const jobType = e.target.value;

    if (isChecked) {
      // If checked, add to job types array
      onFilterChange('jobType', [...filters.jobType, jobType]);
    } else {
      // If unchecked, remove from job types array
      onFilterChange('jobType', filters.jobType.filter(type => type !== jobType));
    }
  };

  // Handler for date post change
  const handleDatePostChange = (e) => {
    onFilterChange('datePost', e.target.value);
  };

  // Handler for experience level change
  const handleExperienceLevelChange = (e) => {
    onFilterChange('experienceLevel', e.target.value);
  };

  // Handler for salary level change
  const handleSalaryLevelChange = (e) => {
    onFilterChange('salaryLevel', e.target.value);
  };

  return (
    <div 
    className={`filtercontainer ${isFilterMenuOpen ? 'open' : ''} w-full right-0 left-0 fixed top-0 bottom-0 z-50`} 
    style={{ backgroundColor: 'rgba(0,0,0,0.5)', opacity: isFilterMenuOpen ? 1 : 0 }}
    
>

  <div className="overlayer bg-blue-100 fixed top-0 left-0 right-0 bottom-0"  style={{ backgroundColor: 'rgba(0,0,0,0)', opacity: isFilterMenuOpen ? 1 : 0 }} onClick={toggleFilterMenu}></div>
      <div className="filterbox  ">
        <form className="max-w-[300px] relative  bg-white max-h-screen   overflow-y-scroll p-6 rounded-lg">
          {/* Search title */}
          <span className='bg-blue-500 rounded-xl text-white p-1 text-3xl absolute right-0 px-3 cursor-pointer' onClick={toggleFilterMenu}><RxCross1/></span>
          <label htmlFor="default-search" className="mb-2   text-lg font-medium text-gray-900 dark:text-white">Search title</label>
          <div className="relative mb-5 mt-5">
            {/* Input for search title */}
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              value={filters.searchTitle}
              onChange={handleSearchTitleChange}
              required
            />
            {/* Search icon */}
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
          </div>

          {/* Category */}
          <label htmlFor="countries" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Select a Category</label>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={filters.category}
            onChange={handleCategoryChange}
          >
            <option value="">Choose a category</option>
            <option value="IT">IT Sector</option>
            <option value="Finance">Finance</option>
            <option value="Sales">Sales Worker</option>
            <option value="HR">Human Resource</option>
            <option value="Other">Other</option>
          </select>

          <div className='mt-5 mb-5'>
              <label htmlFor="jobTypes">Job type</label>
              <div className="flex flex-col gap-3 mt-2">
                {/* Freelancer */}
                <div className="flex items-center">
                  <input
                    id="freelancer"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={() => setJobTypes(jobTypes.includes('Freelancer') ? jobTypes.filter(type => type !== 'Freelancer') : [...jobTypes, 'Freelancer'])}
                  />
                  <label htmlFor="freelancer" className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300">Freelancer</label>
                </div>
                {/* Full time */}
                <div className="flex items-center">
                  <input
                    id="fullTime"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={() => setJobTypes(jobTypes.includes('Full Time') ? jobTypes.filter(type => type !== 'Full Time') : [...jobTypes, 'Full Time'])}
                  />
                  <label htmlFor="fullTime" className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300">Full Time</label>
                </div>
                {/* Part time */}
                <div className="flex items-center">
                  <input
                    id="partTime"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={() => setJobTypes(jobTypes.includes('Part Time') ? jobTypes.filter(type => type !== 'Part Time') : [...jobTypes, 'Part Time'])}
                  />
                  <label htmlFor="partTime" className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300">Part Time</label>
                </div>
                {/* Temporary */}
                <div className="flex items-center">
                  <input
                    id="temporary"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={() => setJobTypes(jobTypes.includes('Temporary') ? jobTypes.filter(type => type !== 'Temporary') : [...jobTypes, 'Temporary'])}
                  />
                  <label htmlFor="temporary" className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300">Temporary</label>
                </div>
              </div>
            </div>
        

          {/* Add other filter options similarly */}
          <div className='mt-5 mb-5'>
            <label htmlFor="datePost">Date Post</label>
            <select
              id="datePost"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={filters.datePost}
              onChange={handleDatePostChange}
            >
              <option value="">Choose date post</option>
              <option value="all">All</option>
              <option value="last24">Last 24 hours</option>
              <option value="lastWeek">Last 1 week</option>
              {/* Add more options if needed */}
            </select>
          </div>

          {/* Experience level */}
          <div className='mt-5 mb-5'>
  <label htmlFor="experienceLevel">Experience Level</label>
  <select
    id="experienceLevel"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    onChange={(e) => setExperienceLevel(e.target.value)}
  >
    <option value="">Choose experience level</option>
    <option value="entryLevel">Entry Level</option>
    <option value="midLevel">Mid Level</option>
    <option value="seniorLevel">Senior Level</option>
    {/* Add more options if needed */}
  </select>
  <input
    type="text"
    id="customExperienceLevel"
    className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
    placeholder="Enter custom experience level"
    onChange={(e) => setCustomExperienceLevel(e.target.value)}
  />
</div>

          {/* Salary level */}
          <div className='mt-5 mb-5'>
            <label htmlFor="salaryLevel">Salary Level</label>
            <input
              type="number"
              id="salaryLevel"
              className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter max value of salary"
              value={filters.salaryLevel}
              onChange={handleSalaryLevelChange}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Filter;
