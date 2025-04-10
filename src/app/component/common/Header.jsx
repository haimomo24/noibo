import React from "react";
import { FaBars } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center px-4 py-2 shadow-sm bg-white">
      {/* Menu Icon + Logo */}
      <div className="flex items-center space-x-3">
       
        <img
          src="/images/logo chua-01.png"
          alt="Gmail Logo"
          className="h-7"
        />
      </div>

      {/* Search Box */}
      <div className="flex flex-grow justify-end">
  <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full max-w-xl">
    <AiOutlineSearch className="text-gray-500 text-xl mr-2" />
    <input
      type="text"
      placeholder="Tìm kiếm trong thư"
      className="bg-transparent outline-none text-black flex-grow text-sm"
    />
    {/* Nút đăng nhập */}
    <Link
    href="/login">
    <button className="flex items-center gap-1 bg-[#802E30] text-white text-sm px-3 py-1 rounded-full hover:bg-gray-100 hover:text-black ml-2">
      <FaUser className="text-sm" />
      
    </button>
    </Link>
    
  </div>
</div>
    </header>
  );
};

export default Header;
