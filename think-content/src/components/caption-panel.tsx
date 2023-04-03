import React from "react"
import { FaPlus } from "react-icons/fa"
import { GeneralIcon } from "./sidebar"

export default function captionPanel() {
  return (
    <div className="w-0 h-screen mx-0 my-4 overflow-y-scroll bg-white border-2 border-gray-200 border-solid md:w-1/5 outline-2">
        <div className="grid items-center w-auto grid-cols-1 gap-2 text-gray-400 bg-white">
            <div className="p-1 m-2 overflow-hidden bg-gray-100 max-h-64 rounded-xl hover:bg-gray-200 hover:text-gray-600 hover:shadow-xl shadow-slate-400">
                Caption 1
                <div className="p-2 sm:max-w-full md:max-w-lg lg:max-w-xl xl:max-w-2xl max-h-fit">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Imperdiet dui accumsan sit amet nulla facilisi morbi.
                </div>
            </div>
            <div className="p-1 m-2 overflow-hidden bg-gray-100 max-h-64 rounded-xl hover:bg-gray-200 hover:text-gray-600 hover:shadow-xl shadow-slate-400">
                Caption 2
                <div className="p-2 sm:max-w-full md:max-w-lg lg:max-w-xl xl:max-w-2xl max-h-fit">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Imperdiet dui accumsan sit amet nulla facilisi morbi.
                </div>
            </div>
            <div className="p-1 m-2 overflow-hidden bg-gray-100 max-h-64 rounded-xl hover:bg-gray-200 hover:text-gray-600 hover:shadow-xl shadow-slate-400">
                Caption 3
                <div className="p-2 sm:max-w-full md:max-w-lg lg:max-w-xl xl:max-w-2xl max-h-fit">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Imperdiet dui accumsan sit amet nulla facilisi morbi.
                </div>
            </div>
            <div className="p-1 m-2 overflow-hidden bg-gray-100 max-h-64 rounded-xl hover:bg-gray-200 hover:text-gray-600 hover:shadow-xl shadow-slate-400">
                Caption 4
                <div className="p-2 sm:max-w-full md:max-w-lg lg:max-w-xl xl:max-w-2xl max-h-fit">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Imperdiet dui accumsan sit amet nulla facilisi morbi.
                </div>
            </div>
            <div className="p-1 m-2 overflow-hidden bg-gray-100 max-h-64 rounded-xl hover:bg-gray-200 hover:text-gray-600 hover:shadow-xl shadow-slate-400">
                Caption 5
                <div className="p-2 sm:max-w-full md:max-w-lg lg:max-w-xl xl:max-w-2xl max-h-fit">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Imperdiet dui accumsan sit amet nulla facilisi morbi.
                </div>
            </div>
            <div className="p-1 m-2 overflow-hidden bg-gray-100 max-h-64 rounded-xl hover:bg-gray-200 hover:text-gray-600 hover:shadow-xl shadow-slate-400">
                Caption 6
                <div className="p-2 sm:max-w-full md:max-w-lg lg:max-w-xl xl:max-w-2xl max-h-fit">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Imperdiet dui accumsan sit amet nulla facilisi morbi.
                </div>
            </div>
            {/* Plus button */}
            <button className="flex flex-col items-center justify-center my-12 text-gray-400 hover:text-gray-600">
                <GeneralIcon icon={<FaPlus size = "32"/>}/>
            </button>     
        </div>             
    </div>
  )
}