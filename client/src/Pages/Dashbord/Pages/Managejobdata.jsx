import React, { useEffect, useState } from 'react'
import Jobtestcomponent from '../../../components/Jobtestcomponent'

function Managejobdata() {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
      fetchCompanyJobs();
  }, []);

  const fetchCompanyJobs = async () => {
      try {
          const response =await fetch(`${import.meta.env.VITE_API_URL}/comapny-jobdata`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            
          });
          if(response.ok)
          {
             const data = await response.json()

             setJobs(data.data);
             console.log(data.data);
          }
      } catch (error) {
          console.error('Error fetching company job data:', error);
      }
  };


  return (
    <div>
    <div className="flex flex-col pt-24 items-center  overflow-x-scroll   justify-center">
    <table className="min-w-full bg-white min-h-[80vh]    ">
      <thead>
        <tr>
          <th className="py-3 px-6 text-center ">Title</th>
          <th className="py-3 px-6 text-left">Applications</th>
          <th className="py-3 px-6 text-left">Created</th>
          <th className="py-3 px-6 text-left">Action</th>
        </tr>
      </thead>
      <tbody  className=''>
                        {jobs.map((job) => (
                            <tr key={job._id}>
                                <td className="py-3 px-6">
                                    <Jobtestcomponent
                                        comapnyname={job.companyName
                                        }
                                        location={job.jobLocation}
                                        time={job.createdAt}
                                        salary={job.salary}
                                        jobtime={job.jobType}
                                        jobsector={job.jobCategory}
                                        jointype={job.jobType}
                                        jobId={job._id}
                                        // Pass isBookmarked and toggleBookmark if needed
                                    />
                                </td>
                                <td className="py-3 px-6">{job.applieduser.length}</td>
                                <td className="py-3 px-6">2022-07-15</td>
                                
                                <td className="py-3 px-6">
                                    <button className="text-white bg-blue-500 rounded-lg py-1 px-4">Edit</button>
                                </td>
                            </tr>
                        ))}
                        
                    </tbody>
    </table>
  </div>
    </div>
  )
}

export default Managejobdata