import Navbar from "../components/navbar"
import SideBar from "@/components/sidebar"
import Footer from "@/components/link-footer"
import ImagePanel from "@/components/image-panel"
import CaptionPanel from "@/components/caption-panel"
import PostGallery from "@/components/post-gallery"


export default function workspace() {
  return (
    <div className="flex flex-col min-h-screen">
      <SideBar/>
      <Navbar/>
      <div className="m-4"></div>
      <div className="flex flex-row h-screen">
        <ImagePanel/>
        <PostGallery/>
        <CaptionPanel/>
      </div>
      <Footer/>
    </div>
  );
}
