import { Inter } from '@next/font/google'
import Navbar from '../components/navbar'
import SideBar from '@/components/sidebar'
import CommentBox from '@/components/comment-box'
import Footer from '@/components/link-footer'

const inter = Inter({ subsets: ['latin'] })

export default function Profile() {
  return (
    <div className='flex flex-col min-h-screen bg-white'>
      <SideBar />
      <Navbar />
      <div className='flex-col justify-center flex-grow w-screen m-8 h-200 bg-gray-50'>
        <main className='flex-auto m-4 md:m-16' id='content'>
          <h1 className='mb-8 text-4xl font-extrabold text-black'>Profile</h1>
          <div className='mb-8'>
            <label className='block mb-2 text-lg font-semibold text-gray-600'>Username</label>
            <input className='w-full max-w-lg px-8 py-2 bg-gray-100 rounded-full focus:outline-none' type='text' placeholder='Enter your username' />
          </div>
          <div className='mb-8'>
            <label className='block mb-2 text-lg font-semibold text-gray-600'>Company Name</label>
            <input className='w-full max-w-lg px-8 py-2 bg-gray-100 rounded-full focus:outline-none' type='text' placeholder='Enter your company name' />
          </div>
          <div className='mb-8'>
            <label className='block mb-2 text-lg font-semibold text-gray-600'>Phone #</label>
            <input className='w-full max-w-lg px-8 py-2 bg-gray-100 rounded-full focus:outline-none' type='text' placeholder='Enter your phone number' />
          </div>
          <div className='mb-8'>
            <label className='block mb-2 text-lg font-semibold text-gray-600'>Mission Statement</label>
            <textarea className='w-full max-w-xl px-8 py-8 bg-gray-100 resize-none rounded-xl focus:outline-none' placeholder='Enter your mission statement'></textarea>
          </div>
          <div className='mb-8'>
            <label className='block mb-2 text-lg font-semibold text-gray-600'>Business Strategy</label>
            <textarea className='w-full max-w-xl px-8 py-8 bg-gray-100 resize-none rounded-xl focus:outline-none' placeholder='Enter your business strategy'></textarea>
          </div>
          <div className='mb-8'>
            <label className='block mb-2 text-lg font-semibold text-gray-600'>Address</label>
            <input className='w-full max-w-lg px-8 py-2 bg-gray-100 rounded-full focus:outline-none' type='text' placeholder='Enter your company address' />
          </div>
          <div className='mb-8'>
            <label className='block mb-2 text-lg font-semibold text-gray-600'>Website URL</label>
            <input className='w-full max-w-lg px-8 py-2 bg-gray-100 rounded-full focus:outline-none' type='text' placeholder='Enter your company website URL' />
          </div>
          <div className='mb-8'>
            <label className='block mb-2 text-lg font-semibold text-gray-600'>Industry</label>
            <input className='w-full max-w-lg px-8 py-2 bg-gray-100 rounded-full focus:outline-none' type='text' placeholder='Enter your industry' />
          </div>
        </main>
      </div>
      <Footer/>
    </div>
  );
}
