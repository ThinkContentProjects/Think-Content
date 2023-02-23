import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Link from "next/link";

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup } = useAuth();

    async function submitHandler() {
        if (!email || !password) {
            setError('Please enter email and password');
            return;
        }
        if (password !== confirmPassword) {
            return setError("Passwords do not match");
          }
        try 
        {
            setError("");
            setLoading(true);
            await signup(email, password);
        } catch {
            setError("Failed to create an account");
          }
          setLoading(false);
    }

    return (
        <div className='flex-1 text-xs sm:text-sm flex flex-col justify-center items-center gap-2 sm:gap-4'>
            <h1 className=' select-none text-2xl sm:text-4xl uppercase'> Sign Up </h1>
            {error && <div className='w-full max-w-[40ch] border-rose-400 border text-center border-solid text-rose-400 py-2'>{error}</div>}
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email Address' className='outline-none duration-300 border-b-2 border-solid border-white focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]' />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' className='outline-none text-slate-900 p-2 w-full max-w-[40ch] duration-300 border-b-2 border-solid border-white focus:border-cyan-300' />
            <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder='Confirm Password' className='outline-none text-slate-900 p-2 w-full max-w-[40ch] duration-300 border-b-2 border-solid border-white focus:border-cyan-300' />
            <button disabled={loading} onClick={submitHandler} className='w-full max-w-[40ch] border border-white border-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900'>
                <h2 className='relative z-20'>
                    Sign Up
                </h2>
            </button>
            <Link href="/login" className='duration-300 hover:scale-110 cursor-pointer'> Already have an account? </Link>

        </div>
    );
}