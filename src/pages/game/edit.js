import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../components';
import { adminTokenUrl } from '../../Urls';

function GameEdit() {

  const {id}= useParams()

  const [done, setDone] = useState(false)
  
  const [name, setName] = useState("")
  const [prize, setPrize] = useState("")
  const [category_id, setCategoryId] = useState("")
  const [charge, setCharge] = useState("")
  const [winnig_numbers, setWinningNumbers] = useState("")
  const [total_numbers, setTotalNumbers] = useState("")
  const [allowed_numbers, setAllowedNumbers] = useState("")
  const [description, setDescription] = useState("")
  const [notes, setNotes] = useState("")
  const [winnig_image, setWinningImage] = useState("")
  const [extra, setExtra] = useState("")
  const [extra_total_numbers, setExtraTotalNumbers] = useState("")
  const [same_time, setSameTime] = useState("")


  useEffect(()=>{
    adminTokenUrl().get(`/game/${id}`).then(res=>{

    })
  },[])

  const updateGame =()=>{
   const body = {
    name:name,
    prize:prize,
    category_id:category_id,
    charge:charge,
    winnig_image:winnig_image,
    winnig_numbers:winnig_numbers,
    total_numbers:total_numbers,
    allowed_numbers:allowed_numbers,
    description:description,
    notes:notes,
    extra:extra,
    extra_total_numbers:extra_total_numbers,
    same_time:same_time

   }

   adminTokenUrl().put('games', body).then((res)=>{

   }).catch((Err)=>{
    
   })


    
  }




  return (
    <div className="m-2 md:m-10 mt-20 p-2 md:p-10 rounded-3xl dark:text-gray-200 dark:bg-secondary-dark-bg h-full">
      <Header category="Game" title="Edit Game" />

      {done? <><p>Your game has been updated</p></>:
      <div className="flex justify-center mt-8">
        <div className="rounded-lg  dark:text-gray-200 dark:bg-secondary-dark-bg bg-gray-50 lg:w-1/2">
          <div className="m-4">
            <h2 className="inline-block mb-2 text-gray-500">
              Upload Image(jpg,png,svg,jpeg)
            </h2>
            <div className="flex items-center justify-center w-full">
              <h2 className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                    Select a photo
                  </p>
                </div>
                <input type="file" className="opacity-0" />
              </h2>
            </div>
          </div>
          <div className="mb-4">
            <h2 className=" ml-5 block  text-sm font-bold mb-2">
              Game Name
            </h2>

            <input
              className="ml-5 justify-between shadow appearance-none border rounded w-11/12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              id="Gname"
              type="text"
              placeholder="Game Name"
            />

            <h2 className=" ml-5 block  text-sm font-bold mb-2">
              Category
            </h2>

            <input
              className="ml-5 justify-between shadow appearance-none border rounded w-11/12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              id="Gname"
              type="text"
              placeholder="Category"
            />

            <h2 className=" ml-5 block  text-sm font-bold mb-2">
              Game Description
            </h2>

            <input
              className="ml-5 justify-between shadow appearance-none border rounded w-11/12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              id="Gname"
              type="text"
              placeholder="Game Description"
            />

            <h2 className=" ml-5 block  text-sm font-bold mb-2">
              Note
            </h2>

            <input
              className="ml-5 justify-between shadow appearance-none border rounded w-11/12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              id="Gname"
              type="text"
              placeholder="Note"
            />
            <h2 className=" ml-5 block  text-sm font-bold mb-2">
              Prize
            </h2>

            <input
              className="ml-5 justify-between shadow appearance-none border rounded w-11/12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              id="Gname"
              type="text"
              placeholder="Prize"
            />
            <h2 className=" ml-5 block  text-sm font-bold mb-2">
              Required Points
            </h2>

            <input
              className="ml-5 justify-between shadow appearance-none border rounded w-11/12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              id="Gname"
              type="text"
              placeholder="Required Points"
            />

            <h2 className=" ml-5 block  text-sm font-bold mb-2">
              Number of Winners
            </h2>

            <input
              className="ml-5 justify-between shadow appearance-none border rounded w-11/12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              id="Gname"
              type="text"
              placeholder="Number of Winners"
            />

            <h2 className=" ml-5 block  text-sm font-bold mb-2">
              Number of Players
            </h2>

            <input
              className="ml-5 justify-between shadow appearance-none border rounded w-11/12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              id="Gname"
              type="text"
              placeholder="Number of Players"
            />

            <h2 className=" ml-5 block  text-sm font-bold mb-2">
              Allowed Number
            </h2>

            <input
              className="ml-5 justify-between shadow appearance-none border rounded w-11/12 py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
              id="Gname"
              type="text"
              placeholder="Allowed Number"
            />

            <h2 className="ml-5 block  text-sm font-bold mb-2">
              Pick Start Date
            </h2>
            <div date-rangepicker className="flex items-center">
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="ml-5 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
                </div>
                <input name="start" type="text" className="ml-5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date start" />
              </div>
              <span className=" ml-5 text-gray-500">to</span>
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
                </div>
                <input name="end" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date end" />
              </div>
            </div>
            <div className="flex p-2 space-x-4 justify-between">
              <button type="submit" className="px-4 py-2 text-white bg-red-500 rounded shadow-xl">
                Cancel
              </button>

              <button type="submit" className="px-4 py-2 text-white bg-green-500 rounded shadow-xl">
                Create
              </button>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default GameEdit;
