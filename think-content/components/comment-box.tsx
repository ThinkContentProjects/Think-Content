import React from "react"

export default function CommentBox() {
  return (
    <div className="flex items-center justify-center w-auto h-auto m-8 min-h-32 min-w-32">
      <div className="w-full max-w-md shadow-2xl bg-white-800 shadow-slate-300">
        <div
          className="px-6 py-6 text-lg font-semibold leading-8 bg-white shadow-slate-100 rounded-t-xl md:p-6 md:text-xl Md:leading-8"
        >
          <p className="pb-2 text-xl font-black text-center text-purple-900 md:text-xl">
            Think Content!
          </p>

          <p
            className="text-base italic font-normal text-center text-indigo-700 md:text-base">
            "Website Framework "
          </p>
        </div>

        <div
          className="flex items-center p-6 space-x-4 font-semibold leading-6 text-white md:px-6 md:py-6 bg-gradient-to-tr from-purple-700 to-indigo-700 rounded-b-xl">
          <div className="items-center justify-center flex-none bg-white rounded-full shadow-2xl w-14 h-14">
            <svg
              height="54"
              preserveAspectRatio="xMidYMid"
              width="54"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 153.6"
            >
              <linearGradient id="a" x1="-2.778%" y1="32%" y2="67.556%">
                <stop offset="0" stop-color="#2298bd" />
                <stop offset="1" stop-color="#0ed7b5" />
              </linearGradient>
              <path
                d="M128 0C93.867 0 72.533 17.067 64 51.2 76.8 34.133 91.733 27.733 108.8 32c9.737 2.434 16.697 9.499 24.401 17.318C145.751 62.057 160.275 76.8 192 76.8c34.133 0 55.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C174.249 14.743 159.725 0 128 0zM64 76.8C29.867 76.8 8.533 93.867 0 128c12.8-17.067 27.733-23.467 44.8-19.2 9.737 2.434 16.697 9.499 24.401 17.318C81.751 138.857 96.275 153.6 128 153.6c34.133 055.467-17.067 64-51.2-12.8 17.067-27.733 23.467-44.8 19.2-9.737-2.434-16.697-9.499-24.401-17.318C110.249 91.54395.725 76.8 64 76.8z"
                fill="url(#a)"
              />
            </svg>
          </div>

          <div className="flex-auto text-base font-thin md:text-base">
            Created By
            <br />
            <span className="text-xl font-black text-purple-200 md:text-xl">Think Content Person</span>
          </div>
        </div>
      </div>
    </div>
  )
}
