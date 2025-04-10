import React from 'react';
import Header from './component/common/Header';
import Sidebar from './component/common/Sidebar';
import MainContent from './component/common/MainContent';

const Page = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <Header/>

      {/* Main content area with sidebar */}
      <div className="flex flex-1">
        {/* Sidebar */}
       <Sidebar/>

        {/* Main */}
        <MainContent/>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 text-white p-4 text-center">
        Footer © 2025
      </footer>
    </div>
  );
};

export default Page;
