import React, { useEffect, useState } from 'react';

import { Header } from '../../components';
import { adminTokenUrl } from '../../Urls';

function PointBonusCreate() {



  useEffect(()=>{
    adminTokenUrl().get('/pointsBonus').then((data)=>{
      console.log(data);
    })
  },[])

  const [point_cofig_id, setPointConfigId] = useState('')
  const [hourly, setImage] = useState(false)
  const [monthly, setFiles] = useState(false)
  const [weekly, setImg] = useState(false)
  const [hourly_point, setHourlyPoint] = useState("")
  const [weekly_point, setWeeklyPoint] = useState("")
  const [monthly_point, setMontlyPoint] = useState("")

  const AddPointBonus = ()=>{
    const body  ={
      point_cofig_id:point_cofig_id,
      hourly:hourly,
      monthly:monthly,
      weekly:weekly,
      hourly_point:hourly_point,
      weekly_point:weekly_point,
      monthly_point:monthly_point
    }
    adminTokenUrl().post('/point-config', body).then((data)=>{

    }).catch((err)=>{

    })
  }



  return (
    <div className="m-2 md:m-10 mt-20 p-2 md:p-10 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl h-full">
      <Header category="Point Bonus" title="Create Point Bonus" />
      <div className="mt-8 dark:text-gray-200 dark:bg-secondary-dark-bg">
        <div className="rounded-lg shadow-xl dark:bg-secondary-dark-bg">
          <div className="mb-4">
           

            <select className='ml-5  mb-3 justify-between shadow appearance-none border rounded  px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
              <option>Site</option>
              <option>Site</option>
              <option>Site</option>
              <option>Site</option>

            </select>


            <h2 className=" ml-5 block text-gray-700 text-sm font-bold mb-2 dark:text-gray-200">
              Point Configuration ID
            </h2>
   <div className="flex ">
            <input
              className="ml-5  mb-3 justify-between shadow appearance-none border rounded w-3/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Cname"
              type="text"
              placeholder="Point Configuration ID"
            />

<div className="flex items-center pl-4 rounded border border-gray-400 dark:border-gray-200 w-48 h-10 ml-5">
    <input id="bordered-checkbox-1" type="checkbox" value="" name="bordered-checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
    <label for="bordered-checkbox-1" class="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Enable</label>
</div>



</div>

<h2 className=" ml-5 block text-gray-700 text-sm font-bold mb-2 dark:text-gray-200">
             Hourly
            </h2>

            <div className="flex ">
            <input
              className="ml-5  mb-3 justify-between shadow appearance-none border rounded w-3/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Cname"
              type="text"
              placeholder="Login Point"
            />

<div className="flex items-center pl-4 rounded border border-gray-400 dark:border-gray-200 w-48 h-10 ml-5">
    <input id="bordered-checkbox-1" type="checkbox" value="" name="bordered-checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
    <label for="bordered-checkbox-1" class="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Enable</label>
</div>



</div>

<h2 className=" ml-5 block text-gray-700 text-sm font-bold mb-2 dark:text-gray-200">
             Weekly
            </h2>

            <div className="flex ">
            <input
              className="ml-5  mb-3 justify-between shadow appearance-none border rounded w-3/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Cname"
              type="text"
              placeholder="Login Point"
            />

<div className="flex items-center pl-4 rounded border border-gray-400 dark:border-gray-200 w-48 h-10 ml-5">
    <input id="bordered-checkbox-1" type="checkbox" value="" name="bordered-checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
    <label for="bordered-checkbox-1" class="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Enable</label>
</div>



</div>


    <h2 className=" ml-5 block text-gray-700 text-sm font-bold mb-2 dark:text-gray-200">
             Monthly
            </h2>

            <div className="flex ">
            <input
              className="ml-5  mb-3 justify-between shadow appearance-none border rounded w-3/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Cname"
              type="text"
              placeholder="Login Point"
            />

<div className="flex items-center pl-4 rounded border border-gray-400 dark:border-gray-200 w-48 h-10 ml-5">
    <input id="bordered-checkbox-1" type="checkbox" value="" name="bordered-checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
    <label for="bordered-checkbox-1" class="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Enable</label>
</div>



</div>

            <div className="flex p-2 space-x-4 justify-between">
              <button
                type="submit"
                className="px-4 py-2 text-white bg-red-500 rounded shadow-xl"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 text-white bg-green-500 rounded shadow-xl"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PointBonusCreate;