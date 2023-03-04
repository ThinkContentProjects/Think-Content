import { Inter } from "@next/font/google"
import Navbar from "../components/navbar"
import SideBar from "@/components/sidebar"
import CommentBox from "@/components/comment-box"
import Footer from "@/components/link-footer"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <SideBar/>
      <Navbar/>
      <div className="flex justify-center flex-grow">
        <main className="flex-auto" id="content">
          <a className="flex flex-wrap items-center justify-between px-32 py-32 lg:flex-nowrap">
            <CommentBox/>
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
