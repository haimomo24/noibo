import React from "react";
import { MdInbox, MdOutlineAccessTime, MdOutlineLabel, MdSend, MdDrafts, MdExpandMore } from "react-icons/md";
import { AiOutlineStar, AiOutlinePlus } from "react-icons/ai";
import { FaFolder } from "react-icons/fa";


const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-50 h-screen p-4 text-sm">
      <ul className="space-y-2">
        {/* Menu chính */}
        <li className="flex items-center justify-between bg-blue-100 text-blue-700 font-medium rounded-lg px-3 py-2">
          <span className="flex items-center space-x-2">
            <MdInbox className="text-lg" />
            <span>Hộp thư đến</span>
          </span>
          <span className="text-xs bg-blue-200 px-2 rounded-full">2.942</span>
        </li>

       
       
        
        <li className="flex text-black items-center space-x-2 px-3 py-2 hover:bg-gray-200 rounded-lg cursor-pointer">
          <MdDrafts />
          <span>Thông báo mới </span>
          <span className="ml-auto text-xs text-gray-500">10</span>
        </li>
        <li className="flex text-black items-center space-x-2 px-3 py-2 hover:bg-gray-200 rounded-lg cursor-pointer">
          <MdExpandMore />
          <span>Hiện thêm</span>
        </li>
      </ul>

      
      
    </aside>
  )
}

export default Sidebar