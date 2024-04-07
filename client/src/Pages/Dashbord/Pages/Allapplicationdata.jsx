import React from 'react'
import UserDetailsCards from '../../../components/Userdetailscards'

function Allapplicationdata() {
  return (
    <div  className='  min-h-screen p-5 pt-24'>
        <div className="appliactioncotainer grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

        <UserDetailsCards></UserDetailsCards>
        <UserDetailsCards></UserDetailsCards>
        <UserDetailsCards></UserDetailsCards>
        
        </div>

    </div>
  )
}

export default Allapplicationdata