import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components';

function PointBonus() {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-gray-600 dark:text-gray-200">
      <Header category="Point Bonus" title="List of Point Bonus" />

      <Link to="/point-bonus/create">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Add Points
        </button>
      </Link>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <div className="flex justify-center text-center pb-4 bg-white dark:bg-gray-800 p-5">

          <label htmlFor="table-search" className="sr-only">Search</label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
            </div>
            <input type="text" id="table-search-users" className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for Point Bonus" />
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>

              <th scope="col" className="py-3 px-6">
                Point Configuration ID
              </th>
              <th scope="col" className="py-3 px-6">
                Hourly
              </th>
              <th scope="col" className="py-3 px-6">
                Weekly
              </th>
              <th scope="col" className="py-3 px-6">
                Monthly
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

             
                <td className="py-4 px-6">
                <Link to={'id/edit'}>
                  P012
                  </Link>
                </td>
              

              <td className="py-4 px-6">
                0.015
              </td>

              <td className="py-4 px-6">
                10
              </td>

              <td className="py-4 px-6">
                100
              </td>


              <td className="py-4 px-6">
                <Link to="/point-bonus/id/edit">
                  <p className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2">
                    Edit
                  </p>
                </Link>

              </td>
            </tr>



          </tbody>
        </table>

      </div>
    </div>
  )
}

export default PointBonus;