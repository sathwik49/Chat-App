import { useState } from "react"
import { useAuthContext } from "../context/authContext";
import axios from "axios";
import request from "../request/request";
import toast from "react-hot-toast";

interface LoginInputsType{
    username:string,
    password:string
}

export const useLogin = ()=>{
    const [ loading,setIsLoading ] = useState<Boolean | null>(null);
    const [ message,setMessage ] = useState(null)
    const [ success,setSuccess ] = useState(null)
    const { setAuthUser } = useAuthContext();

    const login = async(inputs:LoginInputsType)=>{
        try {
            setIsLoading(true);
            const response = await axios.post(`${request.basrUrl}/auth/login`,{...inputs},/*{withCredentials:true}*/)
            setAuthUser(response.data);
            setMessage(response.data.message),setSuccess(response.data.success)
        } catch (error:any) {
            console.log(error)
            setMessage(error.response.data.message),setSuccess(error.response.data.success)
            toast.error(error.response.data.message)
        } finally{
            setIsLoading(false);
        }
    }
    return { login,loading,message,success,setSuccess };
}