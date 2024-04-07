import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Herosection from './Herosection';
import Catagorysection from './Catagorysection';
import Jobresult from '../jobget/Jobresult';
import Jobtestcomponent from '../../components/Jobtestcomponent';
import { motion } from 'framer-motion';
import Homedescriptionsection from '../../components/Homedescriptionsection';
import Satutusincrement from './Satutusincrement';
import Newartical from '../../components/Newartical';
import Applicationadd from '../../components/Applicationadd';
import Bottemadd from '../../components/Bottemadd';
import Selecton from '../../components/Selecton';
import { MyContext } from '../../context/context';

function Home() {
  const location = useLocation();
 
  const [isLoading, setIsLoading] = useState(true);
  const {bookmarkedJobs, setBookmarkedJobs ,jobData, setJobData,toggleBookmark } = useContext(MyContext)


  console.log("job data ", jobData);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/alljobs`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('data received')
          setJobData(data.data);
        }
      } catch (error) {
        console.log("error is ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  
  

  return (
    <div>
      <Herosection />
      <Catagorysection />
      <div className='subjobsection'>
        <div className="heading-text mt-28">
          <h2 className='text-center text-3xl mt-3'>Popular Job Categories</h2>
          <h3 className='text-center mt-3 text-secondary-200'>2020 jobs live - 293 added today.</h3>
        </div>
        {isLoading ? (
          <p><Selecton></Selecton></p>
        ) : (
          <div className='grid grid-cols-1 px-7 sm:px-24 lg:grid-cols-2 p-6 gap-4'>
            {jobData.map((job) => (
              <Jobtestcomponent
                key={job.id} 
                jobId={job._id} // Pass jobId as prop
                comapnyname={job?.companyName} 
                salary={job.salary} 
                location={job.jobLocation} 
                time={job.time} 
                isBookmarked={bookmarkedJobs.some(bookmarkedJob => bookmarkedJob._id === job._id)} // Check if the job is bookmarked
                toggleBookmark={toggleBookmark} // Pass toggleBookmark function as prop
              />
            ))}
          </div>
        )}
        <motion.div className="button m-auto cursor-pointer w-44 p-3 bg-primary text-white rounded-md mb-8" whileTap={{ scale: 1.2 }}>Load more listings</motion.div>
      </div>
      <Homedescriptionsection />
      <Satutusincrement />
      <Newartical />
      <Applicationadd />
      <Bottemadd />
    </div>
  );
}

export default Home;
