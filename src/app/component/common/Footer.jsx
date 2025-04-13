"use client"
import React, { useState } from 'react'

const Footer = () => {
  // State để quản lý việc hiển thị thông tin
  const [showInfo, setShowInfo] = useState({
    zalo: false,
    phone: false,
    facebook: false
  });

  // Thông tin liên hệ
  const contactInfo = {
    zalo: {
      title: "Zalo support ",
      id: "0966763701", // Thay bằng ID Zalo thực tế
      link: "https://zalo.me/0966763701" // Thay bằng link Zalo thực tế
    },
    phone: {
      title: "Điện thoại nội bộ",
      number: "666", // Thay bằng số điện thoại thực tế
      link: "tel:666"
    },
    facebook: {
      title: "Facebook",
      name: "Tràng An Group", // Thay bằng tên Facebook thực tế
      link: "https://www.facebook.com/@tranganhoaluninhbinh" // Thay bằng link Facebook thực tế
    }
  };

  // Hàm xử lý khi click vào icon
  const toggleInfo = (type) => {
    setShowInfo(prev => ({
      ...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
      [type]: !prev[type]
    }));
  };

  return (
    <footer className="footer p-10 bg-gradient-to-r from-blue-50 to-indigo-50 text-gray-800 shadow-inner">
      <div className="flex flex-col">
        <nav className="grid grid-flow-row gap-2">
          <a className="link link-hover font-medium hover:text-blue-600 transition-colors duration-300">Tràng An Group    ©   <span className="text-indigo-400 ">Di sản dẫn lối tương lai</span> </a>
          
        </nav>
        <aside className="mt-4">
          <p className="font-medium text-gray-700">IT  Tràng An Group </p>
        </aside>
      </div>
      
      <div className="flex justify-end">
        <nav>
          <div className="grid grid-flow-col gap-8">
            {/* Zalo - Tăng kích thước từ w-6 h-6 lên w-9 h-9 */}
            <div className="relative">
              <button 
                onClick={() => toggleInfo('zalo')}
                className="hover:scale-110 transition-transform duration-300"
              >
                <div className="w-9 h-9 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-300">
                  <span className="text-white font-bold text-base">Z</span>
                </div>
              </button>
              
              {showInfo.zalo && (
                <div className="absolute bottom-full mb-2 right-0 bg-white p-3 rounded-lg shadow-lg z-10 w-48">
                  <p className="text-sm font-medium mb-2">{contactInfo.zalo.title}: {contactInfo.zalo.id}</p>
                  <a 
                    href={contactInfo.zalo.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm block"
                  >
                    Mở Zalo Chat
                  </a>
                </div>
              )}
            </div>
            
            {/* Điện thoại - Tăng kích thước từ 24x24 lên 32x32 */}
            <div className="relative">
              <button 
                onClick={() => toggleInfo('phone')}
                className="hover:scale-110 transition-transform duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  className="fill-green-500 hover:fill-green-700 transition-colors duration-300">
                  <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 0 0-1.02.24l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 12h2a9 9 0 0 0-9-9v2c3.87 0 7 3.13 7 7zm-4 0h2c0-2.76-2.24-5-5-5v2c1.66 0 3 1.34 3 3z"></path>
                </svg>
              </button>
              
              {showInfo.phone && (
                <div className="absolute bottom-full mb-2 right-0 bg-white p-3 rounded-lg shadow-lg z-10 w-48">
                  <p className="text-sm font-medium mb-2">{contactInfo.phone.title}: {contactInfo.phone.number}</p>
                  <a 
                    href={contactInfo.phone.link}
                    className="text-green-600 hover:text-green-800 text-sm block"
                  >
                    Gọi ngay
                  </a>
                </div>
              )}
            </div>
            
            {/* Facebook - Tăng kích thước từ 24x24 lên 32x32 */}
            <div className="relative">
              <button 
                onClick={() => toggleInfo('facebook')}
                className="hover:scale-110 transition-transform duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  className="fill-blue-600 hover:fill-blue-800 transition-colors duration-300">
                  <path
                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </button>
              
              {showInfo.facebook && (
                <div className="absolute bottom-full mb-2 right-0 bg-white p-3 rounded-lg shadow-lg z-10 w-48">
                  <p className="text-sm font-medium mb-2">{contactInfo.facebook.title}: {contactInfo.facebook.name}</p>
                  <a 
                    href={contactInfo.facebook.link}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm block"
                  >
                    Truy cập trang Facebook
                  </a>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
