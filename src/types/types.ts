interface SignUpFormInputs{
    email:string,
    name:string,
    password:string,
}

interface LoginBody{
    email:string,
    password:string,
    name:string
}

interface SignUpResponse{
    message:string,
    statusCode:number
}


export type {
    SignUpFormInputs,
    LoginBody,
    SignUpResponse
}