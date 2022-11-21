import React from 'react'
import { showNotification } from '@mantine/notifications';
import { MdError,MdDone } from 'react-icons/md';
import { openConfirmModal } from '@mantine/modals';
import { Text } from '@mantine/core';


export const ErrorNotification = ({ title, message }) => {
  return showNotification({
      disallowClose: false,
      autoClose: 1500,
      title: title,
      message: message,
      color: 'red',
      icon: <MdError />,
      loading: false,
    })
}

export const SuccessNotification = ({ title, message }) => {
  return showNotification({
      disallowClose: false,
      autoClose: 2500,
      title: title,
      message: message,
      color: 'green',
      icon: <MdDone />,
      loading: false,
    })
}

export const LoadingNotification = ({ title, message }) => {
  return showNotification({
      disallowClose: false,
      autoClose: 2500,
      title: title,
      message: message,
      color: 'green',
      icon: <MdDone />,
      loading: true,
    })
}


export const ConfirmModal = ({message, confirm}) =>{
  openConfirmModal({
    centered: true,
    // children: (
    //   <Text size="sm">
    //     {message}
    //   </Text>
    // ),
    labels: { confirm: 'Confirm', cancel: "Cancel" },
    onConfirm: () => confirm,
  });
}

