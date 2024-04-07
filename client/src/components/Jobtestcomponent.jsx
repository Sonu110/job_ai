import React from 'react';
import { IoLocationOutline } from "react-icons/io5";
import { LiaToolboxSolid } from "react-icons/lia";
import { CgSandClock } from "react-icons/cg";
import { MdCurrencyRupee } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";
import { motion } from "framer-motion";

function Jobtestcomponent({ comapnyname, location, time, salary, jobtime, jobsector, jointype, jobId, isBookmarked, toggleBookmark }) {
  return (
    <div>
      <motion.div
        className="jobcontainer bg-gray-50 flex gap-5 items-start p-6 border-solid border-2 cursor-pointer border-secondary-400 rounded-lg"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2, ease: "easeInOut" }} // Increase size on hover
      >
        <div className="img w-12 mt-2">
          <img src="https://superio-reactjs.ibthemespro.com/images/resource/company-logo/1-1.png" alt="" srcSet="" />
        </div>
        <div className="jobboxtext w-full">
          <div className=' flex justify-between'>
            <h1 className='text-lg font-semibold flex justify-between'>{comapnyname}</h1>
            <motion.span
              className="text-2xl cursor-pointer"
              whileTap={{ scale: 1.5 }} // Increase size on tap/click
              onClick={() => toggleBookmark(jobId)} // Call toggleBookmark function on click
            >
              <CiBookmark color={isBookmarked ? "red" : "black"} /> {/* Change color based on isBookmarked */}
            </motion.span>
          </div>
          <div className="address flex gap-4 flex-wrap">
            <span className='flex items-center text-md gap-2 text-secondary-300'> <LiaToolboxSolid />Segment</span>
            <span className='flex items-center text-md gap-1 text-secondary-300'><IoLocationOutline></IoLocationOutline> {location ? location : 'Undefined'}</span>
            <span className='flex items-center text-md text-secondary-300'><CgSandClock />{time ? time : '11 hours'}</span>
            <span className='flex items-center text-md text-secondary-300'><MdCurrencyRupee />{salary ? salary : 'Undefined'}</span>
          </div>
          <div className="jobbuttons flex gap-2 mt-3 flex-wrap">
            <div className="button bg-secondary-400 text-primary px-3 p-1 text-[0.8rem] rounded-xl">{jobtime ? jobtime : 'Undefined'}</div>
            <div className="button bg-secondary-400 text-green-500 px-3 p-1 text-[0.8rem] rounded-xl">{jobsector ? jobsector : 'Undefined'}</div>
            <div className="button bg-orange-200 text-orange-600 px-3 p-1 text-[0.8rem] rounded-xl">{jointype ? jointype : 'Undefined'}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Jobtestcomponent;
