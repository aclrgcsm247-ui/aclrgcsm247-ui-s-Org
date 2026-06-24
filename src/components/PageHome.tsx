import React, { useState } from 'react';
import { Page, Course, Notice, GalleryImage } from '../types';
import { TRANSLATIONS } from '../data';
import { saveDemoBooking } from '../lib/supabase';
import { 
  ArrowRight,
  TrendingUp, 
  MapPin, 
  Calendar, 
  Award, 
  UserCheck, 
  Tv, 
  Sparkles, 
  CheckCircle, 
  BookOpen,
  ArrowRightLeft,
  MessageCircle,
  HelpCircle
} from 'lucide-react';

interface PageHomeProps {
  setCurrentPage: (page: Page) => void;
  lang: 'en' | 'hi';
  darkMode: boolean;
  courses: Course[];
  notices: Notice[];
  gallery: GalleryImage[];
}

export default function PageHome({
  setCurrentPage,
  lang,
  darkMode,
  courses,
  notices,
  gallery
}: PageHomeProps) {
  const t = TRANSLATIONS[lang];
  
  // Interactive modal state for free demo class
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [demoName, setDemoName] = useState('');
  const [demoMobile, setDemoMobile] = useState('');
  const [demoCourse, setDemoCourse] = useState('ccc');
  const [demoBooked, setDemoBooked] = useState(false);

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (demoName.trim() === '' || demoMobile.trim() === '') {
      alert('Please fill out all required fields.');
      return;
    }
    // Supabase submission
    saveDemoBooking({
      studentName: demoName,
      mobileNumber: demoMobile,
      courseId: demoCourse
    });

    setDemoBooked(true);
    setTimeout(() => {
      setDemoBooked(false);
      setShowDemoModal(false);
      setDemoName('');
      setDemoMobile('');
    }, 3000);
  };

  const activeNotices = notices.filter(n => n.active).slice(0, 3);
  const previewGallery = gallery.slice(0, 4);

  return (
    <div className={`w-full min-h-screen font-sans ${darkMode ? 'text-white' : 'text-slate-900'}`}>
      
      {/* 1. Hero Section with Geometric Balance Grid */}
      <section className="relative overflow-hidden border-b border-slate-200/80 dark:border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Main Showcase Panel (Left 8 Columns) */}
          <div className={`lg:col-span-8 p-8 md:p-16 flex flex-col justify-center relative overflow-hidden transition-colors ${
            darkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
          }`}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/10 dark:bg-blue-900/5 rounded-full -mr-32 -mt-32 opacity-50 z-0"></div>
            
            <div className="relative z-10 max-w-2xl space-y-6">
              <span className="inline-block px-3.5 py-1 bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 text-xs font-bold rounded-sm tracking-wider uppercase border border-blue-200 dark:border-blue-900">
                {lang === 'en' ? 'ISO 9001:2015 Certified Institute' : 'आईएसओ 9001:2015 प्रमाणित संस्थान'}
              </span>
              
              <h2 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white">
                {lang === 'en' ? (
                  <>
                    Master the Future <br/>
                    <span className="text-blue-700 dark:text-blue-400">Digital Skills</span> for a <br/>
                    <span className="text-orange-500">Global Career.</span>
                  </>
                ) : (
                  <>
                    भविष्य की उत्कृष्ट <br/>
                    <span className="text-blue-700 dark:text-blue-400">डिजिटल स्किल</span> सीखकर बनाएं <br/>
                    <span className="text-orange-500">वैश्विक करियर।</span>
                  </>
                )}
              </h2>
              
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed">
                {lang === 'en' 
                  ? 'Leading computer education hub in Colonelganj, Gonda, Uttar Pradesh. Offering ADCA, O Level (NIELIT), Tally Prime with GST, and modern Web Technologies with 100% lab practice.'
                  : 'कर्नलगंज, गोंडा (यूपी) का प्रमुख कंप्यूटर शिक्षा संस्थान। 100% प्रयोगात्मक लैब स्लॉट के साथ एडीसीए, ओ लेवल, टैली प्राइम और वेब डिजाइन सीखें।'}
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => {
                    setCurrentPage('courses');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 bg-blue-800 text-white font-bold rounded-sm shadow-md hover:bg-blue-900 transition-all uppercase tracking-wider text-xs"
                >
                  {lang === 'en' ? 'Explore All Courses' : 'सभी कोर्सेज देखें'}
                </button>
                
                <button
                  onClick={() => setShowDemoModal(true)}
                  className={`px-6 py-3.5 border font-bold rounded-sm transition-all uppercase tracking-wider text-xs ${
                    darkMode 
                      ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700' 
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {lang === 'en' ? 'Free Demo Class' : 'निशुल्क डेमो क्लास'}
                </button>
              </div>
            </div>

            {/* Accent Vertical Borders Stats Panel */}
            <div className="mt-14 grid grid-cols-3 gap-6 relative z-10 border-t border-slate-100 dark:border-slate-800 pt-8 max-w-xl">
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">15+</h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold font-mono">
                  {lang === 'en' ? 'Advanced Courses' : 'एडवांस्ड कोर्सेज'}
                </p>
              </div>
              <div className="border-l-4 border-blue-700 pl-4">
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">100%</h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold font-mono">
                  {lang === 'en' ? 'Lab Practice' : 'लैब संचालन'}
                </p>
              </div>
              <div className="border-l-4 border-blue-700 pl-4">
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">98%</h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold font-mono">
                  {lang === 'en' ? 'Placement Rate' : 'प्लेसमेंट रेट'}
                </p>
              </div>
            </div>
          </div>

          {/* Upcoming Batches & Featured Quick Access Panel (Right 4 Columns) */}
          <div className="lg:col-span-4 bg-blue-900 text-white flex flex-col min-h-full">
            
            {/* Upcoming Batches (Top Half) */}
            <div className="p-8 bg-blue-950/60 flex-shrink-0 border-b border-blue-800">
              <h3 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-orange-500 rounded-sm inline-block"></span>
                {lang === 'en' ? 'Upcoming Batches' : 'आगामी नए बैचेस'}
              </h3>
              
              <div className="space-y-4">
                <div className="bg-blue-950/40 p-4 border-l-2 border-orange-500 rounded-sm">
                  <p className="text-white text-sm font-bold">
                    {lang === 'en' ? 'O Level (NIELIT) - Batch A' : 'ओ लेवल (नाइलिट) - बैच ए'}
                  </p>
                  <p className="text-blue-200 text-[11px] mt-1 font-mono">
                    {lang === 'en' ? 'Starts: 15 October | 08:00 AM - 10:00 AM' : 'प्रारंभ: 15 अक्टूबर | 08:00 AM - 10:00 AM'}
                  </p>
                </div>
                
                <div className="bg-blue-950/40 p-4 border-l-2 border-blue-400 rounded-sm">
                  <p className="text-white text-sm font-bold">
                    {lang === 'en' ? 'Python & Web Programming' : 'पायथन और वेब प्रोग्रामिंग'}
                  </p>
                  <p className="text-blue-200 text-[11px] mt-1 font-mono">
                    {lang === 'en' ? 'Starts: 20 October | 04:00 PM - 06:00 PM' : 'प्रारंभ: 20 अक्टूबर | 04:00 PM - 06:00 PM'}
                  </p>
                </div>
              </div>
            </div>

            {/* Featured Fast Check Grid (Bottom Half) */}
            <div className="p-8 flex-1 flex flex-col justify-center gap-6">
              <h3 className="text-white font-bold text-xs uppercase tracking-[0.2em]">
                {lang === 'en' ? 'Featured Modules' : 'मुख्य कंप्यूटर पाठ्यक्रम'}
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div 
                  onClick={() => {
                    setCurrentPage('courses');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white/5 p-4 border border-white/10 hover:bg-white/10 cursor-pointer transition-colors rounded-sm group"
                >
                  <div className="w-8 h-8 bg-orange-500 flex items-center justify-center rounded-sm mb-3 font-bold text-xs text-white group-hover:scale-105 transition-transform">
                    ADCA
                  </div>
                  <p className="text-white text-xs font-bold leading-none">
                    {lang === 'en' ? 'Adv. Diploma' : 'एडवांस्ड डिप्लोमा'}
                  </p>
                  <p className="text-blue-300 text-[10px] mt-1 font-mono">12 Months</p>
                </div>

                <div 
                  onClick={() => {
                    setCurrentPage('courses');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white/5 p-4 border border-white/10 hover:bg-white/10 cursor-pointer transition-colors rounded-sm group"
                >
                  <div className="w-8 h-8 bg-blue-500 flex items-center justify-center rounded-sm mb-3 font-bold text-xs text-white group-hover:scale-105 transition-transform">
                    O LVL
                  </div>
                  <p className="text-white text-xs font-bold leading-none">
                    {lang === 'en' ? 'O Level NIELIT' : 'ओ लेवल नाइलिट'}
                  </p>
                  <p className="text-blue-300 text-[10px] mt-1 font-mono">12 Months</p>
                </div>

                <div 
                  onClick={() => {
                    setCurrentPage('courses');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white/5 p-4 border border-white/10 hover:bg-white/10 cursor-pointer transition-colors rounded-sm group"
                >
                  <div className="w-8 h-8 bg-green-600 flex items-center justify-center rounded-sm mb-3 font-bold text-xs text-white group-hover:scale-105 transition-transform">
                    TALLY
                  </div>
                  <p className="text-white text-xs font-bold leading-none">
                    {lang === 'en' ? 'Tally Gold GST' : 'टैली गोल्ड जीएसटी'}
                  </p>
                  <p className="text-blue-300 text-[10px] mt-1 font-mono">3 Months</p>
                </div>

                <div 
                  onClick={() => {
                    setCurrentPage('courses');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white/5 p-4 border border-white/10 hover:bg-white/10 cursor-pointer transition-colors rounded-sm group"
                >
                  <div className="w-8 h-8 bg-purple-500 flex items-center justify-center rounded-sm mb-3 font-bold text-xs text-white group-hover:scale-105 transition-transform">
                    CCC
                  </div>
                  <p className="text-white text-xs font-bold leading-none">
                    {lang === 'en' ? 'Course on CC' : 'मशीन ज्ञान सीसीसी'}
                  </p>
                  <p className="text-blue-300 text-[10px] mt-1 font-mono">3 Months</p>
                </div>
              </div>

              <div className="mt-2 pt-6 border-t border-blue-800 text-blue-200 text-[11px] space-y-1">
                <p className="font-bold text-white uppercase tracking-widest text-[10px]">
                  {lang === 'en' ? 'Direct Lab Helpdesk' : 'डायरेक्ट लैब हेल्पडेस्क'}
                </p>
                <p>Lucknow Gonda Highway, Colonelganj, Gonda, UP</p>
                <p className="font-bold text-white font-mono">+91 99186-66000, 93699-17174</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Latest Notices ticker column */}
      <section className={`py-12 border-b ${darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-orange-500 text-xs font-bold uppercase tracking-widest font-mono">{lang === 'en' ? 'Flash updates' : 'त्वरित सूचना'}</span>
              <h3 className="font-display font-extrabold text-2xl md:text-3xl text-blue-950 dark:text-blue-400 mt-1">
                {t.noticesHeadline}
              </h3>
            </div>
            <button
              onClick={() => {
                setCurrentPage('notice-board');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-orange-500 font-semibold text-xs flex items-center space-x-1 hover:underline shrink-0"
              id="view-all-notices-btn"
            >
              <span>{lang === 'en' ? 'View Official Notice Board' : 'पूरा नोटिस बोर्ड देखें'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeNotices.map((notice, idx) => (
              <div 
                key={notice.id}
                className={`p-6 rounded-sm border transition-all hover:shadow-md border-l-4 ${
                  notice.category === 'exam' ? 'border-l-red-500' :
                  notice.category === 'batch' ? 'border-l-orange-500' :
                  notice.category === 'scholarship' ? 'border-l-yellow-500' :
                  'border-l-blue-700'
                } ${
                  darkMode 
                    ? 'bg-slate-900/60 border-y-slate-800 border-r-slate-800 hover:border-slate-700' 
                    : 'bg-white border-y-slate-200 border-r-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-block px-2.5 py-0.5 rounded-sm text-[10px] font-bold font-mono uppercase tracking-wider ${
                    notice.category === 'exam' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                    notice.category === 'batch' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                    notice.category === 'scholarship' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                    'bg-cyan-500/10 text-cyan-500 border border-cyan-500/20'
                  }`}>
                    {notice.category}
                  </span>
                  <span className="flex items-center space-x-1 text-[11px] text-gray-500 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-orange-500" />
                    <span>{notice.date}</span>
                  </span>
                </div>
                
                <h4 
                  className="font-display font-bold text-sm md:text-base leading-snug line-clamp-2 text-slate-800 dark:text-slate-100"
                  style={idx === 0 ? { borderColor: '#080808' } : undefined}
                >
                  {lang === 'en' ? notice.title : notice.titleHindi}
                </h4>
                
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-3 leading-relaxed">
                  {lang === 'en' ? notice.description : notice.descriptionHindi}
                </p>
                
                <div className="pt-4 mt-4 border-t border-slate-200/50 dark:border-slate-800/80">
                  <button 
                    onClick={() => {
                      setCurrentPage('notice-board');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-orange-500 flex items-center space-x-1"
                  >
                    <span>{lang === 'en' ? 'Read Notice Detials' : 'विस्तार से पढ़ें'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Course Highlights Section */}
      <section className={`py-16 border-b ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
            <span className="text-orange-500 text-xs font-bold uppercase tracking-widest font-mono">
              {lang === 'en' ? 'Professional Industry Accreditations' : 'व्यावसायिक प्रमाणपत्र कोर्स'}
            </span>
            <h3 className="font-display font-extrabold text-2xl md:text-3xl text-blue-950 dark:text-blue-400">
              {lang === 'en' ? 'Our Elite Program Highlight' : 'हमारे प्रमुख कोर्सेज की झलकी'}
            </h3>
            <p className="text-xs md:text-sm text-gray-500">
              {lang === 'en' 
                ? 'We offer ISO-certified computer diploma and certificate programs with full hands-on laboratory practice slots.'
                : 'हम पूर्ण व्यावहारिक प्रयोगशाला स्लॉट के साथ आईएसओ-प्रमाणित कंप्यूटर डिप्लोमा और प्रमाणपत्र कार्यक्रम प्रदान करते हैं।'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {courses.slice(0, 6).map((course) => (
              <div
                key={course.id}
                className={`p-6 rounded-sm border transition-all relative overflow-hidden border-l-4 border-l-blue-700 group ${
                  darkMode 
                    ? 'bg-slate-950 border-y-slate-800 border-r-slate-800' 
                    : 'bg-white border-y-slate-200 border-r-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Accent glow on hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-500/5 to-transparent transition-all group-hover:from-orange-500/20"></div>
                
                <span className="absolute top-4 right-4 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-sm px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase">
                  {course.code}
                </span>

                <h4 className="font-display font-bold text-base md:text-lg text-blue-900 dark:text-blue-400 group-hover:text-orange-500 transition-colors pr-10">
                  {course.name}
                </h4>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex justify-between border-b border-gray-400/10 pb-1 text-gray-500">
                    <span>{lang === 'en' ? 'Duration' : 'अवधि'}:</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{course.duration}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-400/10 pb-1 text-gray-500">
                    <span>{lang === 'en' ? 'Eligibility' : 'योग्यता'}:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[180px]">{course.eligibility}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-400/10 pb-1 text-gray-500">
                    <span>{lang === 'en' ? 'Fees' : 'फीस'}:</span>
                    <span className="font-extrabold text-orange-500">₹{course.fees.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/50 dark:border-slate-800/80">
                  <button
                    onClick={() => {
                      setCurrentPage('courses');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 hover:scale-102 hover:text-white transition-all text-xs text-white font-semibold py-2 rounded-sm flex items-center justify-center space-x-1"
                  >
                    <span>{lang === 'en' ? 'View Complete Syllabus' : 'पूरा सिलेबस देखें'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => {
                setCurrentPage('courses');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-orange-500 hover:scale-105 active:scale-95 text-white font-semibold text-xs px-6 py-3 rounded-sm shadow transition-all border border-orange-400/30 font-bold uppercase tracking-wider"
              id="view-all-courses-btn"
            >
              {lang === 'en' ? 'Browse All 11+ Computer Courses' : 'सभी 11+ कोर्सेज का विवरण देखें'}
            </button>
          </div>
        </div>
      </section>

      {/* 5. Interactive Testimonials & Success Preview */}
      <section className={`py-16 border-b ${darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
            <span className="text-orange-500 text-xs font-bold uppercase tracking-widest font-mono">
              {lang === 'en' ? 'Student Success Stories' : 'छात्रों की सफलता की कहानियां'}
            </span>
            <h3 className="font-display font-extrabold text-2xl md:text-3xl text-blue-950 dark:text-blue-400">
              {lang === 'en' ? 'What Our Certified Alumnus Speak' : 'पूर्व छात्रों के प्रशंसापत्र'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className={`p-6 rounded-sm border border-l-4 border-l-orange-500 ${darkMode ? 'bg-slate-900 border-y-slate-800 border-r-slate-800' : 'bg-white border-y-slate-200 border-r-slate-200 shadow-sm'}`}>
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  className="w-12 h-12 rounded-sm object-cover border-2 border-orange-500" 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80" 
                  alt="Student"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-sm font-bold">Kajal Tiwari</h4>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 font-mono">O Level Passed (Grade A)</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                &quot;The classroom training at Academy of Computer Learning for NIELIT O Level is unmatched. Lab facilities are open 12 hours a day and Ramesh Sir helped me build real-life projects. Today, I am working as a React developer!&quot;
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className={`p-6 rounded-sm border border-l-4 border-l-blue-700 ${darkMode ? 'bg-slate-900 border-y-slate-800 border-r-slate-800' : 'bg-white border-y-slate-200 border-r-slate-200 shadow-sm'}`}>
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  className="w-12 h-12 rounded-sm object-cover border-2 border-orange-500" 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" 
                  alt="Student"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-sm font-bold">Amit Kumar Verma</h4>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 font-mono">ADCA Certified (94%)</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                &quot;Highly ISO-compliant classes! I registered for the ADCA course, which gave me immense knowledge on core hardware, coding, as well as digital accounting. The placement cell routed my portfolio to an Lucknow IT company.&quot;
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className={`p-6 rounded-sm border border-l-4 border-l-orange-500 ${darkMode ? 'bg-slate-900 border-y-slate-800 border-r-slate-800' : 'bg-white border-y-slate-200 border-r-slate-200 shadow-sm'}`}>
              <div className="flex items-center space-x-3 mb-4">
                <img 
                  className="w-12 h-12 rounded-sm object-cover border-2 border-orange-500" 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" 
                  alt="Student"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-sm font-bold">Nisha Pathak</h4>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 font-mono">Tally Prime GST Expert</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                &quot;My father owns a local trading firm in Colonelganj, Gonda. After learning Tally GST billing workflows and the advanced multi-reporting tools under Alok Sir's guidance, I modernised our firm's ledger and audit workflow myself!&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Gallery Preview Section */}
      <section className={`py-16 border-b ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-orange-500 text-xs font-bold uppercase tracking-widest font-mono">
                {lang === 'en' ? 'Our modern infrastructure' : 'संस्थान की सुविधाएं'}
              </span>
              <h3 className="font-display font-extrabold text-2xl md:text-3xl text-blue-950 dark:text-blue-400 mt-1">
                {lang === 'en' ? 'Campus & Labs At a Glance' : 'परिसर और प्रयोगशालाएं'}
              </h3>
            </div>
            <button
              onClick={() => {
                setCurrentPage('gallery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-orange-500 font-semibold text-xs flex items-center space-x-1 hover:underline"
              id="view-all-gallery-btn"
            >
              <span>{lang === 'en' ? 'View Detailed Photo Gallery' : 'पूरी गैलरी देखें'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {previewGallery.map((img) => (
               <div 
                 key={img.id}
                 className="group relative h-48 rounded-sm overflow-hidden shadow border border-slate-200 dark:border-slate-800 cursor-pointer"
                 onClick={() => setCurrentPage('gallery')}
               >
                <img 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-115"
                  src={img.imageUrl} 
                  alt={img.title}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="text-[11px] text-white font-semibold uppercase">{img.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Contact Info Strip bar */}
      <section className="bg-orange-600 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-left">
            <h3 className="font-display font-extrabold text-xl md:text-2xl leading-none">
              {lang === 'en' ? 'Ready to Start Your Digital Journey?' : 'अपना कंप्यूटर कोर्स शुरू करने के लिए तैयार हैं?'}
            </h3>
            <p className="text-orange-100 text-xs md:text-sm">
              {lang === 'en' 
                ? 'Register online or visit our Colonelganj Center today. Ask for a free guidance masterclass with our Director.'
                : 'आज ही ऑनलाइन पंजीकरण करें या हमारे कर्नलगंज केंद्र पर आएं। निःशुल्क मार्गदर्शन मास्टरक्लास के लिए पूछें।'}
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => {
                setCurrentPage('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-blue-900 border border-transparent hover:bg-blue-950 text-white text-xs font-bold px-5 py-3 rounded-sm shadow-md transition-all uppercase tracking-wider"
              id="talk-expert-btn"
            >
              {lang === 'en' ? 'Talk to Admission Expert' : 'सलाहकार से बात करें'}
            </button>
          </div>
        </div>
      </section>

      {/* ==================== FREE DEMO CLASS BOOKING MODAL ==================== */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className={`w-full max-w-md rounded-sm shadow-2xl p-6 border relative transition-all ${
            darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-950'
          }`}>
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-sm hover:bg-gray-500/10 transition-colors"
               aria-label="Close modal"
            >
              <ArrowRightLeft className="w-5 h-5 rotate-45 text-orange-500" />
            </button>

            <div className="space-y-4">
              <div className="text-center">
                 <span className="inline-flex items-center justify-center bg-orange-500/10 border border-orange-500/20 text-orange-500 rounded-sm p-2.5 mb-2">
                  <Sparkles className="w-6 h-6" />
                </span>
                 <h3 className="font-display font-wrap font-bold text-xl text-blue-900 dark:text-blue-400 uppercase tracking-tight">
                  {lang === 'en' ? 'Book a Free Demo Class' : 'निशुल्क डेमो क्लास बुक करें'}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {lang === 'en' 
                    ? 'Fill out quick credentials to instantly schedule your demo slot at our Colonelganj lab.'
                    : 'हमारे कर्नलगंज लैब में अपनी डेमो क्लास स्लॉट तुरंत निर्धारित करने के लिए विवरण भरें।'}
                </p>
              </div>

              {demoBooked ? (
                 <div className="p-4 rounded-sm bg-green-500/10 border border-green-500/20 text-center text-green-500 text-xs space-y-1 py-8">
                  <CheckCircle className="w-10 h-10 mx-auto text-green-500 mb-2" />
                  <p className="font-bold">{lang === 'en' ? 'Registration Successful!' : 'पंजीकरण सफल रहा!'}</p>
                  <p className="text-[11px] text-gray-400">
                    {lang === 'en' 
                      ? 'Our coordinator will call you back on your registered phone within 2 hours.'
                      : 'हमारे कर्नलगंज काउंसलर अगले 2 घंटों के भीतर आपसे सीधे संपर्क करेंगे।'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleDemoSubmit} className="space-y-3 pt-2 text-xs">
                  <div>
                    <label className="block font-semibold text-[11px] uppercase tracking-wider text-gray-400 mb-1">
                      {lang === 'en' ? "Full Student Name" : "छात्र का पूरा नाम"} *
                    </label>
                    <input
                      required
                      type="text"
                       className={`w-full px-3 py-2 rounded-sm border focus:ring-2 ${
                        darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-black'
                      }`}
                      placeholder={lang === 'en' ? "e.g. Priyanshu Jaiswal" : "उदा. प्रियांशु जायसवाल"}
                      value={demoName}
                      onChange={(e) => setDemoName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[11px] uppercase tracking-wider text-gray-400 mb-1">
                      {lang === 'en' ? "Active Mobile No (WhatsApp)" : "सक्रिय मोबाइल नंबर (व्हाट्सएप)"} *
                    </label>
                    <input
                      required
                      type="tel"
                      maxLength={10}
                      pattern="[0-9]{10}"
                       className={`w-full px-3 py-2 rounded-sm border focus:ring-2 ${
                        darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-black'
                      }`}
                      placeholder="e.g. 9876543210"
                      value={demoMobile}
                      onChange={(e) => setDemoMobile(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[11px] uppercase tracking-wider text-gray-400 mb-1">
                      {lang === 'en' ? "Interested Course" : "रुचिकर पाठ्यक्रम"}
                    </label>
                    <select
                       className={`w-full px-3 py-2 rounded-sm border focus:ring-2 ${
                        darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-black'
                      }`}
                      value={demoCourse}
                      onChange={(e) => setDemoCourse(e.target.value)}
                    >
                      {courses.map(course => (
                        <option key={course.id} value={course.id}>{course.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                       className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-sm shadow-md hover:scale-101 active:scale-99 transition-all uppercase tracking-wider text-xs"
                      id="submit-demo-booking"
                    >
                      {lang === 'en' ? 'Confirm Demo Class Booking' : 'डेमो क्लास बुकिंग की पुष्टि करें'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
