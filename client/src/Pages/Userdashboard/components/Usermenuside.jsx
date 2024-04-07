import React, { useContext } from 'react';
import { FaHome, FaUser, FaPlusSquare, FaBriefcase, FaUsers, FaListUl, FaBell, FaLock, FaSignOutAlt, FaTrashAlt, FaMailBulk } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MyContext } from '../../../context/context';

function Usermenuside() {
  // Example number of alerts, you should replace it with your actual alert count
  const {userdata} = useContext(MyContext)
  const numberOfAlerts = 5;

  const sidebarMenu = [
    {
      title: 'Dashboard',
      icon: <FaHome />,
      path: '',
    },
    {
      title: 'My-Profile',
      icon: <FaUser />,
      path: 'my-profile',
    },
    {
      title: 'Create Profile',
      icon: <FaPlusSquare />,
      path: 'create-profile',
    },
    {
      title: 'Applied Jobs',
      icon: <FaBriefcase />,
      path: 'applied-jobs',
    },
    {
      title: 'Selected Applications',
      icon: <FaUsers />,
      path: 'selected-applications',
    },
    {
      title: 'Alerts',
      icon: (
        <div className="relative">
        
          {numberOfAlerts >=0 && (
            <>
            <span className=' relative'>

              <FaBell />
            <span className=" absolute  bottom-2 left-3 text-white bg-red-500  px-2  rounded-full">{numberOfAlerts} 
            
            </span>
            </span>
            </>
          )}
        </div>
      ),
      path: 'alerts',
    },
    {
      title: 'Bookmarked ',
      icon: <FaListUl />,
      path: 'bookmarked',
    },
    {
      title: 'Massage ',
      icon: <FaMailBulk />,
      path: `massage/${userdata.data?._id}`,
    },
  
    

    {
      title: 'Logout',
      icon: <FaSignOutAlt />,
      path: '/',
    },
    {
      title: 'Delete Profile',
      icon: <FaTrashAlt />,
      path: '/',
    },
  ];

  return (
    <div>
      <aside
        id="separator-sidebar"
        className="hidden sm:block fixed top-0 left-0 z-40 w-64 min-h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 bg-white pt-20 min-h-screen overflow-y-scroll dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {sidebarMenu.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span className='text-blue-500 p-2 bg-gray-300 rounded-full hover:text-black'>
                    {item.icon}
                  </span>
                  <span className="ms-3">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default Usermenuside;
