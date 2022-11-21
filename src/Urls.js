import { useSelector } from "react-redux";

import axios from 'axios'




export const adminUrl = axios.create({
    baseURL: `http://44.237.37.194:6001/api/v1/admin`,
  
})  

    

export const adminTokenUrl =()=>{
    const token = (JSON.parse(localStorage.getItem("state")))?.token?.token
    const site = (JSON.parse(localStorage.getItem("state")))?.site?.site?.id
   
    
    return axios.create({
        baseURL: `http://44.237.37.194:6001/api/v1/admin`,
        headers:{
            "Authorization":`Bearer ${token}`,
            "Site" : site,
            'Access-Control-Allow-Origin': 'http://44.237.37.194:6001/api/v1/admin'
        }
      
    })
} 



export const  GameImgUrl ="http://52.26.60.188:6969/"
export const  ImgUrl ="http://44.237.37.194:6001/"
export const  ImgUrl2 ="http://localhost:6001/"

