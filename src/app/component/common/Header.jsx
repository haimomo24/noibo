import React from "react";


import { AiOutlineSearch } from "react-icons/ai";

import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center px-4 py-2 shadow-sm bg-white">
      {/* Menu Icon + Logo */}
      <div className="flex items-center space-x-3">
       <Link href='/homepage'><img
          src="/images/logo.jpg"
          alt="Gmail Logo"
          className="h-7"
        /></Link>
        
      </div>

      {/* Search Box */}
      <div className="flex flex-grow justify-end">
  
</div>
    </header>
  );
};

export default Header;
