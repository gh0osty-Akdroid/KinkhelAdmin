/* eslint-disable react/void-dom-elements-no-children */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { Header } from '../../components';
import { adminTokenUrl, GameImgUrl } from '../../Urls';
import { Loadings } from '../../components/Loading';
import ErrorHandler from '../../components/ErrorHandler';
import { Button } from '@mantine/core';
import { ConfirmModal } from '../../components/NotificationProvider';

function GameCategories() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState()

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)

    adminTokenUrl().get(`/game-categories`).then((res) => {
      setData(res?.data?.data);
      console.log(res?.data?.data)
      setRefresh(false)
    })
      .catch((err) => {
        ErrorHandler(err)
      })
  }, [refresh,]);


  const deleteItem = (data) => {
    if(confirm ("Are you sure you want to delete this game?")){
      adminTokenUrl().delete(`/game-category`, { data: { "id": data.id } }).then((res) => {
        setRefresh(true)
      }).catch(err => {
          ErrorHandler(err)
      })
    }
    
  };



  


  return (
    <div className="m-2 md:m-10 mt-18 p-2 md:p-10 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl">
      <Header category="Games Category" title="List of Games Category" />

      <Link to="create">
        <button className="text-gray-400 dark:text-gray-400 font-bold py-2 px-4 border rounded mb-2">
          Add Games Category
        </button>
      </Link>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">

        {loading ? <Loadings /> :
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>

                <th scope="col" className="py-3 px-6">
                  Image
                </th>
                <th scope="col" className="py-3 px-6">
                  Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Uid
                </th>
                <th scope="col" className="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ?
                data.map((e) =>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                    <Link to={`${e.uId}`}>
                      <th scope="row" className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
                        <img className="w-10 h-10 rounded-full" src={`${GameImgUrl}/${e.image}`} alt="" />
                      </th>
                    </Link>

                    <td className="py-4 px-6">
                      {e.name}
                    </td>
                    <td className="py-4 px-6">
                      {e.uId}
                    </td>
                    <td className="py-4 px-6">
                      <Button onClick={()=> deleteItem(e)} variant='outline' className="m-1 p-2 w-50 text-sm text-gray-900 bg-gray-50 rounded-lg border border-red-300 focus:ring-red-500 focus:border-red-500 dark:bg-red-600 dark:border-red-600 dark:placeholder-gray-400 dark:text-white dark:focus:red-blue-500 dark:focus:border-red-500">Delete </Button>
                    </td>
                  </tr>
                ) :
                <><tr className='p-5'>No data Found</tr></>}



            </tbody>
          </table>
        }
      </div>
    </div>
  );
}

export default GameCategories;
