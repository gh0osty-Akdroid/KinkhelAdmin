import React, { useEffect, useState } from 'react';
import { Header } from '../../components';
import { adminTokenUrl } from '../../Urls';
import { RichTextEditor } from '@mantine/rte';
import { Grid, Switch } from '@mantine/core';
import { SuccessNotification } from '../../components/NotificationProvider';
import ErrorHandler from '../../components/ErrorHandler';
import { Title } from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
registerPlugin(FilePondPluginImagePreview, FilePondPluginImageCrop, FilePondPluginFileEncode)
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

function GameEdit() {
  const history = useNavigate()


  const [name, setName] = useState("")
  const [prize, setPrize] = useState("")
  const [category_id, setCategoryId] = useState("")
  const [charge, setCharge] = useState("")
  const [winnig_numbers, setWinningNumbers] = useState("")
  const [total_numbers, setTotalNumbers] = useState("")
  const [allowed_numbers, setAllowedNumbers] = useState(3)
  const [description, setDescription] = useState("Please describe your game.")
  const [notes, setNotes] = useState("")
  const [opening_time, set_opening_time] = useState("")
  const [closing_time, set_closing_time] = useState("")
  const [images, setImage] = useState([])
  const [files, setFiles] = useState([])
  const [extra, setExtra] = useState(false)
  const [extra_total_numbers, setExtraTotalNumbers] = useState("")
  const [same_time, setSameTime] = useState(false)
  const [alternate, setAlternate] = useState(false)
  const [active_participants, setActiveParticipant] = useState(0)
  const [required_participants, setRequiredParticipant] = useState("")
  const [categories, setCat] = useState([])


  useEffect (()=>{
    
  },[])

  const handleExtra = () => {
    if (extra) setExtra(false)
    else setExtra(true)
  }

  const handleAlternateGame = () => {
    if (alternate) setAlternate(false)
    else setAlternate(true)
  }

  const updateGame = () => {
    const body = {
      name: name,
      prize: prize,
      category: category_id,
      charge: charge,
      winning_numbers: winnig_numbers,
      opening_time: opening_time,
      closing_time: closing_time,
      total_numbers: total_numbers,
      allowed_numbers: allowed_numbers,
      description: description,
      notes: notes,
      extra: extra,
      etra_total_number: extra_total_numbers,
      same_time: same_time,
      images: images,
      required_participants: required_participants,
      active_participants: active_participants,
      images: images
    }
    if (alternate) {
      adminTokenUrl().post('/alternate-games', body).then((res) => {
        SuccessNotification({ title: "Added!", message: "The Game has been added!" })
        history('/games/game')
      }).catch((err) => {
        console.log(err)
        ErrorHandler(err)
      })
    }
    else {
      adminTokenUrl().post('games', body).then((res) => {
        SuccessNotification({ title: "Added!", message: "The Game has been added!" })
        history('/games/game')
      }).catch((err) => {
        console.log(err)
        ErrorHandler(err)
      })
    }


  }




  useEffect(() => {
    Title("Add Game")
    adminTokenUrl().get('game-categories').then((res) => {
      setCat(res?.data?.data)
    }).catch(err => {
      ErrorHandler(err)
    })
  }, [])


  return (
    <div className="m-2 md:m-10 mt-20 p-2 md:p-10 rounded-3xl dark:text-gray-200 dark:bg-secondary-dark-bg h-full">
      <Header category="Game" title="Add Game" />
      <div className=" justify-cente">
        <div className="rounded-lg dark:text-gray-200 dark:bg-secondary-dark-bg bg-gray-50 ">
          <div className='flex justify-center text-white mt-5'>
            <Switch label="Alternate Game" className='text-white' onClick={handleAlternateGame} size="xl" />
          </div>
          <Grid grow>
            <Grid.Col sm={6}>
              <h2 className=" ml-5 block  text-sm font-bold mb-2">
                Game Name
              </h2>
              <input
                className="ml-5 justify-between text-black appearance-none border rounded w-11/12 py-2 px-3  leading-tight focus:outline-none focus:text-black-outline"
                id="Gname"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Game Name"
              />
            </Grid.Col>
            <Grid.Col sm={6}>
              <h2 className=" ml-5 block  text-sm font-bold mb-2">
                Display Game Name
              </h2>

              <select
                className="ml-5 justify-between text-black appearance-none border rounded w-11/12 py-2 px-3  leading-tight focus:outline-none focus:text-black-outline"
                id="Gname"
                type="text"
                onChange={(e) => setCategoryId(e.target.value)}
                placeholder="Category"
              >
                <option value={null}>--Select--</option>
                {categories.map((a, i) =>
                  <option key={i} value={a.uId}>{a.name}</option>
                )}

              </select>
            </Grid.Col>
            <Grid.Col sm={12}>
              <h2 className=" ml-5 block  text-sm font-bold mb-2">
                Game Description
              </h2>
              <RichTextEditor value={description} onChange={setDescription} className={"ml-5 justify-between text-black appearance-none border rounded py-2 px-3  leading-tight focus:outline-none focus:text-black-outline"} />
            </Grid.Col>
            <Grid.Col sm={12}>
              <h2 className=" ml-5 block  text-sm font-bold mb-2">
                Note
              </h2>

              <input
                className="ml-5 text-black appearance-none border rounded w-11/12 py-2 px-3  leading-tight focus:outline-none focus:text-black-outline"
                id="Gname"
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Note"
              />
            </Grid.Col>
            <Grid.Col sm={6}>
              <h2 className=" ml-5 block  text-sm font-bold mb-2">
                Prize
              </h2>
              <input
                className="ml-5 justify-between text-black appearance-none border rounded w-11/12 py-2 px-3  leading-tight focus:outline-none focus:text-black-outline"
                id="Gname"
                type="text"
                value={prize}
                onChange={(e) => setPrize(e.target.value)}
                placeholder="Prize"
              />
            </Grid.Col>
            {alternate ? "" :
              <Grid.Col sm={6}>
                <h2 className=" ml-5 block  text-sm font-bold mb-2">
                  Total Number (format: x-y)
                </h2>

                <input
                  className="ml-5 justify-between text-black appearance-none border rounded w-11/12 py-2 px-3  leading-tight focus:outline-none focus:text-black-outline"
                  id="Gname"
                  type="text"
                  value={total_numbers}
                  onChange={(e) => setTotalNumbers(e.target.value)}
                  placeholder="Ex: 0-9"
                />
              </Grid.Col>}
            <Grid.Col sm={6}>
              <h2 className=" ml-5 block  text-sm font-bold mb-2">
                Required Points
              </h2>

              <input
                className="ml-5 justify-between text-black appearance-none border rounded w-11/12 py-2 px-3  leading-tight focus:outline-none focus:text-black-outline"
                id="Gname"
                type="number"
                min={0}
                value={charge}
                onChange={(e) => setCharge(e.target.value)}
                placeholder="Required Points"
              />
            </Grid.Col> {
              alternate ? "" : <>
                <Grid.Col sm={6}>
                  <h2 className=" ml-5 block  text-sm font-bold mb-2">
                    Winning Number
                  </h2>

                  <input
                    className="ml-5 justify-between text-black appearance-none border rounded w-11/12 py-2 px-3  leading-tight focus:outline-none focus:text-black-outline"
                    id="Gname"
                    type="text"
                    value={winnig_numbers}
                    onChange={(e) => setWinningNumbers(e.target.value)}
                    placeholder="Ex: 1,2,3,4"
                  />
                </Grid.Col>
                <Grid.Col sm={6}>
                  <h2 className=" ml-5 block  text-sm font-bold mb-2">
                    Total allowed number
                  </h2>
                  <input
                    className="ml-5 justify-between text-black appearance-none border rounded w-11/12 py-2 px-3  leading-tight focus:outline-none focus:text-black-outline"
                    id="Gname"
                    type="number"
                    min={0}
                    value={allowed_numbers}
                    onChange={(e) => setAllowedNumbers(e.target.value)}
                    placeholder="A User Play Limit"
                  />
                </Grid.Col>
                <Grid.Col sm={6}>
                  <h2 className=" ml-5 block  text-sm font-bold mb-2">
                    <Switch label="Extra Number?" className='text-white' onClick={handleExtra} />
                  </h2>
                  {extra ?
                    <>
                      <input
                        className="ml-5 justify-between text-black appearance-none border rounded w-11/12 py-2 px-3  leading-tight focus:outline-none focus:text-black-outline"
                        id="Gname"
                        type="text"
                        value={extra_total_numbers}
                        onChange={(e) => setExtraTotalNumbers(e.target.value)}
                        placeholder="Ex: 0-9"
                      />

                    </> : ""
                  }
                </Grid.Col>
                <Grid.Col sm={6}>
                  <h2 className="ml-5 block  text-sm font-bold mb-2">
                    Pick Starting Date
                  </h2>
                  <div className="relative">
                    <input name="start" onChange={(e) => set_opening_time(e.target.value)} type="datetime-local" className="ml-5 justify-between text-black appearance-none border rounded w-11/12 py-2 px-3  leading-tight focus:outline-none focus:text-black-outline" placeholder="Select date start" />
                  </div>
                </Grid.Col>
                <Grid.Col sm={6}>
                  <h2 className="ml-5 block  text-sm font-bold mb-2">
                    Pick Closing Date
                  </h2>
                  <div className="relative">
                    <input name="end" type="datetime-local" onChange={(e) => set_closing_time(e.target.value)} className="ml-5 justify-between text-black appearance-none border rounded w-11/12 py-2 px-3  leading-tight focus:outline-none focus:text-black-outline" placeholder="Select date end" />
                  </div>
                </Grid.Col>
                <Grid.Col sm={6}>
                  <h2 className=" ml-5 block  text-sm font-bold mb-2">
                    <Switch onLabel="Yes" offLabel="No" checked={same_time} onChange={(event) => setSameTime(event.currentTarget.checked)} label="Occur Game at same time?" />
                  </h2>
                </Grid.Col>
              </>}
          </Grid>
          {alternate ?
            <Grid grow>
              <Grid.Col sm={12}>
                <h2 className=" ml-5 block  text-sm font-bold mb-2">
                  Images
                </h2>
                <div className="text-black justify-between py-2 px-3   ">
                  <FilePond files={files} onupdatefiles={setFiles} name='image'
                    maxParallelUploads={1} allowBrowse={true} allowDrop={true}
                    allowImageEdit={true} allowImageCrop={true} allowMultiple={true}
                    maxFiles={3}
                    imageCropAspectRatio='1:1' allowReorder={true}
                    imageEditInstantEdit={true} allowImagePreview={true}
                    imageTransformClientTransforms={'crop'} credits={false}
                    onaddfile={(err, item) => {
                      var items = images
                      const base64 = item.getFileEncodeBase64String()
                      items.push(base64)
                      setImage(items)
                      console.log(images)
                    }}
                    onremovefile={(err, item) => {
                      var items = images
                      const base64 = item.getFileEncodeBase64String()
                      items.pop(base64)
                      setImage(items)
                      console.log(images)
                    }}
                    allowFileTypeValidation={true} acceptedFileTypes={['image/*']}
                  />
                </div>
              </Grid.Col>
              <Grid.Col sm={6}>
                <h2 className=" ml-5 block  text-sm font-bold mb-2">
                  Required Participants
                </h2>
                <input
                  className="ml-5 justify-between text-black appearance-none border rounded w-11/12 py-2 px-3  leading-tight focus:outline-none focus:text-black-outline"
                  id="Gname"
                  type="number"
                  min={0}
                  value={required_participants}
                  onChange={(e) => setRequiredParticipant(e.target.value)}
                  placeholder="Required Participants"
                />
              </Grid.Col>
              <Grid.Col sm={6}>
                <h2 className=" ml-5 block  text-sm font-bold mb-2">
                  Active Participants
                </h2>
                <input
                  className="ml-5 justify-between text-black appearance-none border rounded w-11/12 py-2 px-3  leading-tight focus:outline-none focus:text-black-outline"
                  id="Gname"
                  type="number"
                  min={0}
                  value={active_participants}
                  onChange={(e) => setActiveParticipant(e.target.value)}
                  placeholder="Active Participants"
                />
              </Grid.Col>
            </Grid> : ""}



          <div className="flex p-2 space-x-4 justify-between">
            <button type="submit" className="px-4 py-2 text-white bg-green-500 rounded text-black" onClick={updateGame}>
              Create
            </button>
          </div>
        </div>
      </div>
    </div>

  );
}

export default GameEdit;
