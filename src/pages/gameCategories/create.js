

import React, { useEffect, useState } from 'react';
import { Header } from '../../components';
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';

import FilePondPluginImageCrop from 'filepond-plugin-image-crop';

registerPlugin(FilePondPluginImagePreview, FilePondPluginImageCrop,FilePondPluginFileEncode)

import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { adminTokenUrl } from '../../Urls';
import { ErrorNotification, SuccessNotification } from '../../components/NotificationProvider';
import { useNavigate } from 'react-router-dom';
import ErrorHandler from '../../components/ErrorHandler';
import { Title } from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
// Drop Down ma yeso Enabled disabled halna baaki cha hai JS bata

function GameCategoryCreate() {

  const [name, setName] = useState('')
  const [image, setImage] = useState([])
  const [files, setFiles] = useState("")
  const history = useNavigate()
  const site = useSelector(p=>p?.site?.site.id)


  const handleAdd = (e) => {
    e.preventDefault()
    const body = { name: name, image: image , region:site}
    adminTokenUrl().post('/game-categories', body).then((res) => {
      SuccessNotification({title:"Added!", message:"Your Game category has been Added!!"})
      history("/games/category")
    }).catch((err) => {
      ErrorHandler(err)
    })
  }

  useEffect(()=>{
    Title("Display Game")
  },[])

  return (
    <div className="m-2 md:m-10 mt-20 p-2 md:p-10 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl h-full">
      <Header category="Add Game Category" title="Add Category" />


        <div className="justify-center mt-8">
          <div className="rounded-lg ">
            <form onSubmit={handleAdd}>
            <label className="inline-block mb-2 ">
              Upload Image(jpg,png,svg,jpeg)
            </label>
            <div className="text-black justify-between w-11/12 py-2 px-3   ">
              <FilePond files={files} onupdatefiles={setFiles} name='image'
                maxParallelUploads={1} allowBrowse={true} allowDrop={true}
                allowImageEdit={true} allowImageCrop={true} allowMultiple={false}
                imageCropAspectRatio='1:1' allowReorder={true}
                imageEditInstantEdit={true} allowImagePreview={true}
                imageTransformClientTransforms={'crop'} credits={false}
                onaddfile={(err, item) => {
                  if (err) return console.log(err)
                  const base64 = item.getFileEncodeBase64String()
                  setImage(base64)
                }}
                allowFileTypeValidation={true} acceptedFileTypes={['image/*']}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Cataegory Name
              </label>
              <input
                className="text-black justify-between  border rounded w-11/12 py-2 px-3   "
                id="Cname"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Category Name"
              />
            </div>
            <button className="px-4 py-2 text-white bg-green-500 rounded shadow-xl" type='submit'>
              Create
            </button>
            </form>
          </div>
        </div>
    </div>
  );
}

export default GameCategoryCreate;
