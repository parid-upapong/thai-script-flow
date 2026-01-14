import React from 'react';
import { MoreVertical, Clock, Video, Tv, Smartphone } from 'lucide-react';

type ProductionType = 'TVC' | 'ONLINE_CONTENT' | 'TIKTOK_SERIES' | 'FILM';
type ProjectStatus = 'DRAFT' | 'PRE_PRODUCTION' | 'STORYBOARDING' | 'READY_FOR_SHOOT';

interface ProjectProps {
  title: string;
  client: string;
  type: ProductionType;
  status: ProjectStatus;
  updatedAt: string;
}

const statusColors: Record<ProjectStatus, string> = {
  DRAFT: 'bg-slate-100 text-slate-700',
  PRE_PRODUCTION: 'bg-blue-100 text-blue-700',
  STORYBOARDING: 'bg-amber-100 text-amber-700',
  READY_FOR_SHOOT: 'bg-green-100 text-green-700',
};

const typeIcons: Record<ProductionType, any> = {
  TVC: Tv,
  ONLINE_CONTENT: Video,
  TIKTOK_SERIES: Smartphone,
  FILM: Clapperboard,
};

export default function ProjectCard({ title, client, type, status, updatedAt }: ProjectProps) {
  const Icon = typeIcons[type] || Video;
  
  return (
    <div className="glass-card p-5 hover:border-indigo-300 transition-all cursor-pointer group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${statusColors[status].split(' ')[0]}`}>
          <Icon className="size-5" />
        </div>
        <button className="text-slate-400 hover:text-slate-600">
          <MoreVertical className="size-5" />
        </button>
      </div>
      
      <h3 className="font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-slate-500 mb-4">{client}</p>
      
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
        <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${statusColors[status]}`}>
          {status.replace('_', ' ')}
        </span>
        <div className="flex items-center gap-1 text-slate-400">
          <Clock className="size-3" />
          <span className="text-[11px]">{updatedAt}</span>
        </div>
      </div>
    </div>
  );
}