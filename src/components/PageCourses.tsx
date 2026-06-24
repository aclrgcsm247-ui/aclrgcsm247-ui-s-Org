import React, { useState } from 'react';
import { Course, Page } from '../types';
import { TRANSLATIONS } from '../data';
import { 
  Search, 
  MapPin, 
  Clock, 
  Award, 
  GraduationCap, 
  BookOpen, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Layers 
} from 'lucide-react';

interface PageCoursesProps {
  courses: Course[];
  lang: 'en' | 'hi';
  darkMode: boolean;
  setCurrentPage: (page: Page) => void;
  setSelectedCourseId: (id: string) => void;
}

export default function PageCourses({
  courses,
  lang,
  darkMode,
  setCurrentPage,
  setSelectedCourseId
}: PageCoursesProps) {
  const t = TRANSLATIONS[lang];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'diploma' | 'certificate' | 'programming' | 'other'>('all');
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);

  const handleApplyClick = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentPage('admission');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.code.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpand = (id: string) => {
    if (expandedCourseId === id) {
      setExpandedCourseId(null);
    } else {
      setExpandedCourseId(id);
    }
  };

  return (
    <div className={`w-full min-h-screen py-12 md:py-16 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        {/* Page title header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-orange-500 text-xs font-bold uppercase tracking-widest font-mono">
            {lang === 'en' ? 'ACCREDITED ACADEMIC DEGREES' : 'सत्र 2026 व्यावसायिक कोर्स सूची'}
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-blue-950 dark:text-blue-400">
            {lang === 'en' ? 'Our Elite Computer Programs' : 'हमारे कंप्यूटर कोर्सेज की विस्तृत सूची'}
          </h2>
          <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-sans">
            {lang === 'en'
              ? 'Select from our certified curriculum backed by experienced trainers. All syllabus models are structured for state government jobs and competitive industries.'
              : 'अनुभवी शिक्षकों द्वारा तैयार किए गए हमारे प्रमाणित पाठ्यक्रमों में से चुनें। सभी सिलेबस मॉडल सरकारी नौकरियों और तकनीकी उद्योग के अनुकूल हैं।'}
          </p>
        </div>

        {/* Filters and Search Bar row */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-blue-900/5 dark:bg-slate-900/30 p-4 md:p-6 rounded-sm border-l-4 border-l-orange-500 border-y-gray-400/10 border-r-gray-400/10 border bg-white dark:bg-slate-950">
          {/* Search bar */}
          <div className="w-full md:max-w-sm relative">
            <input
              type="text"
              placeholder={lang === 'en' ? "Search e.g. Tally Prime, O Level..." : "कोर्स खोजें उदा. सीसीसी, ओ-लेवल..."}
              className={`w-full pl-10 pr-4 py-2.5 rounded-sm border text-xs ${
                darkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-black'
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="course-search-input"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
          </div>

          {/* Category buttons filters */}
          <div className="flex flex-wrap gap-2 items-center justify-center w-full md:w-auto">
            {(['all', 'diploma', 'certificate', 'programming', 'other'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider border transition-all ${
                  selectedCategory === cat
                    ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/15'
                    : darkMode 
                    ? 'border-slate-800 bg-slate-950 text-slate-300 hover:bg-slate-900' 
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
                id={`cat-filter-${cat}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Course listing grid count warning */}
        {filteredCourses.length === 0 ? (
          <div className="p-12 text-center text-gray-500 space-y-2 border border-l-4 border-l-red-500 border-y-gray-400/20 border-r-gray-400/20 rounded-sm">
            <p className="font-bold">{lang === 'en' ? 'No Matching Courses Found' : 'कोई मेल खाता पाठ्यक्रम नहीं मिला'}</p>
            <p className="text-xs">{lang === 'en' ? 'Try adjusting your search query or switching categories' : 'कृपया अपना सर्च विवरण बदलें'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const isExpanded = expandedCourseId === course.id;
              return (
                <div
                  key={course.id}
                  className={`border border-l-4 border-l-blue-700 rounded-sm overflow-hidden transition-all duration-300 ${
                    isExpanded 
                      ? 'ring-2 ring-orange-500 border-transparent shadow-xl' 
                      : darkMode ? 'bg-slate-950 border-y-slate-800 border-r-slate-800 hover:border-slate-700' : 'bg-white border-y-slate-200 border-r-slate-200 hover:shadow-lg shadow-sm'
                  }`}
                >
                  {/* Card head banner */}
                  <div className="p-6 pb-4 border-b border-gray-400/10 bg-blue-900/5 dark:bg-slate-900/20 relative">
                    <span className="bg-orange-500/15 text-orange-400 border border-orange-500/20 rounded-sm px-2.5 py-0.5 text-[10px] font-mono font-bold tracking-wider absolute top-4 right-4 uppercase">
                      {course.code}
                    </span>
                    <h3 className="font-display font-bold text-base md:text-lg text-blue-900 dark:text-blue-400 leading-snug mt-2 select-all">
                      {course.name}
                    </h3>
                  </div>

                  {/* Pricing and time layout */}
                  <div className="p-6 py-4 grid grid-cols-3 gap-2 text-center text-xs border-b border-gray-400/10">
                    <div className="space-y-0.5">
                      <span className="block text-gray-400 text-[10px] uppercase font-bold tracking-wider">{lang === 'en' ? 'Duration' : 'अवधि'}</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{course.duration}</span>
                    </div>
                    <div className="space-y-0.5 border-x border-gray-400/10">
                      <span className="block text-gray-400 text-[10px] uppercase font-bold tracking-wider">{lang === 'en' ? 'Fees' : 'कुल फीस'}</span>
                      <span className="font-bold text-orange-500">₹{course.fees.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="space-y-0.5">
                      <span className="block text-gray-400 text-[10px] uppercase font-bold tracking-wider">{lang === 'en' ? 'Eligibility' : 'योग्यता'}</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300 truncate block px-1" title={course.eligibility}>
                        {course.eligibility}
                      </span>
                    </div>
                  </div>

                  {/* Accompanying collapsible syllabus segment */}
                  <div className="p-6 py-4 text-xs text-left">
                    <button
                      onClick={() => toggleExpand(course.id)}
                      className="w-full flex items-center justify-between font-bold text-slate-700 dark:text-slate-300 hover:text-orange-500 transition-colors"
                      id={`expand-syllabus-${course.id}`}
                    >
                      <span className="flex items-center space-x-1">
                        <BookOpen className="w-3.5 h-3.5 text-orange-400" />
                        <span>{lang === 'en' ? 'Detailed Syllabus & Career Opportunities' : 'विस्तृत पाठ्यक्रम और रोजगार अवसर'}</span>
                      </span>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-orange-500" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-gray-400/10 space-y-4 animate-slideDown overflow-hidden transition-all duration-300">
                        {/* Syllabus lists */}
                        <div className="space-y-1.5">
                          <p className="font-bold text-[11px] uppercase tracking-wider text-orange-500 font-mono">
                            {t.syllabus}
                          </p>
                          <ul className="list-disc list-inside space-y-1 text-gray-500 dark:text-gray-400 leading-relaxed pl-1">
                            {course.syllabus.map((sy, idx) => (
                              <li key={idx} className="select-all">{sy}</li>
                            ))}
                          </ul>
                        </div>

                        {/* Certification description */}
                        <div className="space-y-1">
                          <p className="font-bold text-[11px] uppercase tracking-wider text-orange-500 font-mono">
                            {t.certificates}
                          </p>
                          <p className="text-gray-500 dark:text-gray-400 leading-relaxed select-all">
                            {course.certificateDetails}
                          </p>
                        </div>

                        {/* Career Opps */}
                        <div className="space-y-1">
                          <p className="font-bold text-[11px] uppercase tracking-wider text-orange-500 font-mono">
                            {t.careerOpp}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {course.careerOpportunities.map((op, idx) => (
                              <span
                                key={idx}
                                className="bg-blue-500/5 text-blue-600 dark:text-blue-400 border border-blue-500/10 rounded-sm px-2.5 py-0.5 text-[10px] font-medium"
                              >
                                {op}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions buttons */}
                  <div className="p-6 pt-0 flex gap-2">
                    <button
                      onClick={() => handleApplyClick(course.id)}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-sm text-xs flex items-center justify-center space-x-1 cursor-pointer transition-all border border-orange-400/20"
                      id={`apply-course-btn-${course.id}`}
                    >
                      <GraduationCap className="w-4 h-4" />
                      <span>{lang === 'en' ? 'Admission Form' : 'ऑनलाइन आवेदन करें'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
