import { Button, Pagination } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Header } from '../../components'
import ErrorHandler from '../../components/ErrorHandler'
import { Title } from '../../components/Header'
import { Loadings } from '../../components/Loading'
import { adminTokenUrl } from '../../Urls'

const UserPlayed = () => {
    const { id, uid } = useParams()
    const [data, setData] = useState([])
    const [page, setPage] = useState("")
    const [pages, setPages] = useState("")
    const [loading, setLoading] = useState(true)
    const [number, setNumber] = useState("")

    useEffect(() => {
        Title("Player List")
        setLoading(true)
        adminTokenUrl().get(`/played/game/${id}?iteration=${uid}&page=${page}`).then((res) => {
            setData(res?.data?.data?.data)
            setLoading(false)
        }).catch(err=>{
            ErrorHandler(err)
        })

    }, [page])


    const handleSearch = (e) => {
        e.preventDefault()
        adminTokenUrl().post(`findWinners/${uid}`,{number:number}).then((res) => {
            console.log(res?.data?.data)
            alert(`The total matched data is ${res?.data?.data}`)
            setLoading(false)
        }).catch(err=>{
            ErrorHandler(err)
        })

    }

    return (
        <div className="m-2 md:m-10 mt-18 p-2 md:p-10 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl">
            <Header category="Player List" title="List of user played game." />
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <div className="flex justify-center text-center pb-4 bg-white dark:bg-gray-900 p-5">
                    <form onSubmit={handleSearch}>
                        <label htmlFor="table-search" className="sr-only">Search</label>
                        <div className="relative">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
                            </div>
                            <input onChange={(e) => setNumber(e.target.value)} type="text" id="table-search-users" className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for Winning Number" />
                        </div>
                    </form>
                </div>
                {loading ? <Loadings /> :
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 px-6">
                                    Player Type
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Player ID
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Chosen Number
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ?
                                data.map((e) =>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
                                            {e.user_id ? "Customer" : "Merchant"}
                                        </th>
                                        <td className="py-4 px-6">
                                            {e.user_id ? e.user_id : e.merchant_id}
                                        </td>
                                        <td className="py-4 px-6">
                                            {e.chosen_number}
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
    )
}

export default UserPlayed