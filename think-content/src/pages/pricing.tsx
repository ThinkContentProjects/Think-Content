import { Inter } from "@next/font/google"
import Navbar from "../components/navbar"
import SideBar from "@/src/components/sidebar"
import CommentBox from "@/src/components/comment-box"
import Footer from "@/src/components/link-footer"

const inter = Inter({ subsets: ["latin"] })

export default function Pricing() {
  return (
    <div className="flex flex-col min-h-screen">
      <SideBar/>
      <Navbar/>
      <div className="flex justify-center flex-grow">
        <main className="flex-auto" id="content">
            <a className="flex items-center justify-center px-8 py-16 mx-20 text-3xl font-extrabold text-gray-900">
                Pricing
            </a>
            <a className="flex flex-wrap items-center justify-between px-8 py-16 m-8 text-3xl font-extrabold text-center text-gray-900 lg:flex-nowrap">
                <CommentBox/>
                <CommentBox/>
                <CommentBox/>
            </a>
        </main>
      </div>
      <Footer/>
    </div>
  );
}