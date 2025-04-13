"use client";

import React, { useState, useEffect } from 'react';
import { AiOutlineStar, AiOutlineDownload, AiOutlineDelete } from 'react-icons/ai';

const itemsPerPage = 6;

const MainContent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [mails, setMails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [downloadStatus, setDownloadStatus] = useState({});

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIsLoggedIn(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMail = async (mailId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa thư này không?')) {
      try {
        const res = await fetch(`/api/mail/${mailId}`, {
          method: 'DELETE',
        });
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        if (data.success) {
          // Actualizar la lista de correos después de eliminar
          setMails(prevMails => prevMails.filter(mail => mail.id !== mailId));
          alert('Xóa thư thành công!');
        } else {
          alert('Không thể xóa thư: ' + data.message);
        }
      } catch (error) {
        console.error('Error deleting mail:', error);
        alert('Đã xảy ra lỗi khi xóa thư: ' + error.message);
      }
    }
  };

  const toggleDescription = (mailId) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [mailId]: !prev[mailId]
    }));
  };

  // Hàm xử lý tải file đính kèm
  // Hàm xử lý tải file đính kèm
const handleDownload = async (mailId, filePath) => {
  try {
    setDownloadStatus(prev => ({ ...prev, [mailId]: 'downloading' }));
    
    // Kiểm tra xem filePath có tồn tại không
    if (!filePath) {
      throw new Error('Đường dẫn file không tồn tại');
    }

    // Lấy tên file từ đường dẫn để hiển thị
    const fileName = filePath.split('/').pop();
    
    // Tạo API endpoint để tải file
    const response = await fetch(`/api/download?path=${encodeURIComponent(filePath)}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Không thể tải file');
    }
    
    // Lấy blob từ response
    const blob = await response.blob();
    
    // Tạo URL cho blob
    const url = window.URL.createObjectURL(blob);
    
    // Tạo thẻ a tạm thời để tải file
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = fileName;
    
    // Thêm vào body, click để tải, và xóa
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    setDownloadStatus(prev => ({ ...prev, [mailId]: 'success' }));
    
    // Xóa trạng thái thành công sau 3 giây
    setTimeout(() => {
      setDownloadStatus(prev => {
        const newStatus = { ...prev };
        delete newStatus[mailId];
        return newStatus;
      });
    }, 3000);
    
  } catch (error) {
    console.error('Error downloading file:', error);
    setDownloadStatus(prev => ({ ...prev, [mailId]: 'error' }));
    alert('Lỗi khi tải file: ' + error.message);
    
    // Xóa trạng thái lỗi sau 3 giây
    setTimeout(() => {
      setDownloadStatus(prev => {
        const newStatus = { ...prev };
        delete newStatus[mailId];
        return newStatus;
      });
    }, 3000);
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
              className="flex items-start gap-4 px-4 py-4 mb-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 hover:bg-lime-100"
            >
              <input type="checkbox" className="mt-1" />
              <AiOutlineStar className="text-gray-400 hover:text-yellow-500 mt-1 cursor-pointer" />
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-red-700 truncate">{mail.name}</span>
                    {index < 4 && (
                      <span className="animate-pulse bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        NEW
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{formatDate(mail.created_date)}</span>
                    {isLoggedIn && (
                      <button 
                        onClick={() => handleDeleteMail(mail.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Xóa thư"
                      >
                        <AiOutlineDelete size={18} />
                      </button>
                    )}
                  </div>
                </div>
                <div className="text-black font-medium truncate">{mail.title}</div>
                
                {/* Phần description với khả năng mở rộng */}
                <div className="text-sm text-gray-500">
                  <div className={expandedDescriptions[mail.id] ? "whitespace-normal break-words" : "line-clamp-2"}>
                    {mail.description}
                  </div>
                  {mail.description && mail.description.length > 100 && (
                    <button 
                      onClick={() => toggleDescription(mail.id)} 
                      className="text-blue-500 hover:text-blue-700 text-xs mt-1"
                    >
                      {expandedDescriptions[mail.id] ? "Thu gọn" : "Xem thêm"}
                    </button>
                  )}
                </div>
                
                {mail.file_path && (
                  <div className="flex items-center mt-2">
                    <button 
                      onClick={() => handleDownload(mail.id, mail.file_path)}
                      className={`flex items-center text-sm text-[18px] ${
                        downloadStatus[mail.id] === 'error' 
                          ? 'text-red-600 hover:text-red-800' 
                          : 'text-blue-600 hover:text-blue-800'
                      } transition-colors duration-300`}
                      disabled={downloadStatus[mail.id] === 'downloading'}
                    >
                      <AiOutlineDownload className="mr-1" />
                      {downloadStatus[mail.id] === 'downloading' && 'Đang tải...'}
                      {downloadStatus[mail.id] === 'success' && 'Tải thành công!'}
                      {downloadStatus[mail.id] === 'error' && 'Tải thất bại, thử lại'}
                      {!downloadStatus[mail.id] && 'Tải file đính kèm'}
                    </button>
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
              Trang {currentPage} / {totalPages || 1}
            </span>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages || totalPages === 0}
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
