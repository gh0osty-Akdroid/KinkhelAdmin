import React, { useEffect, useState } from 'react'
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { Link } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider';
import { adminTokenUrl } from '../Urls';
import ErrorHandler from '../components/ErrorHandler';
import Header, { Title } from '../components/Header';
import { Loadings } from '../components/Loading';


const Dashboard = () => {

  const DropDown = ({ currentMode }) => (
    <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
      <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropdownData} popupHeight="220px" popupWidth="120px" />
    </div>
  );
  const { currentColor, currentMode } = useStateContext();


  const [loading, setLoading] = useState(true)

  const [users, setUsers] = useState([])
  const [merchant, setMerchant] = useState([])



  useEffect(() => {
    setTimeout(()=>setLoading(false), 1000)
    Title("Dashboard")
    adminTokenUrl().get('/all-users?page=1').then((res) => {
      setUsers(res?.data?.data?.data);
      setLoading(false)
    }).catch((err) => {
      ErrorHandler(err)
    })
    adminTokenUrl().get('/merchants?page=1').then((res) => {
      setMerchant(res?.data?.data?.data);
      console.log(res?.data?.data?.data)
      setLoading(false)
    }).catch((err) => {
      ErrorHandler(err)
    })
  }, [])


  return (
    loading? <Loadings/> :
    <div className="mt-18">
      <div className="lg:flex-nowrap justify-center ">
        <div className="lg:flex-nowrap justify-center p-10">
          <Header category={"Users"} title={"Last 25 Users"} />

          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Phone
                </th>
                <th scope="col" className="py-3 px-6">
                  Status
                </th>

              </tr>
            </thead>
            <tbody>
              {users.length>0 ?
              users.map((e) =>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
                    <Link to={`/customers/${e.id}/show`}>
                      <div className="pl-3">
                        <div className="text-base font-semibold">{e.name}</div>
                        <div className="font-normal text-gray-500">{e.email}</div>
                      </div>
                    </Link>
                  </th>


                  <td className="py-4 px-6">
                    {e.phone}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      {!e.banned ? <><div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2" /> Enabled</> : <>  <div className="h-2.5 w-2.5 rounded-full bg-red-400 mr-2" /> Disabled</>}

                    </div>
                  </td>

                </tr>
              ):<p className='p-5'>No data found</p>}
            </tbody>
          </table><div className='p-4'></div>
          <Header category={"Merchant"} title={"Last 25 Merchant"} />

          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Phone
                </th>
              

              </tr>
            </thead>
            <tbody>
              {merchant.length>0 ?
              merchant.map((e) =>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
                  
                      <div className="pl-3">
                        <div className="text-base font-semibold">{e.parent_company}</div>
                      </div>
                  </th>


                  <td className="py-4 px-6">
                    {e.store_phone}
                  </td>
                </tr>
              ):<p className='p-5'>No data found</p>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default Dashboard

