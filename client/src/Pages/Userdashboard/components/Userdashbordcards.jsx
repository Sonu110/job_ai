import React from 'react';
import { motion } from 'framer-motion';
import { FaClipboardList, FaUserFriends, FaEnvelope, FaBookmark } from 'react-icons/fa';

const sections = [
  { title: 'Applied Jobs', value: 22, icon: <FaClipboardList />, color: 'orange' },
  { title: 'job massage ', value: 9382, icon: <FaUserFriends />, color: 'red' },
  { title: 'Messages', value: 74, icon: <FaEnvelope />, color: 'blue' },
  { title: 'Bookmarks', value: 10, icon: <FaBookmark />, color: 'green' } // Example bookmark section
];

function Userdashbordcards() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {sections.map((section, index) => (
          <motion.div
            key={index}
            
            className='text-black bg-white rounded-lg  p-4 flex flex-wrap items-center justify-around'
            whileHover={{ scale: 1.05 }}
          >
            <span style={{  color: section.color }} className=' bg-secondary-400 text-4xl text-white p-3 rounded-full'>{section.icon}</span>
            <div>
              <p className='text-lg font-serif font-semibold'>{section.value}</p>
              <h2 className='text-xl font-semibold' style={{  color: section.color }}>{section.title}</h2>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Userdashbordcards;
