"use client"

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
  IconLogin2,IconLogout2,
  IconUserCircle
} from "@tabler/icons-react";
import { useEffect,useState } from "react";
import Cookies from "js-cookie"; 

export function FloatingDockDemo() {
    const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Always check on mount *and* on route-change
  useEffect(() => {
    const token = Cookies.get("token");
    console.log("FloatingDock: read token →", token);
    if (token === undefined) {
      console.warn(
        "No 'token' cookie visible to js-cookie. " +
        "If you’re using HttpOnly cookies, the client can’t read them."
      );
    }
    setIsLoggedIn(Boolean(token));
  }, [pathname]);

  // Example login handler that also flips the flag immediately:
  // const handleLogin = async () => {
  //   // … your login logic here that sets the cookie …
  //   Cookies.set("token", "YOUR_JWT_HERE", { /* options: path, sameSite, etc */ });
  //   setIsLoggedIn(true);          // immediate feedback
  //   router.push("/");             // or wherever you land
  // };

  // Example logout handler
  const handleLogout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },

    {
      title: "Products",
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/courses",
    },
    {
      title: "Components",
      icon: (
        <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Aceternity UI",
      icon: (
        <img
          src="https://assets.aceternity.com/logo-dark.png"
          width={20}
          height={20}
          alt="Aceternity Logo" />
      ),
      href: "#",
    },
    {
      title: "Changelog",
      icon: (
        <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "Profile",
      icon: (
        <IconUserCircle className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/user/edit-profile",
    },
    {
      title: (isLoggedIn ? "Logout" : "Login"),
      icon: (
        (isLoggedIn ?
            <IconLogout2 onClick={handleLogout} className="h-full w-full text-neutral-500 dark:text-neutral-300" />:
            <IconLogin2 className="h-full w-full text-neutral-500 dark:text-neutral-300" /> 
        )
        
      ),
      href: (isLoggedIn ? "/logout" : "/login"),
    },
  ];
  return (
  <div className="fixed bottom-0 left-0 w-full overflow-visible z-50 flex items-center justify-center bg-black/0">
  <FloatingDock
    // …your props…
    mobileClassName="translate-y-20"
    items={links}
  />
</div>

  );
}
