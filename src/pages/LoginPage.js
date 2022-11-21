import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import { fetchTokenSuccess } from '../action/Token';
import { useDispatch } from 'react-redux';
import ReactPhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import { adminUrl } from '../Urls';
import { ErrorNotification, SuccessNotification } from '../components/NotificationProvider';
import { Box, Button, PasswordInput, Select } from '@mantine/core';
import OTPInput, { ResendOTP } from "otp-input-react";
import { useNavigate } from 'react-router-dom';
import { fetchUserSuccess } from '../action/UserAction';
import ErrorHandler from '../components/ErrorHandler';
import axios from 'axios';
import { Title } from '../components/Header';


const LoginPage = () => {
    const dispatch = useDispatch()
    const history = useNavigate()

    const [log_phone, setPhone] = useState("")
    const [log_password, setPassword] = useState("")
    const [OTP, setOTP] = useState("")
    const [searchValue, onSearchChange] = useState('');

    const [success, setSuccess] = useState(false)

    
    const handleLogin = (e) => {
        e.preventDefault()
        const body = {
            email: `+${log_phone}`,
            password: log_password
        }
        console.log(body)
        adminUrl.post(`/login`, body).then((res) => {
            console.log(res?.data?.data);
            setSuccess(true)
        }).catch(err => {
            ErrorHandler(err)
        })
    }

    useEffect(() => {
        Title("Login")
    }, [])


    const renderTime = () => React.Fragment;
    const renderButton = (buttonProps) => {
        return (
            <button {...buttonProps}>
                {buttonProps.remainingTime !== 0 ? `Please wait for ${buttonProps.remainingTime} sec to resend code.` : "Resend"}
            </button>
        );
    };

    const handleOtp = (e) => {
        e.preventDefault()
        const body = {
            token: OTP,
        }
        adminUrl.post(`/login-verify/+${log_phone}`, body).then((res) => {
            dispatch(fetchTokenSuccess(res?.data?.data?.token))
            dispatch(fetchUserSuccess(res?.data?.data?.user))
            history('/site-setting')
            SuccessNotification({ title: "Welcome!!", message: "You have been Logged in." })
        }).catch(err => {
            ErrorHandler(err)
        })
    }





    const ResendOtp = (e) => {
        adminUrl.post(`/resend-login-code/${log_phone}`).then((res) => {
            SuccessNotification({ title: "Succeed", message: "Your OTP has been sent. Please wait a while..." })
        }).catch(err => {
            ErrorHandler(err)

        })
    }


    const handlePassword = () => {
        if (showPassword === true) setShowPassword(false)
        else setShowPassword(true)
    }




    return (
        <div style={{
            backgroundColor: "grey",
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center", height: "100vh"
        }}>

            <Box sx={(theme) => ({
                textAlign: 'left',
                padding: theme.spacing.xl,
                borderRadius: theme.radius.md,
                cursor: 'pointer'

            })}>
                <Image src='https://kinkhel.com/wp-content/uploads/2020/08/Transparent.png'></Image>

                <div className="p-10 text-gray-200 bg-secondary-dark-bg rounded-3xl h-full">
                    <div className="mt-8 text-gray-200 bg-secondary-dark-bg">
                        <H1>Admin Login</H1>
                        <div className="rounded-lg dark:bg-secondary-dark-bg">

                            <div className="mt-8 dark:text-gray-200 dark:bg-secondary-dark-bg">
                                <div className="rounded-lg bg-secondary-dark-bg">
                                    {!success ?
                                        <form onSubmit={handleLogin}>
                                            <h2 className=" ml-5 block text-gray-700 text-sm font-bold mb-2 text-gray-200">
                                                Phone
                                            </h2>
                                            <ReactPhoneInput
                                                className="ml-5 mb-3 justify-between  white  rounded  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" country={"np"} inputProps={{
    required: true,
    autoFocus: true
  }}
                                                defaultCountry="pl"
                                                searchClass="search-class"
                                                value={log_phone}
                                                onChange={setPhone}
                                                enableSearchField
                                                disableSearchIcon
                                            />
                                            <h2 className=" ml-5 block text-gray-700 text-sm font-bold mb-2 text-gray-200">
                                                Password
                                            </h2>
                                            <PasswordInput
                                            required
                                                className="ml-5  mb-3 justify-between shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                placeholder="Password"
                                                value={log_password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />

                                            <Buttons className='ml-5' color="yellow" uppercase type='submit'>
                                                Login
                                            </Buttons>
                                        </form>
                                        :
                                        <form onSubmit={handleOtp}>
                                            <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} className="ml-5  mb-3 justify-between shadow appearance-none border rounded w-11/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                            <Buttons className='ml-5' color="yellow" uppercase type='submit'>
                                                Verify
                                            </Buttons>
                                            <ResendOTP className="ml-5" onResendClick={ResendOtp} maxTime={90} renderButton={renderButton} renderTime={renderTime} />
                                        </form>
                                    }

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </Box>
        </div>
    );

}

export default LoginPage

const Image = styled.img`
height: 100px;
width: 200px;
margin: auto;
`;

const H1 = styled.h1`
text-align: center;
text-size:40px;
font-weight:700;
`;


const Buttons = styled(Button)`
background-color:yellow;
color:black;
`;
