import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Jobactivety() {
  const { id } = useParams();
  const [activitiesData, setActivitiesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/alljobappliedform/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setActivitiesData(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className='bg-gray-100 min-h-screen p-4 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 pt-24 gap-3'>
      {activitiesData.map(activity => (
        <div key={activity._id} className='max-h-[400px] bg-white shadow-lg rounded-lg overflow-hidden'>
          <div className='px-4 py-2'>
            <h2 className='text-lg font-bold text-gray-800'>{activity.jobTitle}</h2>
            <p className='text-sm text-gray-600'>{activity.jobLocation} | Openings: {activity.openings}</p>
          </div>
          <div className='px-4 py-2'>
            <p>Total Experience: {activity.totalExp} years</p>
            <p>Salary: ${activity.salary}</p>
            <p>Bonus: {activity.bonus}</p>
          </div>
          <div className='px-4 py-2'>
          <p className='text-sm text-gray-700'>{activity.jobDescription ? (activity.jobDescription.length > 100 ? activity.jobDescription.slice(0, 100) + "..." : activity.jobDescription) : ".."}</p>

          </div>
          <div className='px-4 py-2'>
            <p>Skills: {activity.skills}</p>
            <p>Company: {activity.companyName}</p>
            <p>Contact Person: {activity.contactPerson}</p>
            <p>Phone Number: {activity.phoneNumber}</p>
            <p>Email: {activity.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Jobactivety;
