import React from 'react'
import app from '../assets/images/mobile-app.png'
import playapp from '../assets/images/google.png'
import appleapp from '../assets/images/apple.png'

function Applicationadd() {
  return (
    <div>
        <div className="applicationconatiner grid grid-cols-1 md:grid-cols-2 place-content-center  gap-3">

            <div className="image   p-5 sm:p-10">
                <div className="img  px-10 w-[100%] sm:max-w-[80%] m-auto bg-blue-100 p-10">
                    <img src={app} alt="" srcset="" />
                </div>
            </div>

            <div className="applicationtext  m-auto   p-5 flex  flex-col  gap-3 justify-center">
                <h1 className=' text-xl sm:text-2xl text-primary'>DOWNLOAD & ENJOY</h1>
                <p className=' text-2xl  leading-relaxed sm:text-3xl lg:text-6xl'>Get the Superio Job <br />
Search App</p>
          
          <span className=' text-sm  text-secondary-200'>
          Search through millions of jobs and find the right fit. Simply
swipe right to apply.
          </span>


            <div className="applicationimage  flex gap-3">
                <div className="img">

            <img src={playapp} alt="" srcset="" />
                </div>
                <div className="img">

            <img src={appleapp} alt="" srcset="" />
                </div>
                
            </div>




            </div>

        </div>
    </div>
  )
}

export default Applicationadd