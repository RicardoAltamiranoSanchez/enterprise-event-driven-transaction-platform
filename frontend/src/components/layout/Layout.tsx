import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex">
      {/* Decorative background blobs */}
      <div className="fixed top-0 right-0 w-[800px] h-[600px] bg-blue-100/30 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 left-64 w-[600px] h-[400px] bg-purple-100/30 rounded-full blur-3xl pointer-events-none -z-10"></div>
      
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1 p-8 ml-64 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
