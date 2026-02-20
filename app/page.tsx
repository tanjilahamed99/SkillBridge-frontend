"use client";
import Link from "next/link";
import {
  BookOpen,
  Users,
  Award,
  Clock,
  ArrowRight,
  PlayCircle,
  Star,
  ChevronRight,
  TrendingUp,
  GraduationCap,
  Sparkles,
  Target,
  Code,
  Palette,
  Brain,
  Rocket,
  Heart,
  MessageCircle,
  Bookmark,
  Settings,
  UserPlus,
  Mail,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
} from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-purple-50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
                <Sparkles className="w-4 h-4 mr-2" />
                Join 50,000+ learners worldwide
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Master Your
                <span className="text-purple-600 block">Future Today</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 mt-6 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Transform your career with industry-leading courses, expert
                mentorship, and a community that supports your growth every step
                of the way.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-10">
                <Link
                  href="/signup"
                  className="bg-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-purple-700 transition shadow-xl shadow-purple-200 hover:shadow-purple-300 inline-flex items-center justify-center group text-lg">
                  Start Learning Now
                  <Rocket className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/demo"
                  className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition border-2 border-purple-200 inline-flex items-center justify-center group text-lg">
                  <PlayCircle className="mr-2 w-5 h-5 group-hover:scale-110 transition" />
                  Watch Demo
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-8 mt-12 justify-center lg:justify-start">
                <div className="flex items-center">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white shadow-lg"
                      />
                    ))}
                  </div>
                  <span className="ml-4 text-gray-600">
                    <span className="font-bold text-gray-900">50K+</span> active
                    learners
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">
                    <span className="font-bold text-gray-900">4.9</span> (12.5k
                    reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image/Cards */}
            <div className="relative hidden lg:block">
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-purple-100">
                {/* Featured Course Card */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-xl text-gray-900">
                      Featured Course
                    </h3>
                    <span className="text-xs text-purple-600 bg-purple-50 px-3 py-1 rounded-full font-medium">
                      New
                    </span>
                  </div>

                  <div className="bg-gradient-to-r from-purple-500 to-purple-700 h-48 rounded-2xl relative overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="font-bold text-xl">UI/UX Masterclass</p>
                      <p className="text-sm text-purple-100">
                        12 weeks • 42 lessons
                      </p>
                    </div>
                  </div>

                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Your progress</span>
                      <span className="font-bold text-purple-600">68%</span>
                    </div>
                    <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
                      <div className="w-2/3 h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"></div>
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-purple-50 p-4 rounded-xl">
                      <GraduationCap className="w-6 h-6 text-purple-600 mb-2" />
                      <p className="text-2xl font-bold text-gray-900">2,847</p>
                      <p className="text-sm text-gray-600">Graduates</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-xl">
                      <TrendingUp className="w-6 h-6 text-purple-600 mb-2" />
                      <p className="text-2xl font-bold text-gray-900">94%</p>
                      <p className="text-sm text-gray-600">Success rate</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Companies */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-gray-500 uppercase tracking-wider mb-10">
            Trusted by leading companies worldwide
          </p>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-items-center opacity-60">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-8 w-24 bg-gradient-to-r from-gray-300 to-gray-400 rounded"></div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">
              Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
              Everything You Need to
              <br />
              Excel in Your Career
            </h2>
            <p className="text-lg text-gray-600">
              We provide cutting-edge tools and resources to accelerate your
              learning journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: "Expert-Led Courses",
                desc: "Learn from industry professionals with 10+ years experience",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Community",
                desc: "Join a network of 50,000+ motivated learners",
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Certification",
                desc: "Earn recognized certificates upon completion",
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Flexible Learning",
                desc: "Self-paced with lifetime access to all materials",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white p-8 rounded-2xl border-2 border-purple-100 hover:border-purple-300 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-all group-hover:scale-110">
                  <div className="text-purple-600 group-hover:text-white transition">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-16">
            <div>
              <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">
                Start Learning
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
                Popular Courses
              </h2>
            </div>
            <Link
              href="/courses"
              className="group flex items-center text-purple-600 font-semibold text-lg mt-4 sm:mt-0">
              View All Courses
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Complete Web Development",
                category: "Development",
                lessons: 48,
                students: 3245,
                price: 49.99,
                icon: <Code className="w-8 h-8" />,
                color: "from-blue-500 to-purple-600",
              },
              {
                title: "UI/UX Design Masterclass",
                category: "Design",
                lessons: 42,
                students: 2189,
                price: 44.99,
                icon: <Palette className="w-8 h-8" />,
                color: "from-purple-500 to-pink-600",
              },
              {
                title: "Data Science & AI",
                category: "Data Science",
                lessons: 56,
                students: 1876,
                price: 59.99,
                icon: <Brain className="w-8 h-8" />,
                color: "from-green-500 to-purple-600",
              },
            ].map((course, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-purple-100">
                <div
                  className={`h-56 bg-gradient-to-r ${course.color} p-8 relative overflow-hidden`}>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold text-purple-600 shadow-lg">
                    Best Seller
                  </div>
                  <div className="text-white transform group-hover:scale-110 transition duration-500">
                    {course.icon}
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                      {course.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {course.lessons} lessons
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="ml-1 font-semibold">4.9</span>
                    </div>
                    <span className="text-gray-500">
                      {course.students.toLocaleString()} students
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900">
                      ${course.price}
                    </span>
                    <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition shadow-lg shadow-purple-200 group-hover:shadow-purple-300">
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/400/400')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              {
                number: "50K+",
                label: "Active Students",
                icon: <Users className="w-8 h-8 mx-auto mb-4" />,
              },
              {
                number: "500+",
                label: "Expert Instructors",
                icon: <Award className="w-8 h-8 mx-auto mb-4" />,
              },
              {
                number: "1000+",
                label: "Online Courses",
                icon: <BookOpen className="w-8 h-8 mx-auto mb-4" />,
              },
              {
                number: "95%",
                label: "Success Rate",
                icon: <Target className="w-8 h-8 mx-auto mb-4" />,
              },
            ].map((stat, index) => (
              <div key={index} className="text-white">
                <div className="text-purple-100">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-purple-200 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
              What Our Students Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Web Developer",
                company: "Google",
                quote:
                  "This platform transformed my career. I went from zero to landing my dream job in 6 months.",
              },
              {
                name: "Michael Chen",
                role: "Data Scientist",
                company: "Microsoft",
                quote:
                  "The quality of instruction is outstanding. Worth every penny and every minute invested.",
              },
              {
                name: "Emily Rodriguez",
                role: "UX Designer",
                company: "Apple",
                quote:
                  "The community support and mentorship program made all the difference in my journey.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border-2 border-purple-100 hover:border-purple-300 transition-all hover:shadow-xl">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full border-4 border-purple-200"></div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-900 text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-purple-600">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 text-lg italic">
                  {testimonial.quote}
                </p>
                <MessageCircle className="w-6 h-6 text-purple-300 mt-4" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands of students who have already transformed their
            careers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-purple-600 text-white px-10 py-5 rounded-xl font-semibold hover:bg-purple-700 transition shadow-xl shadow-purple-900/30 inline-flex items-center justify-center group text-lg">
              Get Started Free
              <Rocket className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
            </Link>
            <Link
              href="/courses"
              className="bg-transparent text-white px-10 py-5 rounded-xl font-semibold hover:bg-white/10 transition border-2 border-gray-700 inline-flex items-center justify-center text-lg">
              Browse Courses
            </Link>
          </div>
          <p className="text-gray-400 text-sm mt-6">
            No credit card required • 7-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center">
                  <span className="font-bold text-2xl">S</span>
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
                {["About", "Careers", "Blog", "Press", "Contact"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        href={`/${item.toLowerCase()}`}
                        className="text-gray-400 hover:text-purple-400 transition flex items-center gap-2">
                        <ChevronRight className="w-4 h-4" />
                        {item}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Legal</h4>
              <ul className="space-y-4">
                {[
                  "Privacy Policy",
                  "Terms of Service",
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
              <Link
                href="/sitemap"
                className="hover:text-purple-400 transition">
                Sitemap
              </Link>
              <Link
                href="/privacy"
                className="hover:text-purple-400 transition">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-purple-400 transition">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
