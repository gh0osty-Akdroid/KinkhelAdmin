import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Header } from '../../components';
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';

registerPlugin(FilePondPluginImagePreview, FilePondPluginImageCrop, FilePondPluginFileEncode)

import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { adminTokenUrl, ImgUrl } from '../../Urls';
import { Grid, PasswordInput } from '@mantine/core';
import { ErrorNotification, SuccessNotification } from '../../components/NotificationProvider';
import { useNavigate } from 'react-router-dom';
import ErrorHandler from '../../components/ErrorHandler';


function ProfileView() {
  useEffect(()=>{
    setTimeout(() => setLoading(false), 1000)

    adminTokenUrl().get(`/profile`).then((res)=>{
      setUser(res.data?.data)
      setName(res?.data?.data.name);
    }).catch((err)=>{
      ErrorHandler(err)
    })
  },[])

  const users = useSelector(p => p.user?.user)
  const [files, setFiles] = useState()
  const [img, setImg] = useState('')
  const [password, setPassword] = useState("")
  const [user, setUser] = useState("")
  const [new_password,SetNewPassword] = useState("")
  const [name, setName] = useState("")





  const handlePassword = (e) => {
    e.preventDefault()
    const body = {
      old_password: password,
      new_password: new_password
    }
    adminTokenUrl().post('change-password', body).then((res) => {
      SuccessNotification({title:"Updated Sucessfully", message:"Your password has been changed."})
      useNavigate('/profile')
    }).catch((err)=>{
      if (err.response.status===406) return ErrorNotification({title:"Error!", message:"Your Old Password is InCorrect"})
      ErrorNotification({title:"Error!", message:"Something went wrong"})
    })
  }

  

  const updateProfile = (e) => {
    e.preventDefault()
    const body = {
      name: name,
      image: img
    }

    adminTokenUrl().put("/profile", body).then((res) => {
      SuccessNotification({title:"Updated Sucessfully", message:"Your profile has been changed."})
      history('/profile')
    })
  }

  return (

    <div className="m-2 md:m-10 mt-5 p-2 md:p-10 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl h-full">
      <Header category="Profile" title={`${user.name}`} />

      <div className=" md:mt-0 md:col-span-2 dark:bg-secondary-dark-bg">
        <form>
          <div className=" sm:rounded-md sm:overflow-hidden dark:bg-secondary-dark-bg">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6 dark:bg-secondary-dark-bg">
              <div>
                <label className="block text-sm font-medium text-gray-700 ml-3 dark:bg-secondary-dark-bg dark:text-gray-200">Photo</label>
                <div className="mt-1 items-center ml-3 dark:bg-secondary-dark-bg">
                  {user.image !== null?<>
                  <Grid grow>
                    <Grid.Col sm={3}>
                    <img className='inline-block h-40 w-40 rounded-full overflow-hidden bg-gray-100 dark:bg-secondary-dark-bg text-center' 
                    src={`${ImgUrl}${user?.image}`} />

                    </Grid.Col>
                    <Grid.Col sm={9}>
                    <FilePond files={files} onupdatefiles={setFiles} name='image'
                        maxParallelUploads={1} allowBrowse={true} allowDrop={true}
                        allowImageCrop={true} allowImagePreview={true}
                        imageTransformClientTransforms={'crop'} credits={false}
                        onaddfile={(err, item) => {
                          if (err) return console.log(err)
                          const base64 = item.getFileEncodeBase64String()
                          setImg(base64)
                        }}
                        allowFileTypeValidation={true} acceptedFileTypes={['image/*']}
                      />
                    </Grid.Col>
                  
                      </Grid>
                      </>
                    : <>
                      <FilePond files={files} onupdatefiles={setFiles} name='image'
                        maxParallelUploads={1} allowBrowse={true} allowDrop={true}
                        allowImageCrop={true} allowImagePreview={true}
                        imageTransformClientTransforms={'crop'} credits={false}
                        onaddfile={(err, item) => {
                          if (err) return console.log(err)
                          const base64 = item.getFileEncodeBase64String()
                          setImg(base64)
                        }}
                        allowFileTypeValidation={true} acceptedFileTypes={['image/*']}
                      />
                    </>
                  }

                </div>
              </div>

              <h2 className=" ml-5 block text-gray-700 text-sm font-bold mb-2 dark:text-gray-200">
                Name
              </h2>


              <input
                className="ml-5 justify-between shadow appearance-none border rounded w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text" placeholder='name' value={name} onChange={((e) => setName(e.target.value))}

              />
              <button onClick={updateProfile}
                type="submit"
                className="ml-5 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                update Profile
              </button>
              <Grid>
              <Grid.Col sm={6}>
              <h2 className=" ml-5 block text-gray-700 text-sm font-bold mb-2 dark:text-gray-200">
                Old Password
              </h2>

              <PasswordInput
                className="ml-5 justify-between shadow appearance-none border rounded w-11/12 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Old Password"
              />
              </Grid.Col>
              <Grid.Col sm={6}>
              <h2 className=" ml-5 block text-gray-700 text-sm font-bold mb-2 dark:text-gray-200">
                New Password
              </h2>

              <PasswordInput
                className="ml-5 justify-between shadow appearance-none border rounded w-11/12  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={new_password}
                onChange={(e)=>SetNewPassword(e.target.value)}
                placeholder="New Password"
              />
              </Grid.Col>
              </Grid>
              <button
                onClick={handlePassword}
                className="ml-5 inline-flex justify-right py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update Password
              </button>


            </div>

          </div>
        </form>
      </div>





    </div>


  )
}

export default ProfileView;