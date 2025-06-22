import "./globals.css";
import { NavbarDemo } from "@/components/navbar-menu";
import { FloatingDockDemo } from "@/components/floating-dock";
import Footer from '@/components/footer'
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" >
      <body>
        <NavbarDemo className="top-0"></NavbarDemo>
        {children}
        <FloatingDockDemo></FloatingDockDemo>
        <Footer></Footer>
      </body>
    </html>
  );
}
