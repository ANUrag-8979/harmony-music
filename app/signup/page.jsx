"use client"
import React, { useState } from "react"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { cn } from "@/lib/utils"
import { IconBrandGithub, IconBrandGoogle, IconBrandOnlyfans } from "@tabler/icons-react"
import Link from "next/link"
import axios from "axios"; 

// Simple Toast Component
const Toast = ({ message, type, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-md shadow-lg transition-all duration-300 ${
        type === "success"
          ? "bg-green-500 text-white"
          : type === "error"
            ? "bg-red-500 text-white"
            : "bg-blue-500 text-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="ml-2 text-white hover:text-gray-200">
          ×
        </button>
      </div>
    </div>
  )
}

export default function SignupFormDemo() {
  // Fixed: Uncommented state variables
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [loading, setLoading] = useState(false)

  // Toast state
  const [toast, setToast] = useState(null)

  const showToast = (message, type = "info") => {
    setToast({ message, type })
  }

  const hideToast = () => {
    setToast(null)
  }

  // Fixed: Added 'e' parameter and proper error handling
  const handleSubmit = async (e) => {
  e.preventDefault();

  // Basic form validation
  if (!firstName) {
    showToast("First name is required.", "error");
    return;
  }
  if (!email) {
    showToast("Email is required.", "error");
    return;
  }
  if (!password) {
    showToast("Password is required.", "error");
    return;
  }

  try {
    setLoading(true);

    const response = await axios.post("/api/signup", {
      firstName,
      lastName,
      email,
      password,
      username,
    });

    const data = response.data;
    console.log(data);

    if (response.status === 200) {
      showToast("Signup successful! Verification email has been sent", "success");
    } else {
      showToast(data.message || "Signup failed", "error");
    }
    setTimeout(() => {
      window.location.href = "/login"
    }, 1000)
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Network error. Please try again.";
    showToast(errorMessage, "error");
    console.error("Signup error:", error);
  } finally {
    setLoading(false);
  }

  console.log("Form submitted");
}

  return (
    <>
      {/* Toast notification */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

      <div className="mt-30 shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Welcome to Harmony</h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
          Signup to Harmony complete your music Journey
        </p>
        <form className="my-8" onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
            <LabelInputContainer>
              <Label htmlFor="firstname">First name</Label>
              <Input
                onChange={(e) => {
                  setFirstName(e.target.value)
                }}
                id="firstname"
                placeholder="Tyler"
                type="text"
                value={firstName}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="lastname">Last name</Label>
              <Input
                onChange={(e) => {
                  setLastName(e.target.value)
                }}
                id="lastname"
                placeholder="Durden"
                type="text"
                value={lastName}
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="username">User Name</Label>
            <Input
              onChange={(e) => {
                setUsername(e.target.value)
              }}
              id="username"
              placeholder="anurag-singh"
              type="text"
              value={username}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              value={email}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              id="password"
              placeholder="••••••••"
              type="password"
              value={password}
            />
          </LabelInputContainer>
              {/* login link */}
          <Link href={'/login'} className="flex justify-center my-4 text-green-500"> Login </Link>
          
          <button
            // disabled={loading}
            className="disabled:cursor-not-allowed
            disabled:opacity-50 
            group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            type="submit"
          >
            {loading ? "loading.." : "Sign up"}
            <BottomGradient />
          </button>

          <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

          {/* <div className="flex flex-col space-y-4">
            <button
              className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
              type="button"
            >
              <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">GitHub</span>
              <BottomGradient />
            </button>
            <button
              className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
              type="button"
            >
              <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">Google</span>
              <BottomGradient />
            </button>
            <button
              className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
              type="button"
            >
              <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">OnlyFans</span>
              <BottomGradient />
            </button>
          </div> */}
        </form>
      </div>
    </>
  )
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  )
}

const LabelInputContainer = ({ children, className }) => {
  return <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>
}
