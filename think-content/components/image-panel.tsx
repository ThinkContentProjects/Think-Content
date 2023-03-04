import React from "react"
import { FaPlus } from "react-icons/fa"
import { GeneralIcon } from "./sidebar"

export default function imagePanel() {
  return (
    <div className="w-1/4 h-screen m-4 overflow-y-scroll bg-white border-2 border-gray-200 border-solid outline-2">
        {/* Search bar for alt text for images */}
        <div className="grid items-center w-auto grid-cols-1 gap-4 bg-white">
            {/* Add your images here */}
            {/* I would like to add passive loading like linkedin */}
            <img className="rounded-xl hover:brightness-75 hover:shadow-xl shadow-slate-400"src="https://th.bing.com/th/id/OIP.OuQ2xrJrZbd9CIbL3fIIjwHaEK?pid=ImgDet&rs=1" alt="mountain1" />
            <img className="rounded-xl hover:brightness-75 hover:shadow-xl shadow-slate-400" src="https://wallpapercave.com/wp/wp6705749.jpg" alt="mountain2" />
            <img className="rounded-xl hover:brightness-75 hover:shadow-xl shadow-slate-400" src="https://hdqwalls.com/wallpapers/landscape-snowy-mountains-4k-fd.jpg" alt="mountain3" />
            <img className="rounded-xl hover:brightness-75 hover:shadow-xl shadow-slate-400" src="https://wallpaperaccess.com/full/38585.jpg" />
            <img className="rounded-xl hover:brightness-75 hover:shadow-xl shadow-slate-400" src="https://th.bing.com/th/id/OIP.pt6DOUouz84kBKR3Ru5dpgHaEK?pid=ImgDet&rs=1" alt="mountain5" />
            <img className="rounded-xl hover:brightness-75 hover:shadow-xl shadow-slate-400" src="https://th.bing.com/th/id/R.46a40b7764e68ea4d2bf20f791924536?rik=%2f0is2ZIK2Mpzog&pid=ImgRaw&r=0" alt="mountain6" />  
            {/* Plus button */}
            <button className="flex flex-col items-center justify-center m-8 text-gray-400 hover:text-gray-600">
                <GeneralIcon icon={<FaPlus size = "32"/>}/>
            </button>     
        </div>             
    </div>
  )
}
