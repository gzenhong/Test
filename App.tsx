
import React, { useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { BUSAN_ITINERARY } from './constants';
import Chatbot from './components/Chatbot';

const Navbar: React.FC = () => {
  const handleShare = async () => {
    const shareData = {
      title: '釜山仲夏之戀 - 5天4夜自由行規劃',
      text: '我剛規劃好了今年六月的釜山之旅，快來看看這個超讚的行程！',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('連結已複製到剪貼簿，快分享給朋友吧！');
      }
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Busan June.
            </span>
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
            <a href="#itinerary" className="hover:text-blue-600 transition-colors">行程規劃</a>
            <a href="#tips" className="hover:text-blue-600 transition-colors">旅遊須知</a>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleShare}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
              title="分享行程"
            >
              <i className="fas fa-share-nodes text-lg"></i>
            </button>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
              立即預約
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero: React.FC = () => (
  <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
    <img 
      src="https://picsum.photos/seed/busan_hero/1920/1080" 
      alt="Busan Header" 
      className="absolute inset-0 w-full h-full object-cover brightness-75 scale-105 animate-pulse-slow"
    />
    <div className="relative z-10 text-center text-white px-4">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-lg">
        仲夏釜山：5天4夜自由行
      </h1>
      <p className="text-lg md:text-xl text-blue-50 opacity-90 mb-8 max-w-2xl mx-auto">
        在六月的蔚藍海岸，感受海風、藝術與鮮甜海味。最完整的釜山玩樂地圖，一鍵收藏。
      </p>
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <a href="#itinerary" className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-all shadow-xl">
          查看行程
        </a>
        <a href="#tips" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-all">
          旅遊攻略
        </a>
      </div>
    </div>
  </div>
);

const ItinerarySection: React.FC = () => {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <section id="itinerary" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">精選行程規劃</h2>
          <p className="text-slate-500">專為六月規劃，避開雨季，擁抱陽光與大海。</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {BUSAN_ITINERARY.map((day, idx) => (
            <button
              key={idx}
              onClick={() => setActiveDay(idx)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                activeDay === idx 
                  ? 'bg-blue-600 text-white shadow-lg scale-105' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Day {day.day}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 transition-all duration-500">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/3">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Day {BUSAN_ITINERARY[activeDay].day}: {BUSAN_ITINERARY[activeDay].title}</h3>
              <p className="text-slate-500 mb-6 leading-relaxed">
                {BUSAN_ITINERARY[activeDay].description}
              </p>
              <div className="space-y-4">
                <div className="flex items-center text-sm text-slate-600">
                  <i className="fas fa-sun mr-3 text-orange-400"></i>
                  <span>六月均溫：20°C - 26°C</span>
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <i className="fas fa-train mr-3 text-blue-400"></i>
                  <span>主要交通：地鐵 2 號線 / 海岸列車</span>
                </div>
              </div>
            </div>

            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
              {BUSAN_ITINERARY[activeDay].attractions.map((attr, idx) => (
                <div key={idx} className="group overflow-hidden rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-all">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={attr.imageUrl} 
                      alt={attr.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                      {attr.tag}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-slate-900 leading-tight">{attr.name}</h4>
                      <span className="text-xs text-slate-400 font-medium whitespace-nowrap ml-2">
                        <i className="far fa-clock mr-1"></i> {attr.time}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 line-clamp-2">
                      {attr.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TipsSection: React.FC = () => (
  <section id="tips" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">釜山旅遊小秘笈</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                <i className="fas fa-cloud-sun text-xl"></i>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">六月天氣與穿著</h4>
                <p className="text-sm text-slate-500">釜山六月陽光充足，白天穿短袖，但晚上海風大，建議帶一件薄外套。六月底可能會進入梅雨季，建議隨身攜帶雨傘。</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                <i className="fas fa-credit-card text-xl"></i>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">支付與換匯</h4>
                <p className="text-sm text-slate-500">釜山刷卡非常普及，WOWPASS 是極力推薦的卡片，結合 T-money 與儲值扣款，非常方便。札嘎其或西面均有民間換錢所。</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                <i className="fas fa-wifi text-xl"></i>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">上網通訊</h4>
                <p className="text-sm text-slate-500">建議購買 eSIM 或實體 SIM 卡。若常使用 Google Maps，雖然在韓國準確度稍降（建議搭配 Naver Map），但還是很實用。</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-3xl blur-2xl opacity-10"></div>
          <img 
            src="https://picsum.photos/seed/tips/800/600" 
            alt="Travel Tips" 
            className="relative rounded-3xl shadow-2xl border border-slate-100"
          />
        </div>
      </div>
    </div>
  </section>
);

const Footer: React.FC = () => (
  <footer className="bg-slate-900 text-slate-400 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="mb-8">
        <span className="text-2xl font-bold text-white">Busan June.</span>
        <p className="mt-2 text-sm">與你相遇在六月的海雲台</p>
      </div>
      <div className="flex justify-center space-x-6 mb-8 text-xl">
        <a href="#" className="hover:text-white transition-colors"><i className="fab fa-instagram"></i></a>
        <a href="#" className="hover:text-white transition-colors"><i className="fab fa-facebook"></i></a>
        <a href="#" className="hover:text-white transition-colors"><i className="fab fa-youtube"></i></a>
      </div>
      <div className="border-t border-slate-800 pt-8 text-xs">
        &copy; 2024 Busan Travel Guide. All rights reserved. Powered by Gemini AI.
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <div className="bg-white py-12">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-slate-800">還在考慮要去哪？</h3>
                <p className="text-slate-500 mt-2">點擊右下角小助手，讓 AI 為你量身打造專屬細節！</p>
              </div>
              <div className="flex items-center gap-4 bg-blue-50 p-4 rounded-2xl">
                <div className="text-blue-600 text-3xl font-bold">5+</div>
                <div className="text-xs uppercase font-bold text-blue-900 leading-tight">
                  精選景點<br/>每天更新
                </div>
              </div>
            </div>
          </div>
          <ItinerarySection />
          <TipsSection />
        </main>
        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
};

export default App;
