"use client"
import { useSession } from 'next-auth/react'
import React from 'react'

const Page = () => {
    const data = useSession()
  return (
    <div>{JSON.stringify(data)}</div>
  )
}

export default Page