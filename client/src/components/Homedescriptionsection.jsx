import React from 'react'
import image from '../assets/images/image-2.jpg'
import image2 from '../assets/images/multi-logo.png'
import { FaCheck } from "react-icons/fa";
import { motion } from 'framer-motion';

function Homedescriptionsection() {
    console.log('description section');
  return (
    <div>


    <div className="homesectiondescriptionconatiner grid grid-cols-1 md:grid-cols-2  p-10  sm:p-24 relative gap-4">

        <div className="image flex flex-col ">
            <div className="img  sm:p-6">
                <img src={image} alt="" />
            </div>
            <div className="box bg-white shadow-lg   relative  sm:absolute  sm:left-[45%]  sm:bottom-7 inline-block p-5 px-16 border border-solid  border-blue-100 rounded-lg ">

                    <div className="icons absolute -top-5 -left-5  bg-primary w-14 p-5 rounded-full text-white"><FaCheck></FaCheck> </div>

                <div className="text-sm text-center mb-5"><h3>300k+ Employers</h3></div>
                <div className="img w-40">
                    <img src={image2} alt="" />
                </div>

         


            </div>
        </div>

        <div className="description p-3">

<h1 className=' text-2xl    leading-snug md:text-4xl lg:text-5xl   font-semibold'>Millions of Jobs. Find the one that suits you.</h1>
<h3 className=' leading-normal text-gray-400 text-sm w-10/12 mt-6'>Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 600,000 companies worldwide.</h3>
<ul className=' p-10 flex flex-col gap-6'>
    <li className=' flex items-center gap-4'>
        <span  className=' text-lg' ><FaCheck></FaCheck></span>
        <span className=' text-sm'>Bring to the table win-win survival</span>
    </li>
    <li className=' flex items-center gap-4'>
        <span  className=' text-lg' ><FaCheck></FaCheck></span>
        <span className=' text-sm'>Bring to the table win-win survival</span>
    </li>
    <li className=' flex items-center gap-4'>
        <span  className=' text-lg' ><FaCheck></FaCheck></span>
        <span className=' text-sm'>Bring to the table win-win survival</span>
    </li>
</ul>

<motion.div className="button  cursor-pointer   w-44 p-3  bg-primary text-white rounded-md mb-8"  whileTap={{ scale: 1.2 }}>Get started</motion.div>

</div>


    </div>

    </div>
  )
}

export default Homedescriptionsection