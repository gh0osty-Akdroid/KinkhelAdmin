import { Button, Grid, Modal } from '@mantine/core'
import RichTextEditor from '@mantine/rte'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams, useRoutes, Link } from 'react-router-dom'
import { Header } from '../../components'
import ErrorHandler from '../../components/ErrorHandler'
import { Title } from '../../components/Header'
import { Loadings } from '../../components/Loading'
import { adminTokenUrl } from '../../Urls'
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
registerPlugin(FilePondPluginImagePreview, FilePondPluginImageCrop, FilePondPluginFileEncode)




const GamesHistory = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [refresh, setRefresh] = useState(false)
  const { id } = useParams()
  const [opened, setOpened] = useState(false);
  const [openeed, setOpeneed] = useState(false);
  const [recent, setRecent] = useState("");
  const [image, setImage] = useState("")
  const [files, setFiles] = useState("")
  const [name, setName] = useState('')
  const [info, setInfo] = useState('')
  const [others, setOther] = useState('')
  const [winning_number, setWinningNumber] = useState('')




  useEffect(() => {
    Title("Games History")
    setTimeout(() => setLoading(false), 1000)
    adminTokenUrl().get(`iterations/${id}`).then((res) => {
      setData(res?.data?.data)
      console.log(res?.data?.data)
      setRefresh(false)
    }).catch((err) => {
      console.log(err)
      ErrorHandler(err)
    })
  }, [refresh])



  const handleAddWinner = (e) => {
    e.preventDefault()
    const body={
      name:name,
      image:image, 
      iteration_id:recent,
      other:others, 
      info:info
    }
    adminTokenUrl().post('/winners', body).then(res=>{
      setRefresh(true)
      setOpened(false)
    }).then((err)=>{
      console.log(err)
      ErrorHandler(err)
    })
  }

  const handleAddWinningNumber = (e) => {
    e.preventDefault()
    const body={
      winning_number:winning_number,
      iteration_id:recent,
    }
    console.log(body)
    adminTokenUrl().post('/iterations', body).then(res=>{
      setRefresh(true)
      setOpeneed(false)
    }).then((err)=>{
      ErrorHandler(err)
    })
  }


  return (
    <>
      <div className="m-2 md:m-10 mt-18 p-2 md:p-10 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl">
        <Header category="Games" title="List of Game History" />


        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">

          {loading ? <Loadings /> :
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Id
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Winning Number
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Winners
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Show Participants
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ?
                  data.map((e) =>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="py-4 px-6">
                        {e.id}
                      </td>
                      <td className="py-4 px-6">
                        {e.winning_number ? e.winning_number : <Button onClick={() => {
                          setRecent(e.id)
                          setOpeneed(true)
                        }}>Add Winnig Number</Button>}
                      </td>
                      <td className="py-4 px-6">
                        {e.Winner ? e.Winner.name : <Button onClick={() => {
                          console.log(e.id)
                          setRecent(e.id)
                          setOpened(true)
                        }}>Add Winner</Button>}
                      </td>
                      <td className="py-4 px-6">
                        <Link to={`${e.id}/users`}>
                          Show Participants
                        </Link>
                      </td>

                    </tr>
                  ) :
                  <><tr className='p-5'>No data Found</tr></>}


              </tbody>
            </table>
          }
        </div>
      </div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add Winner."
      >
        <Grid grow>
          <Grid.Col sm={12}>
            <h2 className=" ml-5 block  text-sm font-bold mb-2">
              Winner Name
            </h2>
            <input
              className="ml-5 justify-between text-black appearance-none border rounded w-11/12 py-2 px-3  leading-tight focus:outline-none focus:text-black-outline"
              id="Gname"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Winner Name"
            />
          </Grid.Col>

          <Grid.Col sm={12}>
            <h2 className=" ml-5 block  text-sm font-bold mb-2">
              About Info
            </h2>
            <RichTextEditor value={info} onChange={setInfo} className={"ml-5 justify-between text-black appearance-none border rounded w-11/12 py-2 px-3  leading-tight focus:outline-none focus:text-black-outline"} />
          </Grid.Col>
          <Grid.Col sm={12}>
            <h2 className=" ml-5 block  text-sm font-bold mb-2">
              Others
            </h2>
            <input
              className="ml-5 justify-between text-black appearance-none border rounded w-11/12 py-2 px-3  leading-tight focus:outline-none focus:text-black-outline"
              id="Gname"
              type="text"
              value={others}
              onChange={(e) => setOther(e.target.value)}
              placeholder="Others"
            />
          </Grid.Col>
          <Grid.Col sm={12}>
            <h2 className=" ml-5 block  text-sm font-bold mb-2">
              Image
            </h2>
            <div className="text-black justify-between rounded w-11/12 py-2 px-3">
              <FilePond
                files={files}
                allowFileEncode={true}
                onupdatefiles={setFiles}
                allowMultiple={false}
                name="files"
                onaddfile={(err, abc) => {
                  if (err) return console.log(err)
                  const base64 = abc.getFileEncodeBase64String()
                  setImage(base64)
                }}
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
              />
            </div>
          </Grid.Col>
          <Button onClick={handleAddWinner} variant="outline">Submit</Button>


        </Grid>

      </Modal>
      <Modal
        opened={openeed}
        onClose={() => setOpeneed(false)}
        title="Add Winning Number"
      >
        <Grid grow>
          <Grid.Col sm={12}>
            <h2 className=" ml-5 block  text-sm font-bold mb-2">
              Winner Number
            </h2>
            <input
              className="ml-5 justify-between text-black appearance-none border rounded w-11/12 py-2 px-3  leading-tight focus:outline-none focus:text-black-outline"
              id="Gname"
              type="text"
              value={winning_number}
              onChange={(e) => setWinningNumber(e.target.value)}
              placeholder="Winning Number"
            />
          </Grid.Col>
          <Button onClick={handleAddWinningNumber} variant="outline">Submit</Button>


        </Grid>

      </Modal>
    </>

  )
}

export default GamesHistory