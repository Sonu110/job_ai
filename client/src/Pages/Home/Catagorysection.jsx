import React from 'react';
import { motion } from 'framer-motion';
import { FaDesktop, FaMoneyBillAlt, FaShoppingCart, FaUserTie, FaEllipsisH } from 'react-icons/fa';

function Catagorysection() {
  // Define job categories and their icons
  const jobCategories = [
    { name: 'IT Sector', icon: <FaDesktop /> },
    { name: 'Finance', icon: <FaMoneyBillAlt /> },
    { name: 'Sales Worker', icon: <FaShoppingCart /> },
    { name: 'Human Resource', icon: <FaUserTie /> },
    { name: 'Other', icon: <FaEllipsisH /> }
  ];

  return (
    <div className=''>
      <div className="catagorycontainer ">
        <div className="heading-text">
          <h2 className='text-center text-3xl mt-28'>Popular Job Categories</h2>
          <h3 className='text-center mt-3 text-secondary-200'>2020 jobs live - 293 added today.</h3>
        </div>
        <div className="catagoryconatiner px-10 sm:px-24 lg:px-15 p-14 grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-5 min-w-full mt-10">
          {jobCategories.map((category, index) => (
            <motion.div
              key={index}
              className={`catagorybox w-full flex border border-solid cursor-pointer border-secondary-400 rounded-lg items-center p-2 gap-4`}
              whileHover={{ scale: 1.02 }} // increase size on hover
            >
              <span className='boxicons text-3xl text-secondary-100 rounded-lg bg-secondary-400 hover:text-white hover:bg-hover p-2'>
                {category.icon}
              </span>
              <div className="boxtext">
                <h1>{category.name}</h1>
                <span>(2 open positions)</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Catagorysection;
