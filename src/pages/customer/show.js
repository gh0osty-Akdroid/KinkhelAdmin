import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../components';
import { Grid } from "@mantine/core"
import { Loadings } from '../../components/Loading';
import { adminTokenUrl, ImgUrl } from '../../Urls';
import { SuccessNotification } from '../../components/NotificationProvider';
import ErrorHandler from '../../components/ErrorHandler';
import { Title } from '../../components/Header';

function CustomerShow() {
  const { id } = useParams()
  const [data, setData] = useState('')
  const [games, setGames] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
    adminTokenUrl().get(`/user/${id}`).then((res) => {
      setData(res?.data?.data);
      setRefresh(false)
      Title(res?.data?.data?.name)
    }).catch((err) => {
      ErrorHandler(err)
    })
  }, [refresh,])

  useEffect(() => {
    adminTokenUrl().get(`/played/user/${data?.phone}`).then((res) => {
      setGames(res?.data?.data?.data)
    }).catch((err) => {
      console.log(err)
      ErrorHandler(err)
    })
  }, [data])

  const handleUpdate = (e, banned) => {
    let body
    if (banned === true) {
      body = {
        banned: false
      }
    }
    else {
      body = {
        banned: true
      }
    }
    if (confirm(`Do you want to update ${data.name}?`)) {
      adminTokenUrl().put(`user/${e}`, body).then((res) => {
        SuccessNotification({ title: "Updated!", message: `${data.name} has been updated.` })
        setRefresh(true)
      }).catch((err) => {
        ErrorHandler(res)
      })
    }

  }

  return (
    <div>
      <div className="rounded-lg shadow-lg m-5 p-5">
        {loading ? <Loadings /> :
          <>
            <Header category="Customer" title={data.name} />
            <div className='bg-white dark:bg-gray-900 rounded p-8'>
              <Grid>
                <Grid.Col sm={6}>
                  {data?.image ? <img className="rounded-t-lg" src={`${ImgUrl}${data.image}`} /> :
                    <img src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"} />}

                </Grid.Col>
                <Grid.Col sm={6}>
                  <div className="p-8">
                    <p className="text-white text-base mb-4">
                      <strong> Email </strong> {data.email}
                    </p>
                    <p className="text-white text-base mb-4">
                      <strong> Phone: </strong> {data.phone}
                    </p>
                    <p className="text-white text-base mb-4">
                      <strong> Points: </strong> {data.Point?.points}
                    </p>
                    <p className="text-white text-base mb-4 bg-green-500 rounded p-2">
                      <input type={"button"} onClick={((e) => handleUpdate(data.id, data?.banned))} value={data.banned ? "Allow this user?" : "Ban this user?"} />
                    </p>
                  </div>
                </Grid.Col>
              </Grid>
              <div className='flex text-white justify-center p-5'>Last 25 games played.</div>
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Game Name
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Chosen Number
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {games.length > 0 ? 
                  games.map((e, i) =>
                    <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td scope="row" className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="text-base font-semibold">{e.Game.name}</div>
                      </td>
                      <td className="py-4 px-6">
                        {e.chosen_number}
                      </td>
                    </tr>
                  ) : <p className='p-5'>No games Played by this user.</p>
                }
                </tbody>
              </table>
            </div>
          </>}
      </div>
    </div>
  );
}

export default CustomerShow;
