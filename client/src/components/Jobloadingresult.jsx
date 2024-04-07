import React from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

function Jobloadingresult() {
  return (
    <div>
        <div style={{ gap:"5px", display:"grid" , gridTemplateColumns:"1.5fr 1fr 1fr ", backgroundColor:"white" }}>
      
      <Skeleton  style={{height:"10vh"}}/>
  
  
      <Skeleton  style={{height:"10vh"}}/>
      <Skeleton  style={{height:"10vh"}}/>
      
        </div>

        <div style={{ gap:"5px", display:"grid" , gridTemplateColumns:"1.5fr 1fr 1fr 1fr", backgroundColor:"white" }}>
      
      <Skeleton  style={{height:"80vh"}}/>
  
      <Skeleton  style={{height:"80vh"}}/>
  
      <Skeleton  style={{height:"80vh"}}/>
      <Skeleton  style={{height:"80vh"}}/>
      
        </div>

        
    </div>
  )
}

export default Jobloadingresult