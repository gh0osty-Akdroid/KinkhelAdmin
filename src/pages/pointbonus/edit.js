import React from 'react';
import { Header } from '../../components';

function PointBonusEdit() {
  return (
    <div className="m-2 md:m-10 mt-20 p-2 md:p-10 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl h-full">
    <Header category="Point Bonus" title="Edit Point Bonus" />
    <div className="mt-8 dark:text-gray-200 dark:bg-secondary-dark-bg">
      <div className="rounded-lg  dark:bg-secondary-dark-bg">
        <div className="mb-4">
         

          
          <div
            id="dropdown"
            class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
          >
            <ul
              class="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefault"
            >
              <li>
                <a
                  href="#"
                  class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {" "}
                  Site
                </a>
              </li>
            </ul>
          </div>


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
            placeholder="Hourly Point"
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
            placeholder="Weekly Point"
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
            placeholder="Monthly Point"
          />

<div className="flex items-center pl-4 rounded border border-gray-400 dark:border-gray-200 w-48 h-10 ml-5">
  <input id="bordered-checkbox-1" type="checkbox" value="" name="bordered-checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
  <label for="bordered-checkbox-1" class="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">Enable</label>
</div>



</div>

          <div className="flex p-2 space-x-4 justify-between">
          

            <button
              type="submit"
              className="px-4 py-2 text-white bg-green-500 rounded shadow-xl"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default PointBonusEdit;