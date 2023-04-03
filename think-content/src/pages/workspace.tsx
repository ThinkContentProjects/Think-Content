import CaptionPanel from "../components/caption-panel";
import ImagePanel from "../components/image-panel";
import Footer from "../components/link-footer";
import PostGallery from "../components/post-gallery";
import SideBar from "../components/sidebar";

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