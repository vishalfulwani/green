"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import { useState } from "react"
import { ApiResponse } from "@/helpers/ApiResponse"
import axios, { AxiosError } from "axios"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import Link from "next/link"

import style from '../../../style/signup.module.css'




const Page = () => {
  const [userName, setUserName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const router = useRouter()


  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      userName: '',
      email: '',
      password: '',
    }
  })


  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true)
    try {
      const response = await axios.post<ApiResponse>('/api/signup', data)

      toast({
        title: 'Success',
        description: response.data.message,
        className: 'toast-success'
      })
      router.replace(`/verify/${userName}`)
      setIsSubmitting(false)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      let errorMessage = axiosError.response?.data.message
      toast({
        title: "Signup Failed",
        description: errorMessage || "Signup failed",
        className: 'toast-error'
      })
      setIsSubmitting(false)
    }
  }



  return (

    <>

      <div className='flex justify-evenly min-h-screen items-center gap-3'>
        <div className="max-w-md p-8 space-y-8 w-[40%] glass-container overflow-hidden rounded-lg shadow-slate-600 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20">
          {/* leave fall animation */}
          {/* <div className={style.leaves}>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                    </div> */}
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight lg:text-3xl mb-6">
              Join Green Foundation
            </h1>
            <p className="mb-4">
              Sign up to embark on your anonymous adventure
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="username"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          setUserName(e.target.value)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type='email' placeholder="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl >
                      <Input type="password" placeholder="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSubmitting} className="text-white bg-green-700 hover:bg-green-300 hover:text-gray-800">
                {
                  isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                    </>
                  ) : ('Sign Up')
                }
              </Button>
            </form>
          </Form>
          <div className="text-center mt-4">
            <p>
              Already a member?{' '}
              <Link href="/signin" className="text-green-400 hover:text-green-600 hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
        <div className="w-[40%]">
          <img src="signup-planting-tree.png" alt="Planting tree" />
        </div>
      </div>












    </>
  )


}


export default Page