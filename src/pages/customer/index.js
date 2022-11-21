import { Pagination } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Header } from '../../components';
import ErrorHandler from '../../components/ErrorHandler';
import { Title } from '../../components/Header';
import { Loadings } from '../../components/Loading';
import { ErrorNotification } from '../../components/NotificationProvider';
import { adminTokenUrl } from '../../Urls';

function Customer() {

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [sites, setSites] = useState([])
  const [pages, setPages] = useState("")
  const [input, setInput] = useState("")

  const [page, setPage] = useState('')
  const [site, setSite] = useState(useSelector(p => p?.site?.site.id))


  useEffect(() => {
    Title("Customer Lists")
    setTimeout(() => setLoading(false), 1000)
    adminTokenUrl().get('/site-config').then((res) => {
      setSites(res?.data?.data)
    }).catch((err) => {
      ErrorHandler(err)
    })
    adminTokenUrl().get(`/all-users?page=${page}&site=${site}`).then((res) => {
      setData(res?.data?.data?.data);
      setPages(res?.data?.data?.totalPages)
    }).catch((err) => {
      ErrorHandler(err)
    })
  }, [page, site])


  const handleUserSearch = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => setLoading(false), 1000)
    adminTokenUrl().get(`all-users?page=${page}&site=${site}&input=${input}`).then((res) => {
      setData(res?.data?.data?.data);
      setPages(res?.data?.data?.totalPages)
    }).catch((err) => {
      ErrorHandler(err)
    })
  }

  return (
    <div className="m-2 md:m-10 mt-18 p-2 md:p-10 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl">
      <Header category="Users" title="List of User" />
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <div className="flex justify-center text-center pb-4 bg-white dark:bg-gray-900 p-5">
          <form onSubmit={handleUserSearch}>

            <label htmlFor="table-search" className="sr-only">Search</label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
              </div>
              <input type="text" onChange={(e) => setInput(e.target.value)} value={input} id="table-search-users" className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search User Phone or Name or Email" />
            </div>
          </form>
          <div className='relative ml-5'>
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            </div>
            <select defaultValue={site} value={site} className={"block pl-10 p-2 w-50 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} onChange={(e) => setSite(e.target.value)}>
              {sites.map((e) =>
                <option value={e.id}>{e.sitename}</option>
              )}

            </select></div>
        </div>
        {loading ? <Loadings /> :
          <>
            {data.length > 0 ?
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>

                    <th scope="col" className="py-3 px-6">
                      Name
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Phone
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Status
                    </th>

                  </tr>
                </thead>

                <tbody>
                  {data.map((e) =>
                    <tr key={e.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th scope="row" className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
                        <Link to={`/customers/${e.id}/show`}>

                          <div className="pl-3">
                            <div className="text-base font-semibold">{e.name}</div>
                            <div className="font-normal text-gray-500">{e.email}</div>

                          </div>
                        </Link>

                      </th>

                      <td className="py-4 px-6">
                        {e.phone}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          {e.banned ? <><div className="h-2.5 w-2.5 rounded-full bg-red-400 mr-2" />Disabled</> : <><div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2" /> Enabled</>}

                        </div>
                      </td>

                    </tr>
                  )}
                </tbody>
              </table> : <p className='p-5'> No data found</p>}</>}
      </div>
      <div className='p-5 justify-center'>
        <Pagination total={pages} onChange={setPage} />
      </div>
    </div>
  );
}

export default Customer;
