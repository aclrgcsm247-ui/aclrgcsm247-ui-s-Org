import React, { useState } from 'react';
import { Page } from '../types';
import { TRANSLATIONS } from '../data';
import { 
  BookOpen, 
  Menu, 
  X, 
  Globe, 
  Sun, 
  Moon, 
  User, 
  Lock, 
  Award, 
  Layers, 
  MapPin, 
  PhoneCall
} from 'lucide-react';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  lang: 'en' | 'hi';
  setLang: (lang: 'en' | 'hi') => void;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  isLoggedIn: boolean;
  isAdminLoggedIn: boolean;
  onLogout: () => void;
}

export default function Header({
  currentPage,
  setCurrentPage,
  lang,
  setLang,
  darkMode,
  setDarkMode,
  isLoggedIn,
  isAdminLoggedIn,
  onLogout
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[lang];

  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems: { page: Page; label: string; icon: React.ReactNode }[] = [
    { page: 'home', label: t.navHome, icon: <Layers className="w-4 h-4" /> },
    { page: 'about', label: t.navAbout, icon: <BookOpen className="w-4 h-4" /> },
    { page: 'courses', label: t.navCourses, icon: <Layers className="w-4 h-4" /> },
    { page: 'admission', label: t.navAdmission, icon: <Award className="w-4 h-4" /> },
    { page: 'test', label: t.navTest, icon: <BookOpen className="w-4 h-4" /> },
    { page: 'faculty', label: t.navFaculty, icon: <User className="w-4 h-4" /> },
    { page: 'gallery', label: t.navGallery, icon: <Globe className="w-4 h-4" /> },
    { page: 'notice-board', label: t.navNotice, icon: <BookOpen className="w-4 h-4" /> },
    { page: 'verification', label: t.navVerify, icon: <Award className="w-4 h-4" /> },
    { page: 'placement', label: t.navCareer, icon: <Award className="w-4 h-4" /> },
    { page: 'blog', label: t.navBlog, icon: <Globe className="w-4 h-4" /> },
    { page: 'contact', label: t.navContact, icon: <PhoneCall className="w-4 h-4" /> }
  ];

  return (
    <header className="sticky top-0 z-50 w-full select-none">
      {/* Top Utility Bar */}
      <div className="hidden md:flex bg-blue-900 border-b border-blue-800 text-white text-xs py-2 px-6 justify-between items-center transition-colors">
        <div className="flex items-center space-x-6">
          <span className="flex items-center space-x-1 font-sans">
            <MapPin className="w-3.5 h-3.5 text-orange-500" />
            <span>Kotwali Tiraha, Lucknow Gonda Highway, Colonelganj, Gonda, UP</span>
          </span>
          <span className="flex items-center space-x-1 font-sans">
            <PhoneCall className="w-3.5 h-3.5 text-orange-500" />
            <span>+91 99186 66000, 93699 17174</span>
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="bg-orange-500/20 text-orange-400 font-medium px-2 py-0.5 rounded text-[10px] uppercase tracking-wider animate-pulse font-mono">
            Govt Registry Applet & ISO 9001:2015
          </span>
          <div className="flex items-center space-x-2 border-l border-blue-700 pl-4">
            <button 
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="flex items-center space-x-1 hover:text-orange-400 font-sans font-medium transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-orange-400" />
              <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Branding & Navigation Container */}
      <div className={`w-full py-4 px-4 md:px-8 flex justify-between items-center ${
        darkMode ? 'bg-slate-900/95 text-white border-b border-slate-800/80 shadow-2xl backdrop-blur-md' : 'bg-white/95 text-slate-900 border-b border-slate-200/80 shadow-md backdrop-blur-md'
      } transition-all duration-300`}>
        
        {/* Brand Identity */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('home')}>
          <div className="w-10 h-10 bg-blue-700 dark:bg-blue-600 flex items-center justify-center rounded-sm rotate-45 shadow-md">
            <span className="text-white font-bold text-xl -rotate-45">A</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-base md:text-lg tracking-tight text-blue-900 dark:text-blue-400 uppercase leading-none">
              Academy of Computer Learning
            </h1>
            <p className="text-[10px] text-orange-600 dark:text-orange-400 font-semibold tracking-widest uppercase mt-0.5">
              Colonelganj, Gonda • UP
            </p>
          </div>
        </div>

        {/* Desktop Web Links */}
        <nav className="hidden xl:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`px-3 py-2 rounded-sm text-xs font-semibold tracking-wide uppercase transition-all duration-150 relative ${
                  isActive 
                    ? 'text-blue-700 bg-blue-50 dark:bg-blue-900/40 border-b-2 border-blue-700' 
                    : darkMode ? 'text-slate-300 hover:text-orange-400 hover:bg-slate-800' : 'text-slate-600 hover:text-blue-700 hover:bg-slate-50'
                }`}
                id={`nav-${item.page}`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls Side buttons */}
        <div className="flex items-center space-x-2">
          {/* Quick Access Portal links */}
          <div className="hidden lg:flex items-center space-x-2 mr-2">
            {isLoggedIn ? (
              <button
                onClick={() => handleNavClick('student-dashboard')}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-sm text-xs font-bold border-2 ${
                  currentPage === 'student-dashboard'
                    ? 'bg-blue-700 text-white border-blue-700'
                    : 'border-blue-700 text-blue-700 bg-white hover:bg-blue-50 dark:bg-slate-850 dark:text-blue-400 dark:border-blue-550'
                }`}
              >
                <User className="w-3.5 h-3.5 text-orange-500" />
                <span>DASHBOARD</span>
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('student-dashboard')}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-sm text-xs font-bold border-2 border-blue-700 text-blue-700 bg-white hover:bg-blue-50 transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>STUDENT LOGIN</span>
              </button>
            )}

            <button
              onClick={() => handleNavClick('admission')}
              className="px-5 py-2 text-xs font-bold bg-orange-500 text-white rounded-sm shadow-md hover:bg-orange-600 transition-colors uppercase tracking-wider"
            >
              ENROLL NOW
            </button>
          </div>

          {/* Quick toggle Dark mode */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg transition-colors border ${
              darkMode ? 'bg-slate-800 border-slate-700 text-yellow-400 hover:bg-slate-700' : 'bg-slate-100 border-slate-200 text-indigo-900 hover:bg-slate-200'
            }`}
            aria-label="Toggle UI Theme Mode"
            id="theme-toggler"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Translate for Mobile view */}
          <button
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            className={`p-2 xl:hidden rounded-lg border flex items-center justify-center ${
              darkMode ? 'bg-slate-800 border-slate-700 text-sky-400' : 'bg-slate-100 border-slate-200 text-sky-600'
            }`}
            title="Switch Language"
          >
            <Globe className="w-4 h-4" />
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`xl:hidden p-2 rounded-lg transition-colors border ${
              darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-200 text-slate-800'
            }`}
            aria-label="Navigation Toggle"
            id="mobile-nav-trigger"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay Menu */}
      {mobileMenuOpen && (
        <div className={`xl:hidden absolute top-full left-0 w-full border-b shadow-2xl p-4 flex flex-col space-y-2 animate-fadeIn z-50 max-h-[85vh] overflow-y-auto ${
          darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          {/* Quick access links inside mobile menu */}
          <div className="grid grid-cols-2 gap-2 mb-2 pb-2 border-b border-slate-700/10">
            <button
              onClick={() => handleNavClick('student-dashboard')}
              className="flex justify-center items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-blue-600 text-white"
            >
              <User className="w-3.5 h-3.5" />
              <span>{isLoggedIn ? "Dashboard" : "Student Login"}</span>
            </button>
            <button
              onClick={() => handleNavClick('admin-dashboard')}
              className="flex justify-center items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-orange-600 text-white"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{isAdminLoggedIn ? "Admin Panel" : "Admin Login"}</span>
            </button>
          </div>

          <p className="text-[10px] uppercase tracking-wider font-mono text-gray-500 font-bold px-2 pt-1 pb-1">
            Academic Portals
          </p>

          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`flex items-center space-x-2 px-3 py-2.5 rounded-lg text-xs font-medium tracking-wide transition-all ${
                    isActive 
                      ? 'bg-orange-500/20 text-orange-500 font-bold' 
                      : darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                  id={`mob-nav-${item.page}`}
                >
                  <span className="text-orange-500/80">{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Location details */}
          <div className="mt-3 p-3 bg-blue-900/10 dark:bg-blue-900/30 rounded-xl border border-blue-500/10">
            <span className="flex items-start space-x-2 text-[11px] text-gray-500 dark:text-gray-400">
              <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <span>Kotwali Tiraha, Lucknow Gonda Highway, Colonelganj, Gonda, UP - 271521</span>
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
