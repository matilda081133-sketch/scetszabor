import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useCMS } from '../lib/cms';
import { LayoutDashboard, Settings, LogOut, Save, Phone, Mail, Type, RussianRuble } from 'lucide-react';

export const Route = createFileRoute('/admin')({
  component: AdminPage,
});

function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const { content, updateContent } = useCMS();
  const [form, setForm] = useState(content);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'fence2024') {
      setIsLoggedIn(true);
    } else {
      alert('Неверный пароль');
    }
  };

  const handleSave = () => {
    updateContent(form);
    alert('Изменения успешно сохранены!');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-[#111] p-8 rounded-2xl border border-white/10 w-full max-w-md">
          <div className="text-center mb-8">
            <LayoutDashboard className="w-12 h-12 text-[#FFD700] mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white">Вход в панель управления</h1>
            <p className="text-gray-500 text-sm mt-2">СпецЗабор CMS v1.0</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">Пароль</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#FFD700] transition-colors"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="w-full bg-[#FFD700] text-black font-bold py-3 rounded-xl hover:bg-[#FFC000] transition-colors">
              Войти
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#111] border-r border-white/5 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 bg-[#FFD700] rounded flex items-center justify-center text-black font-bold">С</div>
          <span className="font-bold tracking-tight">СПЕЦЗАБОР</span>
        </div>
        
        <nav className="space-y-2 flex-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#FFD700]/10 text-[#FFD700] rounded-xl font-medium">
            <Settings className="w-5 h-5" /> Контент
          </button>
        </nav>

        <button 
          onClick={() => setIsLoggedIn(false)}
          className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-white transition-colors mt-auto"
        >
          <LogOut className="w-5 h-5" /> Выйти
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 overflow-y-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold">Настройки сайта</h1>
            <p className="text-gray-500 mt-1">Редактирование основных данных и цен</p>
          </div>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 bg-[#FFD700] text-black px-6 py-3 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-all"
          >
            <Save className="w-5 h-5" /> Сохранить всё
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8">
          
          {/* Contacts Section */}
          <div className="bg-[#111] p-6 rounded-2xl border border-white/5 space-y-6">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <Phone className="w-5 h-5 text-[#FFD700]" />
              <h3 className="font-bold">Контакты</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 mb-2">Телефон компании</label>
                <input 
                  type="text" 
                  value={form.phone}
                  onChange={(e) => setForm({...form, phone: e.target.value})}
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-[#FFD700]"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-2">Email для заявок</label>
                <input 
                  type="text" 
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-[#FFD700]"
                />
              </div>
            </div>
          </div>

          {/* Calculator Section */}
          <div className="bg-[#111] p-6 rounded-2xl border border-white/5 space-y-6">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <RussianRuble className="w-5 h-5 text-[#FFD700]" />
              <h3 className="font-bold">Калькулятор и цены</h3>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-2">Базовая цена за п.м. (руб)</label>
              <input 
                type="number" 
                value={form.basePrice}
                onChange={(e) => setForm({...form, basePrice: Number(e.target.value)})}
                className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-[#FFD700]"
              />
            </div>
          </div>

          {/* Hero Section */}
          <div className="col-span-2 bg-[#111] p-6 rounded-2xl border border-white/5 space-y-6">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <Type className="w-5 h-5 text-[#FFD700]" />
              <h3 className="font-bold">Главный экран (Hero)</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-500 mb-2">Главный заголовок</label>
                <input 
                  type="text" 
                  value={form.heroTitle}
                  onChange={(e) => setForm({...form, heroTitle: e.target.value})}
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-[#FFD700]"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-2">Подзаголовок</label>
                <textarea 
                  value={form.heroSubtitle}
                  onChange={(e) => setForm({...form, heroSubtitle: e.target.value})}
                  rows={3}
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-[#FFD700]"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
