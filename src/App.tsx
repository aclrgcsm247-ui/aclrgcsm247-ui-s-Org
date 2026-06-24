import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PageHome from './components/PageHome';
import PageAbout from './components/PageAbout';
import PageCourses from './components/PageCourses';
import PageAdmission from './components/PageAdmission';
import { 
  PageFaculty, 
  PageGallery, 
  PageNotice, 
  PageVerification, 
  PagePlacement, 
  PageBlog, 
  PageContact 
} from './components/SimplePages';
import OnlineTest from './components/OnlineTest';
import DashboardStudent from './components/DashboardStudent';
import DashboardAdmin from './components/DashboardAdmin';
import SupabaseCrudDemo from './components/SupabaseCrudDemo';

// Data & Types
import { 
  INITIAL_COURSES, 
  INITIAL_NOTICES, 
  INITIAL_FACULTY, 
  INITIAL_GALLERY, 
  INITIAL_PLACEMENTS, 
  INITIAL_CERTIFICATES, 
  INITIAL_STUDENTS,
  INITIAL_BLOGS,
  INITIAL_NOTES,
  INITIAL_VIDEOS
} from './data';
import { Page, Student, Notice, Certificate, Result, StudyNote, VideoLecture } from './types';
import { 
  loadStudents, 
  loadNotices, 
  loadCertificates, 
  loadResults, 
  saveStudent, 
  saveNotice, 
  saveCertificate, 
  saveResult, 
  deleteStudent as apiDeleteStudent, 
  deleteNotice as apiDeleteNotice,
  loadStudyNotes,
  saveStudyNote,
  deleteStudyNote,
  loadVideoLectures,
  saveVideoLecture,
  deleteVideoLecture
} from './lib/supabase';

