import Navbar from "@/components/Navbar";
import { BookOpen } from "lucide-react";

export default function PublicBlogsPage() {
  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen size={32} className="text-cyan-500" />
          <h1 className="text-3xl font-bold text-slate-900">Community Blogs</h1>
        </div>
        <p className="text-slate-600 mb-10 text-lg">
          Explore blogs written by creators and users. Share your knowledge, learn from others, and join the conversation!
        </p>
        <div className="grid gap-8">
          {/* Dummy blog cards */}
          {[1,2,3].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Blog Title {i}</h2>
              <p className="text-slate-500 mb-4">This is a dummy blog post. It contains some example content to show how public blogs will look. Anyone can read these blogs and get inspired!</p>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <span>By User {i}</span>
                <span>·</span>
                <span>Jan 2026</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
