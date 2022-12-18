import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Pagination } from '@mantine/core';
import { Header } from '../../components';
import { Loadings, SmallLoader } from '../../components/Loading';
import { adminTokenUrl, GameImgUrl, ImgUrl } from '../../Urls';
import { ErrorNotification } from '../../components/NotificationProvider';
import ErrorHandler from '../../components/ErrorHandler';
import { Title } from '../../components/Header';

function PointBadge() {

  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [pages, setPages] = useState("")
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Title("Point Badge")
    setTimeout(() => setLoading(false), 1000)
    adminTokenUrl().get(`/badge?page=${page}`).then((res) => {
      setData(res?.data?.data?.data)
      setRefresh(false)
      setPages(res?.data?.data?.totalPages)
    }).catch((err) => {
      ErrorHandler(err)
    })
  }, [page, refresh])



  const handleDelete = (e) => {
    if (confirm(`Want to delete ${e.name} badge?`)) {
      adminTokenUrl().delete(`/badge/${e.id}`).then((data) => {
        setRefresh(true)
      }).catch((err) => {
        ErrorHandler(err)
      })
    }
  }





  return (
    <div className="m-2 md:m-10 mt-18 p-2 md:p-10 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl">
      <Header category="Badge" title="List of Badge" />

      <Link to="create">
        <button className="text-gray-400 dark:text-gray-400 font-bold py-2 px-4 rounded mb-2 border">
          Add Badge
        </button>
      </Link>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <div className="flex justify-center text-center pb-4 bg-white dark:bg-gray-900 p-5">

          <label htmlFor="table-search" className="sr-only">Search</label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
            </div>
            <input type="text" id="table-search-users" className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for Banners" />
          </div>
        </div>
        {loading ? <Loadings /> :
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" style={{ height: "300", overflowY: "scroll" }}>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Badge Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Banner Point
                </th>
                <th scope="col" className="py-3 px-6">
                  Action
                </th>

              </tr>
            </thead>
            <tbody>
              {loading ? <SmallLoader /> :
                data.length > 0 ?
                  data.map((e) =>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th className="py-4 px-6">
                        {e.name}
                      </th>


                      <th className="py-4 px-6">
                        {e.points}
                      </th>
                      <td className="py-4 px-6">
                        <Button variant='outline' onClick={() => handleDelete(e)}>Delete</Button>
                      </td>

                    </tr>
                  )
                  :
                  <><p className='p-5'>No data Found</p></>}
            </tbody>

          </table>
        }


      </div>
      <div className='p-5 justify-center'>
        <Pagination total={pages} onChange={setPage} />
      </div>
    </div >
  );
}

export default PointBadge;
