import React from 'react';
import { Volume2, CheckCircle } from 'lucide-react';

interface Voice {
  id: string;
  name: string;
  mood: string;
  previewUrl: string;
}

const VOICES: Voice[] = [
  { id: 'th-f-01', name: 'คุณมาลี (Malee)', mood: 'Professional', previewUrl: '/voices/malee.mp3' },
  { id: 'th-m-02', name: 'น้องบิว (Biw)', mood: 'Gen-Z Casual', previewUrl: '/voices/biw.mp3' },
  { id: 'th-f-03', name: 'เจนนี้ (Janny)', mood: 'Hyper-Sales', previewUrl: '/voices/janny.mp3' },
];

export const VoiceSelector: React.FC<{ selectedId: string; onSelect: (id: string) => void }> = ({
  selectedId,
  onSelect,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {VOICES.map((voice) => (
        <button
          key={voice.id}
          onClick={() => onSelect(voice.id)}
          className={`relative flex flex-col items-start p-4 rounded-xl border-2 transition-all ${
            selectedId === voice.id 
              ? 'border-indigo-600 bg-indigo-50' 
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between w-full mb-2">
            <span className="font-semibold text-slate-900">{voice.name}</span>
            <Volume2 size={18} className="text-slate-400" />
          </div>
          <span className="text-xs px-2 py-1 rounded-full bg-slate-200 text-slate-600 uppercase tracking-wider">
            {voice.mood}
          </span>
          {selectedId === voice.id && (
            <div className="absolute -top-2 -right-2">
              <CheckCircle size={24} className="text-indigo-600 fill-white" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
};