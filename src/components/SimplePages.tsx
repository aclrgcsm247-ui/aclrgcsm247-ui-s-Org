import React, { useState } from 'react';
import { Faculty, Notice, GalleryImage, Certificate, PlacementRecord, BlogPost, Page, Feedback } from '../types';
import { TRANSLATIONS } from '../data';
import { saveFeedback } from '../lib/supabase';
import { 
  Users, 
  Search, 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  TrendingUp, 
  Calendar, 
  ShieldCheck, 
  Award, 
  Clock, 
  Printer, 
  Globe, 
  CheckCircle, 
  BookOpen, 
  MessageCircle,
  HelpCircle,
  Tag
} from 'lucide-react';

/* ========================================================================= */
/* 1. FACULTY PAGE COMPONENT                                               */
/* ========================================================================= */
interface PageFacultyProps {
  facultyList: Faculty[];
  lang: 'en' | 'hi';
  darkMode: boolean;
}
export function PageFaculty({ facultyList, lang, darkMode }: PageFacultyProps) {
  return (
    <div className={`w-full min-h-screen py-12 md:py-16 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
      <div className="max-w-7xl mx-auto px-6 space-y-12 text-left">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-orange-500 text-xs font-bold uppercase tracking-widest font-mono">
            {lang === 'en' ? 'Expert Instructional Mentors' : 'संस्थान के वरिष्ठ शिक्षक'}
          </span>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-blue-950 dark:text-blue-400">
            {lang === 'en' ? 'Meet Our Veteran IT Educators' : 'हमारे अनुभवी शिक्षकों से मिलें'}
          </h2>
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            {lang === 'en'
              ? 'Our professors hold multiple tech degrees with extensive practical industry experience across coding, accounting, and system configurations.'
              : 'हमारे शिक्षक आईटी उद्योग के विशेषज्ञ हैं जो वर्षों के शिक्षण और व्यावसायिक कोडिंग/अकाउंटिंग अनुभवों से लैस हैं।'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facultyList.map((fac) => (
            <div 
              key={fac.id}
              className={`p-5 rounded-2xl border transition-transform hover:-translate-y-1 ${
                darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200 shadow-md'
              }`}
            >
              <div className="relative rounded-xl overflow-hidden h-64 mb-4 border border-gray-400/10">
                <img 
                  className="w-full h-full object-cover" 
                  src={fac.photo} 
                  alt={fac.name} 
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-3 left-3 bg-orange-500 text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full shadow-lg">
                  {fac.role}
                </span>
              </div>
              <h3 className="font-display font-bold text-base text-blue-900 dark:text-blue-400 select-all">{fac.name}</h3>
              <p className="text-[11px] text-gray-400 font-medium select-all">{fac.qualification}</p>
              
              <div className="mt-3 pt-3 border-t border-gray-400/10 space-y-2">
                <p className="text-xs text-slate-500 leading-normal">
                  💼 <span className="font-semibold text-slate-700 dark:text-slate-300">Experience</span>: {fac.experience}
                </p>
                <div className="flex flex-wrap gap-1">
                  {fac.subjects.map((sub, idx) => (
                    <span 
                      key={idx}
                      className="bg-orange-500/10 text-orange-400 border border-orange-500/10 rounded px-1.5 py-0.5 text-[9px] font-mono font-semibold"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* 2. GALLERY PAGE COMPONENT                                               */
/* ========================================================================= */
interface PageGalleryProps {
  galleryList: GalleryImage[];
  lang: 'en' | 'hi';
  darkMode: boolean;
}
export function PageGallery({ galleryList, lang, darkMode }: PageGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'classroom' | 'events' | 'workshops' | 'distribution' | 'activities'>('all');
  
  const filteredImages = galleryList.filter((img) => {
    return selectedCategory === 'all' || img.category === selectedCategory;
  });

  return (
    <div className={`w-full min-h-screen py-12 md:py-16 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
      <div className="max-w-7xl mx-auto px-6 space-y-8 text-left">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-orange-500 text-xs font-bold uppercase tracking-widest font-mono">
            {lang === 'en' ? 'Campus Infrastructure Visuals' : 'परिसर और गतिविधियां'}
          </span>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-blue-950 dark:text-blue-400">
            {lang === 'en' ? 'Our Photo & Infrastructure Gallery' : 'फोटो एवं सांस्कृतिक गैलरी'}
          </h2>
        </div>

        {/* Categories Tab selectors */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 bg-blue-900/5 dark:bg-slate-900/20 p-3 rounded-xl border border-gray-400/10 max-w-3xl mx-auto">
          {(['all', 'classroom', 'events', 'workshops', 'distribution', 'activities'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase cursor-pointer tracking-wider border transition-all ${
                selectedCategory === cat
                  ? 'bg-orange-500 text-white border-orange-500 shadow'
                  : darkMode 
                  ? 'border-slate-800 bg-slate-950 text-slate-300 hover:bg-slate-900' 
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Image output Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img) => (
            <div 
              key={img.id}
              className={`rounded-2xl overflow-hidden border group cursor-pointer ${
                darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="relative h-64 overflow-hidden border-b border-gray-400/10">
                <img 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                  src={img.imageUrl} 
                  alt={img.title} 
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur text-white text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border border-white/10 font-mono">
                  {img.category}
                </span>
              </div>
              <div className="p-4 text-left">
                <h4 className="font-display font-bold text-xs md:text-sm text-slate-800 dark:text-slate-200 select-all">{img.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* 3. NOTICE BOARD PAGE COMPONENT                                          */
/* ========================================================================= */
interface PageNoticeProps {
  notices: Notice[];
  lang: 'en' | 'hi';
  darkMode: boolean;
}
export function PageNotice({ notices, lang, darkMode }: PageNoticeProps) {
  const [selectedCat, setSelectedCat] = useState<'all' | 'exam' | 'holiday' | 'batch' | 'scholarship' | 'job'>('all');

  const filteredNotices = notices.filter((notice) => {
    return selectedCat === 'all' || notice.category === selectedCat;
  });

  return (
    <div className={`w-full min-h-screen py-12 md:py-16 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
      <div className="max-w-5xl mx-auto px-6 space-y-10 text-left">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-orange-500 text-xs font-bold uppercase tracking-widest font-mono">
            {lang === 'en' ? 'General Desk Broadcast' : 'कार्यालयी उद्घोषणाएं'}
          </span>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-blue-950 dark:text-blue-400">
            {lang === 'en' ? 'Official Center Notice Board' : 'एसीएल कर्नलगंज नोटिस बोर्ड'}
          </h2>
        </div>

        {/* Categories Tab selectors */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 bg-blue-900/5 dark:bg-slate-900/20 p-2.5 rounded-xl border border-gray-400/10">
          {(['all', 'exam', 'holiday', 'batch', 'scholarship', 'job'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1 rounded-md text-[11px] font-bold uppercase cursor-pointer tracking-wider border transition-all ${
                selectedCat === cat
                  ? 'bg-orange-500 text-white border-orange-500 shadow'
                  : darkMode 
                  ? 'border-slate-800 bg-slate-950 text-slate-300 hover:bg-slate-900' 
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Notices vertical column feed */}
        <div className="space-y-6">
          {filteredNotices.map((notice) => (
            <div 
              key={notice.id}
              className={`p-6 md:p-8 rounded-2xl border text-left ${
                notice.active 
                  ? darkMode ? 'bg-slate-950 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 shadow-sm'
                  : 'bg-gray-500/5 border-gray-500/10 opacity-60'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-gray-400/10 pb-3">
                <div className="flex items-center space-x-2">
                  <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold font-mono uppercase tracking-wider ${
                    notice.category === 'exam' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                    notice.category === 'batch' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                    notice.category === 'scholarship' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                    'bg-cyan-500/10 text-cyan-500 border border-cyan-500/20'
                  }`}>
                    {notice.category}
                  </span>
                  {!notice.active && <span className="bg-gray-500/20 text-gray-400 text-[10px] px-1.5 py-0.5 rounded uppercase font-bold font-mono">Archived</span>}
                </div>
                <span className="flex items-center space-x-1 text-xs text-gray-500 font-mono">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  <span>{notice.date}</span>
                </span>
              </div>

              <h3 className="font-display font-extrabold text-base md:text-lg text-blue-900 dark:text-blue-400 pr-10 select-all">
                {lang === 'en' ? notice.title : notice.titleHindi}
              </h3>

              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 leading-relaxed mt-3 select-all">
                {lang === 'en' ? notice.description : notice.descriptionHindi}
              </p>

              <div className="mt-4 pt-4 border-t border-gray-400/10 flex items-center justify-between text-xs font-mono">
                <span className="text-[10px] uppercase font-bold text-gray-400">Official Release • Center Gonda</span>
                <span className="text-orange-500 font-bold select-all">Ref: ACL-NOT-{notice.id}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* 4. CERTIFICATE VERIFICATION PAGE COMPONENT                               */
/* ========================================================================= */
interface PageVerificationProps {
  certificates: Certificate[];
  lang: 'en' | 'hi';
  darkMode: boolean;
}
export function PageVerification({ certificates, lang, darkMode }: PageVerificationProps) {
  const [certNo, setCertNo] = useState('');
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [verifiedCert, setVerifiedCert] = useState<Certificate | null>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certNo.trim()) return;

    // Search certificates database case-insensitive
    const match = certificates.find(
      c => c.certificateNo.replace(/\s+/g, '').toLowerCase() === certNo.replace(/\s+/g, '').toLowerCase() || 
           c.id.replace(/\s+/g, '').toLowerCase() === certNo.replace(/\s+/g, '').toLowerCase()
    );

    setVerifiedCert(match || null);
    setSearchTriggered(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`w-full min-h-screen py-12 md:py-16 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
      <div className="max-w-3xl mx-auto px-6 space-y-10 text-left">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-orange-500 text-xs font-bold uppercase tracking-widest font-mono">
            {lang === 'en' ? 'Accreditation Shield' : 'प्रमाण पत्र सत्यापन'}
          </span>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-blue-950 dark:text-blue-400">
            {lang === 'en' ? 'Online Student Certificate Verification' : 'ऑनलाइन कंप्यूटर सर्टिफिकेट प्रमाणीकरण सूची'}
          </h2>
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            {lang === 'en'
              ? 'Enter the 12-digit standard registration certificate number listed on your credentials to verify absolute authenticity.'
              : 'प्रमाण पत्र की सत्यता जांचने के लिए अपने सर्टिफिकेट के ऊपर दर्ज "ACL-CERT-xxxx" सत्यापन संख्या दर्ज करें।'}
          </p>
        </div>

        {/* Search input Form */}
        <form 
          onSubmit={handleVerify} 
          className={`p-6 rounded-2xl border ${
            darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-200 shadow-md'
          }`}
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                required
                type="text"
                placeholder="e.g. ACL-CERT-2026-9041"
                className={`w-full pl-10 pr-3 py-3 border rounded-xl text-xs ${
                  darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-black'
                }`}
                value={certNo}
                onChange={(e) => setCertNo(e.target.value)}
                id="cert-verify-input"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-4" />
            </div>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-wider shadow cursor-pointer shadow-orange-500/10 transition-all border border-orange-400/20 shrink-0"
              id="cert-verify-trigger"
            >
              Verify Certificate
            </button>
          </div>
          <p className="text-[10px] text-gray-400 mt-2 font-mono">
            💡 Sample certificates in system database: <span className="text-orange-400 select-all">ACL-CERT-2026-9041</span>, <span className="text-orange-400 select-all">ACL-CERT-2026-9042</span>.
          </p>
        </form>

        {/* Output Sheet layout */}
        {searchTriggered && (
          <div className="animate-fadeIn">
            {verifiedCert ? (
              /* FOUND VERIFIED SHEET */
              <div className={`p-8 border rounded-2xl space-y-6 relative overflow-hidden text-center max-w-2xl mx-auto ${
                darkMode ? 'bg-slate-950 border-green-500/20' : 'bg-white border-green-500/30 shadow-xl'
              }`}>
                {/* Background watermarks seal */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-500/5 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-24 h-24 text-green-500/10" />
                </div>
                
                <div className="space-y-1">
                  <span className="bg-green-500/10 text-green-500 border border-green-500/20 rounded-full px-3 py-1 font-mono text-[10px] uppercase font-bold tracking-wider inline-flex items-center space-x-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>AUTHENTICITY GUARANTEED - VERIFIED</span>
                  </span>
                  <p className="text-[10px] text-gray-400 uppercase font-mono tracking-widest pt-1">Government Registered ISO standard</p>
                </div>

                {/* Certificate Details Table */}
                <div className="p-6 rounded-xl bg-green-500/[0.02] dark:bg-slate-900 border border-green-500/15 text-left text-xs font-sans space-y-3.5">
                  <div className="grid grid-cols-2 border-b border-gray-400/10 pb-2">
                    <span className="text-gray-400 uppercase font-bold tracking-wider text-[10px]">Certificate No</span>
                    <span className="font-bold text-orange-500 font-mono select-all text-right">{verifiedCert.certificateNo}</span>
                  </div>
                  <div className="grid grid-cols-2 border-b border-gray-400/10 pb-2">
                    <span className="text-gray-400 uppercase font-bold tracking-wider text-[10px]">Student Enroll ID</span>
                    <span className="font-semibold text-right select-all">{verifiedCert.studentId}</span>
                  </div>
                  <div className="grid grid-cols-2 border-b border-gray-400/10 pb-2">
                    <span className="text-gray-400 uppercase font-bold tracking-wider text-[10px]">Student Name</span>
                    <span className="font-bold text-slate-800 dark:text-slate-100 text-right select-all">{verifiedCert.studentName}</span>
                  </div>
                  <div className="grid grid-cols-2 border-b border-gray-400/10 pb-2">
                    <span className="text-gray-400 uppercase font-bold tracking-wider text-[10px]">Course Completed</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300 text-right select-all">{verifiedCert.courseName}</span>
                  </div>
                  <div className="grid grid-cols-2 border-b border-gray-400/10 pb-2">
                    <span className="text-gray-400 uppercase font-bold tracking-wider text-[10px]">Date of Issuance</span>
                    <span className="font-semibold text-right select-all">{verifiedCert.issueDate}</span>
                  </div>
                  <div className="grid grid-cols-2">
                    <span className="text-gray-400 uppercase font-bold tracking-wider text-[10px]">Performance Grade</span>
                    <span className="font-extrabold text-blue-600 dark:text-blue-400 text-right select-all">{verifiedCert.grade}</span>
                  </div>
                </div>

                <div className="flex justify-center items-center gap-3">
                  <button 
                    onClick={handlePrint}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-xs tracking-wider uppercase inline-flex items-center space-x-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Authenticity Card</span>
                  </button>
                </div>
              </div>
            ) : (
              /* NOT FOUND PANELS */
              <div className="p-8 border border-dashed border-red-500/20 rounded-2xl bg-red-500/[0.02] text-center space-y-3 py-10">
                <p className="font-bold text-red-500 text-sm">Certificate Record Not Found</p>
                <p className="text-xs text-gray-500 max-w-md mx-auto">
                  The inputted serial could not be verified in Gonda Center administrative records. Please check the spelling or visit the center administrative desk with your physical document.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ========================================================================= */
/* 5. PLACEMENT & CAREER PAGE COMPONENT                                     */
/* ========================================================================= */
interface PagePlacementProps {
  placements: PlacementRecord[];
  lang: 'en' | 'hi';
  darkMode: boolean;
}
export function PagePlacement({ placements, lang, darkMode }: PagePlacementProps) {
  return (
    <div className={`w-full min-h-screen py-12 md:py-16 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
      <div className="max-w-7xl mx-auto px-6 space-y-12 text-left">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-orange-500 text-xs font-bold uppercase tracking-widest font-mono">
            {lang === 'en' ? 'Industrial Liaison Outcomes' : 'रोजगार सुरक्षा सूची'}
          </span>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-blue-950 dark:text-blue-400 text-center">
            {lang === 'en' ? 'Our Placement Records & Partners' : 'हमारे प्लेस्ड छात्रों की सूची और पार्टनर कंपनियां'}
          </h2>
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            Our training translates directly into jobs. Learn about local candidates who got hired in top-tier accounting firms and tech industries.
          </p>
        </div>

        {/* Corporate partner icons display */}
        <div className="p-6 md:p-8 rounded-2xl bg-blue-900/5 dark:bg-slate-900/40 border border-gray-400/10 text-center space-y-4">
          <p className="font-mono text-[10px] uppercase font-bold text-gray-400 tracking-wider">Accredited Regional Placement Partners</p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-xs text-semibold text-slate-500 uppercase tracking-widest font-display">
            <span className="px-3 py-1.5 bg-white dark:bg-slate-950 rounded border border-gray-400/10 font-bold text-gray-400">WebTech Lucknow</span>
            <span className="px-3 py-1.5 bg-white dark:bg-slate-950 rounded border border-gray-400/10 font-bold text-gray-400">Gonda Sugarmill Accounts</span>
            <span className="px-3 py-1.5 bg-white dark:bg-slate-950 rounded border border-gray-400/10 font-bold text-gray-400">Infinia Software</span>
            <span className="px-3 py-1.5 bg-white dark:bg-slate-950 rounded border border-gray-400/10 font-bold text-gray-400">E-Governance UP Gov</span>
          </div>
        </div>

        {/* Alumni placements grid list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {placements.map((plc) => (
            <div 
              key={plc.id}
              className={`p-5 rounded-2xl border ${
                darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-200 shadow-md'
              }`}
            >
              <div className="relative rounded-xl overflow-hidden h-48 mb-4 border border-gray-400/10">
                <img 
                  className="w-full h-full object-cover" 
                  src={plc.studentPhoto} 
                  alt={plc.studentName} 
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-3 left-3 bg-blue-900 text-white text-[9px] uppercase tracking-wider font-bold px-2.5 py-1 rounded shadow-lg">
                  {plc.packageText} Offerd
                </span>
              </div>
              <h3 className="font-display font-bold text-sm md:text-base text-blue-900 dark:text-blue-400 select-all">{plc.studentName}</h3>
              <p className="text-[10px] text-gray-400 uppercase font-mono font-bold tracking-wider select-all">{plc.courseName}</p>
              
              <div className="mt-3 pt-3 border-t border-gray-400/10 text-xs text-left text-slate-500 space-y-1">
                <p>🏢 <span className="font-semibold text-slate-700 dark:text-slate-300">Company</span>: <span className="select-all">{plc.companyName}</span></p>
                <p>💼 <span className="font-semibold text-slate-700 dark:text-slate-300">Designation</span>: <span className="select-all">{plc.designation}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* 6. BLOG / EDUCATIONAL ARTICLES PAGE COMPONENT                           */
/* ========================================================================= */
interface PageBlogProps {
  blogs: BlogPost[];
  lang: 'en' | 'hi';
  darkMode: boolean;
}
export function PageBlog({ blogs, lang, darkMode }: PageBlogProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className={`w-full min-h-screen py-12 md:py-16 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
      <div className="max-w-6xl mx-auto px-6 space-y-12 text-left">
        
        {selectedPost ? (
          /* SINGLE BLOG POST DETIALS */
          <div className="space-y-6 max-w-3xl mx-auto animate-fadeIn">
            <button
              onClick={() => setSelectedPost(null)}
              className="text-xs font-bold text-orange-500 hover:underline flex items-center space-x-1 mb-4"
              id="back-to-blogs-btn"
            >
              <span>&larr; Back to all educational blogs</span>
            </button>

            <img 
              className="w-full h-80 object-cover rounded-3xl border border-gray-400/10 shadow-lg" 
              src={selectedPost.coverImage} 
              alt={selectedPost.title} 
              referrerPolicy="no-referrer"
            />
            
            <div className="flex items-center space-x-4 text-xs font-mono text-gray-400">
              <span className="bg-orange-500/10 text-orange-400 pr-2 pl-2 py-0.5 rounded border border-orange-500/10">{selectedPost.category}</span>
              <span>By {selectedPost.author}</span>
              <span>{selectedPost.date}</span>
              <span>{selectedPost.readTime}</span>
            </div>

            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-blue-950 dark:text-blue-400 select-all leading-tight">
              {lang === 'en' ? selectedPost.title : selectedPost.titleHindi}
            </h2>

            <div className="prose prose-sm dark:prose-invert max-w-full text-sm leading-relaxed text-gray-500 dark:text-gray-400 whitespace-pre-line select-all">
              {lang === 'en' ? selectedPost.content : selectedPost.contentHindi}
            </div>

            <div className="pt-6 border-t border-gray-400/10 flex flex-wrap gap-1.5">
              {selectedPost.tags.map((tag, idx) => (
                <span key={idx} className="bg-blue-500/5 text-blue-600 dark:text-blue-400 border border-blue-500/10 rounded-full px-3 py-0.5 text-xs font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ) : (
          /* BLOG FEED LIST */
          <div className="space-y-8 animate-fadeIn">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-orange-500 text-xs font-bold uppercase tracking-widest font-mono">
                {lang === 'en' ? 'Knowledge Hub' : 'शैक्षणिक ब्लॉग'}
              </span>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl text-blue-950 dark:text-blue-400">
                {lang === 'en' ? 'Educational Resources & IT Guidance' : 'कंप्यूटर ज्ञान और परीक्षा ट्रिक्स'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogs.map((post) => (
                <div 
                  key={post.id}
                  className={`border rounded-2xl overflow-hidden transition-all hover:shadow-md ${
                    darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-200'
                  }`}
                >
                  <img 
                    className="w-full h-48 object-cover border-b border-gray-400/10" 
                    src={post.coverImage} 
                    alt={post.title}
                    referrerPolicy="no-referrer"
                  />
                  <div className="p-5 text-left space-y-3">
                    <span className="bg-orange-500/10 text-orange-400 rounded px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase border border-orange-500/10">
                      {post.category}
                    </span>
                    <h3 className="font-display font-bold text-sm md:text-base text-blue-900 dark:text-blue-400 leading-snug line-clamp-2 select-all">
                      {lang === 'en' ? post.title : post.titleHindi}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-3 select-all">
                      {lang === 'en' ? post.excerpt : post.excerptHindi}
                    </p>
                    <div className="pt-3 border-t border-gray-400/10 flex justify-between items-center">
                      <span className="text-[10px] text-gray-500 font-mono">By Ramesh Shukla</span>
                      <button 
                        onClick={() => setSelectedPost(post)}
                        className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-orange-500 flex items-center space-x-1"
                        id={`read-blog-btn-${post.id}`}
                      >
                        <span>{lang === 'en' ? 'Read Article' : 'पूरा लेख पढ़ें'}</span>
                        <span>&rarr;</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ========================================================================= */
/* 7. CONTACT & ENQUIRY PAGE COMPONENT                                      */
/* ========================================================================= */
interface PageContactProps {
  lang: 'en' | 'hi';
  darkMode: boolean;
}
export function PageContact({ lang, darkMode }: PageContactProps) {
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackMob, setFeedbackMob] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackName.trim() || !feedbackMob.trim() || !feedbackMsg.trim()) {
      alert('Please fill out all fields.');
      return;
    }

    const fbId = `FB-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    saveFeedback({
      id: fbId,
      name: feedbackName,
      email: '',
      mobile: feedbackMob,
      subject: 'Online Enquiry',
      message: feedbackMsg,
      date: new Date().toISOString().split('T')[0]
    });

    setFeedbackSent(true);
    setTimeout(() => {
      setFeedbackSent(false);
      setFeedbackName('');
      setFeedbackMob('');
      setFeedbackMsg('');
    }, 3000);
  };

  const openWhatsApp = () => {
    const textQuery = encodeURIComponent(`Hello Academy of Computer Learning, Gonda. I am interested in joining a computer computer. Please schedule me a free demo class.`);
    window.open(`https://wa.me/919918666000?text=${textQuery}`, '_blank');
  };

  return (
    <div className={`w-full min-h-screen py-12 md:py-16 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
      <div className="max-w-7xl mx-auto px-6 space-y-12 text-left">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-orange-500 text-xs font-bold uppercase tracking-widest font-mono">
            {lang === 'en' ? 'Information Center' : 'संपर्क केंद्र'}
          </span>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-blue-950 dark:text-blue-400">
            {lang === 'en' ? 'Connect With Our Gonda administrative Desk' : 'एकेडमी से संपर्क करें'}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Contact Details pane */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`p-6 rounded-2xl border space-y-4 text-xs ${
              darkMode ? 'bg-slate-950 border-slate-900' : 'bg-slate-50 border-slate-100 shadow-sm'
            }`}>
              <h3 className="font-display font-bold text-sm uppercase tracking-wide border-b border-orange-500/20 pb-2">Administrative Coordinates</h3>
              
              <div className="space-y-4">
                <span className="flex items-start space-x-3 text-gray-500 leading-normal">
                  <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <span className="select-all"><b>Address:</b> Kotwali Tiraha, Lucknow Gonda Highway, Colonelganj, Gonda, Uttar Pradesh - 271521</span>
                </span>
                <span className="flex items-center space-x-3 text-gray-500">
                  <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                  <span className="select-all"><b>Phone:</b> +91 99186 66000, 93699 17174</span>
                </span>
                <span className="flex items-center space-x-3 text-gray-500">
                  <Mail className="w-5 h-5 text-orange-500 shrink-0" />
                  <span className="select-all"><b>Email:</b> aclrgcsm247@gmail.com</span>
                </span>
              </div>
            </div>

            {/* Float WhatsApp Clickable */}
            <div className="p-6 rounded-2xl border border-green-500/20 bg-green-500/[0.03] space-y-3">
              <h4 className="font-bold text-xs text-green-500 flex items-center space-x-1">
                <span>💬 {lang === 'en' ? "On Call 24/7 Service" : "व्हाट्सएप सेवा"}</span>
              </h4>
              <p className="text-xs text-gray-500 pr-4">Send a quick WhatsApp message to get class timelines and scholarship brochures.</p>
              <button 
                onClick={openWhatsApp}
                className="bg-green-600 hover:bg-green-700 hover:scale-101 text-white font-bold py-2 px-4 rounded-xl text-xs uppercase flex items-center space-x-1 border border-green-500/20"
                id="contact-whatsapp-btn"
              >
                <span>Chat On WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Contact Form Submission and Interactive Map */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {feedbackSent ? (
              <div className={`p-8 border rounded-2xl text-center space-y-3 my-auto ${
                darkMode ? 'bg-slate-905 border-slate-800' : 'bg-white border-slate-200 shadow'
              }`} id="contact-success-notification">
                <span className="p-3 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 inline-block">
                  <CheckCircle className="w-10 h-10" />
                </span>
                <p className="font-bold text-sm tracking-tight text-blue-900 dark:text-blue-400">Enquiry Submitted Successfully!</p>
                <p className="text-xs text-gray-500">Our support coordinators will contact you shortly.</p>
              </div>
            ) : (
              <form 
                onSubmit={handleFeedbackSubmit}
                className={`p-6 md:p-8 border rounded-2xl space-y-4 text-xs ${
                  darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <h3 className="font-display font-bold text-sm text-blue-900 dark:text-blue-400">Quick Online Enquiry</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-medium text-slate-500">Student Name *</label>
                    <input 
                      required
                      type="text" 
                      className={`w-full p-2.5 border rounded-lg ${
                        darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-black'
                      }`}
                      placeholder="e.g. Priyanshu"
                      value={feedbackName}
                      onChange={(e) => setFeedbackName(e.target.value)}
                      id="contact-input-name"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-medium text-slate-500">Mobile No *</label>
                    <input 
                      required
                      type="tel" 
                      maxLength={10}
                      pattern="[0-9]{10}"
                      className={`w-full p-2.5 border rounded-lg ${
                        darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-black'
                      }`}
                      placeholder="e.g. 9876543210"
                      value={feedbackMob}
                      onChange={(e) => setFeedbackMob(e.target.value)}
                      id="contact-input-mobile"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-slate-500">Detailed Message *</label>
                  <textarea 
                    required
                    rows={4} 
                    className={`w-full p-2.5 border rounded-lg ${
                      darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-black'
                    }`}
                    placeholder="Enter your message details..."
                    value={feedbackMsg}
                    onChange={(e) => setFeedbackMsg(e.target.value)}
                    id="contact-input-msg"
                  />
                </div>

                <button 
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-6 rounded-xl border border-orange-400/20 shadow-md inline-flex items-center space-x-1 uppercase tracking-wide cursor-pointer"
                  id="contact-submit-btn"
                >
                  <span>Submit Message</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}

            {/* Embedded maps simulator representing Kotwali Tiraha Gonda */}
            <div className={`mt-4 p-3 rounded-2xl border text-center font-mono text-[10px] uppercase font-bold text-gray-500 flex flex-col items-center justify-center h-28 border-dashed ${
              darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <MapPin className="w-6 h-6 text-orange-500 mb-1" />
              <span>Kotwali Tiraha Gonda Lucknow Highway Intersection</span>
              <span className="text-[9px] text-orange-400 font-sans font-semibold mt-1">27.1351° N, 81.7011° E • Colonelganj Hub</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
