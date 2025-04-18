import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./component/common/Header";
import Footer from "./component/common/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tràng An Group ",
  description: "Chiến dịch Tràng An Group ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
         <div className="flex flex-col min-h-screen bg-gray-50">
         <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <Header/>

      {/* Main content area with sidebar */}
      
        
       

        {/* Main */}
        {children}
      </div>

      {/* Footer */}
      <Footer/>
         

         
         </div>
        
      </body>
    </html>
  );
}
