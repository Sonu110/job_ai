import React, { useState, useEffect } from 'react';
import Jobloadingresult from '../../components/Jobloadingresult';
import { Link, useParams } from 'react-router-dom';

function Relatedjobreult({jobId }) {


const {id} = useParams()

  const [data, setRelatedJobs] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedJobs = async () => {
      try {
        const fetchId = jobId || id;
        if (!fetchId) {
          return; // jobId or id is undefined, do not proceed
        }
        const response = await fetch(`${import.meta.env.VITE_API_URL}/getjobs/${fetchId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setRelatedJobs(data.data[0]);
          setLoading(false);
        }
      } catch (error) {
        console.log("Error fetching related jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedJobs();
  }, [jobId, id]);


  const [isFixed, setIsFixed] = useState(false);


  const [jobTextHeight, setJobTextHeight] = useState('70vh');

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.offsetHeight;
      const distanceFromBottom = documentHeight - (scrollY + windowHeight);
  
      // Determine if the element should be fixed based on scroll position and distance from bottom
      const isFixed = scrollY >= 200 && distanceFromBottom > 400;
  
      // Set the fixed state based on the conditions
      setIsFixed(isFixed);
  
      // Adjust the job text height based on whether the element is fixed or not
      setJobTextHeight(isFixed ? '63vh' : '70vh');
    }
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  










  return (
    <div className={`${isFixed ? 'fixed px-5' : ''}  top-20 z-50 mb-56 bottom-0 `}>
     {
      loading ? <Jobloadingresult></Jobloadingresult>
     
     
 :    
      <div className={`jobcontainer  shadow-lg  `}>
        <div className="navbar bg-blue-950 text-white p-6">
          <h2 className='text-3xl pb-4'>{data?.jobTitle}</h2>
          <div className="details flex gap-3">
            <span>location: {data?.jobLocation}</span>
            <span>Experience: {data?.totalExp} years</span>
            <span>Salary: {data?.salary}</span>
          </div>
          <Link to={`apply/${data?._id}`}>
          <div className="button bg-blue-900 w-40 text-center mt-2 p-2 cursor-pointer">Apply</div>
          </Link>
        </div>
        <div
          className="jobtext max-h-[70vh] overflow-y-scroll bg-white text-justify p-5"
          style={{ maxHeight: jobTextHeight }}
        >
      

      <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{data?.jobTitle}</h1>
      <p className="text-gray-800 mb-4">{data.jobDescription}</p>
      <div className="border-t pt-4">
        <h2 className="text-xl font-semibold mb-2">Job Details</h2>
        <p><span className="font-semibold">Company Name:</span> {data.companyName}</p>
        <p><span className="font-semibold">Job Location:</span> {data.jobLocation}</p>
        <p><span className="font-semibold">Job Address:</span> {data.jobAddress}</p>
        <p><span className="font-semibold">Openings:</span> {data.openings}</p>
        <p><span className="font-semibold">Salary:</span> {data.salary}</p>
        <p><span className="font-semibold">Skills Required:</span> {data.skills}</p>
        <p><span className="font-semibold">Total Experience:</span> {data.totalExp} year(s)</p>
      </div>
      <div className="border-t pt-4">
        <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
        <p><span className="font-semibold">Contact Person:</span> {data.contactPerson}</p>
        <p><span className="font-semibold">Phone Number:</span> {data.phoneNumber}</p>
        <p><span className="font-semibold">Email:</span> {data.email}</p>
      </div>
      <div className="border-t pt-4">
        <h2 className="text-xl font-semibold mb-2">Additional Information</h2>
        <p><span className="font-semibold">Organization Size:</span> {data.organizationSize}</p>
        <p><span className="font-semibold">Bonus:</span> {data.bonus}</p>
      </div>
      <div className="border-t pt-4">
        <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
        <p><span className="font-semibold">Personal Details:</span> {data?.personal}</p>
      </div>
      <div className="border-t pt-4">
        <h2 className="text-xl font-semibold mb-2">Education Information</h2>
        <p><span className="font-semibold">Education:</span> {data?.education}</p>
      </div>
    </div>





        </div>
      </div>
}
    </div>
  );
}

export default Relatedjobreult;
