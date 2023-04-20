import { Inter } from "@next/font/google"
// import Navbar from "../components/navbar"
import SideBar from "../components/sidebar"
import CommentBox from "../components/comment-box"
import Footer from "../components/link-footer"
import Navbar from "../components/navbar"
import { withProtected } from "../hooks/routes"

const Profile = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* <SideBar />
      <Navbar />
       <Footer/> */}
    </div>
  );
}

export default withProtected(Profile);