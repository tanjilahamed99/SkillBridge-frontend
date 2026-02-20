import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Target,
  Eye,
  Users,
  Award,
  Globe,
  Rocket,
  Star,
  Linkedin,
  Twitter,
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-linear-to-br from-purple-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4 mr-2" />
              Our Story
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Bridging the Gap Between
              <span className="text-purple-600 block mt-2">
                Dreams and Reality
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We are on a mission to make quality education accessible to
              everyone, everywhere. Since 2020, we have helped over 50,000
              learners transform their careers and lives.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-y border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                number: "50K+",
                label: "Students",
                icon: <Users className="w-6 h-6" />,
              },
              {
                number: "500+",
                label: "Courses",
                icon: <Award className="w-6 h-6" />,
              },
              {
                number: "15+",
                label: "Countries",
                icon: <Globe className="w-6 h-6" />,
              },
              {
                number: "95%",
                label: "Success Rate",
                icon: <Rocket className="w-6 h-6" />,
              },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-purple-600 flex justify-center mb-3">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                  {stat.number}
                </div>
                <div className="text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-linear-to-br from-purple-50 to-white p-10 rounded-3xl border-2 border-purple-100">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To democratize education by providing accessible, affordable,
                and high-quality learning experiences that empower individuals
                to achieve their professional goals and transform their lives.
              </p>
            </div>

            <div className="bg-linear-to-br from-purple-50 to-white p-10 rounded-3xl border-2 border-purple-100">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Vision
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                A world where geographical boundaries and financial constraints
                do not limit access to education, and where every individual has
                the opportunity to reach their full potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">
              Our Core Values
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
              What Drives Us Forward
            </h2>
            <p className="text-lg text-gray-600">
              These principles guide every decision we make and shape the way we
              serve our community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Excellence",
                desc: "We never compromise on quality. Every course is crafted with care by industry experts.",
                icon: <Star className="w-8 h-8" />,
              },
              {
                title: "Accessibility",
                desc: "Education should be available to everyone, regardless of their background or location.",
                icon: <Globe className="w-8 h-8" />,
              },
              {
                title: "Innovation",
                desc: "We continuously evolve our platform to embrace new technologies and teaching methods.",
                icon: <Rocket className="w-8 h-8" />,
              },
              {
                title: "Community",
                desc: "Learning is better together. We foster a supportive environment for all learners.",
                icon: <Users className="w-8 h-8" />,
              },
              {
                title: "Integrity",
                desc: "We're transparent, honest, and always put our students' interests first.",
                icon: <Heart className="w-8 h-8" />,
              },
              {
                title: "Impact",
                desc: "We measure our success by the success of our students.",
                icon: <Target className="w-8 h-8" />,
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border-2 border-purple-100 hover:border-purple-300 transition-all hover:shadow-xl group">
                <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition">
                  <div className="text-purple-600 group-hover:text-white transition">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">
              Our Team
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
              Meet the Minds Behind SkillBridge
            </h2>
            <p className="text-lg text-gray-600">
              Passionate educators, industry experts, and tech innovators
              working together to transform education
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Dr. Sarah Chen",
                role: "CEO & Founder",
                bio: "Former Stanford professor with 15+ years in ed-tech",
              },
              {
                name: "Michael Rodriguez",
                role: "Head of Curriculum",
                bio: "Ex-Google engineer passionate about computer science education",
              },
              {
                name: "Priya Patel",
                role: "Lead Instructor",
                bio: "Award-winning educator specializing in data science",
              },
              {
                name: "James Wilson",
                role: "Community Director",
                bio: "Building learning communities for over a decade",
              },
            ].map((member, index) => (
              <div key={index} className="group text-center">
                <div className="w-32 h-32 mx-auto bg-linear-to-br from-purple-400 to-purple-600 rounded-full mb-4 border-4 border-purple-200 group-hover:scale-105 transition"></div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-purple-600 font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-gray-500 text-sm">{member.bio}</p>
                <div className="flex justify-center space-x-3 mt-4">
                  <Linkedin className="w-5 h-5 text-gray-400 hover:text-purple-600 cursor-pointer transition" />
                  <Twitter className="w-5 h-5 text-gray-400 hover:text-purple-600 cursor-pointer transition" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-r from-purple-600 to-purple-800 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join Our Mission Today
          </h2>
          <p className="text-xl text-purple-100 mb-10">
            Be part of the education revolution and start your learning journey
          </p>
          <Link
            href="/signup"
            className="bg-white text-purple-600 px-10 py-5 rounded-xl font-semibold hover:bg-gray-100 transition shadow-xl inline-flex items-center justify-center group text-lg">
            Get Started Now
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
