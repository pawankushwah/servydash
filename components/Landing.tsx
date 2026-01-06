"use client";
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs';
import { 
  ArrowRight, 
  CloudDownload, 
  ShieldCheck, 
  Zap, 
  Users, 
  LayoutDashboard,
  Globe,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// "Deep Blue & Electric Cyan" theme

export default function LandingPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-cyan-100 selection:text-cyan-900">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-40 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left z-10 min-w-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-600 text-sm font-medium mb-6 animate-fade-in">
                <Zap size={14} fill="currentColor" />
                <span>The Future of Digital Commerce</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
                Discover. Sell. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  Succeed.
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                Your digital products, instantly accessible. Join thousands of creators 
                launching their storefronts in minutes with ServyDash.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button onClick={() => router.push("/dashboard")} className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg cursor-pointer hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2 group">
                  List Your Service
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button onClick={() => router.push("/marketplace")}  className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-lg cursor-pointer hover:bg-slate-50 transition-all">
                  Browse Marketplace
                </button>
              </div>
            </div>
            {/* Right Illustration (SVG based on design) */}
            <div className="flex-1 flex justify-center items-center relative w-full max-w-xl min-w-0">
              <div className="relative z-10 animate-float flex justify-center items-center">
                <Image width={800} height={600} src="/image2.png" alt="Digital marketplace illustration" className="rounded-3xl shadow-2xl border border-slate-200 object-cover h-auto w-64 sm:w-80 md:w-96" />
              </div>
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/50 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- VALUE PROPOSITION (Double Card Layout) --- */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* For Creators */}
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:scale-110 transition-transform">
                <Zap size={28} fill="currentColor" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-slate-900">For Creators</h3>
              <p className="text-slate-500 mb-8 text-lg">Launch your digital storefront instantly with zero upfront costs.</p>
              <ul className="space-y-4">
                {['Easy setup in minutes', 'Instant payouts', 'Seamless file delivery', 'Advanced analytics'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 size={18} className="text-cyan-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-10 p-2 bg-slate-50 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                 <img src="/creators.png" alt="Creators working" className="rounded-xl object-cover h-48 w-full" />
              </div>
            </div>

            {/* For Customers */}
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center text-cyan-500 mb-8 group-hover:scale-110 transition-transform">
                <Users size={28} fill="currentColor" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-slate-900">For Customers</h3>
              <p className="text-slate-500 mb-8 text-lg">Find the digital assets you need to grow your career or business.</p>
              <ul className="space-y-4">
                {['Curated digital goods', 'Secure instant access', 'Global reach', 'Verified reviews'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 size={18} className="text-blue-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-10 p-2 bg-slate-50 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                <img src="/customer.png" alt="Customers browsing" className="rounded-xl object-cover h-48 w-full object-top-left" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- WHY SERVYDASH (Features Grid) --- */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Why ServyDash?</h2>
          <p className="text-slate-500 mb-16 text-lg">Built for the future of digital commerce.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
                <Globe size={32} />
              </div>
              <h4 className="text-xl font-bold mb-2">Global Reach</h4>
              <p className="text-slate-500">Sell to anyone, anywhere in the world with localized payments.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-cyan-50 text-cyan-500 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck size={32} />
              </div>
              <h4 className="text-xl font-bold mb-2">Secure Payments</h4>
              <p className="text-slate-500">Industry-standard encryption via Stripe and Razorpay integration.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-slate-50 text-slate-700 rounded-full flex items-center justify-center mb-6">
                <CloudDownload size={32} />
              </div>
              <h4 className="text-xl font-bold mb-2">24/7 Support</h4>
              <p className="text-slate-500">Automated file delivery and dedicated support for all users.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- BLOGS SECTION --- */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center gap-12">
          {/* Illustration or Icon */}
          <div className="flex-1 flex justify-center items-center md:justify-center">
            <div className="w-48 h-48 sm:w-64 sm:h-64 bg-cyan-50 rounded-3xl flex items-center justify-center shadow-lg border border-cyan-100">
              <LayoutDashboard size={80} className="text-cyan-500" />
            </div>
          </div>
          {/* Content */}
          <div className="flex-1 text-center md:text-left min-w-0">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900">Share Your Expertise with Blogs</h2>
            <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-xl mx-auto md:mx-0">
              As a creator, you can write insightful blogs to engage your audience, share knowledge, and boost your digital presence. Start creating blogs or explore what others are sharing!
            </p>
            <div className="flex flex-col xs:flex-row gap-4 justify-center md:justify-start w-full max-w-md mx-auto md:mx-0">
              <button
                onClick={() => router.push("/blogs")}
                className="w-full xs:w-1/2 min-w-[140px] px-8 py-4 bg-cyan-500 text-white rounded-xl font-bold text-lg cursor-pointer hover:bg-cyan-600 transition-all shadow-lg shadow-cyan-200 flex items-center gap-2 group"
              >
                Go to Blogs
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              {/* <button
                onClick={() => router.push("/dashboard/blogs/new")}
                className="w-full xs:w-1/2 min-w-[140px] px-8 py-4 bg-white text-cyan-600 border border-cyan-200 rounded-xl font-bold text-lg cursor-pointer hover:bg-cyan-50 transition-all flex items-center gap-2 group"
              >
                Start Creating Blog
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button> */}
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-slate-900 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden text-center text-white">
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-6xl font-bold mb-8">Ready to dash into success?</h2>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-12">
                Join the ServyDash revolution. Whether you're a creator or a buyer, 
                your digital journey starts here.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <RegisterLink className="px-10 py-5 bg-cyan-500 text-slate-900 rounded-2xl font-bold text-lg hover:bg-cyan-400 transition-colors">
                  Create Account
                </RegisterLink>
                {/* <button className="px-10 py-5 bg-transparent border border-slate-700 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-colors">
                  Watch Demo
                </button> */}
              </div>
            </div>
            
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 blur-[100px]"></div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-slate-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-2xl font-bold text-slate-900">
              Servy<span className="text-cyan-500">Dash</span>
            </div>
            <div className="flex gap-8 text-slate-500 font-medium">
              <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
            </div>
            <p className="text-slate-400 text-sm">
              © 2025 ServyDash Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};