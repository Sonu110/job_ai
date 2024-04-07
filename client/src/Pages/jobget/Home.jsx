import React, { useContext, useEffect, useState } from 'react'
import Jobseachbox from './Jobseachbox'
import Jobresult from './Jobresult'
import Relatedjobreult from './Relatedjobreult'
import Selecton from '../../components/Selecton'
import { Link } from 'react-router-dom'
import Filter from './Filter'
import Jobtestcomponent from '../../components/Jobtestcomponent'
import { MyContext } from '../../context/context'

function Findjobhome() {


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


  return (

    <div className=' min-h-screen' >
      
      <Jobseachbox></Jobseachbox>


      <div className=' w-full  border-b-2 border-gray-400 '></div>
      <Filter filters={filters} onFilterChange={handleFilterChange} isFilterMenuOpen={isFilterMenuOpen} toggleFilterMenu={toggleFilterMenu} />
      <div className="button  bg-gray-600 ml-5  text-white p-3 px-10 inline-block" onClick={toggleFilterMenu}>Filter</div>


<div className=' grid grid-cols-1 lg:grid-cols-2  gap-6 px-3'>


<div className='  min-h-[140vh]'>


{
  loading ? (
    <Selecton />
  ) : (
    jobData.map((job) => (
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
                time={job.time} 
                isBookmarked={bookmarkedJobs.some(bookmarkedJob => bookmarkedJob._id === job._id)} // Check if the job is bookmarked
                toggleBookmark={toggleBookmark} // Pass toggleBookmark function as prop
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
                time={job.time} 
                isBookmarked={bookmarkedJobs.some(bookmarkedJob => bookmarkedJob._id === job._id)} // Check if the job is bookmarked
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