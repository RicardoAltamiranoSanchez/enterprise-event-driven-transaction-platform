import { useAuth } from '../../context/AuthContext';
import { LogOut, Bell, Search } from 'lucide-react';

const Header = () => {
  const { logout } = useAuth();

  return (
    <header className="h-20 bg-white/70 backdrop-blur-md border-b border-slate-200 shadow-sm flex items-center justify-between px-8 sticky top-0 z-10 ml-64">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-96 hidden md:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input 
                type="text" 
                className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all" 
                placeholder="Search transactions, logs..." 
            />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
            <span className="text-sm font-semibold text-slate-600">System Online</span>
        </div>
        
        <div className="w-px h-8 bg-slate-200"></div>
        
        <button className="text-slate-400 hover:text-slate-600 transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>

        <button 
          onClick={logout}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
        >
          <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 mr-2 border border-slate-300">
             <span className="font-bold text-xs">AD</span>
          </div>
          Logout
          <LogOut className="w-4 h-4 ml-1" />
        </button>
      </div>
    </header>
  );
};

export default Header;
