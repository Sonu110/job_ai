import React from 'react'

function Jobseachbox() {
  return (
    <div>


        
<div className="flex items-center justify-center flex-col  pt-28 p-3 ">
      <div className="flex items-center  w-full justify-center   ">
        <input
          type="text"
          placeholder="Search topic"
          className=" bg-white p-3  rounded-s-md   border border-gray-300 w-full sm:w-96  "
    
    />
       
       <div className=' flex'>

        <input
          type="text"
          placeholder="Search city"
          className="bg-white  px-3  border border-gray-300  w-full sm:w-96 "
          />
          <div className=' bg-blue-900 p-3  text-white'>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6  cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35"
            />
          <circle cx="10.5" cy="10.5" r="7.5" />
        </svg>
            </div>

            </div>

      </div>

      
    </div>



    </div>
  )
}

export default Jobseachbox