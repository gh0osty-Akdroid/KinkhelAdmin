import { Button, Grid } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../components';
import ErrorHandler from '../../components/ErrorHandler';
import { Title } from '../../components/Header';
import { Loaders, Loadings, SmallLoader } from '../../components/Loading';
import { ErrorNotification, SuccessNotification } from '../../components/NotificationProvider';
import { adminTokenUrl, GameImgUrl } from '../../Urls';

function GameShow() {
  const { id } = useParams()
  const history = useNavigate()
  const [data, setData] = useState("")
  const [category, setCategory] = useState("")
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState("")
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
    adminTokenUrl().get(`game/${id}`).then(res => {
      setData(res?.data?.data?.data)
      console.log(res?.data?.data?.data)
      Title(res?.data?.data?.data?.name)
      setRefresh(false)
      setCategory(res?.data?.data?.data?.Category)
    }).catch(err => {
      ErrorHandler(err)
    })
  }, [refresh])

  const handleEnableGame = (e) => {
    if (confirm(`Do you really want to enable ${e.name}?`)) {
      adminTokenUrl().post("/enabled-games", { "game_id": e.id }).then((res) => {
        history(`/games/enabled-game`)
        SuccessNotification({ title: "Enabled!", message: `${e.name} has been enabled.` })
      }).catch(err => {
        ErrorHandler(err)
      })
    }
  }

  const handleDeleteGame = (e) => {
    if (confirm(`Do you really want to delete ${e.name}?`)) {
      adminTokenUrl().delete("/games", { "data": { "id": data.id } }).then((res) => {
        history(`/games/game`)
        SuccessNotification({ title: "Deleted!", message: `${e.name} has been deleted.` })
      }).catch(err => {
        ErrorHandler(err)
      })
    }
  }

  const handleAddWinner = (e) => {
    e.preventDefault()
    console.log(date)
    const body = {
      game_id: id,
      time: date
    }
    adminTokenUrl().put('/winner-announcement', body).catch(err => ErrorHandler(err)).then((res) => {
      setRefresh(true)
    })
  }

  return (
    <div>

      <div className="rounded-lg shadow-lg dark:text-gray-200 dark:bg-secondary-dark-bg  m-5 p-10">
        {loading ? <Loadings /> : <>
          <Header category="Game" title={data.name} />
          <div className='bg-white dark:bg-gray-900 rounded'>
            <Grid grow>
              <Grid.Col sm={6}>
                <div className="p-8">
                  <p className=" text-base mb-4">
                    <strong> Category: </strong>: {category.name}
                  </p>
                  <p className=" text-base mb-4">
                    <strong> Enabled: </strong> {data.enabled ? 'Disabled' : 'Enabled'}
                  </p>
                  <p className=" text-base mb-4">
                    <strong> Description: </strong> {data.description}
                  </p>
                  <p className=" text-base mb-4">
                    <strong> Note: </strong> {data.notes}
                  </p>
                  <p className=" text-base mb-4">
                    <strong> Prize: </strong> {data.prize}
                  </p>
                  <p className=" text-base mb-4">
                    <strong> Required Points: </strong> {data.charge}
                  </p>
                  <p className=" text-base mb-4">
                    <strong> Is Active: </strong> {data?.active ? <p>Active</p> : <p>In-Active</p>}
                  </p>
                  {
                    !data?.AlternateGame ? <>

                      <p className=" text-base mb-4">
                        <strong>  Opening Time: </strong> {new Date(data.opening_time).toLocaleString()}
                      </p>
                      <p className=" text-base mb-4">
                        <strong> Closing Time: </strong> {new Date(data.closing_time).toLocaleString()}
                      </p>
                      </> :""
                  }
                  <p className=" text-base mb-4">
                    <strong> Recurring: </strong> {data.same_time ? "True" : "False"}
                  </p>
                  <p className=" text-base mb-4">
                    <strong> Announcement Date: </strong> {data?.winner_announcement ? new Date(data?.winner_announcement).toLocaleString() : <strong>Add New</strong>}
                  </p>

                  <input type={"datetime-local"} value={date} onChange={(e) => setDate(e.target.value)} className="justify-between text-black appearance-none border rounded w-11/12 py-2 px-3  leading-tight focus:outline-none focus:text-black-outline" placeholder="Select announcement date" />
                  <Button variant="outline" onClick={handleAddWinner}>Update Winninig Announce Date</Button>
                </div>
              </Grid.Col>

              <Grid.Col sm={6}>
                {data?.AlternateGame ?
                  <div className="p-8">
                    <p className=" text-base mb-4">
                      <strong> Active Participant : </strong> {data?.AlternateGame?.active_participants}
                    </p>
                    <p className=" text-base mb-4">
                      <strong> Current Participants: </strong> {data?.AlternateGame?.current_participants}
                    </p>
                    <p className=" text-base mb-4">
                      <strong> Required Participant: </strong> {data?.AlternateGame?.required_participants}
                    </p>
                  </div>
                  : ""}
                {
                  data?.EnabledGame ? "" : <div className="p-8">
                    <button type="submit" className="px-4 py-2 text-white bg-green-500 rounded text-black" onClick={() => handleEnableGame(data)}>
                      Enable this game
                    </button>
                  </div>
                }
                <div className="p-8">
                  <button type="submit" className="px-4 py-2 text-white bg-green-500 rounded text-black" onClick={() => handleDeleteGame(data)}>
                    Delete {data.name}
                  </button>
                </div>
                <div className="p-8">
                  <Link to={`history`}>
                    <button type="submit" className="px-4 py-2 text-white bg-green-500 rounded text-black">
                      Go to winner history
                    </button>
                  </Link>

                </div>
              </Grid.Col>
            </Grid>
          </div>


        </>}
        <Grid>
          <Grid.Col sm={12}>
            <img className="rounded-t-lg" src={`${GameImgUrl}${data?.Category?.image}`} />
          </Grid.Col>
        </Grid>

      </div>
    </div>
  );
}

export default GameShow;
