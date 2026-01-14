import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  FileEdit, 
  Clapperboard, 
  Library, 
  Settings, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'แดชบอร์ด', href: '/dashboard', active: true },
  { icon: FileEdit, label: 'เขียนบท (Scripts)', href: '/scripts' },
  { icon: Clapperboard, label: 'สตอรี่บอร์ด', href: '/storyboards' },
  { icon: Library, label: 'คลังสินทรัพย์ (Assets)', href: '/assets' },
  { icon: Settings, label: 'ตั้งค่า', href: '/settings' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-slate-200 h-screen sticky top-0 bg-white flex flex-col">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <Sparkles className="text-white size-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">
            ThaiCreative <span className="text-indigo-600">AI</span>
          </span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
              item.active 
                ? 'bg-indigo-50 text-indigo-700 font-medium' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon className="size-5" />
              <span className="text-sm">{item.label}</span>
            </div>
            {item.active && <ChevronRight className="size-4" />}
          </Link>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-slate-100">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-4 text-white">
          <p className="text-xs font-medium opacity-80 mb-1">AI Tokens Remaining</p>
          <p className="text-lg font-bold">12,450</p>
          <div className="w-full bg-white/20 h-1.5 rounded-full mt-2">
            <div className="bg-white h-1.5 rounded-full w-3/4"></div>
          </div>
        </div>
      </div>
    </aside>
  );
}