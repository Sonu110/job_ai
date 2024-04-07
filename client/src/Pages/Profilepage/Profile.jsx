import React, { useContext } from 'react'
import { MyContext } from '../../context/context'

function Profile() {

  const {userdata} = useContext(MyContext)

  return (
    <div>


<section class="pt-16  bg-gray-100">
<div class="w-full lg:w-4/12 px-4 mx-auto">
  <div class="relative flex flex-col min-w-0  break-words bg-gray-50 w-full mb-6 shadow-xl rounded-lg mt-20">
    <div class="px-6">
      <div class="flex flex-wrap justify-center  ">
        <div class=" flex justify-center">
          <div class="relative  w-50">
         
            <img src={`${import.meta.env.VITE_API_URL}/${userdata.data?.file}`} class="shadow-xl rounded-full align-middle border-none  h-36 w-36 -mt-10"/>
          </div>
        </div>
        <div class="w-full px-4 text-center mt-10">
          <div class="flex justify-center py-4 lg:pt-4 pt-8">
            <div class="mr-4 p-3 text-center">
              <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                22
              </span>
              <span class="text-sm text-blueGray-400">Number of apply</span>
            </div>
           
            <div class="lg:mr-4 p-3 text-center">
              <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                89
              </span>
              <span class="text-sm text-blueGray-400">Number of recommendation</span>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mt-5">
        <h3 class="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
          {userdata.data?.username}
        </h3>
        <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
          <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
          {userdata.data?.catagory}
        </div>
        <div class="mb-2 text-blueGray-600 mt-10">
          <i class="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
         Email -  {userdata.data?.email}
        </div>
        <div class="mb-2 text-blueGray-600">
          <i class="fas fa-university mr-2 text-lg text-blueGray-400"></i>
         Phone number  -   {userdata.data?.phone}
        </div>
      </div>
      <div class="mt-10 py-10 border-t border-blueGray-200 text-center">
        <div class="flex flex-wrap justify-center">
          <div class="w-full ">
            <p class="mb-4 text-lg leading-relaxed text-blueGray-700 text-justify">
              An artist of considerable range, Jenna the name taken
              by Melbourne-raised, Brooklyn-based Nick Murphy
              writes, performs and records all of his own music,
              giving it a warm, intimate feel with a solid groove
              structure. An artist of considerable range.
            </p>
            <a href="javascript:void(0);" class="font-normal text-pink-500">
              Show more
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

</section>

    </div>
  )
}

export default Profile