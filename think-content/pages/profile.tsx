import { Inter } from "@next/font/google"
// import Navbar from "../components/navbar"
import SideBar from "@/components/sidebar"
import CommentBox from "@/components/comment-box"
import Footer from "@/components/link-footer"

const inter = Inter({ subsets: ["latin"] })

export default function Profile() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* <SideBar />
      <Navbar /> */}
      {/* <UpdateProfile/> */}
      {/* <Footer/> */}
    </div>
  );
}
