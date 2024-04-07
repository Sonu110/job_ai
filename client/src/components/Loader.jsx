import React from 'react'

function Loader() {
  return (
    <div>
        <div class=" flex justify-center items-center h-screen fixed top-0 left-0 right-0 bottom-0 ">
    <div class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
    <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"  class="rounded-full h-28 w-28"/>
</div>
    </div>
  )
}

export default Loader