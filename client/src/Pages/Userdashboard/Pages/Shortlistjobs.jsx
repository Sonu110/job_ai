import React, { useContext, useEffect, useState } from 'react';
import { FaCheckCircle } from "react-icons/fa";
import { MyContext } from '../../../context/context';
import Selecton from '../../../components/Selecton';
import Emptydata from '../../../components/Emptydata';

function Shortlistjobs() {
    const [activitiesData, setActivitiesData] = useState([]);
    const [comapnydata , setcomapnydata] = useState([])
    const [loading, setLoading] = useState(true);
    const { jobCount } = useContext(MyContext);
    console.log(activitiesData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/shotlistjobsdata`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setActivitiesData(data.data);
                    setcomapnydata(data.companies);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [jobCount]);

    return (
        <div className='bg-gray-100 min-h-screen p-4 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 pt-24 gap-3'>
            {loading ? (
                [1,2,3,4].map(() => <Selecton />)
            ) : (
                activitiesData.length > 0 ? (
                    activitiesData.map((activity , index) => (
                        <div key={activity._id} className="max-h-[350px] mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                            <div className="px-4 py-2">
                                <div className="font-bold text-xl mb-2">{activity.name}</div>
                                <p className="text-gray-700 text-base">
                                    <strong>Email:</strong> {activity.email}<br />
                                    <strong>Phone:</strong> {activity.phone}<br />
                                    <strong>Experience:</strong> {activity.experience}<br />
                                    <strong>Job Description:</strong> {activity.jobDescription}<br />
                                    <strong>Created At:</strong> {activity.createdAt}
                                </p>
                            </div>
                            <div className="px-4 py-2 flex flex-col justify-end gap-1">
                                <span className=' text-blue-500 text-lg mr-2 flex items-center gap-3'>
                                    {comapnydata[index].companyName} <span className=' text-green-700'><FaCheckCircle></FaCheckCircle></span>
                                </span>
                                has approved your profile see our website 
                                <div>
                                    <span  className=' text-blue-500 text-lg mr-2'>
                                        link:
                                    </span>
                                    <a href={comapnydata[index]?.websiteLink} target='_blank'>{comapnydata[index]?.websiteLink}</a>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <Emptydata />
                )
            )}
        </div>
    );
}

export default Shortlistjobs;
