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
        <div className='flex-1 text-xs sm:text-sm flex flex-col justify-center items-center gap-2 sm:gap-4'>
            <h1 className=' select-none text-2xl sm:text-4xl uppercase'> Log In </h1>
            {error && <div className='w-full max-w-[40ch] border-rose-400 border text-center border-solid text-rose-400 py-2'>{error}</div>}
            <input type="text" value={email} required onChange={(e) => setEmail(e.target.value)} placeholder='Email Address' className='outline-none duration-300 border-b-2 border-solid border-white focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]' />
            <input value={password} required onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' className='outline-none text-slate-900 p-2 w-full max-w-[40ch] duration-300 border-b-2 border-solid border-white focus:border-cyan-300' />
            <button disabled={loading} onClick={submitHandler} className='w-full max-w-[40ch] border border-white border-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900'>
                <h2 className='relative z-20'>
                    Log In
                </h2>
            </button >
            <button disabled={loading} onClick={googleSignIn} className='w-full max-w-[40ch] border border-white border-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900'> 
                <h2 className='relative z-20'>
                Log in with Google
                </h2>
            </button>
            <Link href="/forgotpassword" className='duration-300 hover:scale-110 cursor-pointer'> Forgot Password? </Link>
            <Link href="/signup" className='duration-300 hover:scale-110 cursor-pointer'> Login </Link>
        </div>
    )
}