import { Cloud } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-neutral-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
                <Cloud className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">SkillBridge</span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed mb-4">
              Bridging the gap between where you are and where you want to be.
              We provide world-class education under one sky.
            </p>
            <div className="flex space-x-4">
              {["T", "F", "L", "Y"].map((social, index) => (
                <div
                  key={index}
                  className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition cursor-pointer">
                  <span className="text-neutral-400 text-sm hover:text-white">
                    {social}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <Link
                  href="/courses"
                  className="hover:text-primary-400 transition">
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/features"
                  className="hover:text-primary-400 transition">
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-primary-400 transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/instructors"
                  className="hover:text-primary-400 transition">
                  Instructors
                </Link>
              </li>
              <li>
                <Link
                  href="/enterprise"
                  className="hover:text-primary-400 transition">
                  Enterprise
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary-400 transition">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-primary-400 transition">
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-primary-400 transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/press"
                  className="hover:text-primary-400 transition">
                  Press
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary-400 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-primary-400 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-primary-400 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/security"
                  className="hover:text-primary-400 transition">
                  Security
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="hover:text-primary-400 transition">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/accessibility"
                  className="hover:text-primary-400 transition">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-neutral-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} SkillBridge. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/sitemap" className="hover:text-primary-400 transition">
              Sitemap
            </Link>
            <Link href="/privacy" className="hover:text-primary-400 transition">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-primary-400 transition">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
