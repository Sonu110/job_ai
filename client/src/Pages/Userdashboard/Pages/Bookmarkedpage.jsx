import React, { useContext } from 'react';
import Jobtestcomponent from '../../../components/Jobtestcomponent';
import { MyContext } from '../../../context/context';
import Emptydata from '../../../components/Emptydata';

function Bookmarkedpage() {
    const { bookmarkedJobs,toggleBookmark } = useContext(MyContext);

    return (
        <div>



            {bookmarkedJobs.length === 0 ? (
                <Emptydata />
            ) : (
                <div className='pt-24 bg-white p-4 px-12 flex flex-col gap-4'>
                    <h1 className=' text-2xl  font-semibold'>All Bookmarked data</h1>
            
                    {bookmarkedJobs.map((job, i) => (
                        <Jobtestcomponent
                            key={i}
                            comapnyname={job.companyName}
                            location={job.jobLocation}
                            time={job.createdAt}
                            salary={job.salary}
                            jobtime={job.jobType}
                            jobsector={job.jobCategory}
                            jointype={job.jobType}
                            jobId={job._id}
                            isBookmarked={bookmarkedJobs.some(bookmarkedJob => bookmarkedJob._id === job._id)} // Check if the job is bookmarked
                            toggleBookmark={toggleBookmark} // Pass toggleBookmark function as prop
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Bookmarkedpage;
