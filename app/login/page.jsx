"use client"
import React, { useState, useEffect } from "react"
import { Label } from "../../components/ui/label"
import { Input } from "../../components/ui/input"
import { cn } from "@/lib/utils"
import axios from "axios"
import { useRouter } from "next/navigation";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
  IconX,
  IconCheck,
  IconAlertCircle,
} from "@tabler/icons-react"
import Link from "next/link"

export default function SignupFormDemo() {
  const router = useRouter();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [toast, setToast] = useState(null)
  const [loading, setLoading] = useState(false);

  const showToast = (message, type = "success") => {
    setToast({ message, type })
  }

  const hideToast = () => {
    setToast(null)
  }

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        hideToast()
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  const handleSubmit = async (e) => {
  setLoading(true);
  console.log("handleSubmit called");
  e.preventDefault();
  setError("");

  // Validate inputs
  if (!email.trim() || !password.trim()) {
    setError("Please fill in both email and password.");
    showToast("Please fill in both email and password.", "error");
    setLoading(false); // ✅ Reset loading before exiting
    return;
  }

  try {
    const res = await axios.post("/api/login", { email, password });
    console.log(res.data.message);
    showToast("Login successful! Welcome back.", "success");

    // ✅ Delay the refresh by 1 seconds
    setTimeout(() => {
      window.location.href = "/"
    }, 500)
  } catch (err) {
    console.error(err);
    const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
    setError(errorMessage);
    showToast(errorMessage, "error");
  } finally {
    setLoading(false);
  }
};

  const handleSocialLogin = (provider) => {
    console.log(`Social login: ${provider}`)
    // add social login logic here
    showToast(`${provider} login initiated...`, "success")
  }

  return (
    <>
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
          <div
            className={cn(
              "flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg backdrop-blur-sm border max-w-sm",
              toast.type === "success"
                ? "bg-green-50/90 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300"
                : "bg-red-50/90 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300",
            )}
          >
            <div className="flex-shrink-0">
              {toast.type === "success" ? <IconCheck className="h-5 w-5" /> : <IconAlertCircle className="h-5 w-5" />}
            </div>
            <p className="text-sm font-medium flex-1">{toast.message}</p>
            <button
              onClick={hideToast}
              className="flex-shrink-0 rounded-full p-1 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              <IconX className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <div className="mt-30 shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Welcome to Harmony</h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
          Login to Harmony using your credentials below.
        </p>
        <form className="my-8" onSubmit={handleSubmit}>
          {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </LabelInputContainer>

          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] disabled:opacity-60"
            type="submit"
            disabled={loading} // Disable the button while loading
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <span className="loader border-white"></span>
                Logging in...
              </div>
            ) : (
              <>
                Login &rarr;
                <BottomGradient />
              </>
            )}
          </button>

          <Link href={'/signup'} className="flex justify-center mt-4 text-blue-500">create account?</Link>
          <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

          {/* <div className="flex flex-col space-y-4">
            <SocialButton label="GitHub" icon={<IconBrandGithub />} onClick={() => handleSocialLogin("GitHub")} />
            <SocialButton label="Google" icon={<IconBrandGoogle />} onClick={() => handleSocialLogin("Google")} />
            <SocialButton label="OnlyFans" icon={<IconBrandOnlyfans />} onClick={() => handleSocialLogin("OnlyFans")} />
          </div> */}
        </form>
      </div>
    </>
  )
}

const SocialButton = ({ label, icon, onClick }) => (
  <button
    className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
    type="button"
    onClick={onClick}
  >
    {React.cloneElement(icon, {
      className: "h-4 w-4 text-neutral-800 dark:text-neutral-300",
    })}
    <span className="text-sm text-neutral-700 dark:text-neutral-300">{label}</span>
    <BottomGradient />
  </button>
)

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
)

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>
)
