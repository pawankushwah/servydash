"use client";
import Link from 'next/link';
import { AuthButtons } from './AuthButtons';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({ showLinks = true }: { showLinks?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="flex justify-between items-center p-4 sm:p-6 max-w-7xl mx-auto">
        <Link href="/" className="text-2xl font-bold text-blue-900 min-w-[120px]">
          <Image
            src="/flogo.png"
            alt="ServyDash Logo"
            width={140}
            height={40}
            className="object-contain w-auto h-10"
          />
        </Link>

        {/* Desktop links */}
        {showLinks && (
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/marketplace" className="text-gray-600 hover:text-blue-600 font-medium">
              Marketplace
            </Link>
            <Link href="/blogs" className="text-gray-600 hover:text-blue-600 font-medium">
              Blogs
            </Link>
            <AuthButtons />
          </div>
        )}

        {/* Mobile menu button */}
        {showLinks && (
          <button
            className="md:hidden p-2 rounded-lg text-blue-900 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        )}
      </div>

      {/* Mobile dropdown menu */}
      {showLinks && mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-fade-in-down">
          <div className="flex flex-col items-center py-4 space-y-4">
            {location.pathname !== "/" && <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 font-medium text-lg w-full text-center"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>}
            <Link
              href="/marketplace"
              className="text-gray-700 hover:text-blue-600 font-medium text-lg w-full text-center"
              onClick={() => setMobileOpen(false)}
            >
              Marketplace
            </Link>
            <Link
              href="/blogs"
              className="text-gray-700 hover:text-blue-600 font-medium text-lg w-full text-center"
              onClick={() => setMobileOpen(false)}
            >
              Blogs
            </Link>
            <div className="w-full flex flex-col md:flex-row justify-center">
              <AuthButtons />
            </div>
          </div>
        </div>
      )}

      {/* Animation for dropdown */}
      <style jsx>{`
        .animate-fade-in-down {
          animation: fade-in-down 0.25s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
}