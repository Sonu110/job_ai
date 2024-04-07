import React from 'react'
import { FaSearch ,FaFontAwesomeFlag} from "react-icons/fa";
import { IoMdCall ,IoMdContacts} from "react-icons/io";
function Seachjobs() {
  return (
    <div>

<div className="container p-4  bg-white pb-10  mt-5 w-10/12 m-auto  shadow-2xl " >


    <div className="text-center text-3xl font-semibold">Search candidate database</div>
    
        


    <form  className=' grid grid-cols-1 gap-2 sm:grid-cols-2'>

    <div className=' flex flex-col gap-2 '>
    
        <label htmlFor="jobtitle">Select job title</label>
        <input type="text" name='jobtitle' id='jobtitle'  className=' border-2 border-solid border-gray-400 h-9 '/>
    </div>
    <div className=' flex flex-col  gap-2'>
        <label htmlFor="jobtitle">Select job city</label>
       
        <div className=' flex'>

        <input type="text" name='jobtitle' id='jobtitle'  className='border-2 w-full border-solid border-gray-400 h-9'/>
        <div className="icons bg-blue-950 p-2 text-xl text-white "><FaSearch></FaSearch></div>
        </div>
       
    </div>
    


    </form>
    

</div>


    <div className="subcontent grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-10  gap-5">

    
    <div className=' flex  w-10/12 m-auto  justify-between p-3 text-white bg-blue-500 rounded-md'>
            <div className="icons text-5xl">
                <IoMdContacts></IoMdContacts>
            </div>
            <div className="text">
            <h1>2CR+ </h1>
            <h1>Qualified Candidates</h1>
                
            </div>
        </div>
        <div className=' flex  w-10/12 m-auto  justify-between p-3 text-white bg-blue-500 rounded-md'>
            <div className="icons text-5xl">
               <IoMdCall></IoMdCall>
            </div>
            <div className="text">
            <h1>34L+ </h1>
            <h1>Interviews per month</h1>
                
            </div>
        </div>
        <div className=' flex  w-10/12 m-auto  justify-between p-3 text-white bg-blue-500 rounded-md'>
            <div className="icons text-5xl">
                <FaFontAwesomeFlag></FaFontAwesomeFlag>
            </div>
            <div className="text">
            <h1>2CR+ </h1>
            <h1>Qualified Candidates</h1>
                
            </div>
        </div>
    


    </div>




    </div>
  )
}

export default Seachjobs