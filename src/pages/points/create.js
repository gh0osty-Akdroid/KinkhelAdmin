import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components";
import ErrorHandler from "../../components/ErrorHandler";
import { SuccessNotification } from "../../components/NotificationProvider";
import { adminTokenUrl } from "../../Urls";
function PointCreate() {


  const history = useNavigate()

  const [data, setData] = useState('')
  const [error, setError] = useState('')

  const [loginpoint, setLoginPoint] = useState('')
  const [registerPoint, setRegisterPoint] = useState('')
  const [value, setValue] = useState('')
  const [price, setPrice] = useState('')



  const handleAdd = (e) => {
    e.preventDefault()
    const body = {
      login_points: loginpoint,
      register_points: registerPoint,
      value: value,
      price: price,
    }
    adminTokenUrl().post(`/pointsConfig`, body).then((res) => {
      SuccessNotification({title:"Added!", message:"The point config has been added."})
    })
      .catch((err) => {
        ErrorHandler(err)
      })
  }


  return (
    <div className="m-2 md:m-10 mt-20 p-2 md:p-10 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl h-full">
      <Header category="Points" title="Add Points" />
      <div className="mt-8 dark:text-gray-200 dark:bg-secondary-dark-bg">
        <div className="rounded-lg shadow-xl dark:bg-secondary-dark-bg">
          <div className="mt-8 dark:text-gray-200 dark:bg-secondary-dark-bg">
            <div className="rounded-lg dark:bg-secondary-dark-bg">

              
              <h2 className=" ml-5 block text-gray-700 text-sm font-bold mb-2 dark:text-gray-200">
                Point Value
              </h2>
              <input
                className="ml-5  mb-3 justify-between shadow appearance-none border rounded w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Cname"
                value={value}
                min="0"
                type="number"
                placeholder="Point Value"
                onChange={((e) => setValue(e.target.value))}
              />
              <h2 className=" ml-5 block text-gray-700 text-sm font-bold mb-2 dark:text-gray-200">
                Price
              </h2>
              <input
                className="ml-5  mb-3 justify-between shadow appearance-none border rounded w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Cname"
                min="0"
                value={price}
                type="number"

                placeholder="Price"
                onChange={((e) => setPrice(e.target.value))}
              />
              <h2 className=" ml-5 block text-gray-700 text-sm font-bold mb-2 dark:text-gray-200">
                Login Point   <small>  must be in (sun,mon,tue,wed,thu,fri,sat) format</small>
              </h2>
              <input
                className="ml-5 mb-3 justify-between shadow appearance-none border rounded w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Cname"
                type="text"
                placeholder="x,x,x,x,x,x,x"
                value={loginpoint}
                onChange={((e) => setLoginPoint(e.target.value))}
              />
              <h2 className=" ml-5 block text-gray-700 text-sm font-bold mb-2 dark:text-gray-200">
                Register Point
              </h2>
              <input
                className="ml-5 mb-3 justify-between shadow appearance-none border rounded w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Cname"
                type="text"
                placeholder="Register Point "
                value={registerPoint}
                onChange={((e) => setRegisterPoint(e.target.value))}
              />
              <div className="flex p-2 space-x-4 justify-between">


                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-green-500 rounded shadow-xl" onClick={handleAdd}
                >
                  Add
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default PointCreate;
