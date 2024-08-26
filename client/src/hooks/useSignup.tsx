import { useState } from 'react'
import { useAuthContext } from '../context/authContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import request from '../request/request'

type SignUpInputs = {
    fullName:string,
    username:string,
    email:string,
    password:string,
    gender:string,
}

const useSignup = () => {
  const [ loading,setIsLoading ] = useState(false)
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const { setAuthUser} = useAuthContext()
  
  const signup = async (inputs:SignUpInputs)=>{
    try {
        setIsLoading(true)
        const response = await axios.post(`${request.basrUrl}/auth/signup`,{...inputs},/*{withCredentials:true}*/)
        setAuthUser(response.data)
        setMessage(response.data.message)
        setSuccess(response.data.success)
       } catch (error:any) {
        setMessage(error.response.data.message)
        setSuccess(false)
        toast.error(error.response.data.message)
        //console.log(error)
       } finally{
        setIsLoading(false)
       }
  }
  return {loading,signup,message,success,setSuccess}

 
}

export default useSignup