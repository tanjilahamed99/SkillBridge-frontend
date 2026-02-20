import Link from "next/link";
import {
  Scale,
  CheckCircle,
  ChevronRight,
  BookOpen,
  Users,
  CreditCard,
  Ban,
  Gavel,
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-linear-to-br from-purple-50 via-white to-purple-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Scale className="w-4 h-4 mr-2" />
            Legal Agreement
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Terms of Service
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
              <BookOpen className="w-6 h-6 text-purple-600 shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Welcome to SkillBridge
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  These terms and conditions outline the rules and regulations
                  for the use of SkillBridge&apos;s website and services. By
                  accessing this website, we assume you accept these terms and
                  conditions. Do not continue to use SkillBridge if you do not
                  agree to all the terms and conditions stated on this page.
                </p>
              </div>
            </div>
          </div>

          {/* Terms Sections */}
          <div className="space-y-12">
            {[
              {
                icon: <Users className="w-6 h-6" />,
                title: "Account Terms",
                points: [
                  "You must be at least 18 years old to use this service",
                  "You must provide accurate and complete information when creating an account",
                  "You are responsible for maintaining the security of your account",
                  "You are responsible for all content posted and activity that occurs under your account",
                ],
              },
              {
                icon: <CreditCard className="w-6 h-6" />,
                title: "Payment Terms",
                points: [
                  "All payments are processed securely through our payment partners",
                  "Courses are non-refundable unless required by law",
                  "We reserve the right to change our prices at any time",
                  "Free trials may be converted to paid subscriptions unless cancelled",
                ],
              },
              {
                icon: <BookOpen className="w-6 h-6" />,
                title: "Course Access and Usage",
                points: [
                  "You receive a personal, non-transferable license to access course content",
                  "You may not share your account credentials with others",
                  "Course content is for personal use only and cannot be redistributed",
                  "We reserve the right to update or modify course content",
                ],
              },
              {
                icon: <Ban className="w-6 h-6" />,
                title: "Prohibited Activities",
                points: [
                  "Copying, distributing, or sharing course materials without permission",
                  "Using the platform for any illegal purposes",
                  "Attempting to interfere with the proper functioning of the platform",
                  "Impersonating another person or entity",
                ],
              },
            ].map((section, index) => (
              <div key={index} className="border-b border-gray-200 pb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                    <div className="text-purple-600">{section.icon}</div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {section.title}
                    </h2>
                    <ul className="space-y-3">
                      {section.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          <span className="text-gray-600">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Termination Clause */}
          <div className="mt-12 bg-gray-50 p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Gavel className="w-5 h-5 text-purple-600" />
              Termination
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              We may terminate or suspend your account and bar access to the
              service immediately, without prior notice or liability, under our
              sole discretion, for any reason whatsoever, including without
              limitation if you breach the Terms.
            </p>
            <p className="text-gray-600">
              Upon termination, your right to use the service will immediately
              cease. If you wish to terminate your account, you may simply
              discontinue using the service or contact support for assistance.
            </p>
          </div>

          {/* Governing Law */}
          <div className="mt-8 p-8 bg-purple-50 rounded-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Scale className="w-5 h-5 text-purple-600" />
              Governing Law
            </h3>
            <p className="text-gray-600">
              These Terms shall be governed and construed in accordance with the
              laws of the United States, without regard to its conflict of law
              provisions.
            </p>
          </div>

          {/* Contact Section */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">
              If you have any questions about these Terms, please contact us.
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
