import React from 'react';
import { Header } from '../../components';

function edit() {
  return (
    <div className="m-2 md:m-10 mt-20 p-2 md:p-10 bg-white rounded-3xl w-full h-full">
      <Header category="Merchant" title="Edit Merchnat" />
      <div className="flex justify-center mt-8">
        <div className="rounded-lg shadow-xl bg-gray-50 lg:w-1/2">
          <div className="m-4">
            <h2 className="inline-block mb-2 text-gray-500">
              Upload Image(jpg,png,svg,jpeg)
            </h2>
            <div className="flex items-center justify-center w-full">
              <h2 className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                    Select a photo
                  </p>
                </div>
                <input type="file" className="opacity-0" />
              </h2>
            </div>
          </div>
          <div className="mb-4">
            <h2 className=" ml-5 block text-gray-700 text-sm font-bold mb-2">
              Merchant ID
            </h2>

            <input
              className="ml-5 justify-between shadow appearance-none border rounded w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Mid"
              type="text"
              placeholder="Merchant ID"
            />

            <h2 className=" ml-5 block text-gray-700 text-sm font-bold mb-2">
              Merchant Name
            </h2>

            <input
              className="ml-5 justify-between shadow appearance-none border rounded w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="MName"
              type="text"
              placeholder="Merchant Name"
            />

            <h2 className=" ml-5 block text-gray-700 text-sm font-bold mb-2">
              Store
            </h2>

            <input
              className="ml-5 justify-between shadow appearance-none border rounded w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Store"
              type="text"
              placeholder="Store"
            />

            <h2 className=" ml-5 block text-gray-700 text-sm font-bold mb-2">
              Pan Number
            </h2>

            <input
              className="ml-5 justify-between shadow appearance-none border rounded w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Panno"
              type="text"
              placeholder="Pan Number"
            />

            <h2 className=" ml-5 block text-gray-700 text-sm font-bold mb-2">
              Parent Company
            </h2>

            <input
              className="ml-5 justify-between shadow appearance-none border rounded w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Pcompany"
              type="text"
              placeholder="Parent Company"
            />
            <h2 className=" ml-5 block text-gray-700 text-sm font-bold mb-2">
              Region
            </h2>

            <input
              className="ml-5 justify-between shadow appearance-none border rounded w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Region"
              type="text"
              placeholder="Region"
            />
            <h2 className=" ml-5 block text-gray-700 text-sm font-bold mb-2">
              Points Config
            </h2>

            <input
              className="ml-5 justify-between shadow appearance-none border rounded w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Pconfig"
              type="text"
              placeholder="Points Config"
            />

            <div className="flex p-2 space-x-4 justify-between">
              <button type="submit" className="px-4 py-2 text-white bg-red-500 rounded shadow-xl">
                Cancel
              </button>

              <button type="submit" className="px-4 py-2 text-white bg-green-500 rounded shadow-xl">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default edit;
