
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  state: string;
};

// 🔹 Same admin constants as in Login
const ADMIN_EMAIL = "testuser@example.com";
const ADMIN_ID = 5;

export default function AdminPage() {
  const searchParams = useSearchParams();
  const currentUserId = searchParams.get("userId");

  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!currentUserId) {
      setError("No userId provided.");
      return;
    }

    async function checkAndLoad() {
      try {
        // 🔹 First: load the current user
        const meRes = await fetch(
          `http://localhost:3000/users/${currentUserId}`
        );
        if (!meRes.ok) {
          setError("Could not load current user.");
          return;
        }
        const me: User = await meRes.json();

        // 🔹 Check admin credentials
        const isAdminUser =
          me.id === ADMIN_ID &&
          me.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

        if (!isAdminUser) {
          setError("You are not authorized to view this page.");
          return;
        }

        setIsAdmin(true);

        // 🔹 Load all users for the table
        const res = await fetch("http://localhost:3000/users", {
          cache: "no-store",
        });
        if (!res.ok) {
          setError("Failed to load users.");
          return;
        }
        const allUsers: User[] = await res.json();
        setUsers(allUsers);
      } catch (err) {
        console.error(err);
        setError("An error occurred.");
      }
    }

    checkAndLoad();
  }, [currentUserId]);

  if (error && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black">
        <p className="text-slate-600 dark:text-slate-300">Checking access…</p>
      </div>
    );
  }

  // ✅ Admin is confirmed here
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans px-6 py-8">
      <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100 mb-6 text-center">
        Admin – Users
      </h1>

      <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 shadow rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-100 dark:bg-zinc-800">
            <tr>
              <th className="text-left px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
                ID
              </th>
              <th className="text-left px-4 py-2 border-b border-zinc-200 dark:border-zinc-700">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                className="odd:bg-white even:bg-zinc-50 dark:odd:bg-zinc-900 dark:even:bg-zinc-800"
              >
                <td className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-100">
                  {u.id}
                </td>
                <td className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-100">
                  {u.email}
                </td>
                 <td className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-100">
                  {u.firstName} {u.lastName} ({u.state})
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td
                  colSpan={2}
                  className="px-4 py-4 text-center text-zinc-500 dark:text-zinc-400"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
