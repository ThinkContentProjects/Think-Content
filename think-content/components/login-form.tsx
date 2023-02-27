import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Link from "next/link";

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const { login, loginWithGoogle } = useAuth()

    async function submitHandler() 
    {
        if (!email || !password) {
            setError('Please enter email and password');
            return;
        }
        try 
        {
            setError("");
            setLoading(true);
            await login(email, password);
        } catch {
            setError("Failed to log in");
        } finally {
          setLoading(false);
        }
    }

    async function googleSignIn() {
        try {
            setError("");
            setLoading(true);
            await loginWithGoogle();
        } catch {
            setError("Failed to log in");
        } finally {
          setLoading(false);
        }
    }

    return (
        <div className='flex flex-col items-center justify-center flex-1 gap-2 text-xs font-semibold text-blue-900 border-gray-400 bg-gray-50 sm:text-sm sm:gap-4'>
            <h1 className='text-2xl uppercase select-none sm:text-4xl'> Log In </h1>
            {error && <div className='w-full max-w-[40ch] border-rose-400 border text-center border-solid text-rose-400 py-2'>{error}</div>}
            <input type="text" value={email} required onChange={(e) => setEmail(e.target.value)} placeholder='Email Address' className='outline-none duration-300 border-b-2 border-solid border-white focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]' />
            <input value={password} required onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' className='outline-none text-slate-200 p-2 w-full max-w-[40ch] duration-300 border-b-2 border-solid border-white focus:border-cyan-300' />
            <button disabled={loading} onClick={submitHandler} className='text-gray-500 w-full max-w-[40ch] border border-gray-400 border-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900'>
                <h2 className='relative z-20 text-gray-900'>
                    Log In
                </h2>
            </button >
            <button disabled={loading} onClick={googleSignIn} className='text-gray-900 w-full max-w-[40ch] border border-gray-400 border-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900'> 
                <h2 className='relative z-20'>
                Log in with Google
                </h2>
            </button>
            <Link href="/forgotpassword" className='duration-300 cursor-pointer hover:scale-110'> Forgot Password? </Link>
            <Link href="/signup" className='duration-300 cursor-pointer hover:scale-110'> Login </Link>
        </div>
    )
}