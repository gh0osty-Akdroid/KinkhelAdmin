import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components';
import ErrorHandler from '../../components/ErrorHandler';
import { Loadings } from '../../components/Loading';
import { adminTokenUrl } from '../../Urls';
import LoginPage from '../LoginPage';

function PointConfig() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
    adminTokenUrl().get('/pointsConfigs').then((res) => {
      setData(res?.data?.data["rows"])
    }).catch((err) => {
      console.log(err)
      ErrorHandler(err)
    })
  }, [])


  return (
    <div className="m-2 md:m-10 mt-18 p-2 md:p-10 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl">
      <Header category="Point Configuration" title="List of Points" />

      <Link to="create" >
        <button className="text-white dark:text-gray-400 font-bold py-2 px-4 rounded mb-2 border">
          Create Point Config
        </button>
      </Link>

      {loading ? <Loadings /> :
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Point ID
                </th>
                <th scope="col" className="py-3 px-6">
                  Price
                </th>
                <th scope="col" className="py-3 px-6">
                  Point Value
                </th>
                <th scope="col" className="py-3 px-6">
                  Login Point
                </th>
                <th scope="col" className="py-3 px-6">
                  Register Point
                </th>
                <th scope="col" className="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ?
                data.map((e, i) =>
                  <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="py-4 px-6">
                      {i}
                    </td>
                    <td className="py-4 px-6">
                      {e.price}
                    </td>

                    <td className="py-4 px-6">
                      {e.value}
                    </td>

                    <td className="py-4 px-6">
                      {e.login_points}
                    </td>
                    <td className="py-4 px-6">
                      {e.register_points}
                    </td>


                    <td className="py-4 px-6">
                      <Link to={`${e.id}/edit`}>
                        <p className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-2">
                          Edit
                        </p>
                      </Link>


                    </td>
                  </tr>
                ) : <p className='p-5'>No data found</p>
              }




            </tbody>
          </table>

        </div>
      }
    </div>
  )
}

export default PointConfig;