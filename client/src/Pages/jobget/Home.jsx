import React, { useContext, useEffect, useState } from 'react'

import Relatedjobreult from './Relatedjobreult'
import Selecton from '../../components/Selecton'
import { Link, useLocation } from 'react-router-dom'
import Filter from './Filter'
import Jobtestcomponent from '../../components/Jobtestcomponent'
import { MyContext } from '../../context/context'

function Findjobhome() {


  
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);


  const [dataid , setid]= useState('')
 const [loading , setLoading] = useState(true)

 const {bookmarkedJobs ,jobData, setJobData,toggleBookmark } = useContext(MyContext)

 const [filters, setFilters] = useState({
  // Initialize filter states here
  searchTitle: '',
  category: '',
  jobType: [],
  datePost: '',
  experienceLevel: '',
  salaryLevel: ''
});

const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

// Handler to update filter state
const handleFilterChange = (filterName, value) => {
  setFilters(prevFilters => ({
    ...prevFilters,
    [filterName]: value
  }));
};

// Function to toggle filter menu
const toggleFilterMenu = () => {
  setIsFilterMenuOpen(!isFilterMenuOpen);
};


 const [size, setSize] = useState(window.innerWidth > 1024);

 useEffect(() => {
   const handleResize = () => {
     setSize(window.innerWidth > 1024);
   };

   window.addEventListener('resize', handleResize);

   return () => {
     window.removeEventListener('resize', handleResize);
   };
 }, []);

  useEffect(()=>{

    const data = async ()=>{

      try {
        
        const response = await fetch(`${import.meta.env.VITE_API_URL}/alljobs`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {

          const data = await response.json()
          setJobData(data.data)
          setLoading(false)
          setid(data.data[0]?._id);

        }

      } catch (error) {
        console.log("error  is ", error);
      }
      finally
      {
        setLoading(false)
      }


    } 

    data()


  },[])


  const filteredJobs = jobData.filter(job => {
    // Filter by search title
    if (filters.searchTitle && !job.jobTitle.toLowerCase().includes(filters.searchTitle.toLowerCase())) {
      return false;
    }

    // Filter by category
    if (filters.category && job.jobCategory !== filters.category) {
      return false;
    }

    // Filter by job type
    if (filters.jobType.length > 0 && !filters.jobType.includes(job.jobType)) {
      return false;
    }

    // Filter by date post
    if (filters.experienceLevel && job.totalExp < filters.experienceLevel) {
      return false;
    }
  
    // Filter by salary level
    if (filters.salaryLevel && job.salary > filters.salaryLevel) {
      return false;
    }
    


     // Filter by date post
  if (filters.datePost === 'last24') {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const jobPostedAt = new Date(job.updatedAt);
    if (jobPostedAt < twentyFourHoursAgo) {
      return false;
    }
  } else if (filters.datePost === 'lastWeek') {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const jobPostedAt = new Date(job.updatedAt);
    if (jobPostedAt < oneWeekAgo) {
      return false;
    }
  }

    // Add more filter conditions as needed

    return true;
  });


  return (

    <div className=' min-h-screen' >
      
      {/* <Jobseachbox></Jobseachbox> */}


      <div className=' w-full  border-b-2 mt-24 border-gray-400 '></div>
      <Filter filters={filters} onFilterChange={handleFilterChange} isFilterMenuOpen={isFilterMenuOpen} toggleFilterMenu={toggleFilterMenu} />
      <div className="button  bg-blue-800 ml-5 mb-1 mt-2 rounded-lg  cursor-pointer text-white p-3 px-10 inline-block" onClick={toggleFilterMenu}>Filter</div>


<div className=' grid grid-cols-1 lg:grid-cols-2  gap-6 px-3'>


<div className='  min-h-[140vh]'>


{
  loading ? (
    <Selecton />
  ) : (
    filteredJobs.map((job) => (
      <div key={job._id}>
        { !size ? (
          <Link to={`${job._id}`}>
            <div onClick={() => setid(job?._id)} className='pb-7'>
            <Jobtestcomponent
                key={job.id} 
                
                jobId={job._id} // Pass jobId as prop
                comapnyname={job?.companyName} 
                salary={job.salary} 
                location={job.jobLocation} 
          
                time={job.updatedAt.slice(11, 16)} // Adjust to the correct nested path
                jobsector={job.jobCategory}
                jointype={job.jobType}
                jobtime={job.jobTitle}
                
                isBookmarked={bookmarkedJobs.some(bookmarkedJob => bookmarkedJob._id === job._id)} // Check if the job is bookmarked
                toggleBookmark={toggleBookmark} 
                bool={false}
                
                // Pass toggleBookmark function as prop
              />
            </div>
          </Link>
        ) : (
          <div onClick={() => setid(job?._id)} className='pb-7 cursor-pointer'>
             <Jobtestcomponent
               key={job.id} 
               jobId={job._id} // Pass jobId as prop
               comapnyname={job?.companyName} 
               salary={job.salary} 
               location={job.jobLocation} 
         
               time={job.updatedAt.slice(11, 16)} // Adjust to the correct nested path
               jobsector={job.jobCategory}
               jointype={job.jobType}
               jobtime={job.jobTitle}
               
                isBookmarked={bookmarkedJobs.some(bookmarkedJob => bookmarkedJob._id === job._id)} // Check if the job is bookmarked
                bool={true}
                toggleBookmark={toggleBookmark} // Pass toggleBookmark function as prop
              />
          </div>
        )}
      </div>
    ))
  )
}

</div>
<div className='  hidden lg:block'>

{size && (
          <div className=' hidden md:block'>
            <Relatedjobreult jobId={dataid} />
          </div>
        )}
</div>


</div>


    </div>
  )
}

export default Findjobhome