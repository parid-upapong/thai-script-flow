import React from 'react';
import Sidebar from '@/components/Sidebar';
import ProjectCard from '@/components/ProjectCard';
import { Plus, Search, Filter, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  // Mock data representing the Thai production context
  const projects = [
    {
      title: 'โฆษณาชาเขียว Summer 2024',
      client: 'Ichitan Thailand',
      type: 'TVC' as const,
      status: 'STORYBOARDING' as const,
      updatedAt: '2 ชั่วโมงที่แล้ว'
    },
    {
      title: 'Vlog ตะลุยเยาวราช Night Market',
      client: 'YouTube Channel: WanderThai',
      type: 'ONLINE_CONTENT' as const,
      status: 'READY_FOR_SHOOT' as const,
      updatedAt: 'เมื่อวานนี้'
    },
    {
      title: 'TikTok Series: รักวุ่นๆ ของวัยรุ่นออฟฟิศ',
      client: 'Agency X',
      type: 'TIKTOK_SERIES' as const,
      status: 'PRE_PRODUCTION' as const,
      updatedAt: '3 วันที่แล้ว'
    },
    {
      title: 'เปิดตัวสมาร์ทโฟน รุ่น Pro Max',
      client: 'Brand Global (Thai Localized)',
      type: 'TVC' as const,
      status: 'DRAFT' as const,
      updatedAt: '1 สัปดาห์ที่แล้ว'
    }
  ];

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">สวัสดีคุณอาร์ต 👋</h1>
            <p className="text-slate-500">ยินดีต้อนรับกลับสู่สตูดิโอ วันนี้คุณต้องการสร้างสรรค์อะไร?</p>
          </div>
          <button className="btn-primary shadow-lg shadow-indigo-200">
            <Plus className="size-5" />
            <span>สร้างโปรเจกต์ใหม่</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="glass-card p-6 border-l-4 border-l-indigo-500">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-500">โปรเจกต์ที่กำลังดำเนินการ</span>
              <TrendingUp className="text-green-500 size-4" />
            </div>
            <p className="text-3xl font-bold text-slate-900">12</p>
          </div>
          <div className="glass-card p-6 border-l-4 border-l-purple-500">
            <span className="text-sm font-medium text-slate-500 mb-2 block">AI Script Breakdown สัปดาห์นี้</span>
            <p className="text-3xl font-bold text-slate-900">48</p>
          </div>
          <div className="glass-card p-6 border-l-4 border-l-amber-500">
            <span className="text-sm font-medium text-slate-500 mb-2 block">ไฟล์ที่ส่งออกสำเร็จ (Exports)</span>
            <p className="text-3xl font-bold text-slate-900">156</p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
            <input 
              type="text" 
              placeholder="ค้นหาโปรเจกต์ของคุณ..." 
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50">
            <Filter className="size-4" />
            <span>ตัวกรอง</span>
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} {...project} />
          ))}
          
          {/* Empty State / Add New Placeholder */}
          <button className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-slate-400 hover:text-indigo-500 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all min-h-[200px]">
            <Plus className="size-8 mb-2" />
            <span className="text-sm font-medium">เพิ่มโปรเจกต์ใหม่</span>
          </button>
        </div>
      </main>
    </div>
  );
}