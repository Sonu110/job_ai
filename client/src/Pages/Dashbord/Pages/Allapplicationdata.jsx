import React, { useContext, useEffect, useState } from 'react';

import Selecton from '../../../components/Selecton';

function Allapplicationdata() {
    const [activitiesData, setActivitiesData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/allselectedcandidate`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setActivitiesData(data);

                    // Initialize toggle state for each activity
                    const initialToggleState = {};
                    data.forEach(activity => {
                        initialToggleState[activity._id] = false;
                    });
                    setToggleState(initialToggleState);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (

        

        <div className='bg-gray-100 min-h-screen p-4 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 pt-24 gap-3'>
        {
            loading ? 
            (
                [1,2,3,4].map(()=>
                
                <Selecton/>
                )
            )
            
            
            :
            (

                activitiesData.map(activity => (
                    <div key={activity._id} className="max-h-[340px] mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="px-4 py-2">
                            <div className="font-bold text-xl mb-2">{activity.name}</div>
                            <p className="text-gray-700 text-base">
                                <strong>Email:</strong> {activity.email}<br />
                                <strong>Phone:</strong> {activity.phone}<br />
                                <strong>Experience:</strong> {activity.experience}<br />
                                <strong>Job Description:</strong> {activity.jobDescription}<br />
                                <strong>CV:</strong> {activity.cv}<br />
                                <strong>Created At:</strong> {activity.createdAt}
                            </p>
                        </div>
                        <div className="px-4 py-2 flex justify-end gap-4">
                            
    
     
    
    
    
                            <a href={`${import.meta.env.VITE_API_URL}/${activity.cv}`}>
                                <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}>
                                    See CV
                                </button>
                            </a>
                        </div>
                    </div>
                ))
            )
        }
        
        </div>
    );
    
    

}

export default Allapplicationdata;

