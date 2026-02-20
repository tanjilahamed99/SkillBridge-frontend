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
import Footer from "@/components/Footer";
import Hero from "@/pages/Home/Hero";
import Treushed from "@/pages/Home/Treushed";
import Features from "@/pages/Home/Features";
import Popular from "@/pages/Home/Popular";
import Stats from "@/pages/Home/Stats";
import CTA from "@/pages/Home/CTA";
import Testimonials from "@/pages/Home/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Treushed />
      <Features />
      <Popular />
      <Stats />
      <Testimonials />
      <CTA />
      <Footer />

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
