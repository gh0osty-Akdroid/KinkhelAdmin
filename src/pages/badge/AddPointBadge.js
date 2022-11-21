import React, { useEffect, useState } from 'react'
import { Header } from '../../components'
import ErrorHandler from '../../components/ErrorHandler'
import { Title } from '../../components/Header'
import { SuccessNotification } from '../../components/NotificationProvider'
import { adminTokenUrl } from '../../Urls'
import { Grid } from '@mantine/core'
import { useNavigate } from 'react-router-dom'


const AddPointBadge = () => {
    const history = useNavigate()

    const [points, setPoint] = useState("")
    const [name, setName] = useState("")
    const [other, setOther] = useState("")

    useEffect(() => {
        Title("Add Point Badge")
    }, [])
    const handleAdd = (e) => {
        e.preventDefault()
        const body = { points: points, other: other, name: name }
        adminTokenUrl().post('badge', body).then((res) => {
            SuccessNotification({ title: "Added!", message: "Your Badge has been added" })
            history('/point-badge')
        }).catch((err) => {
            ErrorHandler(err)
        })
    }

    return (
        <>
            <div className="m-2 md:m-10 mt-20 p-2 md:p-10 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl h-full">
                <Header category="Badge" title="Add Point Badge" />
                <div className="justify-center ">
                    <form onSubmit={handleAdd}>
                        <div className="rounded-lg ">
                            <Grid grow>
                                <Grid.Col sm={6}>
                                    <div className="mb-4">
                                        <label className=" block  text-sm font-bold mb-2">
                                            Point Badge Name
                                        </label>
                                        <input
                                            className="text-black justify-between  border rounded w-11/12 py-2 px-3   "
                                            id="Cname"
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Point Badge Name"
                                        />
                                    </div>
                                </Grid.Col>
                                <Grid.Col sm={6}>
                                    <div className="mb-4">
                                        <label className=" block  text-sm font-bold mb-2">
                                            Points required
                                        </label>
                                        <input
                                            className="text-black justify-between  border rounded w-11/12 py-2 px-3   "
                                            id="Cname"
                                            type="number"
                                            value={points}
                                            onChange={(e) => setPoint(e.target.value)}
                                            placeholder="Point Required"
                                        />
                                    </div>
                                </Grid.Col>

                                <Grid.Col sm={6}>
                                    <div className="mb-4">
                                        <label className=" block  text-sm font-bold mb-2">
                                            Other
                                        </label>
                                        <input
                                            className="text-black justify-between  border rounded w-11/12 py-2 px-3   "
                                            id="Cname"
                                            type="text"
                                            value={other}
                                            onChange={(e) => setOther(e.target.value)}
                                            placeholder={"Other"}
                                        />
                                    </div>
                                </Grid.Col>
                            </Grid>



                            <div className="flex p-2 space-x-4 justify-between">

                                <button className="px-4 py-2 text-white bg-green-500 rounded shadow-xl" >
                                    Create
                                </button>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddPointBadge