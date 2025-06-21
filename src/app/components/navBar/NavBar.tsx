"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaHeart } from 'react-icons/fa';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav  className="w-full shadow-xl hover:shadow-2xl transition-all duration-500 ease-in-out flex flex-col justify-center items-center"
      style={{
        background: "linear-gradient(to right, white, #bbdefb, white)",
      }}>
        
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
         
          <div className="flex items-center space-x-4">
            <Link 
              href="/" 
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                pathname === '/' 
                 
              }`}
            >
              <FaHome className="mr-2" />
              Home
            </Link>
            
            <Link 
              href="/favorites" 
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                pathname === '/favorites'
             
                }`}
            >
              <FaHeart className="mr-2" />
              Favorites
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;