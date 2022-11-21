import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components';
import ErrorHandler from '../../components/ErrorHandler';
import { SuccessNotification } from '../../components/NotificationProvider';
import { adminTokenUrl } from '../../Urls';

function NotificationCreate() {

  const history = useNavigate()
  const [web_link, setWebLink] = useState('')
  const [app_link, setAppLink] = useState('')
  const [notification_msg, setNotificationMsg] = useState('')
const [error, setError] = useState('')


  const handleAdd = (e) => {
    e.preventDefault()
    const body = {
      web_link: web_link,
      app_link: app_link,
      notification_msg: notification_msg,

    }
    adminTokenUrl().post(`/add-notification`, body).then((res) => {
      SuccessNotification({title:"Added!", message:"Your notification has been added!"})
      history('/notifications')
    }).catch((err) => { ErrorHandler(err) })
  }



  return (
    <div className="m-2 md:m-10 mt-20 p-2 md:p-10 dark:text-gray-200 dark:bg-secondary-dark-bg rounded-3xl h-full">
      <Header category="Notifications" title="Add New Notification" />
      <div className="mt-8 dark:text-gray-200 dark:bg-secondary-dark-bg">
        <div className="rounded-lg  dark:bg-secondary-dark-bg">
          <div className="mb-4">
            {error?error:
            <form  >
              <h2 className=" ml-5 block text-gray-700 text-sm font-bold mb-2 dark:text-gray-200">
                Web links
              </h2>
              <input
                className="ml-5  mb-3 justify-between shadow appearance-none border rounded w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Cname"
                type="text"
                placeholder="Web Link"
                onChange={((e) => setWebLink(e.target.value))}
              />
              <h2 className=" ml-5 block text-gray-700 text-sm font-bold mb-2 dark:text-gray-200">
                Application Links
              </h2>
              <input
                className="ml-5 mb-3 justify-between shadow appearance-none border rounded w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Cname"
                type="text"
                placeholder="App Link"
                onChange={((e) => setAppLink(e.target.value))}
              />


              <h2 className=" ml-5 block text-gray-700 text-sm font-bold mb-2 dark:text-gray-200">
                Message
              </h2>
              <textarea id="message" rows="4" class="block ml-5 p-2.5 w-11/12 text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a message..." onChange={((e) => setNotificationMsg(e.target.value))}>{notification_msg}</textarea>
              <div className="flex p-2 space-x-4 justify-between">
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-green-500 rounded shadow-xl" onClick={handleAdd}>
                  Create
                </button>
              </div>
              </form>
}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationCreate;