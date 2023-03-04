import React from "react"
import Login from "../components/login-form"
import Navbar from "../components/navbar"
import SideBar from "@/components/sidebar"
import CommentBox from "@/components/comment-box"
import Footer from "@/components/link-footer"

export default function login() {
  return (
    <div className="flex flex-col min-h-screen">
      <SideBar/>
      <Navbar/>
      <div className="flex justify-center flex-grow">
        <main className="flex-auto h-screen py-32" id="content">
          <Login/>
        </main>
      </div>
      <Footer/>
    </div>

  )
}
