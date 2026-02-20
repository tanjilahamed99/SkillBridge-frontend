import {
  Mail,
  MapPin,
  Phone,
  Send,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Clock,
  MessageCircle,
  Headphones,
  HelpCircle,
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Hero Section */}
      <section className="bg-linear-to-br from-purple-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MessageCircle className="w-4 h-4 mr-2" />
              Get in Touch
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              We&apos;d Love to
              <span className="text-purple-600 block mt-2">Hear From You</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Have questions about our courses, need help with your account, or
              want to partner with us? Our team is here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Mail className="w-8 h-8" />,
                title: "Email Us",
                content: "support@skillbridge.com",
                sub: "We reply within 24 hours",
              },
              {
                icon: <Phone className="w-8 h-8" />,
                title: "Call Us",
                content: "+1 (555) 123-4567",
                sub: "Mon-Fri, 9am-6pm EST",
              },
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "Visit Us",
                content: "123 Education St",
                sub: "San Francisco, CA 94105",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-linear-to-br from-purple-50 to-white p-8 rounded-2xl border-2 border-purple-100 text-center group hover:border-purple-300 transition-all hover:shadow-xl">
                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                  <div className="text-white">{item.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-purple-600 font-medium mb-1">
                  {item.content}
                </p>
                <p className="text-gray-500 text-sm">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-10 rounded-3xl border-2 border-purple-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Send us a Message
              </h2>
              <p className="text-gray-600 mb-8">
                We will get back to you as soon as possible
              </p>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-600 focus:outline-none transition"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-600 focus:outline-none transition"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-600 focus:outline-none transition"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-600 focus:outline-none transition"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-600 focus:outline-none transition"
                    placeholder="Tell us more about your inquiry..."></textarea>
                </div>

                <button className="w-full bg-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-purple-700 transition shadow-lg shadow-purple-200 flex items-center justify-center group text-lg">
                  Send Message
                  <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
                </button>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="bg-linear-to-br from-purple-400 to-purple-600 h-80 rounded-3xl relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur px-6 py-3 rounded-full text-purple-600 font-semibold">
                    📍 123 Education St, San Francisco
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-white p-8 rounded-2xl border-2 border-purple-100">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-6 h-6 text-purple-600" />
                  <h3 className="text-xl font-bold text-gray-900">
                    Office Hours
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM EST" },
                    { day: "Saturday", hours: "10:00 AM - 4:00 PM EST" },
                    { day: "Sunday", hours: "Closed" },
                  ].map((schedule, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border-b border-gray-100 pb-2">
                      <span className="text-gray-600">{schedule.day}</span>
                      <span className="font-medium text-gray-900">
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Support Options */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-50 p-6 rounded-xl text-center hover:bg-purple-100 transition cursor-pointer">
                  <Headphones className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <span className="font-medium text-gray-900">Live Chat</span>
                </div>
                <div className="bg-purple-50 p-6 rounded-xl text-center hover:bg-purple-100 transition cursor-pointer">
                  <HelpCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <span className="font-medium text-gray-900">FAQ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Follow Us on Social Media
          </h2>
          <p className="text-gray-600 mb-8">
            Stay updated with the latest courses and announcements
          </p>
          <div className="flex justify-center space-x-6">
            {[Facebook, Twitter, Linkedin, Instagram, Youtube].map(
              (Icon, index) => (
                <div
                  key={index}
                  className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center hover:bg-purple-600 transition cursor-pointer group">
                  <Icon className="w-7 h-7 text-purple-600 group-hover:text-white transition" />
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
