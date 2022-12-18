import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Pagination } from '@mantine/core';
import { Header } from '../../components';
import { Loadings, SmallLoader } from '../../components/Loading';
import { adminTokenUrl, GameImgUrl, ImgUrl } from '../../Urls';
import { ErrorNotification } from '../../components/NotificationProvider';
import ErrorHandler from '../../components/ErrorHandler';
import { Title } from '../../components/Header';

function Banners() {

  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [pages, setPages] = useState("")
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Title("Banners")
    setTimeout(() => setLoading(false), 1000)
    adminTokenUrl().get(`/banners?page=${page}`).then((res) => {
      setData(res?.data?.data?.data)
      setRefresh(false)
      setPages(res?.data?.data?.totalPages)
    }).catch((err) => {
      ErrorHandler(err)
    })
  }, [page,refresh])



  const handleDelete = (e) => {
    if (confirm("Want to delete this banner?")) {
      adminTokenUrl().delete(`/banners/${e}`).then((data) => {
        setRefresh(true)
      }).catch((err) => {
        ErrorHandler(err)
      })
    }
  }

  



  return (
    <div className="m-2 md:m-10 mt-18 p-2 md:p-10 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl">
      <Header category="Banners" title="List of Banners" />

      <Link to="create">
        <button className="text-gray-400 dark:text-gray-400 font-bold py-2 px-4 rounded mb-2 border">
          Add Banner
        </button>
      </Link>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <div className="flex justify-center text-center pb-4 bg-white dark:bg-gray-900 p-5">

          
        </div>
        {loading? <Loadings/>: 
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" style={{ height: "300", overflowY: "scroll" }}>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
              <th scope="col" className="py-3 px-6">
                  Image
                </th>
                <th scope="col" className="py-3 px-6">
                  Banner Text
                </th>
                <th scope="col" className="py-3 px-6">
                  Banner Link
                </th>
                <th scope="col" className="py-3 px-6">
                  Banner Index
                </th>
                <th scope="col" className="py-3 px-6">
                  Action
                </th>

              </tr>
            </thead>
            <tbody>
              {loading? <SmallLoader/> : 
              data.length > 0 ?
                data.map((e) =>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th className="py-4 px-6">
                      <img src={`${ImgUrl}${e.image}`} width={"50px"} />
                    </th>
                    <th className="py-4 px-6">
                     {e.text}
                    </th>
                    <th className="py-4 px-6">
                    {e.link}
                    </th>
                    <th className="py-4 px-6">
                    {e.index}
                    </th>
                    
                    
                    
                    <td className="py-4 px-6">
                      <Button variant='outline' onClick={() => handleDelete(e.id)}>Delete</Button>
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
          <Pagination total={pages} onChange={setPage}/>
          </div>
    </div >
  );
}

export default Banners;
