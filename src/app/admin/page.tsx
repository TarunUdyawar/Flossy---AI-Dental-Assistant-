import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'
import 'dotenv/config'
import AdminDashboardClient from './AdminDashboardClient'

const AdminPage = async() => {
  const user = await currentUser()
  if(!user) redirect('/sign-up')
  const adminUser = process.env.ADMIN_EMAIL
  const userEmail = user.emailAddresses[0].emailAddress
  if(!adminUser || userEmail !== adminUser){
    redirect('/dashboard')
  }
  return <AdminDashboardClient/>
}

export default AdminPage
