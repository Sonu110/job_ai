import React from 'react';
import { IoLocationOutline } from "react-icons/io5";
import { LiaToolboxSolid } from "react-icons/lia";
import { CgSandClock } from "react-icons/cg";
import { MdCurrencyRupee } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";
import { motion } from "framer-motion";

function Jobresult({ companyName, jobName, description, experience, salary }) {
  return (
    <div className="group mx-2 mt-4 grid max-w-screen-md grid-cols-12 space-x-8 overflow-hidden rounded-lg border py-8 text-black shadow transition hover:shadow-lg cursor-pointer">
      <div className="col-span-11 flex flex-col pr-8 text-left sm:pl-4">
        <h3 className="text-sm text-gray-600 flex gap-4"><span className='font-bold text-black'>Company :</span>{companyName}</h3>
        <a href="#" className="mb-3 overflow-hidden pr-7 text-lg font-semibold sm:text-xl">{jobName}</a>
        <p className="overflow-hidden pr-7 text-sm">{description ? description.slice(0, 200) + "....." : "..."}</p>
        <div className="mt-5 flex flex-col space-y-3 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
          <div className="font-bold text-black">Experience:<span className="ml-2 mr-3 rounded-full bg-blue-950 px-2 py-1 text-white">{experience} year</span></div>
          <div className="font-bold text-black">Salary:<span className="ml-2 mr-3 rounded-full bg-blue-950 px-2 py-1 text-white">{salary}</span></div>
        </div>
      </div>
    </div>
  );
}

export default Jobresult;
