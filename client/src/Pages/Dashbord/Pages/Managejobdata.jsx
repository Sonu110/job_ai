import React from 'react'
import Jobtestcomponent from '../../../components/Jobtestcomponent'

function Managejobdata() {
  return (
    <div>
    <div className="flex flex-col pt-24 items-center justify-center">
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-3 px-6 text-left">Title</th>
          <th className="py-3 px-6 text-left">Applications</th>
          <th className="py-3 px-6 text-left">Created</th>
          <th className="py-3 px-6 text-left">Status</th>
          <th className="py-3 px-6 text-left">Action</th>
        </tr>
      </thead>
      <tbody>
      <tr>
          <td className="py-3 px-6"><Jobtestcomponent></Jobtestcomponent></td>
          <td className="py-3 px-6">25</td>
          <td className="py-3 px-6">2022-07-15</td>
          <td className="py-3 px-6">
            <span className="inline-block bg-green-200 text-green-800 py-1 px-3 rounded-full text-xs font-semibold">
              Active
            </span>
          </td>
          <td className="py-3 px-6">
            <button className="text-white bg-blue-500 rounded-lg py-1 px-4">Edit</button>
          </td>
        </tr>
        <tr>
          <td className="py-3 px-6"><Jobtestcomponent></Jobtestcomponent></td>
          <td className="py-3 px-6">25</td>
          <td className="py-3 px-6">2022-07-15</td>
          <td className="py-3 px-6">
            <span className="inline-block bg-green-200 text-green-800 py-1 px-3 rounded-full text-xs font-semibold">
              Active
            </span>
          </td>
          <td className="py-3 px-6">
            <button className="text-white bg-blue-500 rounded-lg py-1 px-4">Edit</button>
          </td>
        </tr>
      
      </tbody>
    </table>
  </div>
    </div>
  )
}

export default Managejobdata