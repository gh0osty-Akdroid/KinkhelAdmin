import React, { useEffect, useState } from 'react';
import { Header } from '../../../components';
import slugify from 'react-slugify';
import { adminTokenUrl } from '../../../Urls';
import { ErrorNotification, LoadingNotification, SuccessNotification } from '../../../components/NotificationProvider';
import { Grid, MultiSelect } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SmallLoader } from '../../../components/Loading';
import { Title } from '../../../components/Header';
import ErrorHandler from '../../../components/ErrorHandler';

const CreateVoucherCategory = () => {
    const history = useNavigate()
    const { id } = useParams()

    const [name, setName] = useState('')
    const [val, setValue] = useState(0)
    const [batch, setBatch] = useState([])
    const [total_point, setTotalPoint] = useState('')
    const [total_vouchers, setTotalVoucher] = useState('')
    const [validity, setValidity] = useState("")
    const [loading, setLoading] = useState(false)
    const site = useSelector(p => p?.site?.site?.id)

    const handleAddMerchantVoucher = (e) => {
        e.preventDefault()
        setLoading(true)
        LoadingNotification({ title: "Wait!", message: "Please wait while we are adding your data." })
        const body = {
            name: name,
            batch: batch,
            total_point: total_point,
            total_vouchers: total_vouchers,
            site: site,
            validity: validity,
            merchant_id: id,
        }

        adminTokenUrl().post(`/voucher-category`, body).then((res) => {
            SuccessNotification({ title: "Added!", message: "Your voucher has been added." })
            history(`/merchants/${id}/vouchers`)
        }).catch((err) => {
            ErrorHandler(err)
        })

    }
    const handlePointValue = () => {
        const a = (total_point / total_vouchers).toFixed(2)
        setValue(a)
    }
    useEffect(() => {
        Title("Create Merchant Voucher")
    }, [])


    return (
        <div className="m-2 md:m-10 mt-20 pMerchant-2 md:p-10 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl h-full">
            <Header category="Voucher" title="Create Merchant Voucher" />
            <div className="mt-8 dark:text-gray-200 dark:bg-secondary-dark-bg">
                <div className="rounded-lg  dark:bg-secondary-dark-bg">
                    <form onSubmit={handleAddMerchantVoucher}>
                        <div className="mb-4">
                            <Grid grow>
                                <Grid.Col span={6}>
                                    <h2 className=" ml-5 block  text-sm font-bold mb-2">
                                        Voucher Name
                                    </h2>
                                    <input
                                        className="ml-5 mb-5 justify-between shadow text-gray-500 appearance-none border rounded w-10/12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                        onChange={(e => setName(e.target.value))}
                                        type="text"
                                        value={name}
                                        placeholder="Name"
                                    />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <h2 className=" ml-5 block  text-sm font-bold mb-2">
                                        Total Points
                                    </h2>
                                    <input
                                        className="ml-5 mb-5 justify-between shadow text-gray-500 appearance-none border rounded w-10/12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                        type="number"
                                        value={total_point}
                                        onChange={(e => setTotalPoint(e.target.value))}
                                        placeholder="Total Points"
                                    />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <h2 className=" ml-5 block  text-sm font-bold mb-2">
                                        Batch
                                    </h2>
                                    <MultiSelect
                                        data={batch}
                                        placeholder="Create Batch"
                                        searchable
                                        className="ml-5 mb-5 justify-between shadow text-gray-500 appearance-none border rounded w-10/12  leading-tight"
                                        creatable
                                        getCreateLabel={(query) => `+ Create ${query}`}
                                        onCreate={(query) => {
                                            const item = { value: slugify(query), label: query };
                                            setBatch((current) => [...current, item]);
                                            return item;
                                        }}
                                    />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <h2 className=" ml-5 block  text-sm font-bold mb-2">
                                        Voucher Count
                                    </h2>
                                    <input
                                        className="ml-5 mb-5 justify-between shadow text-gray-500 appearance-none border rounded w-10/12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                        type="number"
                                        value={total_vouchers}
                                        onKeyUp={handlePointValue}
                                        onChange={(e => setTotalVoucher(e.target.value))}
                                        placeholder="Total Voucher Counts"
                                    />
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <h2 className=" ml-5 block  text-sm font-bold mb-2">
                                        Voucher value
                                    </h2>
                                    <p className="ml-5 mb-5 justify-between shadow text-white-500 appearance-none border rounded w-10/12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                    >{val}</p>
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <h2 className=" ml-5 block  text-sm font-bold mb-2">
                                        Validity
                                    </h2>
                                    <input
                                        className="ml-5 mb-5 justify-between shadow text-gray-500 appearance-none border rounded w-10/12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                        type="datetime-local"
                                        value={validity}
                                        onChange={(e => setValidity(e.target.value))}
                                        placeholder="Validity"
                                    />
                                </Grid.Col>

                            </Grid>
                            {loading ? <SmallLoader /> : <button className="ml-5 px-4 py-2 text-white bg-green-500 rounded shadow-xl" type='submit'>
                                Add
                            </button>}

                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default CreateVoucherCategory