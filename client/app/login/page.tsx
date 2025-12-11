"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  state: string;
};

// 🔹 Adjust these to your real admin user
const ADMIN_EMAIL = "testuser@example.com";
const ADMIN_ID = 5;

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [state, setState] = useState(""); // UI-only, not validated by API
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3000/users");

      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }

      const users: User[] = await res.json();

      const user = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (!user) {
        setError("No account found with that email.");
        return;
      }

      // 🔹 If this is the admin user, send to /admin
      if (
        user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
        user.id === ADMIN_ID
      ) {
        router.push(`/admin?userId=${user.id}`);
      } else {
        // 🔹 Normal user → dashboard
        router.push(`/dashboard?userId=${user.id}`);
      }
    } catch (err) {
      console.error(err);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-6 bg-zinc-50 font-sans dark:bg-black">
      <h3 className="mt-8 text-4xl text-center font-bold text-zinc-800 dark:text-zinc-200">
        Log In
      </h3>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 w-80">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 border border-zinc-300 rounded dark:bg-zinc-800 dark:text-zinc-200"
        />

        <input
          type="text"
          placeholder="State (not validated for this demo)"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
          className="p-2 border border-zinc-300 rounded dark:bg-zinc-800 dark:text-zinc-200"
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="mt-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Log In
        </button>
      </form>

      <p className="mt-4 text-zinc-800 dark:text-zinc-200">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-blue-600 hover:text-blue-300">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
