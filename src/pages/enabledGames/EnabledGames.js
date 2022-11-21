import { Button } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Header } from '../../components';
import { Title } from '../../components/Header';
import { Loadings } from '../../components/Loading';
import { ErrorNotification, SuccessNotification } from '../../components/NotificationProvider';
import { adminTokenUrl, GameImgUrl } from '../../Urls';

function EnabledGame() {


  const [data, setData] = useState([])
  const history = useNavigate()
  const [loading, setLoading] = useState(true)

  const [refresh, setRefresh] = useState(false)


  useEffect(() => {
    Title("Enabled Games")
    setTimeout(() => setLoading(false), 1000)
    adminTokenUrl().get('/enabled-games').then((res) => {
      setData(res?.data?.data)
      setRefresh(false)
    }).catch((err) => {
      ErrorNotification({ title: "Error", message: "Something went wrong! " })
    })
  }, [refresh, ])

  const handleDisable = (e) => {
    if (confirm(`Are you sure, you want to disable ${e.name}?`)) {
      adminTokenUrl().delete(`/enabled-game`, { "data": { "game_id": e.id } }).then((res) => {
        history('/games/enabled-game')
        setRefresh(true)
        SuccessNotification({ title: "Disabled!", message: `${e.name} has been disabled.` })
      })
    }


  }



  return (
    <div className="m-2 md:m-10 mt-18 p-2 md:p-10 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl">
      <Header category="Enabled Games" title="List of Enabled Games" />
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        
        {loading ?
          <Loadings /> :
          <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400 shadow">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Name
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


                    <th scope="row" className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
                    <Link to={`/games/game/${e?.Game?.id}`}>{e?.Game?.name}</Link>
                    </th>


                    <td className="py-4 px-6">
                      <Button variant="outline" onClick={() => handleDisable(e?.Game)} className="m-1 p-2 w-50 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">Disable</Button>
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

export default EnabledGame;
