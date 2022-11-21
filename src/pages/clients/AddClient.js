import React, { useEffect, useState } from 'react'
import { Header } from '../../components';
import { adminTokenUrl } from '../../Urls';
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';

import { Select, ColorInput } from '@mantine/core';
import { ErrorNotification, SuccessNotification } from '../../components/NotificationProvider';
import { useNavigate } from 'react-router-dom';
import { Title } from '../../components/Header';

registerPlugin(FilePondPluginImagePreview, FilePondPluginImageCrop, FilePondPluginFileEncode)

const AddClient = () => {
  const [files, setFiles] = useState("")
  const [name, setName] = useState('')
  const [image, setImage] = useState()
  const [done, setDone] = useState(false)
  const history = useNavigate()

  const handleAdd = (e) => {
    e.preventDefault()
    const body = { name: name, image: image }
    adminTokenUrl().post('/clients', body).then((res) => {
      SuccessNotification({title:"Created!", message:"Your client has been added."})
      history('/clients')
    }).catch((err) => {
      console.log(err);
      ErrorNotification({title:"Error!", message:"Something went wrong."})
    })
  }
  
  useEffect(()=>{
    Title("Add Clients")
  },[])


  return (
    <>
      <div className="m-2 md:m-10 mt-20 p-2 md:p-10 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl h-full">
        <Header category="Add Client" title="Add Client" />
        <div className="justify-center ">
          <form onSubmit={handleAdd}>
            <div className="rounded-lg ">
              <label className="inline-block mb-2 ">
                Upload Image(jpg,png,svg,jpeg)
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


              <div className="mb-4">
                <label className=" ml-5 block  text-sm font-bold mb-2">
                  Client Name
                </label>
                <input
                  className="text-black justify-between  border rounded w-11/12 py-2 px-3   "
                  id="Cname"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Client Name"
                />
              </div>


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

export default AddClient