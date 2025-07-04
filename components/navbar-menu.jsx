"use client";
import React, { useEffect, useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import { ColourfulText } from "./ui/colourful-text";
import {
    IconArrowLeft,
    IconBrandTabler,
    IconSettings,
    IconUserBolt,
} from "@tabler/icons-react";
import axios from "axios";
import Link from "next/link";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
// export function NavbarDemo() {
//     return (
//         <div className="relative w-full flex items-center justify-center ">
//             <Navbar className="top-0" />
//             <p className="text-black dark:text-white">
//                 The Navbar will show on top of the page
//             </p>
//         </div>
//     );
// }



export function NavbarDemo() {
    //
    const router = useRouter();
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [roles, setRoles] = useState([]);

    // Always check on mount *and* on route-change
   useEffect(() => {
        const token = Cookies.get("token");
        console.log("token in navbar:", token);
        setIsLoggedIn(Boolean(token));
        console.log(isLoggedIn);
    }, [pathname]);

    const handleLogout = () => {
        Cookies.remove("token");
        setIsLoggedIn(false);
        router.push("/login");
    };


    //
    useEffect(() => {
        console.log("form navbar isLoggedIn's value",isLoggedIn)
        if(!isLoggedIn) return;
        async function getRoles() {
            try {
                const res = await axios.post("/api/get-roll");
                console.log(res.data);
                setRoles(res.data.roles); // corrected from res.roles to res.data.roles
            } catch (error) {
                console.error("Error fetching roles:", error);
            }
        }

        getRoles();
    }, [isLoggedIn]);
    const [active, setActive] = useState(null);
    return (
        <div
            className={cn(" fixed top-10 inset-x-0 max-w-2xl mx-auto z-50")}>
                
            <Menu setActive={setActive}>
                <div className="flex justify-between gap-4 items-center">
                    <Link href={'/'}>
                   <h1 className="text-l md:text-xl lg:text-2xl font-bold text-center text-white relative z-2 font-sans">
                    <ColourfulText text="Sikarwar" /> <br /> 
                    </h1>
                    </Link>
                    <MenuItem setActive={setActive} active={active} item="Explore">
                        <div className="flex flex-col space-y-4 text-sm items-start">
                            <HoveredLink href="/courses">All Courses</HoveredLink>
                            {!roles?.includes("teacher") && (<HoveredLink href="/user/become-a-teacher">Become a teacher</HoveredLink>)}
                            {roles?.includes("principle") && (<HoveredLink href="/principle/verify-course">Verify Courses</HoveredLink>)}
                            {roles?.includes("principle") && (<HoveredLink href="/principle/verify-teacher">Check Job Applications</HoveredLink>)}
                            {roles?.includes("teacher") && (<HoveredLink href="/teacher/add-course">Add New Course</HoveredLink>)}
                        </div>
                    </MenuItem>
                    {/* <MenuItem setActive={setActive} active={active} item="Products">
                        <div className="  text-sm grid grid-cols-2 gap-10 p-4">
                            <ProductItem
                                title="Algochurn"
                                href="https://algochurn.com"
                                src="https://assets.aceternity.com/demos/algochurn.webp"
                                description="Prepare for tech interviews like never before." />
                            <ProductItem
                                title="Tailwind Master Kit"
                                href="https://tailwindmasterkit.com"
                                src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                                description="Production ready Tailwind css components for your next project" />
                            <ProductItem
                                title="Moonbeam"
                                href="https://gomoonbeam.com"
                                src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
                                description="Never write from scratch again. Go from idea to blog in minutes." />
                            <ProductItem
                                title="Rogue"
                                href="https://userogue.com"
                                src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
                                description="Respond to government RFPs, RFIs and RFQs 10x faster using AI" />
                        </div>
                    </MenuItem> */}
                    {/* <MenuItem setActive={setActive} active={active} item="Pricing">
                        <div className="flex flex-col space-y-4 text-sm">
                            <HoveredLink href="/hobby">Hobby</HoveredLink>
                            <HoveredLink href="/individual">Individual</HoveredLink>
                            <HoveredLink href="/team">Team</HoveredLink>
                            <HoveredLink href="/enterprise">Enterprise</HoveredLink>
                        </div>
                    </MenuItem> */}
                    <MenuItem setActive={setActive} active={active} item="Accounts">
                        <div className="flex flex-col space-y-4 text-sm">
                            {!isLoggedIn && (<HoveredLink href="/login">Login</HoveredLink>)}
                            
                            {!isLoggedIn && (<HoveredLink href="/signup">SignUp </HoveredLink>)}
                            {isLoggedIn && (<HoveredLink href="/user/edit-profile">Profile</HoveredLink>)}
                            <HoveredLink href="/about-us">About Us </HoveredLink>
                            {isLoggedIn && (
                                <div className="flex justify-start">
                                <button onClick={handleLogout} className="hover:text-red-600 cursor-pointer underline">
                                    Logout
                                </button>
                                </div>
                            )}
                            {/* <HoveredLink href="/seo">Search Engine Optimization</HoveredLink> */}
                            {/* <HoveredLink href="/branding">Branding</HoveredLink> */}
                        </div>
                    </MenuItem>
                </div>
            </Menu>
        </div>
    );
}
