"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; 
import React from "react";
import { useSearchParams } from "next/navigation";

type User = {
    firstName: string;
    lastName: string;
    email: string;
    id: number;
};

export default function Dashboard() {
    const searchParams = useSearchParams();
    const userId = searchParams.get("userId");

    const [user,setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!userId) return;

        fetch(`http://localhost:3000/users/${userId}`)
            .then(res => res.json())
            .then(setUser);
    }, [userId]);

    if(!user) return <p>Loading...</p>;  
            
    return (
        <div className="min-h-screen flex flex-col items-center pt-6 bg-zinc-50 font-sans dark:bg-black">
            <h3 className="mt-8 text-4xl text-center font-bold text-zinc-800 dark:text-zinc-200">
                Welcome to your Dashboard!
            </h3>
            <p className="mt-12 text-slate-500">First Name: 
                <span className="text-white">{user.firstName}</span>,
                 Last Name: <span className="text-white">{user.lastName}</span> </p>
            <p className="mt-2 text-slate-500">Email: <span className="text-white">{user.email}</span></p>
            <p className="mt-2 text-slate-500">User ID: <span className="text-white">{user.id}</span></p>   
               <Link
                   href="/admin"
                   className="mt-8 inline-block px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500"
                 >
                     Go to Admin
                 </Link>

        </div>
    );
}

    