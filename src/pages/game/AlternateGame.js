import { Pagination } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Header } from '../../components';
import ErrorHandler from '../../components/ErrorHandler';
import { Title } from '../../components/Header';
import { Loadings } from '../../components/Loading';
import { ErrorNotification } from '../../components/NotificationProvider';
import { adminTokenUrl, GameImgUrl } from '../../Urls';

function AlternateGame() {


  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [input, setInput] = useState("")
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState("")


  useEffect(() => {
    Title("Games List")
    setTimeout(() => setLoading(false), 1000)
    
    adminTokenUrl().get('/alternate-games').then((res) => {
      setData(res?.data?.data['rows'])
      console.log(res?.data?.data['rows'])
    }).catch((err) => {
      console.log(err)
      ErrorHandler(err)
    })
  }, [])


  

  return (
    <div className="m-2 md:m-10 mt-18 p-2 md:p-10 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl">
      <Header category="Games" title="List of Games" />

      <Link to="/games/game/create">
        <button className="text-gray-400 dark:text-gray-400 font-bold py-2 px-4 rounded border mb-2">
          Add Game
        </button>
      </Link>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <div className="flex justify-center text-center pb-4 bg-white dark:bg-gray-900 p-5">

        </div>
        {loading ? <Loadings /> :
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Prize
                </th>
                <th scope="col" className="py-3 px-6">
                  Charge
                </th>
                
                <th scope="col" className="py-3 px-6">
                  Enabled/Disabled
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ?
                data.map((e) =>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
                      <Link to={`/games/game/${e?.id}`}>{e?.name}</Link>
                    </th>
                    <td className="py-4 px-6">
                      {e?.prize}
                    </td>
                    <td className="py-4 px-6">
                      {e?.charge}
                    </td>
                    
                    <td className="py-4 px-6">
                    <div className="flex items-center">
                      {!e?.EnabledGame ? <><div className="h-2.5 w-2.5 rounded-full bg-red-400 mr-2" />Disabled</> : <><div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2" /> Enabled</>}

                    </div>
                     
                    </td>
                  </tr>
                ) :
                <><tr className='p-5'>No data Found</tr></>}


            </tbody>
          </table>
        }
      </div>
      <div className='p-5 justify-center'>
        <Pagination total={pages} onChange={setPage} />
      </div>
    </div>
  );
}

export default AlternateGame;
