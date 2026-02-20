import {
  ChevronRight,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
} from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-linear-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center">
                <Logo />
              </div>
              <span className="font-bold text-2xl">
                Skill<span className="text-purple-400">Bridge</span>
              </span>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Bridging the gap between where you are and where you want to be.
              We provide world-class education for career growth.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Linkedin, Youtube, Instagram].map(
                (Icon, index) => (
                  <div
                    key={index}
                    className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-purple-600 transition cursor-pointer group">
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  </div>
                ),
              )}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Platform</h4>
            <ul className="space-y-4">
              {[
                "Courses",
                "Features",
                "Pricing",
                "Instructors",
                "Enterprise",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-purple-400 transition flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-4">
              {["About", "Careers", "Blog", "Press", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-purple-400 transition flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Legal</h4>
            <ul className="space-y-4">
              {[
                "Privacy Policy",
                "Terms-of-Service",
                "Security",
                "Cookie Policy",
                "Accessibility",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-400 hover:text-purple-400 transition flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400">
          <p>&copy; 2024 SkillBridge. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/sitemap" className="hover:text-purple-400 transition">
              Sitemap
            </Link>
            <Link href="/privacy" className="hover:text-purple-400 transition">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-purple-400 transition">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
