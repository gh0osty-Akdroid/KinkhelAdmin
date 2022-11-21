import React, { useState } from 'react';
import { Header } from '../../components';
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';


registerPlugin(FilePondPluginImagePreview, FilePondPluginImageCrop,FilePondPluginFileEncode)

import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { adminTokenUrl } from '../../Urls';
import { ErrorNotification, SuccessNotification } from '../../components/NotificationProvider';
import { Grid, PasswordInput } from '@mantine/core';
import MerchantJSON from "../../json/Merchant.json"
import { useNavigate } from 'react-router-dom';
import ReactPhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Title } from '../../components/Header';
import ErrorHandler from '../../components/ErrorHandler';

function MerchantCreate() {

  const history = useNavigate()
  const [error, setError] = useState("")

  const [files, setFiles] = useState()
  const [img, setImg] = useState('')
  const [user, setUser] = useState('')
  const [name, setName] = useState('')
  const [merchant_name, setMerchaantName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [store, setStore] = useState('')
  const [storephone, setStorePhone] = useState('')
  const [pan, setPan] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [ifuser, setIfUser] = useState(false)

  const site = useSelector(p=>p?.site?.site.id)
  const handleUser = () => {
    if (ifuser === false) {
      setIfUser(true)
    } else setIfUser(false)
  }


  const handleAddMerchant = (e) => {
    e.preventDefault()
    const body = {
      parent_company: merchant_name,
      store_address: store,
      pan_number: pan,
      region: site,
      site:site,
      name: name,
      phone: phone,
      store_phone: storephone,
      email: email,
      role: role,
      password: password,
      user_id: user,
      image: img
    }
    adminTokenUrl().post('/create-merchant', body).then((res) => {
      SuccessNotification({ title: "Added!", message: "Your merchant has been added." })
      history('/merchants')
    }).catch((err) => {

      ErrorHandler(err)
    })

  }
  useEffect(()=>{
    Title("Create Merchant")
  },[])




  return (
    <div className="m-2 md:m-10 mt-20 p-2 md:p-10 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl h-full">
      <Header category="Merchant" title="Create Merchnat" />
      <div className="mt-8 dark:text-gray-200 dark:bg-secondary-dark-bg">
        <div className="rounded-lg  dark:bg-secondary-dark-bg">
          <form onSubmit={handleAddMerchant}>
            <h2 className="ml-5 block  text-sm font-bold mb-2 ">
              Already a user? <input type={"checkbox"} onClick={handleUser} />
            </h2>
            <div className="mb-4">
              <h1 className='mb-2 text-center font-bold'>
                User Details
              </h1>

              {!ifuser ? <>
                <div className="m-4">
                  <h2 className="inline-block mb-2 text-gray-500">
                    Upload Image(jpg,png,svg,jpeg)
                  </h2>
                  <div className="w-full">
                    <FilePond
                      files={files}
                      allowFileEncode={true}
                      onupdatefiles={setFiles}
                      allowMultiple={false}
                      name="files"
                      onaddfile={(err, abc) => {
                        if (err) return console.log(err)
                        const base64 = abc.getFileEncodeDataURL()
                      }}
                      labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                    />
                  </div>
                </div>
                <Grid grow>
                  <Grid.Col span={6}>
                    <h2 className=" ml-5 block  text-sm font-bold mb-2">
                      Email
                    </h2>

                    <input
                      className="ml-5 justify-between border text-gray-500 rounded w-10/12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      value={email}
                      onChange={(e => setEmail(e.target.value))}
                      placeholder="Applicant Email"
                      required
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <h2 className=" ml-5 block  text-sm font-bold mb-2">
                      Name
                    </h2>

                    <input
                      className="ml-5 justify-between text-gray-500 shadow appearance-none border rounded  py-2 px-3 w-10/12 leading-tight focus:outline-none focus:shadow-outline"
                      value={name}
                      onChange={(e => setName(e.target.value))}
                      required
                      type="text"
                      placeholder="Applicant Name"
                    />
                  </Grid.Col>

                </Grid>
                <Grid grow>
                  <Grid.Col span={6}>
                    <h2 className=" ml-5 block  text-sm font-bold mb-2">
                      Phone
                    </h2>
                    <ReactPhoneInput inputStyle={{width:"83.333%"}}
                      className="ml-5 justify-between shadow text-gray-500 w-10/12 appearance-none rounded leading-tight focus:outline-none focus:shadow-outline"
                      id="Store"
                      type="text"
                      required
                      value={phone}
                      onChange={(e)=>setPhone(`+${e}`)}
                      placeholder="Applicant Phone"
                    />

                  </Grid.Col>
                  <Grid.Col span={6}>
                    <h2 className=" ml-5 block  text-sm font-bold mb-2">
                      Password
                    </h2>

                    <PasswordInput
                      className="ml-5 justify-between shadow text-gray-500 appearance-none border rounded   w-10/12 leading-tight focus:outline-none focus:shadow-outline"
                      value={password}
                      required
                      onChange={(e) => setPassword(e.currentTarget.value)}
                      placeholder="Password"
                    />

                  </Grid.Col>
                </Grid>
              </> :
                <>
                  <h2 className=" ml-5 block  text-sm font-bold mb-2">
                    User id
                  </h2>

                  <input
                    className="ml-5 justify-between shadow text-gray-500 appearance-none border rounded py-2 px-3 w-11/12 leading-tight focus:outline-none focus:shadow-outline"
                    value={user}
                    type="number"
                    required
                    onChange={(e => setUser(e.target.value))}
                    placeholder="User ID"
                  />

                </>}


              <h1 className='mb-5 mt-5 text-center font-bold'>
                Merchant Details
              </h1>
              <h2 className=" ml-5 block  text-sm font-bold mb-2">
                Merchant Name
              </h2>

              <input
                className="ml-5 mb-5 justify-between shadow text-gray-500 appearance-none border rounded w-11/12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                value={merchant_name}
                type="text"
                onChange={(e => setMerchaantName(e.target.value))}
                placeholder="Merchant Name"
              />
              <Grid grow>
                <Grid.Col span={6}>
                  <h2 className=" ml-5 block  text-sm font-bold mb-2">
                    Store Address
                  </h2>

                  <input
                    className="ml-5 mb-5 justify-between shadow text-gray-500 appearance-none border rounded w-10/12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    value={store}
                    onChange={(e => setStore(e.target.value))}
                    placeholder="Store Address"
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <h2 className=" ml-5 block  text-sm font-bold mb-2">
                    Store Phone
                  </h2>

                  <input
                    className="ml-5 mb-5 justify-between shadow text-gray-500 appearance-none border rounded w-10/12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    value={storephone}
                    onChange={(e => setStorePhone(e.target.value))}
                    placeholder="Store Phone"
                  />
                </Grid.Col>
              </Grid>
              <Grid grow>
                <Grid.Col span={6}>
                  <h2 className=" ml-5 block  text-sm font-bold mb-2">
                    Pan Number
                  </h2>

                  <input
                    className="ml-5 mb-5 justify-between shadow text-gray-500 appearance-none border rounded w-10/12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    value={pan}
                    onChange={(e => setPan(e.target.value))}
                    placeholder="Pan Number"
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <h2 className=" ml-5 block  text-sm font-bold mb-2">
                    Role
                  </h2>

                  <select
                    className="ml-5 mb-5 justify-between shadow text-gray-500 appearance-none border rounded w-11/12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e => setRole(e.target.value))}
                    value={role}
                  >
                    <option>--select--</option>
                    {MerchantJSON.map((e, i) => (
                      <option value={e.value}>{e.name}</option>
                    ))}
                  </select>
                </Grid.Col>
              </Grid>
              <button className="ml-5 px-4 py-2 text-white bg-green-500 rounded shadow-xl" type='submit'>
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MerchantCreate;
