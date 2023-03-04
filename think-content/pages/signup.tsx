import Footer from "@/components/link-footer"
import Navbar from "@/components/navbar"
import SideBar from "@/components/sidebar"
import React from "react"
import Signup from "../components/signup-form"

export default function signup() {

  return (
    <div className="flex flex-col min-h-screen">
      <SideBar/>
      <Navbar/>
      <div className="flex justify-center flex-grow">
        <main className="flex-auto h-screen py-32" id="content">
          <Signup/>
        </main>
      </div>
      <Footer/>
    </div>

  )
}
