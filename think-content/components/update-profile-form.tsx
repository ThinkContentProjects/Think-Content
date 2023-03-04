// does this work?

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";

export default function UpdateProfile() {

    const { currentUser, updateUserEmail, updateUserPassword } = useAuth();

    const [email, setEmail] = useState(currentUser?.email);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function submitHandler() 
    {
        if (!email || !password) {
            return setError("Please enter email and password");
        }
        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }

        const promises = [];
        if(email !== currentUser?.email) {
            promises.push(updateUserEmail(email));
        }
        if (password) {
            promises.push(updateUserPassword(password));
        }

        setLoading(true);
        setError("");

        Promise.all(promises).then(() => {
            // redirect to the home page?
        }).catch(() => {
            setError("Failed to update account!") }).finally(() => {
                setLoading(false)})
    }

    return (
        <div className="flex flex-col items-center justify-center flex-1 gap-2 text-xs sm:text-sm sm:gap-4">
            <h1 className="text-2xl uppercase select-none  sm:text-4xl"> Update Profile </h1>
            {error && <div className="w-full max-w-[40ch] border-rose-400 border text-center border-solid text-rose-400 py-2">{error}</div>}
            <input type="text" value={email} required onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="outline-none duration-300 border-b-2 border-solid border-white focus:border-cyan-300 text-slate-900 p-2 w-full max-w-[40ch]" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Leave blank to keep the same" className="outline-none text-slate-900 p-2 w-full max-w-[40ch] duration-300 border-b-2 border-solid border-white focus:border-cyan-300" />
            <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Leave blank to keep the same" className="outline-none text-slate-900 p-2 w-full max-w-[40ch] duration-300 border-b-2 border-solid border-white focus:border-cyan-300" />
            <button disabled={loading} onClick={submitHandler} className="w-full max-w-[40ch] border border-white border-solid uppercase py-2 duration-300 relative after:absolute after:top-0 after:right-full after:bg-white after:z-10 after:w-full after:h-full overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-slate-900">
                <h2 className="relative z-20">
                    Update
                </h2>
            </button>
            <Link href="/" className="duration-300 cursor-pointer hover:scale-110"> Cancel </Link>

        </div>
    );
}