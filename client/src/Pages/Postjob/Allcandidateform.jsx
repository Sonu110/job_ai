import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MyContext } from '../../context/context';
import Selecton from '../../components/Selecton';

function Allcandidateform() {
    const { id } = useParams();
    const [activitiesData, setActivitiesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toggleState, setToggleState] = useState({});
    const {jobCount } = useContext(MyContext)
    console.log(activitiesData);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/allcandidateappliedform/${id}`, {
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
    }, [id ,toggleState,jobCount]);

    const handleToggle = async (activityId) => {
        // Find the activity corresponding to the activityId
        const activity = activitiesData.find(activity => activity._id === activityId);
    
        // Update toggle state locally
        setToggleState(prevState => ({
            ...prevState,
            [activityId]: !prevState[activityId],
        }));
    
        try {
            // Post data to /getjobnotifaction/:id with entire activity data
            const response = await fetch(`${import.meta.env.VITE_API_URL}/getjobnotifaction/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    activityId: activityId,
                    toggleState: !activity.approved,
                    activity: activity  // Include the entire activity data
                }),
            });
    
            if (!response.ok) {
                console.error('Failed to post data to /getjobnotifaction/:id');
            }
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };
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
                            
    
                        <label class="inline-flex items-center gap-3 cursor-pointer">
    {activity?.approved ? "On" : "Off"}
    
    
    <input  
        type="checkbox"
        checked={toggleState[activity._id]}
        onChange={() => handleToggle(activity._id)}
        className="sr-only peer"
        defaultChecked={activity?.approved}
    />
    
    
    
    
      
      <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
      </div>
      <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">click me</span>
    </label>
    
    
    
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

export default Allcandidateform;
