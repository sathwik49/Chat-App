import zod from 'zod'

const userSignupSchema =  zod.object({
    "username":zod.string().min(1,{message:"Username required"}),
    "fullName":zod.string().min(1,{message:"Fullname required"}),
    "password":zod.string().min(5,{message:"Minimum 5 characters required for Password"}),
    "email":zod.string().email({message:"Invalid Email"}),
    "gender":zod.enum(['male','female'],{message:"Select Gender properly"})
})

export const userSignupValidation = (body:object)=>{
    const inputValidation = userSignupSchema.safeParse(body);
    if(!inputValidation.success){
        let errMsg="";
        (inputValidation.error.errors).forEach(err => {
            errMsg +=`${err.message}, `
        });
        return {
            message:errMsg,
            success:inputValidation.success
        }
    }
    return {
        message:"Validation succeeded",
        success:inputValidation.success
    }
}

const userLoginSchema = zod.object({
    "username":zod.string({message:"Invalid Credintials"}),
    "password":zod.string({message:"Invalid Credintials"})
})

export const userLoginValidation = (body:object)=>{
    const inputValidation = userLoginSchema.safeParse(body);
    if(!inputValidation.success){
        let errMsg="";
        (inputValidation.error.errors).forEach(err => {
            errMsg +=`${err.path}:${err.message} , `
        });
        return {
            message:errMsg,
            success:inputValidation.success
        }
    }
    return {
        message:"Validation succeeded",
        success:inputValidation.success
    }
}