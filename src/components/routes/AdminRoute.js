import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LoadingToRedirect from './LoadingToRedirect'
import { currentAdmin } from '../functions/auth'


const AdminRoute = ({children}) => {
    const { user } = useSelector((state) => ({...state}))

    const [ ok, setOK ] = useState(false)

    useEffect(() => {

        if(user && user.token){
            currentAdmin(user.token)
            .then(res => {
                console.log(res)
                setOK(true)
            }).catch(err => {
                console.log(err)
                setOK(false)
            })
        }


    }, [user])



  return ok
  ? children
  : <LoadingToRedirect />
}

export default AdminRoute
