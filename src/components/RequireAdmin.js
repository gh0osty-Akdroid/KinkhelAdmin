import { Navigate, Outlet, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminTokenUrl } from "../Urls";
import { useEffect } from "react";
import { fetchTokenSuccess } from "../action/Token";
import GeoLocation from "./Location";
import { fetchUserSuccess } from "../action/UserAction";


const RequireAdmin = (props) => {
    const dispatch = useDispatch()
    const token = useSelector(p => p.token?.token)
    const navigate = useNavigate()
    if (token) {
        useEffect(() => {
            adminTokenUrl().get('/verify').catch((err) => {
                if (err?.response?.status === 401) {
                    navigate('/login')
                    dispatch(fetchTokenSuccess(null))
                    dispatch(fetchUserSuccess(null))
                }
            }).then(() => {
                null
            })
        }, [])
    } else {
        navigate('/login')
        dispatch(fetchTokenSuccess(null))
        dispatch(fetchUserSuccess(null))
    }


    return (
        token !== null ? <Outlet /> : <Navigate to={'/login'} replace />
    )
}

export default RequireAdmin;