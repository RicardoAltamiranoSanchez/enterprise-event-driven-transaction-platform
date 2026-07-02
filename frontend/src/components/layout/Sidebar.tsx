
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, List, PlusCircle, Bot, Activity, Settings, ActivitySquare } from 'lucide-react';
import clsx from 'clsx';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Transactions', path: '/transactions', icon: <List className="w-5 h-5" /> },
    { name: 'Create Transaction', path: '/create', icon: <PlusCircle className="w-5 h-5" /> },
    { name: 'AI Assistant', path: '/assistant', icon: <Bot className="w-5 h-5" /> },
    { name: 'RPA Automation', path: '/rpa', icon: <ActivitySquare className="w-5 h-5" /> },
    { name: 'WebSocket Monitor', path: '/monitor', icon: <Activity className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen fixed top-0 left-0 border-r border-slate-800 shadow-xl z-20">
      <div className="h-20 flex items-center px-6 border-b border-slate-800 bg-slate-950/50">
        <div className="bg-blue-600 p-2 rounded-lg mr-3 shadow-lg shadow-blue-500/20">
          <LayoutDashboard className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white leading-tight">
          ENTERPRISE<br/><span className="text-blue-400 text-sm">PLATFORM</span>
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Menu Principal</div>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => clsx(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all duration-200',
              isActive 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20' 
                : 'hover:bg-slate-800 hover:text-white'
            )}
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-slate-800">
        <NavLink
            to="/settings"
            className={({ isActive }) => clsx(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all duration-200',
              isActive 
                ? 'bg-blue-600 text-white' 
                : 'hover:bg-slate-800 hover:text-white text-slate-400'
            )}
        >
          <Settings className="w-5 h-5" />
          Settings
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
