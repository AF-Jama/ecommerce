"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SignUpFormInputs, SignUpResponse } from "@/types/types";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputGroup } from "@chakra-ui/react";
import { InputRightElement } from "@chakra-ui/react";
import { Spinner } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Input } from "@chakra-ui/react";
import Logo  from '../../assets/images/logo.svg';
import googleLogo from '../../assets/images/google-auth-logo.svg';
import twitterLogo from '../../assets/images/twitter-auth-logo.svg';
import authLogo from '../../assets/images/apple-auth-logo.svg';

interface ErrorBody{
    message:string,
    statusCode:number
}


const SignUpForm: React.FC = ()=>{
    const [show,setShow] = useState(false);
    const [buttonDisabled,setButtonDisabled] = useState(true); // set button disable state
    const [loading,setLoading] = useState(false);
    const [loginMessage,setLoginMessage] = useState('');
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
      } = useForm({
        defaultValues: {
          email: "",
          name: "",
          password:"",
        }
      });

      const onSubmit: SubmitHandler<SignUpFormInputs> = async data => {
        try{

            setLoading(true);

            let res = await fetch('/api/signup',{
                body:JSON.stringify({
                    name:data.name,
                    email:data.email,
                    password:data.password
                }),
                method:"POST"
            })
    
            if(!res.ok) throw new Error("Network error")
    
            let result:SignUpResponse = await res.json(); // returns signup response

            if(result.statusCode===201){
                return router.push('/home');
            }

            if(result.statusCode===400){
                setLoginMessage("Could not Sign Up");
            }

        }catch(error){
            setLoading(false);
        }finally{
            setLoading(false);
        }

    }

      useEffect(()=>{
        if(loginMessage){
            setTimeout(()=>{
                setLoginMessage("");
            },3000)
        }
      },[loginMessage]) // runs on initial render (on mount) and dependency array change





    return (

        <div id="form-container" className="w-[95%] max-w-sm mx-auto">
                <Image src={Logo} className="my-4 mx-auto w-12 h-12" alt=""/>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="max-w-sm mx-auto my-2">
                        <input type="text" className="w-full p-2 rounded-md border" placeholder="Email Address" {...register("email",{
                             pattern:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                             required:true,
                        })} />
                        {errors.email && <p className="text-red-600 text-sm">Valid Email Required</p> }
                    </div>

                    <div className="max-w-sm mx-auto my-2">
                        <input type="text" className="w-full p-2 rounded-md border" placeholder="Name" {...register("name",{
                             min:4,
                             max:30,
                             required:true,
                        })} />
                        {errors.name && <p className="text-red-600 text-sm">Valid Name Required</p>}
                    </div>

                    <div className="max-w-sm mx-auto my-2">
                        <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                placeholder='Enter password'
                                {...register('password',{
                                    pattern:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                                    required:true,
                                })}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={()=>setShow(!show)}>
                                {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        {errors.password && <p className="text-red-600 text-sm">Valid Password Required</p>}
                    </div>
                    <input type="submit" className="w-full bg-[#142c8e] p-2 text-white rounded-xl"/>  
                    {/* {loading?<Button isLoading colorScheme='teal' variant='solid' className="bg-[#142c8e] w-full"/>:<Button colorScheme='teal' variant='solid' className="bg-[#142c8e] w-full">Sign In</Button>} */}
                    <p className="text-red-500 mt-2 px-1">{loginMessage}</p>
                </form>

                <div id="google-provider" className="flex gap-2 items-center justify-center border rounded-md p-1 my-2">
                    <Image src={googleLogo} className="h-8 w-8" alt=""/>
                    <p>Sign in using Google</p>
                </div>

                <div id="twitter-provider" className="flex gap-2 items-center justify-center border rounded-md p-1 my-2">
                    <Image src={twitterLogo} className="h-8 w-8" alt=""/>
                    <p>Sign in using Twitter</p>
                </div>

                <div id="apple-provider" className="flex gap-2 items-center justify-center border rounded-md p-1 my-2">
                    <Image src={authLogo} className="h-8 w-8" alt=""/>
                    <p>Sign in using Apple</p>
                </div>
        </div>
    )
}



export default SignUpForm;