import SideBar from "@/src/components/sidebar"
import Footer from "@/src/components/link-footer"
import ImagePanel from "@/src/components/image-panel"
import CaptionPanel from "@/src/components/caption-panel"
import PostGallery from "@/src/components/post-gallery"

export default function workspace() {
  return (
    <div className="flex flex-col min-h-screen">
      <SideBar/>
      <div className="flex flex-col h-screen my-8 md:flex-row">
        <ImagePanel/>
        <PostGallery/>
        <CaptionPanel/>
      </div>
      <Footer/>
    </div>
  );
}