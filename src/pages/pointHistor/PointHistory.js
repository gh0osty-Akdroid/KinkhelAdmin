import { Pagination } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import ErrorHandler from '../../components/ErrorHandler'
import Header, { Title } from '../../components/Header'
import { Loadings } from '../../components/Loading'
import { adminTokenUrl } from '../../Urls'

const PointHistory = () => {
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState("")
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        Title("Point History")
        setTimeout(()=>setLoading(false), 1000)
        adminTokenUrl().get(`/get-all-history?page=${page}`).then((res)=>{
            console.log(res);
            setData(res?.data?.data?.data)
            setPages(res?.data?.data?.totalPages)
        }).catch((err)=>{
            ErrorHandler(err)
        })

    },[page,])

  return (
    
    <div className="m-2 md:m-10 mt-18 p-2 md:p-10 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl">
    <Header category="Point History" title="List of Points" />

   
    {loading ? <Loadings /> :
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <div className="flex justify-center text-center pb-4 bg-white dark:bg-gray-800 p-5">

          <label htmlFor="table-search" className="sr-only">Search</label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
            </div>
            <input type="text" id="table-search-users" className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for Point Config" />
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Created Date
              </th>
              <th scope="col" className="py-3 px-6">
                Other
              </th>
              <th scope="col" className="py-3 px-6">
                Remarks
              </th>
              <th scope="col" className="py-3 px-6">
                Point
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ?
              data.map((e, i) =>
                <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="py-4 px-6">
                    {(new Date(e.createdAt)).toDateString()}
                  </td>

                  <td className="py-4 px-6">
                    {e.other}
                  </td>
                  <td className="py-4 px-6">
                    {e.remarks}
                  </td>

                  <td className="py-4 px-6">
                    {e.points}
                  </td>
                </tr>
              ) : <p className='p-5'>No data found</p>
            }




          </tbody>
        </table>
        <div className='p-5 justify-center'>
          <Pagination total={pages} onChange={setPage} />
        </div>
      </div>
      
    }
  </div>
  )
}

export default PointHistory