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
import Head from "next/head"




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

      <Head>
        <title>Signup in E-commerce </title>
        <meta name="description" content="This is the signup page." />
      </Head>


      <div className="absolute z-50">


      <div className="flex flex-col md:flex-row justify-evenly min-h-screen items-center gap-6 p-4 bg-[#4cb495]">
        <div className="w-full md:w-1/2 lg:w-1/3 p-8 space-y-8 glass-container  rounded-lg shadow-slate-600 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight lg:text-3xl mb-6">
              Join Green E-commerce
            </h1>
            <p className="mb-4 text-lg">
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
                          field.onChange(e);
                          setUserName(e.target.value);
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
                      <Input
                        type="email"
                        placeholder="email"
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
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="password"
                        {...field}
                        className="rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-500 transition"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-auto py-3 text-white bg-green-700 hover:bg-green-300 hover:text-gray-800 rounded-lg transition-colors duration-300"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                  </>
                ) : (
                  'Sign Up'
                )}
              </Button>
            </form>
          </Form>
          <div className="text-center mt-4">
            <p className="text-lg">
              Already a member?{' '}
              <Link href="/ecommerce-signin" className="text-white hover:text-green-700 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
        <div className="hidden md:flex w-full md:w-1/2 lg:w-1/3 p-4">
          <img
            src="signup-planting-tree.png"
            alt="Planting tree"
            className=" h-auto"
          />
        </div>
      </div>

      </div>


    </>
  )


}


export default Page