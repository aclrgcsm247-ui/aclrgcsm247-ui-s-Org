import { Page, Course } from '../types';
import { TRANSLATIONS } from '../data';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  Award, 
  BookOpen, 
  CheckCircle,
  Clock,
  ExternalLink 
} from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
  lang: 'en' | 'hi';
  darkMode: boolean;
  courses: Course[];
}

export default function Footer({ setCurrentPage, lang, darkMode, courses }: FooterProps) {
  const t = TRANSLATIONS[lang];

  const handleFooterNav = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`relative border-t transition-colors duration-300 w-full ${
      darkMode ? 'bg-slate-950 border-slate-900 text-slate-300' : 'bg-slate-900 border-slate-800 text-slate-200'
    }`}>
      {/* Decorative colored bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-700"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {/* About Column */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-700 flex items-center justify-center rounded-sm rotate-45 text-white">
              <Award className="w-4 h-4 -rotate-45" />
            </div>
            <span className="font-display font-extrabold text-white text-base tracking-tight leading-none uppercase">
              Academy of Computer Learning
            </span>
          </div>
          <p className="text-xs text-slate-400 select-all leading-relaxed">
            The premier ISO 9001:2015 certified computer technology coaching institute in Colonelganj, Gonda, Uttar Pradesh. Specializing in NIELIT Gov Schemes, Tally GST workflows, and web technologies.
          </p>
          <div className="pt-2">
            <span className="inline-flex items-center space-x-1.5 bg-blue-900/40 text-blue-400 border border-blue-850 rounded-sm px-3 py-1 font-mono text-[10px] uppercase font-bold tracking-wider">
              <CheckCircle className="w-3.5 h-3.5 text-orange-500" />
              <span>Regd. ISO 9001:2015</span>
            </span>
          </div>
        </div>

        {/* Courses Column */}
        <div>
          <h3 className="font-display font-bold text-white text-sm tracking-wide mb-4 uppercase border-b border-orange-500/30 pb-2">
            {lang === 'en' ? 'Our Elite Courses' : 'हमारे प्रमुख कोर्सेज'}
          </h3>
          <ul className="space-y-2 text-xs">
            {courses.slice(0, 6).map((course) => (
              <li key={course.id}>
                <button
                  onClick={() => handleFooterNav('courses')}
                  className="hover:text-orange-400 text-left transition-colors flex items-center space-x-1"
                >
                  <span className="text-orange-500 text-sm">&#8250;</span>
                  <span>{course.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links Column */}
        <div>
          <h3 className="font-display font-bold text-white text-sm tracking-wide mb-4 uppercase border-b border-orange-500/30 pb-2">
            {lang === 'en' ? 'Quick Access Links' : 'त्वरित सूची'}
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="space-y-2">
              <button onClick={() => handleFooterNav('about')} className="block hover:text-orange-400">{t.navAbout}</button>
              <button onClick={() => handleFooterNav('courses')} className="block hover:text-orange-400">{t.navCourses}</button>
              <button onClick={() => handleFooterNav('admission')} className="block hover:text-orange-400">{t.navAdmission}</button>
              <button onClick={() => handleFooterNav('test')} className="block hover:text-orange-400">{t.navTest}</button>
              <button onClick={() => handleFooterNav('faculty')} className="block hover:text-orange-400">{t.navFaculty}</button>
            </div>
            <div className="space-y-2">
              <button onClick={() => handleFooterNav('gallery')} className="block hover:text-orange-400">{t.navGallery}</button>
              <button onClick={() => handleFooterNav('verification')} className="block hover:text-orange-400">{t.navVerify}</button>
              <button onClick={() => handleFooterNav('placement')} className="block hover:text-orange-400">{t.navCareer}</button>
              <button onClick={() => handleFooterNav('blog')} className="block hover:text-orange-400">{t.navBlog}</button>
              <button onClick={() => handleFooterNav('contact')} className="block hover:text-orange-400">{t.navContact}</button>
            </div>
          </div>
        </div>

        {/* Contact/Address Column */}
        <div className="space-y-3">
          <h3 className="font-display font-bold text-white text-sm tracking-wide mb-4 uppercase border-b border-orange-500/30 pb-2">
            {lang === 'en' ? 'Get In Touch' : 'हमसे संपर्क करें'}
          </h3>
          <div className="space-y-2 text-xs">
            <span className="flex items-start space-x-2 text-slate-400 leading-normal">
              <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <span>Kotwali Tiraha, Lucknow Gonda Highway, Colonelganj, Gonda, Uttar Pradesh - 271502</span>
            </span>
            <span className="flex items-center space-x-2 text-slate-400">
              <PhoneCall className="w-4 h-4 text-orange-500 shrink-0" />
              <span>+91 99186 66000</span>
            </span>
            <span className="flex items-center space-x-2 text-slate-400">
              <Mail className="w-4 h-4 text-orange-500 shrink-0" />
              <span>aclrgcsm247@gmail.com</span>
            </span>
          </div>

          {/* Social Platforms links & Official Desk hours */}
          <div className="pt-2">
            <span className="flex items-center space-x-1.5 text-xs text-orange-400 font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>Mon - Sat: 07:00 AM - 07:00 PM</span>
            </span>
          </div>
        </div>
      </div>

      {/* WhatsApp float widget helper inside absolute layout footer */}
      <div className="bg-slate-950 py-6 border-t border-slate-900 px-6 md:px-12 text-center text-xs">
        <p className="text-slate-500 tracking-wide leading-relaxed">
          {t.footerText}
        </p>
        <p className="text-[10px] text-slate-600 mt-2">
          Designed with Premium Glassmorphism UI & Responsive layouts. Verified ISO Registry ID: ACL-ISO-UP-2470.
        </p>
      </div>
    </footer>
  );
}
