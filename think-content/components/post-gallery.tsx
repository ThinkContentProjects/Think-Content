import React from "react"
import CommentBox from "./comment-box"

export default function postGallery() {
  return (
    <div className="flex-1 h-screen overflow-x-scroll overflow-y-hidden bg-gray-50">
        <div className="flex-1 h-screen bg-gray-50">
            {/* Middle panel content */}
            <div className="flex flex-row justify-center py-32">
                <CommentBox/>
                <CommentBox/>
                <CommentBox/>
                <CommentBox/>
                <CommentBox/>
                <CommentBox/>
            </div>
        </div>
    </div>
  )
}
