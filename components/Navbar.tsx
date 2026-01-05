import Link from 'next/link';
import { AuthButtons } from './AuthButtons';
import Image from 'next/image';

export default function Navbar({ showLinks = true }: { showLinks?: boolean }) {
  return (
    <nav className="flex justify-between items-center p-6 bg-white shadow-sm sticky top-0 z-50">
      {/* <Link href="/" className="text-2xl font-bold text-blue-900">
        Servy<span className="text-cyan-500">Dash</span>
      </Link> */}
      <Link href="/" className="text-2xl font-bold text-blue-900">
      <Image
        src="/flogo.png"
        alt="ServyDash Logo"
        width={300}
        height={100}
        className="object-contain"
      />
      </Link>
      
      {showLinks && <div className="flex items-center space-x-8">
        <Link href="/marketplace" className="text-gray-600 hover:text-blue-600 font-medium">
          Marketplace
        </Link>
        <Link href="/blogs" className="text-gray-600 hover:text-blue-600 font-medium">
          Blogs
        </Link>
        {/* AuthButtons now manages its own isAuthenticated state */}
        <AuthButtons  />
      </div>}
    </nav>
  );
}