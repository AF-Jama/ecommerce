interface SignUpFormInputs{
    email:string,
    name:string,
    password:string,
}

interface LoginFormInputs{
    email:string,
    password:string
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

interface Product{
    id:number,
    title:string,
    price:number,
    category:string,
    description:string,
    image:string
}

interface Token{
    userId:string,
    name:string,
    email:string
}


export type {
    SignUpFormInputs,
    LoginBody,
    SignUpResponse,
    LoginFormInputs,
    Product,
    Token
}