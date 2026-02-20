import Link from "next/link";
import {
  Shield,
  Lock,
  Eye,
  Database,
  ChevronRight,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation (same as before) */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-linear-to-br from-purple-50 via-white to-purple-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4 mr-2" />
            Privacy & Security
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Last updated: March 15, 2024
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <div className="bg-purple-50 p-8 rounded-3xl mb-12">
            <div className="flex items-start gap-4">
              <Eye className="w-6 h-6 text-purple-600 shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Our Commitment to Privacy
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  At SkillBridge, we take your privacy seriously. This policy
                  describes how we collect, use, and protect your personal
                  information when you use our platform. By using SkillBridge,
                  you agree to the collection and use of information in
                  accordance with this policy.
                </p>
              </div>
            </div>
          </div>

          {/* Policy Sections */}
          <div className="space-y-12">
            {[
              {
                icon: <Database className="w-6 h-6" />,
                title: "Information We Collect",
                content:
                  "We collect information you provide directly to us, such as when you create an account, enroll in courses, or contact support. This may include your name, email address, payment information, and course progress data.",
              },
              {
                icon: <Lock className="w-6 h-6" />,
                title: "How We Use Your Information",
                content:
                  "We use the information we collect to provide, maintain, and improve our services, process transactions, send technical notices, and respond to your comments and questions.",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Data Security",
                content:
                  "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
              },
              {
                icon: <FileText className="w-6 h-6" />,
                title: "Your Rights",
                content:
                  "You have the right to access, correct, or delete your personal information. You may also object to or restrict certain processing of your data. Contact us to exercise these rights.",
              },
            ].map((section, index) => (
              <div key={index} className="border-b border-gray-200 pb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                    <div className="text-purple-600">{section.icon}</div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      {section.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Important Notes */}
          <div className="mt-12 bg-gray-50 p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-purple-600" />
              Important Information
            </h3>
            <ul className="space-y-3">
              {[
                "We never sell your personal information to third parties",
                "You can request a copy of all data we hold about you",
                "We use industry-standard encryption to protect your data",
                "You can delete your account and data at any time",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">
              If you have questions about this Privacy Policy, please contact
              us.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700 group">
              Contact Us
              <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
