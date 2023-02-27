import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Link from "next/link";

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const { resetPassword } = useAuth()

    async function submitHandler() 
    {
        if (!email) {
            setError('Please enter email');
            return;
        }
        try 
        {
            setMessage("");
            setError("");
            setLoading(true);
            await resetPassword(email);
            setMessage('Check your inbox for further instructions');
        } catch {
            setError("Failed to reset password");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='flex-1 text-xs sm:text-sm flex flex-col justify-center items-center gap-2 sm:gap-4'>
            <h1 className=' select-none text-2xl sm:text-4xl uppercase'> Password Reset </h1>
            {error && <div className='w-full max-w-[40ch] border-rose-400 border text-center border-solid text-rose-400 py-2'>{error}</div>}
            {message && <div className='w-full max-w-[40ch] border-green-500 border text-center border-solid text-green-500 py-2'>{message}</div>}
            <input type="text" value={email} required onChange={(e) => setEmail(e.target.value)} placeholder='Email Address' className='outline-none duration-300 border-b-2 border-solid border-white focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]' />
            <button disabled={loading} onClick={submitHandler} className='w-full max-w-[40ch] border border-white border-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900'>
                <h2 className='relative z-20'>
                    Reset Password
                </h2>
            </button >
            <Link href='/login' className='duration-300 hover:scale-110 cursor-pointer'> Login</Link>
            <Link href="/signup" className='duration-300 hover:scale-110 cursor-pointer'> Need an account? </Link>
        </div>
    )
}