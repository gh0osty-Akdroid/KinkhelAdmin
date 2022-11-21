import React, { useEffect, useState } from 'react'
import { Header } from '../../components'
import ErrorHandler from '../../components/ErrorHandler'
import { Title } from '../../components/Header'
import { SuccessNotification } from '../../components/NotificationProvider'
import { adminTokenUrl } from '../../Urls'
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import { Grid } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
registerPlugin(FilePondPluginImagePreview, FilePondPluginImageCrop, FilePondPluginFileEncode)


const AddBanners = () => {
    const history = useNavigate()
    const [image, setImage] = useState("")
    const [files, setFiles] = useState("")
    const [link, setLink] = useState("")
    const [text, setText] = useState("")
    const [other, setOther] = useState("")
    const [index, setIndex] = useState("")

    useEffect(()=>{
        Title("Add Banner")
    },[])
    const handleAdd =(e) =>{
        e.preventDefault()
        const body= {index:index, others:other,text:text, link:link, image:image}
        adminTokenUrl().post('banners', body).then((res)=>{
            SuccessNotification({title:"Added!", message:"Your Banner has been added"})
            history('/banners')
        }).catch((err)=>{
            ErrorHandler(err)
        })
    }

    return (
        <>
            <div className="m-2 md:m-10 mt-20 p-2 md:p-10 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl h-full">
                <Header category="Banner" title="Add Banner" />
                <div className="justify-center ">
                    <form onSubmit={handleAdd}>
                        <div className="rounded-lg ">
                            <label className="inline-block mb-2 ">
                                Banner Image(jpg,png,svg,jpeg)
                            </label>
                            <div className="text-black justify-between rounded w-11/12 py-2 px-3">
                                <FilePond
                                    files={files}
                                    allowFileEncode={true}
                                    onupdatefiles={setFiles}
                                    allowMultiple={false}
                                    name="files"
                                    onaddfile={(err, abc) => {
                                        if (err) return console.log(err)
                                        const base64 = abc.getFileEncodeDataURL()
                                        setImage(base64)
                                    }}
                                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                                />
                            </div>

                            <Grid grow>
                                <Grid.Col sm={6}>
                                    <div className="mb-4">
                                        <label className=" ml-5 block  text-sm font-bold mb-2">
                                        Banner Text
                                        </label>
                                        <input
                                            className="text-black justify-between  border rounded w-11/12 py-2 px-3   "
                                            id="Cname"
                                            type="text"
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                            placeholder="Banner Text"
                                        />
                                    </div>
                                </Grid.Col>
                                <Grid.Col sm={6}>
                                    <div className="mb-4">
                                        <label className=" ml-5 block  text-sm font-bold mb-2">
                                            Banner Link
                                        </label>
                                        <input
                                            className="text-black justify-between  border rounded w-11/12 py-2 px-3   "
                                            id="Cname"
                                            type="text"
                                            value={link}
                                            onChange={(e) => setLink(e.target.value)}
                                            placeholder="Banner Link"
                                        />
                                    </div>
                                </Grid.Col>

                                <Grid.Col sm={6}>
                                    <div className="mb-4">
                                        <label className=" ml-5 block  text-sm font-bold mb-2">
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
                                <Grid.Col sm={6}>
                                    <div className="mb-4">
                                        <label className=" ml-5 block  text-sm font-bold mb-2">
                                            Index
                                        </label>
                                        <input
                                            className="text-black justify-between  border rounded w-11/12 py-2 px-3   "
                                            id="Cname"
                                            type="Number"
                                            value={index}
                                            onChange={(e) => setIndex(e.target.value)}
                                            placeholder="Index"
                                        />
                                    </div>
                                </Grid.Col></Grid>
                            


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

export default AddBanners