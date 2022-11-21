import React from 'react';
import { Header } from '../../components';

function index() {
  return (
    <div className="m-2 md:m-10 mt-18 p-2 md:p-10 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl">
    <Header category="Merchants" title="List of Merchants" />

    <Link to="create">
      <button className="text-gray-400 dark:text-gray-400 font-bold py-2 px-4 rounded mb-2">
        Add Merchants
      </button>
    </Link>
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <div className="flex justify-center text-center pb-4 bg-white dark:bg-gray-900 p-5">

        <label htmlFor="table-search" className="sr-only">Search</label>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
          </div>
          <input type="text" id="table-search-users" className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for Merchants" />
        </div>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
              </div>
            </th>
            <th scope="col" className="py-3 px-6">
              Name
            </th>
            <th scope="col" className="py-3 px-6">
              Region
            </th>
            <th scope="col" className="py-3 px-6">
              Status
            </th>
            <th scope="col" className="py-3 px-6">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="p-4 w-4">
              <div className="flex items-center">
                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label className="sr-only">checkbox</label>
              </div>
            </td>

            <Link to="/Merchant/show">
              <th scope="row" className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
                <img className="w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="" />
                <div className="pl-3">
                  <div className="text-base font-semibold">Jane Doe</div>
                  <div className="font-normal text-gray-500">jane.doe@flowbite.com</div>
                </div>
              </th>
            </Link>

            <td className="py-4 px-6">
              Kathmandu
            </td>
            <td className="py-4 px-6">
              <div className="flex items-center">
                <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2" /> Online
              </div>
            </td>
            <td className="py-4 px-6">
              <Link to="/Merchant/edit"> <p className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit </p> </Link>
            </td>
          </tr>

          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="p-4 w-4">
              <div className="flex items-center">
                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label className="sr-only">checkbox</label>
              </div>
            </td>
            <Link to="/Merchant/show">
              <th scope="row" className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
                <img className="w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="" />

                <div className="pl-3">
                  <div className="text-base font-semibold">Jane Doe</div>
                  <div className="font-normal text-gray-500">jane.doe@flowbite.com</div>
                </div>

              </th>
            </Link>
            <td className="py-4 px-6">
              Kathmandu
            </td>
            <td className="py-4 px-6">
              <div className="flex items-center">
                <div className="h-2.5 w-2.5 rounded-full bg-red-400 mr-2" /> Offline
              </div>
            </td>
            <td className="py-4 px-6">
              <Link to="/Merchant/edit"> <p className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit </p> </Link>
            </td>
          </tr>

        </tbody>
      </table>
      
    </div>
  </div>
  );
}

export default index;
