import React from "react"
import CommentBox from "./comment-box"

export default function postGallery() {
  return (
    <div  className="flex flex-col w-full h-screen md:w-3/5">
      <div className="flex-1 h-screen bg-gray-50">
          <div className="flex-col h-screen bg-gray-50">
              {/* Middle panel content */}
              <div className="flex flex-col justify-center overflow-y-scroll md:px-64 md:py-32 md:overflow-x-scroll md:overflow-y-hidden md:flex-row md:h-3/4">
                  <CommentBox/>
                  <CommentBox/>
                  <CommentBox/>
                  <CommentBox/>
                  <CommentBox/>
                  <CommentBox/>
              </div>
              <div className="flex items-center justify-center w-full border-t-2 border-gray-200 border-solid bg-gray-50 text-centered outline-2 justify-items-end h-1/4">
                  Selected Post Caption
              </div>
          </div>
      </div>
    </div>

  )
}
