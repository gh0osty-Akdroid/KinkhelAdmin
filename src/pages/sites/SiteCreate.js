import React, { useState } from 'react';
import { Header } from '../../components';
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';

import { Select, ColorInput } from '@mantine/core';

registerPlugin(FilePondPluginImagePreview, FilePondPluginImageCrop,FilePondPluginFileEncode)

import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { adminTokenUrl } from '../../Urls';
import { ErrorNotification, SuccessNotification } from '../../components/NotificationProvider';
import { Grid } from '@mantine/core';
import Country from "../../json/Country.json"
import { useNavigate } from 'react-router-dom';

function SiteCreate() {

  const history = useNavigate()

  const [sitename, setSiteName] = useState("")

  const [files, setFiles] = useState()
  const [logo, setLogo] = useState('')
  const [primary_color, setPrimary] = useState('')
  const [primary_dark_color, setPriDark] = useState('')
  const [primary_light_color, setPrimaryLight] = useState('')
  const [secondary_color, setSec] = useState('')
  const [secondary_dark_color, setSecDark] = useState('')
  const [secondary_light_color, SetSecLight] = useState('')

  const [text_on_primary_color, setTextPrim] = useState('')
  const [text_on_secondary_color, SetTextSec] = useState('')
  const [site_phone, SetPhone] = useState('')
  const [site_address, setSiteAddress] = useState('')
  const [site_email, setEmail] = useState('')

  const [site_region, setRegion] = useState("")

  const handleUser = () => {
    if (ifuser === false) {
      setIfUser(true)
    } else setIfUser(false)
  }


  const handleAddMerchant = (e) => {
    e.preventDefault()
    const body = {
      sitename: sitename,
      site_address: site_address,
      site_email: site_email,
      site_phone: site_phone,
      site_region: site_region,
      primary_color: primary_color,
      primary_dark_color: primary_dark_color,
      primary_light_color: primary_light_color,
      secondary_color: secondary_color,
      secondary_light_color: secondary_light_color,
      secondary_dark_color: secondary_dark_color,
      logo:logo,
      text_on_primary_color:text_on_primary_color,
      text_on_secondary_color:text_on_secondary_color
    }

    adminTokenUrl().post('/site-config', body).then((res) => {
      SuccessNotification({ title: "Added!", message: "Your site setting has been added." })
      history('/sites')
    }).catch((err) => {
      console.log(err);
      if (err?.response?.status === 406) return ErrorNotification({ title: "Error!", message: err?.response?.data?.error?.errors[0].msg })
      else return ErrorNotification({ title: "Error!", message: "Something went wrong!!" })
    })

  }




  return (
    <div className="m-2 md:m-10 mt-20 p-2 md:p-10 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl h-full">
      <Header category="Site" title="Create Site" />
      <div className="mt-8 dark:text-gray-200 dark:bg-secondary-dark-bg">
        <div className="rounded-lg  dark:bg-secondary-dark-bg">
          <form onSubmit={handleAddMerchant}>
            <div className="m-4">
              <h2 className="inline-block mb-2 text-gray-500">
                Upload Logo(jpg,png,svg,jpeg)
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
                    setLogo(base64)
                  }}
                  labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                />
              </div>
            </div>
            <Grid grow>
              <Grid.Col span={6}>
                <h2 className=" ml-5 block  text-sm font-bold mb-2">
                  Site Name
                </h2>

                <input
                  className="ml-5 mb-5 justify-between shadow text-gray-500 appearance-none border rounded w-10/12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  value={sitename}
                  onChange={(e => setSiteName(e.target.value))}
                  placeholder="Site Name"
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <h2 className=" ml-5 block  text-sm font-bold mb-2">
                  Site Email
                </h2>

                <input
                  className="ml-5 mb-5 justify-between shadow text-gray-500 appearance-none border rounded w-10/12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  value={site_email}
                  onChange={(e => setEmail(e.target.value))}
                  placeholder="Site Email"
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <h2 className=" ml-5 block  text-sm font-bold mb-2">
                  Site Phone
                </h2>

                <input
                  className="ml-5 mb-5 justify-between shadow text-gray-500 appearance-none border rounded w-10/12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  value={site_phone}
                  onChange={(e => SetPhone(e.target.value))}
                  placeholder="Site Phone"
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <h2 className=" ml-5 block  text-sm font-bold mb-2">
                  Site Address
                </h2>

                <input
                  className="ml-5 mb-5 justify-between shadow text-gray-500 appearance-none border rounded w-10/12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  value={site_address}
                  onChange={(e => setSiteAddress(e.target.value))}
                  placeholder="Site Address"
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <h2 className=" ml-5 block  text-sm font-bold mb-2">
                  Region
                </h2>
                <Select
                  placeholder="Pick one Region"
                  onChange={setRegion}
                  className="ml-5 mb-5 justify-between shadow text-black  rounded w-11/12   leading-tight focus:outline-none focus:shadow-outline"
                  searchable
                  nothingFound="No options"
                  maxDropdownHeight={280}
                  data={Country}
                />

              </Grid.Col>
              <Grid.Col span={6}>
                <h2 className=" ml-5 block  text-sm font-bold mb-2">
                  Primary Color
                </h2>

                <ColorInput defaultValue="#C5D899"
                  onChange={setPrimary}
                 className="ml-5 mb-5 justify-between shadow text-black  rounded w-11/12   leading-tight focus:outline-none focus:shadow-outline" format="hex" />

              </Grid.Col>
              <Grid.Col span={6}>
                <h2 className=" ml-5 block  text-sm font-bold mb-2">
                  Primary dark Color
                </h2>

                <ColorInput onChange={setPriDark} className="ml-5 mb-5 justify-between shadow text-black  rounded w-11/12   leading-tight focus:outline-none focus:shadow-outline" format="hex" />

              </Grid.Col>
              <Grid.Col span={4}>
                <h2 className=" ml-5 block  text-sm font-bold mb-2">
                  Primary Light Color
                </h2>

                <ColorInput  onChange={setPrimaryLight} defaultValue="#C5D899" className="ml-5 mb-5 justify-between shadow text-black  rounded w-11/12   leading-tight focus:outline-none focus:shadow-outline" format="hex" />

              </Grid.Col>
              <Grid.Col span={4}>
                <h2 className=" ml-5 block  text-sm font-bold mb-2">
                  Secondary Color
                </h2>

                <ColorInput  onChange={setSec} defaultValue="#C5D899" className="ml-5 mb-5 justify-between shadow text-black  rounded w-11/12   leading-tight focus:outline-none focus:shadow-outline" format="hex" />
              </Grid.Col>
              <Grid.Col span={4}>
                <h2 className=" ml-5 block  text-sm font-bold mb-2">
                  Secondary Dark Color
                </h2>

                <ColorInput defaultValue="#C5D899" onChange={setSecDark} className="ml-5 mb-5 justify-between shadow text-black  rounded w-11/12   leading-tight focus:outline-none focus:shadow-outline" format="hex" />
              </Grid.Col>
              <Grid.Col span={4}>
                <h2 className=" ml-5 block  text-sm font-bold mb-2">
                  Secondary Light Color
                </h2>

                <ColorInput defaultValue="#C5D899" onChange={SetSecLight} className="ml-5 mb-5 justify-between shadow text-black  rounded w-11/12   leading-tight focus:outline-none focus:shadow-outline" format="hex" />

              </Grid.Col>
              <Grid.Col span={4}>
                <h2 className=" ml-5 block  text-sm font-bold mb-2">
                  Text on Primary Color
                </h2>

                <ColorInput defaultValue="#C5D899" onChange={setTextPrim} className="ml-5 mb-5 justify-between shadow text-black  rounded w-11/12   leading-tight focus:outline-none focus:shadow-outline" format="hex" />


              </Grid.Col>
              <Grid.Col span={4}>
                <h2 className=" ml-5 block  text-sm font-bold mb-2">
                  Text on Secondary Color
                </h2>

                <ColorInput defaultValue="#C5D899" onChange={SetTextSec} className="ml-5 mb-5 justify-between shadow text-black  rounded w-11/12   leading-tight focus:outline-none focus:shadow-outline" format="hex" />
              </Grid.Col>

            </Grid>

            <button className="ml-5 px-4 py-2 text-white bg-green-500 rounded shadow-xl" type='submit'>
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SiteCreate;
