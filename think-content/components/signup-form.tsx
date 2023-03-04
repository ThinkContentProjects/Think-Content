import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import { createUser } from "@/firebase/firestore/user";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { signup } = useAuth();

    async function submitHandler() 
    {
        if (!email || !password) {
            return setError("Please enter email and password");
        }
        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }
        try 
        {
            setError("");
            setLoading(true);
            const res = await signup(email, password);
            await createUser(res.user.uid, email);
        } catch (error) {
            setError("Failed to create an account");
        }
        finally {
          setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center flex-1 gap-2 text-xs font-semibold text-blue-900 border-gray-400 bg-gray-50 sm:text-sm sm:gap-4">
            <h1 className="text-2xl uppercase select-none sm:text-4xl"> Sign Up </h1>
            {error && <div className="w-full max-w-[40ch] border-rose-400 border text-center border-solid text-rose-400 py-2">{error}</div>}
            <input type="text" value={email} required onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="outline-none duration-300 border-b-2 border-solid border-white focus:border-cyan-300 text-slate-200 p-2 w-full max-w-[40ch]" />
            <input value={password} required onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="outline-none text-slate-200 p-2 w-full max-w-[40ch] duration-300 border-b-2 border-solid border-white focus:border-cyan-300" />
            <input value={confirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" className="outline-none text-slate-200 p-2 w-full max-w-[40ch] duration-300 border-b-2 border-solid border-white focus:border-cyan-300" />
            <button disabled={loading} onClick={submitHandler} className="w-full max-w-[40ch] border text-gray-500 border-gray-400 border-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900">
                <h2 className="relative z-20 text-gray-900">
                    Sign Up
                </h2>
            </button>
            <Link href="/login" className="text-blue-900 duration-300 cursor-pointer hover:scale-110"> Already have an account? </Link>

        </div>
    );
}