// app/unauthorized/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white px-6">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-600/10 border border-red-600 rounded-full">
            <Lock className="w-10 h-10 text-red-500" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
        <p className="text-gray-400 mb-6">
          You do not have permission to view this page. Please login with the appropriate account or contact the administrator.
        </p>

        <button
          onClick={() => router.push("/")}
          className="inline-block bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition duration-300"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}