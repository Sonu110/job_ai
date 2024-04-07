import React from 'react'

function Newartical() {
  return (
    <div className='bg-gray-300'>

        <div className="newsconatiner p-6">

            <div className="newtext  text-center pt-24">
                <h1 className=' text-4xl'>Recent News Articles</h1>
                <span className=' text-sm'>Fresh job related news content posted each day.</span>
            </div>


            <div className="newboxconater grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7  pt-24 md:p-16 lg:p-24">
                {
                    [1,2,3].map(()=>
                    
                <div className="newsbox bg-white p-3 rounded-lg">

                    <div className="img overflow-hidden rounded-xl">
                        <img src="https://superio-reactjs.ibthemespro.com/images/resource/blog/3.jpg" alt=""
                         className="zoom-image "
                         
                         />
                    </div>

                    <div className="newboxtext p-4 ">

                        <h1 className=' text-xl  text-gray-400'>August 31, 2021</h1>
                        <h2 className=' mt-4'>Attract Sales And Profits</h2>
                        <p className=' mt-5 mb-6 text-sm'>A job ravenously while Far much that one rank beheld after outside...</p>
                        <a href="" className='  pt-6'> Read More </a>

                    </div>  

                </div>
                    )
                }
            </div>

        </div>



    </div>
  )
}

export default Newartical