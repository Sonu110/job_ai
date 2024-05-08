import React from 'react';
import { motion } from 'framer-motion';
import backgroundImage from '../../assets/images/bg.jpg';
import userimage from '../../assets/images/banner-img-1.png';
import { MdWorkHistory ,MdOutlineImageSearch} from "react-icons/md";
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
        className="absolute inset-0 bg-cover bg-center z-0   bg-blue-900"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="container grid grid-cols-1 lg:grid-cols-2 h-full  px-0 sm:px-10 pt-20">
          <motion.div className="fromconatiner p-8 flex items-start gap-6 justify-center flex-col" variants={containerVariants} initial="hidden" animate="visible">
            <h1 className='text-3xl text-white   sm:text-5xl md:text-6xl text-start'>There Are <span className='text-primary'>93</span> Postings Here For you!</h1>
            <h2 className='text-sm text-white'>Find Jobs, Employment & Career Opportunities</h2>
             
     
            <h2 className='text-[0.7rem] text-white'>Popular Searches : Designer, Developer, Web, IOS, PHP, Senior, Engineer,</h2>
          </motion.div>

          <motion.div className="image m-auto hidden lg:block" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="img w-[500px] relative">
              <img src={userimage} alt="" className='object-cover w-full' />
              <motion.div className="boxcontainer absolute top-0 left-0" variants={boxVariants} initial="hidden" animate="visible">
                <motion.div className="box flex items-center  bg-white p-4  rounded-xl  shadow-xl ">
                  <span className=' text-5xl text-blue-800'>
                   <MdWorkHistory></MdWorkHistory>
                  </span>
                  
                  Work Inquiry From our webiste
                  
                  </motion.div>
              </motion.div>
              <motion.div className="boxcontainer absolute top-60 -right-0 xl:-right-14" variants={boxVariants} initial="hidden" animate="visible">
                <motion.div className="box bg-white p-4 flex items-center rounded-xl  shadow-xl ">
                <span className=' text-5xl text-blue-800'>
                    <GiTakeMyMoney></GiTakeMyMoney>
                  </span> 
                  Creative  Startup with  us</motion.div>
              </motion.div>
              <motion.div className="boxcontainer absolute bottom-0 left-0" variants={boxVariants} initial="hidden" animate="visible">
                <motion.div className="box bg-white p-4 flex items-center rounded-xl  shadow-xl">
                <span className=' text-5xl text-blue-700'>
              <MdOutlineImageSearch></MdOutlineImageSearch>
                  </span>
                  Find jobs Startup from  us</motion.div>
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
