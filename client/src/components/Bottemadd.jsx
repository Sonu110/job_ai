import { motion } from 'framer-motion'
import React from 'react'

function Bottemadd() {
  return (
    <div className=' lg:p-10 lg:px-24'>

        <div className="bottomconatiner px-10 bg-blue-200 p-10 flex items-center sm:flex-nowrap flex-wrap  justify-around">
            <div className="addtext">
                <h1 className=' text-4xl mb-5'>Recruiting?</h1>
                <div className=' mb-6'>Advertise your jobs to millions of monthly users and search 15.8 million
CVs in our database.</div>

            <motion.div className="button  cursor-pointer   w-52 p-3  bg-primary text-white rounded-md mb-8"  whileTap={{ scale: 1.2 }}>Start Recruiting Now</motion.div>

            </div>

            <div className="img w-60">
                <img src="https://superio-reactjs.ibthemespro.com/images/resource/image-1.png" alt="" srcset="" />
            </div>

        </div>


    </div>
  )
}

export default Bottemadd