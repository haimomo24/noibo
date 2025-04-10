
"use client";

import React, { useState } from 'react';
import { AiOutlineStar } from 'react-icons/ai';

// Danh sách email mẫu
const emails = [
  { id: 1, from: "mbebanking", title: "Thông báo giao dịch thành công", preview: "MB eBanking đã xử lý giao dịch...", time: "06:43" },
  { id: 2, from: "InfinityFree", title: "Reminder: Website is suspended", preview: "Your InfinityFree account is suspended...", time: "9 thg 4" },
  { id: 3, from: "Riot Games", title: "Mã Đăng Nhập: 349036", preview: "Đây là mã phê duyệt đăng nhập của bạn", time: "6 thg 4" },
  { id: 4, from: "Google", title: "Cảnh báo bảo mật", preview: "Có một đăng nhập mới từ thiết bị khác", time: "8 thg 4" },
  { id: 5, from: "Skype", title: "Skype to be retired", preview: "Microsoft Skype sẽ kết thúc vào tháng 5", time: "8 thg 4" },
  { id: 6, from: "Freelancer", title: "New activity", preview: "You have new updates from Matt B.", time: "4 thg 4" },
  { id: 7, from: "JobStreet", title: "Tuyển dụng giáo viên", preview: "Onestudy tuyển dụng giáo viên tại Ninh Bình", time: "4 thg 4" },
  { id: 9, from: "Riot Games", title: "Mã Đăng Nhập: 555667", preview: "Nếu bạn không phải người gửi yêu cầu này...", time: "4 thg 4" },
  { id: 10, from: "Riot Games", title: "Mã Đăng Nhập: 555667", preview: "Nếu bạn không phải người gửi yêu cầu này...", time: "4 thg 4" },
  { id: 11, from: "Riot Games", title: "Mã Đăng Nhập: 555667", preview: "Nếu bạn không phải người gửi yêu cầu này...", time: "4 thg 4" },
  { id: 12, from: "Riot Games", title: "Mã Đăng Nhập: 555667", preview: "Nếu bạn không phải người gửi yêu cầu này...", time: "4 thg 4" },
  { id: 13, from: "Riot Games", title: "Mã Đăng Nhập: 555667", preview: "Nếu bạn không phải người gửi yêu cầu này...", time: "4 thg 4" },

  // ... thêm bao nhiêu email tùy bạn
];

// Cấu hình phân trang
const itemsPerPage = 6;

const MainContent = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Tính tổng số trang
  const totalPages = Math.ceil(emails.length / itemsPerPage);

  // Cắt dữ liệu cho từng trang
  const paginatedEmails = emails.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex-1 overflow-y-auto mt-[50px] bg-gray-50 p-4 rounded-xl shadow-inner">
      {paginatedEmails.map((email) => (
        <div
          key={email.id}
          className="flex items-start gap-4 px-4 py-4 mb-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 hover:bg-gray-100"
        >
          <input type="checkbox" className="mt-1" />
          <AiOutlineStar className="text-gray-400 hover:text-yellow-500 mt-1 cursor-pointer" />
          <div className="flex flex-col w-full">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-800 truncate">{email.from}</span>
              <span className="text-sm text-gray-500">{email.time}</span>
            </div>
            <div className="text-gray-700 font-medium truncate">{email.title}</div>
            <div className="text-sm text-gray-500 truncate">{email.preview}</div>
          </div>
        </div>
      ))}

      {/* Phân trang */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-4 py-2 text-black rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Trang trước
        </button>

        <span className="text-sm text-black">
          Trang {currentPage} / {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-black rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default MainContent;
