"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function SignUp() {
    const router = useRouter();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState(""); 
    const [state, setState] = useState("");
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
   

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        
        try {
            const res = await fetch("http://localhost:3000/users", {
                method: "POST", // Sign up creates a new user with router.post
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ firstName, lastName, email, state }),
            });

            if (res.ok) {
                router.push("/login");
            } else {
                const data = await res.json();
                setError(data.message || "Sign up failed");
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center pt-6 bg-zinc-50 font-sans dark:bg-black">
            <h3 className="mt-8 text-4xl text-center font-bold text-zinc-800 dark:text-zinc-200">
                Sign Up
            </h3>
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 w-80">
                <input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="p-2 border border-zinc-300 rounded dark:bg-zinc-800 dark:text-zinc-200"
                />
                 <input
                      type="text"
                      placeholder="Last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="p-2 border border-zinc-300 rounded dark:bg-zinc-800 dark:text-zinc-200"
                    />
                    <input
                      type="text"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="p-2 border border-zinc-300 rounded dark:bg-zinc-800 dark:text-zinc-200"
                    />
                <div className="relative">
                    <input
                        type={"text"}
                        placeholder="State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                        className="w-full p-2 border border-zinc-300 rounded dark:bg-zinc-800 dark:text-zinc-200"
                    />
                </div>
                {error && <p className="text-red-600">{error}</p>}
                <button
                    type="submit"
                    className="mt-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                >
                    Sign Up
                </button>
            </form>
               <p className="mt-4 text-zinc-800 dark:text-zinc-200">
                 Go to{" "}
                  <Link href="/admin" className="text-blue-600 hover:text-blue-300">
                      Admin
                  </Link>
      </p>
            <p className="mt-4 text-zinc-800 dark:text-zinc-200">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:text-blue-300">
                    Log In
                </Link>
            </p>
        </div>
    );
}
            

