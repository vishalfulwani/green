import {z} from "zod"

export const usernameValidation = z
.string()
.min(2,"Username must be greater than 2 character")
.max(20,"Username must be less than 20 characters")
.regex(/^[a-zA-Z0-9]+$/,"userName must be alphanumeric")

export const signUpSchema = z.object({
    userName:usernameValidation,
    email:z.string().email({message:'Invalid email'}),
    password:z.string().min(6,{message:"Password must be at least 6 characters"})
})