export default function App() {
  // Page selector & parameters
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('acl_darkMode');
    return saved === 'true';
  });
  
  // To allow pre-selected course when student navigates from Courses to Admission
  const [selectedCourseId, setSelectedCourseId] = useState<string>('ccc');

  // Core mutable databases (with localStorage hydration)
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('acl_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });
  
  const [notices, setNotices] = useState<Notice[]>(() => {
    const saved = localStorage.getItem('acl_notices');
    return saved ? JSON.parse(saved) : INITIAL_NOTICES;
  });

  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    const saved = localStorage.getItem('acl_certificates');
    return saved ? JSON.parse(saved) : INITIAL_CERTIFICATES;
  });

  const [resultsList, setResultsList] = useState<Result[]>(() => {
    const saved = localStorage.getItem('acl_results');
    return saved ? JSON.parse(saved) : [];
  });

  const [notes, setNotes] = useState<StudyNote[]>(() => {
    const saved = localStorage.getItem('acl_notes');
    return saved ? JSON.parse(saved) : INITIAL_NOTES;
  });

  const [videos, setVideos] = useState<VideoLecture[]>(() => {
    const saved = localStorage.getItem('acl_videos');
    return saved ? JSON.parse(saved) : INITIAL_VIDEOS;
  });

  // Authentication states
  const [loggedInStudent, setLoggedInStudent] = useState<Student | null>(() => {
    const saved = localStorage.getItem('acl_loggedInStudent');
    return saved ? JSON.parse(saved) : null;
  });
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('acl_isAdminLoggedIn') === 'true';
  });

  // Load and migrate data with Supabase integration
  useEffect(() => {
    async function loadData() {
      // 1. Students
      const dbStudents = await loadStudents();
      if (dbStudents) {
        if (dbStudents.length === 0 && students.length > 0) {
          // If remote is empty, populate remote with existing records
          for (const s of students) {
            await saveStudent(s);
          }
        } else if (dbStudents.length > 0) {
          setStudents(dbStudents);
        }
      }

      // 2. Notices
      const dbNotices = await loadNotices();
      if (dbNotices) {
        if (dbNotices.length === 0 && notices.length > 0) {
          for (const n of notices) {
            await saveNotice(n);
          }
        } else if (dbNotices.length > 0) {
          setNotices(dbNotices);
        }
      }

      // 3. Certificates
      const dbCertificates = await loadCertificates();
      if (dbCertificates) {
        if (dbCertificates.length === 0 && certificates.length > 0) {
          for (const c of certificates) {
            await saveCertificate(c);
          }
        } else if (dbCertificates.length > 0) {
          setCertificates(dbCertificates);
        }
      }

      // 4. Results
      const dbResults = await loadResults();
      if (dbResults) {
        if (dbResults.length === 0 && resultsList.length > 0) {
          for (const r of resultsList) {
            await saveResult(r);
          }
        } else if (dbResults.length > 0) {
          setResultsList(dbResults);
        }
      }

      // 5. Notes
      const dbNotes = await loadStudyNotes();
      if (dbNotes) {
        if (dbNotes.length === 0 && notes.length > 0) {
          for (const note of notes) {
            await saveStudyNote(note);
          }
        } else if (dbNotes.length > 0) {
          setNotes(dbNotes);
        }
      }

      // 6. Videos
      const dbVideos = await loadVideoLectures();
      if (dbVideos) {
        if (dbVideos.length === 0 && videos.length > 0) {
          for (const v of videos) {
            await saveVideoLecture(v);
          }
        } else if (dbVideos.length > 0) {
          setVideos(dbVideos);
        }
      }
    }
    loadData();
  }, []);

  // Theme Sync effect (integrating with HTML element dark mode helper)
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('acl_darkMode', String(darkMode));
  }, [darkMode]);

  // Keep state collections in LocalStorage
  useEffect(() => {
    localStorage.setItem('acl_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('acl_notices', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('acl_certificates', JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem('acl_results', JSON.stringify(resultsList));
  }, [resultsList]);

  useEffect(() => {
    localStorage.setItem('acl_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('acl_videos', JSON.stringify(videos));
  }, [videos]);

  // Sync logged in structures
  useEffect(() => {
    if (loggedInStudent) {
      localStorage.setItem('acl_loggedInStudent', JSON.stringify(loggedInStudent));
    } else {
      localStorage.removeItem('acl_loggedInStudent');
    }
  }, [loggedInStudent]);

  useEffect(() => {
    localStorage.setItem('acl_isAdminLoggedIn', String(isAdminLoggedIn));
  }, [isAdminLoggedIn]);

  // DB HANDLERS
  const handleAddStudent = (newStudent: Student) => {
    setStudents(prev => [newStudent, ...prev]);
    saveStudent(newStudent);
  };

  const handleDeleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    if (loggedInStudent && loggedInStudent.id === id) {
      setLoggedInStudent(null);
    }
    apiDeleteStudent(id);
  };

  const handleUpdateStudentStatus = (id: string, status: 'approved' | 'rejected') => {
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        const updated = { ...s, admissionStatus: status };
        saveStudent(updated);
        return updated;
      }
      return s;
    }));
  };

  const handleUpdateStudentFields = (id: string, fields: Partial<Student>) => {
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        const updated = { ...s, ...fields };
        if (loggedInStudent && loggedInStudent.id === id) {
          setLoggedInStudent(updated);
        }
        saveStudent(updated);
        return updated;
      }
      return s;
    }));
  };

  const handleAddNotice = (notice: Notice) => {
    setNotices(prev => [notice, ...prev]);
    saveNotice(notice);
  };

  const handleDeleteNotice = (id: string) => {
    setNotices(prev => prev.filter(n => n.id !== id));
    apiDeleteNotice(id);
  };

  const handleAddCertificate = (cert: Certificate) => {
    setCertificates(prev => [cert, ...prev]);
    saveCertificate(cert);
  };

  const handleAddResult = (res: Result) => {
    setResultsList(prev => [res, ...prev]);
    saveResult(res);
  };

  const handleAddNote = (newNote: StudyNote) => {
    setNotes(prev => [newNote, ...prev]);
    saveStudyNote(newNote);
  };

  const handleUpdateNote = (updatedNote: StudyNote) => {
    setNotes(prev => prev.map(n => n.id === updatedNote.id ? updatedNote : n));
    saveStudyNote(updatedNote);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    deleteStudyNote(id);
  };

  const handleAddVideo = (newVideo: VideoLecture) => {
    setVideos(prev => [newVideo, ...prev]);
    saveVideoLecture(newVideo);
  };

  const handleUpdateVideo = (updatedVideo: VideoLecture) => {
    setVideos(prev => prev.map(v => v.id === updatedVideo.id ? updatedVideo : v));
    saveVideoLecture(updatedVideo);
  };

  const handleDeleteVideo = (id: string) => {
    setVideos(prev => prev.filter(v => v.id !== id));
    deleteVideoLecture(id);
  };


  const handleLogout = () => {
    setLoggedInStudent(null);
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render proper educational module
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <PageHome
            setCurrentPage={setCurrentPage}
            lang={lang}
            darkMode={darkMode}
            courses={INITIAL_COURSES}
            notices={notices}
            gallery={INITIAL_GALLERY}
          />
        );
      case 'about':
        return <PageAbout lang={lang} darkMode={darkMode} />;
      case 'courses':
        return (
          <PageCourses
            courses={INITIAL_COURSES}
            lang={lang}
            darkMode={darkMode}
            setCurrentPage={setCurrentPage}
            setSelectedCourseId={setSelectedCourseId}
          />
        );
      case 'admission':
        return (
          <PageAdmission
            courses={INITIAL_COURSES}
            lang={lang}
            darkMode={darkMode}
            selectedCourseId={selectedCourseId}
            onAddStudent={handleAddStudent}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'test':
        return (
          <OnlineTest
            currentStudent={loggedInStudent}
            lang={lang}
            darkMode={darkMode}
            onAddResult={handleAddResult}
            onAddCertificate={handleAddCertificate}
          />
        );
      case 'faculty':
        return <PageFaculty facultyList={INITIAL_FACULTY} lang={lang} darkMode={darkMode} />;
      case 'gallery':
        return <PageGallery galleryList={INITIAL_GALLERY} lang={lang} darkMode={darkMode} />;
      case 'notice-board':
        return <PageNotice notices={notices} lang={lang} darkMode={darkMode} />;
      case 'verification':
        return <PageVerification certificates={certificates} lang={lang} darkMode={darkMode} />;
      case 'placement':
        return <PagePlacement placements={INITIAL_PLACEMENTS} lang={lang} darkMode={darkMode} />;
      case 'blog':
        return <PageBlog blogs={INITIAL_BLOGS} lang={lang} darkMode={darkMode} />;
      case 'contact':
        return <PageContact lang={lang} darkMode={darkMode} />;
      case 'student-dashboard':
        return (
          <DashboardStudent
            students={students}
            courses={INITIAL_COURSES}
            resultsList={resultsList}
            notices={notices}
            lang={lang}
            darkMode={darkMode}
            loggedInStudent={loggedInStudent}
            onLogin={setLoggedInStudent}
            onLogout={handleLogout}
            onUpdateStudent={handleUpdateStudentFields}
            notes={notes}
            videos={videos}
          />
        );
      case 'admin-dashboard':
        return (
          <DashboardAdmin
            students={students}
            courses={INITIAL_COURSES}
            notices={notices}
            certificates={certificates}
            facultyList={INITIAL_FACULTY}
            lang={lang}
            darkMode={darkMode}
            isAdminLoggedIn={isAdminLoggedIn}
            onAdminLogin={() => setIsAdminLoggedIn(true)}
            onAdminLogout={handleAdminLogout}
            onAddStudent={handleAddStudent}
            onDeleteStudent={handleDeleteStudent}
            onUpdateStudentStatus={handleUpdateStudentStatus}
            onAddNotice={handleAddNotice}
            onDeleteNotice={handleDeleteNotice}
            onAddCertificate={handleAddCertificate}
            notes={notes}
            videos={videos}
            onAddNote={handleAddNote}
            onUpdateNote={handleUpdateNote}
            onDeleteNote={handleDeleteNote}
            onAddVideo={handleAddVideo}
            onUpdateVideo={handleUpdateVideo}
            onDeleteVideo={handleDeleteVideo}
          />
        );
      case 'supabase-crud':
        return <SupabaseCrudDemo darkMode={darkMode} lang={lang} />;
      default:
        return (
          <PageHome
            setCurrentPage={setCurrentPage}
            lang={lang}
            darkMode={darkMode}
            courses={INITIAL_COURSES}
            notices={notices}
            gallery={INITIAL_GALLERY}
          />
        );
    }
  };

  return (
    <div className={`min-h-screen w-full flex flex-col justify-between select-none transition-colors duration-300 ${
      darkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Dynamic bilingual navigation header */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        lang={lang}
        setLang={setLang}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        isLoggedIn={loggedInStudent !== null}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogout={handleLogout}
      />

      {/* Main viewport pane with subtle fade transition */}
      <main className="flex-grow w-full relative">
        <div key={currentPage} className="w-full h-full">
          {renderPage()}
        </div>
      </main>

      {/* Static directory footer */}
      <Footer
        setCurrentPage={setCurrentPage}
        lang={lang}
        darkMode={darkMode}
        courses={INITIAL_COURSES}
      />
    </div>
  );
}
