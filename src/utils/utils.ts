import { z } from "zod";


const userSignUpSchema = z.object({
    name:z.string().min(4,"Name is required"),
    email:z.string().email("Invalid Email Address"),
    password:z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
})

const LoginSchema = z.object({
    email:z.string().email("Invalid Email Address"),
    password:z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
})

export type userSignUp = z.infer<typeof userSignUpSchema>
export type LoginType  = z.infer<typeof LoginSchema>
export {
    userSignUpSchema,
    LoginSchema
}