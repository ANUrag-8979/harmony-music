import Link from "next/link"
import { Music, Facebook, Twitter, Instagram, Youtube, Mail, Phone } from "lucide-react"

export default function Component() {
  return (
    <footer className=" text-gray-300 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Music className="h-8 w-8 text-purple-400" />
              <span className="text-xl font-bold text-white">Harmony</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Master your musical journey with expert-led courses, interactive lessons, and a supportive community of
              learners.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://facebook.com"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://twitter.com"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://instagram.com"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://youtube.com"
                className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                aria-label="Subscribe to our YouTube channel"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Learning Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Learning</h3>
            <nav className="space-y-2">
              <Link
                href="/lessons"
                className="block text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200"
              >
                Interactive Lessons
              </Link>
              <Link
                href="/courses"
                className="block text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200"
              >
                Complete Courses
              </Link>
              <Link
                href="/practice"
                className="block text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200"
              >
                Practice Tools
              </Link>
              <Link
                href="/theory"
                className="block text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200"
              >
                Music Theory
              </Link>
              <Link
                href="/instruments"
                className="block text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200"
              >
                Instruments
              </Link>
            </nav>
          </div>

          {/* Community Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Community</h3>
            <nav className="space-y-2">
              <Link
                href="/blog"
                className="block text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200"
              >
                Blog & Tips
              </Link>
              <Link
                href="/forum"
                className="block text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200"
              >
                Student Forum
              </Link>
              <Link
                href="/events"
                className="block text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200"
              >
                Live Events
              </Link>
              <Link
                href="/testimonials"
                className="block text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200"
              >
                Success Stories
              </Link>
              <Link
                href="/teachers"
                className="block text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200"
              >
                Meet Our Teachers
              </Link>
            </nav>
          </div>

          {/* Support Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Support</h3>
            <nav className="space-y-2">
              <Link
                href="/about-us"
                className="block text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="block text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200"
              >
                Contact Us
              </Link>
              <Link
                href="/help"
                className="block text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200"
              >
                Help Center
              </Link>
              <Link
                href="/faq"
                className="block text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200"
              >
                FAQ
              </Link>
              <Link
                href="/pricing"
                className="block text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200"
              >
                Pricing
              </Link>
            </nav>

            {/* Contact Info */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Mail className="h-4 w-4" />
                <span>support@musiclearn.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">© {new Date().getFullYear()} MusicLearn. All rights reserved.</div>

            <nav className="flex flex-wrap justify-center md:justify-end space-x-6">
              <Link
                href="/privacy"
                className="text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200"
              >
                Cookie Policy
              </Link>
              <Link
                href="/accessibility"
                className="text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200"
              >
                Accessibility
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
