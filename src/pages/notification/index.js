import { Button, Pagination } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components';
import ErrorHandler from '../../components/ErrorHandler';
import { Title } from '../../components/Header';
import { Loadings } from '../../components/Loading';
import { adminTokenUrl } from '../../Urls';

function Notifications() {


  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(true)
  const [loading, setLoading] = useState(true)
  const [pages, setPages] = useState("")
  const [page, setPage] = useState(1)




  const handleDelete = (e) => {
    if (confirm("Want to delete?")) {
      adminTokenUrl().delete(`delete-notification/${e}`).then((res) => {
        setRefresh(false)
      })
    }

  }
  useEffect(() => {
    Title("Notifications")
    setTimeout(() => setLoading(false), 1000)
    adminTokenUrl().get(`/get-notifications?page=${page}`).then((res) => {
      setData(res?.data?.data?.data);
      setRefresh(true)
    }).catch((err) => {
      ErrorHandler(err)
    })
  }, [refresh,page])





  return (
    <div className="m-2 md:m-10 mt-18 p-2 md:p-10 dark:text-gray-200 dark:bg-gray-600 rounded-3xl">
      <Header category="Notifications" title="List of Notifications" />

      
      <Link to="/notifications/create">
        <button className="text-white dark:text-gray-400 font-bold py-2 px-4 rounded mb-2 border">
          Create Notifications
        </button>
      </Link>
      {loading? <Loadings/>:
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      
        
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Web Link
                </th>
                <th scope="col" className="py-3 px-6">
                  App Link
                </th>
                <th scope="col" className="py-3 px-6">
                  Message
                </th>
                <th scope="col" className="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {
                data.length > 0 ?
                  data.map((e) =>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="py-4 px-6">
                        {e.web_link}
                      </td>
                      <td className="py-4 px-6">
                        {e.app_link}
                      </td>
                      <td className="py-4 px-6">
                        {e.notification_msg}
                      </td>
                      <td className="py-4 px-6">
                        <Button onClick={() => { handleDelete(e.uid) }} variant='outline'>Delete </Button>
                      </td>
                    </tr>
                  )
                  : <p className='p-5'>No data found.</p>
              }
            </tbody>
          </table>
        

      </div>}
      <div className='p-5 justify-center'>
          <Pagination total={pages} onChange={setPage} />
        </div>
    </div>
  )
}

export default Notifications;