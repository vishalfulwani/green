'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { ApiResponse } from '@/helpers/ApiResponse'
import axios, { AxiosError } from 'axios'
import { Loader2 } from 'lucide-react'
import Head from 'next/head'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


function Page() {
  const [isCreated, setIsCreated] = useState(false)
  const [date, setDate] = React.useState<Date>()

  const { toast } = useToast()


  interface CouponFormValues {
    code: string;
    discountPercentage: string;
    isActive: boolean;
    expirationDate: Date;
  }

  const form = useForm<CouponFormValues>({
    defaultValues: {
      code: '',
      discountPercentage: '',
      isActive: true,
      expirationDate: new Date()
    }
  })


  // form submit
  const onSubmit = async (data: any) => {
    setIsCreated(true)
    const formData = new FormData()
    formData.append('code', data.code || '')
    formData.append('discountPercentage', data.discountPercentage || '')
    formData.append('isActive', data.isActive || '')
    formData.append('expirationDate', data.expirationDate || '')

    console.log("-----66666-----", data.expirationDate)
    try {
      const response = await axios.post('/api/admin/create-coupon', formData)
      toast({
        title: "Success",
        description: response.data.message,
        className: 'toast-success'
      })
      setIsCreated(false)
      form.reset()
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      let errorMessage = axiosError.response?.data.message
      toast({
        title: "Coupon add failed",
        description: errorMessage || "Coupon add failed",
        className: 'toast-error'
      })
      setIsCreated(false)
    }
  }

  return (
    <>
      <Head>
        <title>Admin Coupons</title>
        <meta name="description" content="This is the add coupon page." />
      </Head>
      <div>
        <div className="container mx-auto px-6 mt-16 py-10">
          <h1 className="text-3xl font-bold leading-tight mb-4">Add Coupons</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coupon Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Code" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discountPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount Percentage</FormLabel>
                    <FormControl>
                      <Input placeholder="Discount" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expirationDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Input
                            type="text"
                            value={field.value ? format(field.value, "PPP") : ""}
                            readOnly
                            placeholder="Pick a date"
                            className="cursor-pointer"
                          />
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => field.onChange(date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                  </FormItem>
                )}
              />


              <Button type="submit" disabled={isCreated} className="button button-green hover:bg-transparent">
                {isCreated ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                  </>
                ) : ('Add Coupon')}
              </Button>
            </form>
          </Form>

        </div>
      </div>
    </>

  )
}

export default Page
