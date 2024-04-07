import React from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

function Selecton() {
  return (
    <div>
        <div style={{ gap:"5px", display:"grid" , gridTemplateColumns:"1.5fr 0.5fr 1fr", backgroundColor:"white" }}>
      
      <Skeleton  style={{height:"20vh"}}/>
  
      <Skeleton  style={{height:"20vh"}}/>
  
      <Skeleton  style={{height:"20vh"}}/>
  </div>
    </div>
  )
}

export default Selecton