"use client";

import React, { useState, useEffect } from 'react';
import { AiOutlineStar, AiOutlineDownload } from 'react-icons/ai';

const itemsPerPage = 6;

const MainContent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [mails, setMails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(mails.length / itemsPerPage);
  const paginatedMails = mails.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <div className="flex-1 overflow-y-auto mt-[50px] bg-gray-50 p-4 rounded-xl shadow-inner">
      {loading ? (
        <div className="text-center py-4">Đang tải dữ liệu...</div>
      ) : (
        <>
          {paginatedMails.map((mail, index) => (
            <div
              key={mail.id}
              className="flex items-start gap-4 px-4 py-4 mb-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 hover:bg-gray-100"
            >
              <input type="checkbox" className="mt-1" />
              <AiOutlineStar className="text-gray-400 hover:text-yellow-500 mt-1 cursor-pointer" />
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-800 truncate">{mail.name}</span>
                    {index < 4 && (
                      <span className="animate-pulse bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        NEW
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">{formatDate(mail.created_date)}</span>
                </div>
                <div className="text-gray-700 font-medium truncate">{mail.title}</div>
                <div className="text-sm text-gray-500 truncate">{mail.description}</div>
                {mail.file_path && (
                  <div className="flex items-center mt-2 text-blue-600 hover:text-blue-800">
                    <AiOutlineDownload className="mr-1" />
                    <a href={mail.file_path} download className="text-sm">
                      Tải file đính kèm
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}

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
        </>
      )}
    </div>
  );
};

export default MainContent;
