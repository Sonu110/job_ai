import React from 'react';
import { motion } from 'framer-motion';
import backgroundImage from '../../assets/images/bg-1.png';
import userimage from '../../assets/images/banner-img-1.png';
import { GiTakeMyMoney } from "react-icons/gi";

function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0, x: '-60vw' },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 120 },
    },
  };

  const boxVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 120, delay: 0.5 },
    },
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="container grid grid-cols-1 lg:grid-cols-2 h-full  px-0 sm:px-10 pt-20">
          <motion.div className="fromconatiner p-8 flex items-start gap-6 justify-center flex-col" variants={containerVariants} initial="hidden" animate="visible">
            <h1 className='text-xl   sm:text-5xl md:text-6xl text-start'>There Are <span className='text-primary'>93,178</span> Postings Here For you!</h1>
            <h2 className='text-sm text-secondary-200'>Find Jobs, Employment & Career Opportunities</h2>
             
            <form className="  grid grid-cols-1 md:grid-cols-4  gap-2  bg-white p-5 w-full">
        <div>
          <label htmlFor="category" className="block text-secondary-100 font-bold mb-5 ">
            Category
          </label>
          <select id="category" name="category" className="w-full border border-gray-300 p-2 sm:p-3 rounded-lg">
            <option value=""> Category</option>
            <option value="technology">Technology</option>
            <option value="fashion">Fashion</option>
            <option value="sports">Sports</option>
          </select>
        </div>
        <div>
          <label htmlFor="state" className="block  text-secondary-100 font-bold mb-5 ">
            State
          </label>
          <select id="state" name="state" className="w-full border border-gray-300 p-2 sm:p-3 rounded-lg">
            <option value="">Select State</option>
            <option value="new-york">New York</option>
            <option value="california">California</option>
            <option value="texas">Texas</option>
          </select>
        </div>
        <div>
          <label htmlFor="title" className="block  text-secondary-100 font-bold mb-5 ">
            Search Title
          </label>
          <input type="text" id="title" name="title" className="w-full border border-gray-300 p-2 sm:p-3 rounded-lg" placeholder="Enter search title"/>
        </div>
        <div>
          <button type="submit" className="w-full rounded-xl bg-primary sm:mt-11 px-6 py-3 text-xl font-medium uppercase text-white">
            Find
          </button>
        </div>
      </form>
            <h2 className='text-[0.7rem] text-secondary-200'>Popular Searches : Designer, Developer, Web, IOS, PHP, Senior, Engineer,</h2>
          </motion.div>

          <motion.div className="image m-auto hidden lg:block" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="img w-[500px] relative">
              <img src={userimage} alt="" className='object-cover w-full' />
              <motion.div className="boxcontainer absolute top-0 left-0" variants={boxVariants} initial="hidden" animate="visible">
                <motion.div className="box flex items-center  bg-white p-4 ">
                  <span className=' text-5xl text-pink-700'>
                    <GiTakeMyMoney></GiTakeMyMoney>
                  </span>
                  
                  Work Inquiry From Ali Tufan
                  
                  </motion.div>
              </motion.div>
              <motion.div className="boxcontainer absolute top-60 -right-0 xl:-right-14" variants={boxVariants} initial="hidden" animate="visible">
                <motion.div className="box bg-white p-4 flex items-center ">
                <span className=' text-5xl text-pink-700'>
                    <GiTakeMyMoney></GiTakeMyMoney>
                  </span> 
                  Creative Agency Startup</motion.div>
              </motion.div>
              <motion.div className="boxcontainer absolute bottom-0 left-0" variants={boxVariants} initial="hidden" animate="visible">
                <motion.div className="box bg-white p-4 flex items-center ">
                <span className=' text-5xl text-pink-700'>
                    <GiTakeMyMoney></GiTakeMyMoney>
                  </span>
                  Find jobs Startup</motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Overlay */}
    </div>
  );
}

export default HeroSection;
