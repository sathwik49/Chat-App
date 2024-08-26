import { useState } from 'react'
import { useAuthContext } from '../context/authContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import request from '../request/request';

const useLogout = () => {
    const [ loading,setIsLoading ] = useState(false)
    const [message, setMessage] = useState(null);
    const [success, setSuccess] = useState<boolean | null>(null);
    const { setAuthUser} = useAuthContext()

    const logout = async ()=>{
        try {
            setIsLoading(true);
            const response = await axios.post(`${request.basrUrl}/auth/logout`,{},/*{withCredentials:true}*/)
            setAuthUser(null)
            setMessage(response.data.message)
            setSuccess(response.data.success)
        } catch (error:any) {
            console.log(error.response)
            toast.error(error.response.data.message)
            setMessage(error.response.data.message),setSuccess(error.response.data.success);
        } finally{
            setIsLoading(false);
        }
    }
    return { loading,logout,message,success };
}

export default useLogout