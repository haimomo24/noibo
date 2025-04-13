'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { MdInbox, MdOutlineAccessTime, MdOutlineLabel, MdSend, MdDrafts, MdExpandMore, MdLogout, MdPerson } from "react-icons/md";
import { MdCreate } from 'react-icons/md'
import Link from "next/link";

const Sidebar = () => {
  const [username, setUsername] = useState('');
  const [mails, setMails] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUsername(user.username);
    }
    fetchMails();
  }, []);

  const fetchMails = async () => {
    try {
      const res = await fetch('/api/mail');
      const data = await res.json();
      if (data.success) {
        setMails(data.mails);
      }
    } catch (error) {
      console.error('Error fetching mails:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    router.push('/');
  };

  const newMailsCount = mails.slice(0, 4).length;

  return (
    <aside className="w-64 bg-gray-50 h-screen p-4 text-sm">
      <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
        
      </div>

      <ul className="space-y-2">
      <li className="flex items-center justify-between bg-blue-100 text-blue-700 font-medium rounded-lg px-3 py-2">
  <span className="flex items-center space-x-2">
    <MdInbox className="text-lg" />
    <span>Hộp thư đến</span>
  </span>
  <span className="text-xs bg-blue-200 px-2 rounded-full">{mails.length}</span>
</li>

        <li className="flex text-black items-center space-x-2 px-3 py-2 hover:bg-gray-200 rounded-lg cursor-pointer">
          <MdDrafts />
          <span>Thông báo mới</span>
          {newMailsCount > 0 && (
            <span className="ml-auto text-xs bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse">
              {newMailsCount} new
            </span>
          )}
        </li>

        <li className="flex text-black items-center space-x-2 px-3 py-2 hover:bg-gray-200 rounded-lg cursor-pointer">
          <MdCreate className="text-xl" />
          <Link href='/newmail'>Soạn thư</Link>
        </li>

       


        <li className="flex text-black items-center space-x-2 px-3 py-2 hover:bg-gray-200 rounded-lg cursor-pointer">
        <div className="flex items-center space-x-2 mb-2">
          <MdPerson className="text-2xl text-gray-600" />
          <span className="font-medium text-gray-800">{username}</span>
        </div>       
        </li>
        <li className="flex text-black items-center space-x-2 px-3 py-2 hover:bg-gray-200 rounded-lg cursor-pointer">
                     <Link href='/register'>Thêm thành viên </Link>
        </li>

        <li className="flex text-black items-center space-x-2 px-3 py-2 hover:bg-gray-200 rounded-lg cursor-pointer">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700 w-full"
          >
            <MdLogout />
            <span>Đăng nhập </span>
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
