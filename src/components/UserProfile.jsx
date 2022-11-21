import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import { Button } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchTokenSuccess } from '../action/Token';
import { fetchUserSuccess } from '../action/UserAction';
import { SuccessNotification } from './NotificationProvider';

const UserProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentColor } = useStateContext();
  const user = useSelector(p => p?.user?.user)

  const handleLogout = () => {
    dispatch(fetchTokenSuccess(null))
    dispatch(fetchUserSuccess(null))
    navigate('/login')
    SuccessNotification({title:"Thank you!", message:"You have been logged off."})
  }


  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <div>
          <p className="font-semibold text-xl dark:text-gray-200"> {user.name} </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> {user.email} </p>
        </div>
      </div>
      <div className="mt-5">
        <Link to={"/profile"}>
        <Button
          color="white"
          bgColor={currentColor}
          text="Update Profile"
          borderRadius="10px"
          width="full"
        />
        </Link>
      </div>
      <div className="mt-5" >
        <a onClick={handleLogout}>
        <Button 
          color="white"
          bgColor={currentColor}
          text="Logout"
          borderRadius="10px"
          width="full"
        />
        </a>
      </div>
    </div>

  );
};

export default UserProfile;
