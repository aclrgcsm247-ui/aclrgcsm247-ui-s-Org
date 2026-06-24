import React, { useState, useEffect } from 'react';
import { Student, Course, Notice, Certificate, Faculty, StudyNote, VideoLecture, Feedback, AttendanceRecord } from '../types';
import { TRANSLATIONS } from '../data';
import { checkSupabaseStatus, SUPABASE_SQL_SCHEMA, SUPABASE_URL, loadFeedbacks, deleteFeedback } from '../lib/supabase';
import { 
  Lock, 
  User, 
  Trash2, 
  UserPlus, 
  Award, 
  CheckCircle, 
  Layers, 
  BookOpen, 
  PlusCircle, 
  CreditCard,
  Eye,
  LogOut,
  RefreshCw,
  Database,
  Check,
  Copy,
  Edit,
  Video,
  FileText,
  Mail,
  Calendar
} from 'lucide-react';

interface DashboardAdminProps {
  students: Student[];
  courses: Course[];
  notices: Notice[];
  certificates: Certificate[];
  facultyList: Faculty[];
  lang: 'en' | 'hi';
  darkMode: boolean;
  isAdminLoggedIn: boolean;
  onAdminLogin: () => void;
  onAdminLogout: () => void;
  onAddStudent: (student: Student) => void;
  onDeleteStudent: (id: string) => void;
  onUpdateStudentStatus: (id: string, status: 'approved' | 'rejected') => void;
  onAddNotice: (notice: Notice) => void;
  onDeleteNotice: (id: string) => void;
  onAddCertificate: (cert: Certificate) => void;
  notes?: StudyNote[];
  videos?: VideoLecture[];
  onAddNote: (note: StudyNote) => void;
  onUpdateNote: (note: StudyNote) => void;
  onDeleteNote: (id: string) => void;
  onAddVideo: (video: VideoLecture) => void;
  onUpdateVideo: (video: VideoLecture) => void;
  onDeleteVideo: (id: string) => void;
  attendanceRecords?: AttendanceRecord[];
  onUpdateAttendance?: (records: AttendanceRecord[]) => void;
}

export default function DashboardAdmin({
  students,
  courses,
  notices,
  certificates,
  facultyList,
  lang,
  darkMode,
  isAdminLoggedIn,
  onAdminLogin,
  onAdminLogout,
  onAddStudent,
  onDeleteStudent,
  onUpdateStudentStatus,
  onAddNotice,
  onDeleteNotice,
  onAddCertificate,
  notes = [],
  videos = [],
  onAddNote,
  onUpdateNote,
  onDeleteNote,
  onAddVideo,
  onUpdateVideo,
  onDeleteVideo,
  attendanceRecords = [],
  onUpdateAttendance
}: DashboardAdminProps) {
  const t = TRANSLATIONS[lang];

  // Login variables
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [loginErr, setLoginErr] = useState(false);

  // Active admin module selection
  const [activeTab, setActiveTab] = useState<'students' | 'attendance' | 'notices' | 'certificates' | 'courses' | 'materials' | 'feedbacks'>('students');

  // Attendance tracker states
  const [attendanceDate, setAttendanceDate] = useState(() => {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const localToday = new Date(today.getTime() - (offset * 60 * 1000));
    return localToday.toISOString().split('T')[0];
  });
  const [attendanceStates, setAttendanceStates] = useState<Record<string, 'present' | 'absent'>>({});

  useEffect(() => {
    const approvedStudents = students.filter(s => s.admissionStatus === 'approved');
    const newState: Record<string, 'present' | 'absent'> = {};
    
    approvedStudents.forEach(student => {
      const existing = attendanceRecords.find(r => r.studentId === student.id && r.date === attendanceDate);
      if (existing) {
        newState[student.id] = existing.status;
      } else {
        newState[student.id] = 'present';
      }
    });
    setAttendanceStates(newState);
  }, [attendanceDate, students, attendanceRecords]);

  const handleSaveAttendance = () => {
    const approvedStudents = students.filter(s => s.admissionStatus === 'approved');
    const recordsToSave = approvedStudents.map(student => ({
      id: `att-${student.id}-${attendanceDate}`,
      studentId: student.id,
      studentName: student.fullName,
      date: attendanceDate,
      status: attendanceStates[student.id] || 'present'
    }));

    if (onUpdateAttendance) {
      onUpdateAttendance(recordsToSave);
      alert(
        lang === 'en' 
          ? `Success: Attendance for ${attendanceDate} saved & student percentages recalculated!`
          : `सफलता: दिनांक ${attendanceDate} की उपस्थिति सहेज ली गई है और छात्र प्रतिशत की पुनर्गणना की गई है!`
      );
    }
  };

  // Feedbacks / Contact enquiries states
  const [feedbacksList, setFeedbacksList] = useState<Feedback[]>([]);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(false);

  // Materials tab states
  const [materialsSubTab, setMaterialsSubTab] = useState<'notes' | 'videos'>('notes');
  
  // Note Form State
  const [noteTitle, setNoteTitle] = useState('');
  const [noteCourseId, setNoteCourseId] = useState('all');
  const [noteFileSize, setNoteFileSize] = useState('');
  const [noteDownloadUrl, setNoteDownloadUrl] = useState('');
  const [editingNote, setEditingNote] = useState<StudyNote | null>(null);

  // Video Form State
  const [videoTitle, setVideoTitle] = useState('');
  const [videoCourseId, setVideoCourseId] = useState('all');
  const [videoDuration, setVideoDuration] = useState('');
  const [videoInstructor, setVideoInstructor] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [editingVideo, setEditingVideo] = useState<VideoLecture | null>(null);

  // Supabase states
  const [supabaseStatus, setSupabaseStatus] = useState<{ connected: boolean; tablesCreated: boolean; message: string } | null>(null);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);

  // Auto-verify connection when logged in
  useEffect(() => {
    if (isAdminLoggedIn) {
      checkConnection();
    }
  }, [isAdminLoggedIn]);

  useEffect(() => {
    if (isAdminLoggedIn && activeTab === 'feedbacks') {
      fetchFeedbacks();
    }
  }, [isAdminLoggedIn, activeTab]);

  const fetchFeedbacks = async () => {
    setLoadingFeedbacks(true);
    const data = await loadFeedbacks();
    if (data) {
      setFeedbacksList(data);
    }
    setLoadingFeedbacks(false);
  };

  const handleDeleteFeedback = async (id: string) => {
    if (confirm('Are you sure you want to delete this submission?')) {
      const success = await deleteFeedback(id);
      if (success) {
        alert('Submission deleted successfully!');
        fetchFeedbacks();
      } else {
        alert('Failed to delete submission. Please check connection.');
      }
    }
  };

  const checkConnection = async () => {
    setCheckingStatus(true);
    const status = await checkSupabaseStatus();
    setSupabaseStatus(status);
    setCheckingStatus(false);
  };

  // Input states for Add Student form modal/collapse
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [newStudName, setNewStudName] = useState('');
  const [newStudFather, setNewStudFather] = useState('');
  const [newStudMobile, setNewStudMobile] = useState('');
  const [newStudCourse, setNewStudCourse] = useState('ccc');
  const [selectedStudentDocs, setSelectedStudentDocs] = useState<Student | null>(null);

  // Input states for Add Notice form
  const [showAddNoticeForm, setShowAddNoticeForm] = useState(false);
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeTitleHi, setNoticeTitleHi] = useState('');
  const [noticeCat, setNoticeCat] = useState<'exam' | 'holiday' | 'batch' | 'scholarship' | 'job'>('exam');
  const [noticeDesc, setNoticeDesc] = useState('');
  const [noticeDescHi, setNoticeDescHi] = useState('');

  // Input states for Add Certificate form
  const [showAddCertForm, setShowAddCertForm] = useState(false);
  const [certStudentName, setCertStudentName] = useState('');
  const [certCourseName, setCertCourseName] = useState('');
  const [certEnrollId, setCertEnrollId] = useState('');
  const [certGrade, setCertGrade] = useState('A Grade (Very Good)');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginErr(false);
    if (user === 'admin' && pass === 'admin') {
      onAdminLogin();
      setUser('');
      setPass('');
    } else {
      setLoginErr(true);
    }
  };

  // Student CRUD
  const handleAddNewStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudName || !newStudFather || !newStudMobile) {
      alert('Please fill out all required fields.');
      return;
    }

    const manualId = `ACL-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const manualRoll = `STUDENT-${Math.floor(300 + Math.random() * 600)}`;
    const chosenCourseObj = courses.find(c => c.id === newStudCourse);
    const fees = chosenCourseObj ? chosenCourseObj.fees : 5000;

    const manuallyCreatedStudent: Student = {
      id: manualId,
      fullName: newStudName,
      fatherName: newStudFather,
      mobileNumber: newStudMobile,
      email: `${newStudName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      dob: '2004-01-01',
      gender: 'Male',
      address: 'Colonelganj, Gonda, UP',
      courseId: newStudCourse,
      passportPhoto: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80",
      aadhaarCard: 'Manually Registered',
      marksheetPhoto: "Marksheet_Not_Uploaded.png",
      admissionDate: new Date().toISOString().split('T')[0],
      admissionStatus: 'approved', // Directly approved by admin
      attendancePercentage: 85,
      feesPaid: fees, // Marked fully paid
      totalFees: fees,
      rollNo: manualRoll,
      password: newStudMobile,
      rank: 4,
      progress: 60
    };

    onAddStudent(manuallyCreatedStudent);
    alert(`Student record created successfully!\nAdmission ID: ${manualId}\nRoll Number: ${manualRoll}`);
    
    // Reset fields
    setNewStudName('');
    setNewStudFather('');
    setNewStudMobile('');
    setShowAddStudentForm(false);
  };

  // Notice CRUD
  const handleAddNewNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle || !noticeDesc) {
      alert('Fill out notice details.');
      return;
    }

    const manuallyCreatedNotice: Notice = {
      id: `not-${Math.floor(10 + Math.random() * 90)}`,
      title: noticeTitle,
      titleHindi: noticeTitleHi || noticeTitle,
      category: noticeCat,
      description: noticeDesc,
      descriptionHindi: noticeDescHi || noticeDesc,
      date: new Date().toISOString().split('T')[0],
      active: true
    };

    onAddNotice(manuallyCreatedNotice);
    alert('Notice published on official bulletin ticker!');
    
    // Reset notice states
    setNoticeTitle('');
    setNoticeTitleHi('');
    setNoticeDesc('');
    setNoticeDescHi('');
    setShowAddNoticeForm(false);
  };

  // Certificate CRUD
  const handleAddNewCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certStudentName || !certCourseName || !certEnrollId) {
      alert('Please fill out all cert details.');
      return;
    }

    const generatedNo = `ACL-CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const manuallyGeneratedCert: Certificate = {
      id: generatedNo,
      certificateNo: generatedNo,
      studentId: certEnrollId,
      studentName: certStudentName,
      courseName: certCourseName,
      issueDate: new Date().toISOString().split('T')[0],
      grade: certGrade,
      validity: 'verified'
    };

    onAddCertificate(manuallyGeneratedCert);
    alert(`Verified Computer Diploma credential saved!\nCertificate verification Code: ${generatedNo}`);
    
    // Reset certificate states
    setCertStudentName('');
    setCertCourseName('');
    setCertEnrollId('');
    setShowAddCertForm(false);
  };

  return (
    <div className={`w-full min-h-screen py-12 md:py-16 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
      <div className="max-w-7xl mx-auto px-6 text-left">
        
        {!isAdminLoggedIn ? (
          /* ========================================================================= */
          /* ADMIN PORTAL LOGIN SCREEN                                                 */
          /* ========================================================================= */
          <div className="max-w-md mx-auto animate-fadeIn space-y-6">
            <div className="text-center space-y-2">
              <span className="text-orange-500 text-xs font-bold uppercase tracking-widest font-mono">
                {lang === 'en' ? 'Administrative Control' : 'प्रशासक लॉगिन'}
              </span>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl text-blue-950 dark:text-blue-400">
                {lang === 'en' ? 'Center Director Login Panel' : 'संस्थान मुख्य प्रशासनिक लॉगिन'}
              </h2>
              <p className="text-xs text-gray-400">
                Authorized credentials are required to modify billing indices and verify admissions.
              </p>
            </div>

            <form 
              onSubmit={handleLogin}
              className={`p-6 md:p-8 border rounded-2xl space-y-4 text-xs ${
                darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-200 shadow-xl'
              }`}
            >
              {loginErr && (
                <div className="p-3 bg-red-500/10 border border-red-500/15 rounded-lg text-red-500 font-bold font-mono">
                  ⚠ Error: Invalid administrator password. Use: admin / admin
                </div>
              )}

              <div>
                <label className="block mb-1.5 font-semibold text-slate-500 uppercase tracking-wider text-[10px]">Director Username *</label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    placeholder="admin"
                    className={`w-full pl-9 pr-3 py-2.5 border rounded-xl font-mono ${
                      darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-black'
                    }`}
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    id="admin-login-username"
                  />
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block mb-1.5 font-semibold text-slate-500 uppercase tracking-wider text-[10px]">Access Lock Password *</label>
                <div className="relative">
                  <input
                    required
                    type="password"
                    placeholder="admin"
                    className={`w-full pl-9 pr-3 py-2.5 border rounded-xl font-sans ${
                      darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-black'
                    }`}
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    id="admin-login-password"
                  />
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider shadow cursor-pointer transition-all border border-orange-400/20"
                  id="admin-login-submit"
                >
                  Verify Admin Clearance
                </button>
              </div>

              <div className="p-3 bg-blue-900/10 rounded-xl border border-blue-500/10 text-[10px] text-gray-400">
                💡 <span className="font-bold text-orange-400">Clearance Credentials:</span> Username: <span className="text-white font-mono font-bold">admin</span> | Password: <span className="text-white font-mono font-bold">admin</span>
              </div>
            </form>
          </div>
        ) : (
          /* ========================================================================= */
          /* ADMIN DASHBOARD CONSOLE                                                   */
          /* ========================================================================= */
          <div className="space-y-6 animate-fadeIn">
            
            {/* Console header */}
            <div className={`p-6 rounded-2xl border flex flex-col md:flex-row justify-between items-center gap-4 ${
              darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-200 shadow'
            }`}>
              <div>
                <h2 className="font-display font-extrabold text-xl text-blue-900 dark:text-blue-400 leading-none">Administrative Console • Gonda Branch</h2>
                <p className="text-xs text-gray-400 font-mono tracking-wider mt-1.5">Center Authorizediso Registry Level: 1 • Online Desk</p>
              </div>
              <button 
                onClick={onAdminLogout}
                className="bg-red-500/10 text-red-500 border border-red-500/15 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg text-xs font-bold font-mono transition-all flex items-center space-x-1 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Exit Admin Console</span>
              </button>
            </div>

            {/* Dashboard Tabs Selector menu */}
            <div className="flex flex-wrap gap-2 border-b border-gray-400/10 pb-2">
              {[
                { id: 'students', label: 'Manage Students', icon: <User className="w-3.5 h-3.5" /> },
                { id: 'attendance', label: 'Mark Attendance', icon: <Calendar className="w-3.5 h-3.5" /> },
                { id: 'notices', label: 'Bulletin Notices', icon: <BookOpen className="w-3.5 h-3.5" /> },
                { id: 'certificates', label: 'Generate Certificate', icon: <Award className="w-3.5 h-3.5" /> },
                { id: 'courses', label: 'Course Catalog fees', icon: <Layers className="w-3.5 h-3.5" /> },
                { id: 'materials', label: 'PDF Notes & Lectures', icon: <Video className="w-3.5 h-3.5" /> },
                { id: 'feedbacks', label: 'Contact Enquiries', icon: <Mail className="w-3.5 h-3.5" /> }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setShowAddStudentForm(false);
                    setShowAddNoticeForm(false);
                    setShowAddCertForm(false);
                  }}
                  className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase cursor-pointer tracking-wider flex items-center space-x-1.5 transition-all ${
                    activeTab === tab.id
                      ? 'bg-orange-500 text-white shadow shadow-orange-500/15'
                      : darkMode ? 'bg-slate-950 hover:bg-slate-900 text-slate-300' : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200'
                  }`}
                  id={`admin-tab-trigger-${tab.id}`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* TAB CONTENTS */}
            <div className={`p-6 rounded-2xl border ${
              darkMode ? 'bg-slate-950 border-slate-900 shadow-2xl' : 'bg-white border-slate-200 shadow-md'
            }`}>
              
              {/* MODULE 1: STUDENT ROSTER */}
              {activeTab === 'students' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex justify-between items-center border-b border-gray-400/10 pb-3">
                    <h3 className="font-display font-extrabold text-sm text-blue-900 dark:text-blue-400">Student Enrollment Register</h3>
                    <button
                      onClick={() => setShowAddStudentForm(!showAddStudentForm)}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs py-1.5 px-3 rounded-lg flex items-center space-x-1 cursor-pointer border border-orange-400/10"
                      id="admin-trigger-add-student"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Add Student Manually</span>
                    </button>
                  </div>

                  {showAddStudentForm && (
                    /* COLLAPSED ADD STUDENT FORM FORM */
                    <form onSubmit={handleAddNewStudent} className="p-4 rounded-xl bg-orange-500/[0.02] border border-orange-500/15 text-xs grid grid-cols-1 md:grid-cols-2 gap-4 animate-slideDown">
                      <div className="space-y-1">
                        <label className="font-bold text-slate-500">Student Full Name *</label>
                        <input required type="text" className={`w-full p-2 border rounded-lg ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-black'}`} placeholder="e.g. Ramesh" value={newStudName} onChange={e => setNewStudName(e.target.value)} id="man-stud-name" />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-500">Father&apos;s Name *</label>
                        <input required type="text" className={`w-full p-2 border rounded-lg ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-black'}`} placeholder="Shri Papa" value={newStudFather} onChange={e => setNewStudFather(e.target.value)} id="man-stud-father" />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-500">Mobile No *</label>
                        <input required type="tel" maxLength={10} className={`w-full p-2 border rounded-lg ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-black'}`} placeholder="9876543210" value={newStudMobile} onChange={e => setNewStudMobile(e.target.value)} id="man-stud-mobile" />
                      </div>
                      <div className="space-y-1">
                        <label className="font-bold text-slate-500">Course Selection</label>
                        <select className={`w-full p-2 border rounded-lg ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-black'}`} value={newStudCourse} onChange={e => setNewStudCourse(e.target.value)} id="man-stud-course">
                          {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                      </div>
                      <div className="md:col-span-2 pt-2 flex gap-2">
                        <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-lg font-bold">Register Student</button>
                        <button type="button" onClick={() => setShowAddStudentForm(false)} className="bg-slate-500/10 px-4 py-1.5 rounded-lg text-gray-400">Cancel</button>
                      </div>
                    </form>
                  )}

                  {/* Student Table spreadsheet */}
                  <div className="overflow-x-auto border border-gray-400/10 rounded-xl">
                    <table className="w-full text-xs text-left">
                      <thead className={`font-bold font-mono text-[10px] uppercase tracking-wider ${
                        darkMode ? 'bg-slate-900 text-slate-400' : 'bg-slate-50 text-slate-500 border-b border-slate-200'
                      }`}>
                        <tr>
                          <th className="p-3">Roll / ID</th>
                          <th className="p-3">Name</th>
                          <th className="p-3">Course Code</th>
                          <th className="p-3">Fees Ledger</th>
                          <th className="p-3">Status</th>
                          <th className="p-3 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-400/10 font-sans">
                        {students.map((student) => {
                          const userCourse = courses.find(c => c.id === student.courseId);
                          return (
                            <tr key={student.id} className="hover:bg-gray-500/[0.02]">
                              <td className="p-3 font-mono font-bold select-all">
                                <span className="block text-white">{student.rollNo}</span>
                                <span className="text-[10px] text-gray-400">{student.id}</span>
                              </td>
                              <td className="p-3 select-all">
                                <span className="block font-bold text-slate-700 dark:text-slate-200">{student.fullName}</span>
                                <span className="text-[10px] text-gray-400">Mob: {student.mobileNumber}</span>
                              </td>
                              <td className="p-3 font-mono font-bold text-sky-400">
                                {userCourse ? userCourse.code : student.courseId}
                              </td>
                              <td className="p-3 font-mono">
                                <span className="block text-green-500 font-bold">Paid: ₹{student.feesPaid}</span>
                                <span className="text-[10px] text-slate-400">Total: ₹{student.totalFees}</span>
                              </td>
                              <td className="p-3">
                                <span className={`inline-block px-1.5 py-0.2 rounded text-[9px] font-bold uppercase ${
                                  student.admissionStatus === 'approved' ? 'bg-green-500/10 text-green-500' :
                                  student.admissionStatus === 'pending' ? 'bg-yellow-500/10 text-yellow-500 animate-pulse' :
                                  'bg-red-500/10 text-red-500'
                                }`}>
                                  {student.admissionStatus}
                                </span>
                              </td>
                              <td className="p-3">
                                <div className="flex items-center justify-center gap-1.5">
                                  {student.admissionStatus === 'pending' && (
                                    <button
                                      onClick={() => onUpdateStudentStatus(student.id, 'approved')}
                                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-2 rounded font-sans text-[10px]"
                                    >
                                      Approve
                                    </button>
                                  )}
                                  <button
                                    onClick={() => setSelectedStudentDocs(student)}
                                    className="p-1 text-sky-500 hover:bg-sky-500/10 rounded"
                                    title="View Documents"
                                    id={`view-docs-student-${student.id}`}
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (confirm('Verify deleting Student folder permanently?')) {
                                        onDeleteStudent(student.id);
                                      }
                                    }}
                                    className="p-1 text-red-500 hover:bg-red-500/10 rounded"
                                    id={`del-student-${student.id}`}
                                    title="Delete Student Record"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Documents View Modal overlay */}
                  {selectedStudentDocs && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
                      <div className={`w-full max-w-2xl rounded-2xl border p-6 shadow-2xl space-y-6 ${
                        darkMode ? 'bg-slate-950 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-800'
                      }`}>
                        {/* Modal Header */}
                        <div className="flex justify-between items-center border-b border-gray-400/10 pb-3">
                          <div>
                            <h3 className="font-display font-extrabold text-base text-blue-900 dark:text-blue-400">
                              Enclosure Roster & Verified Documents
                            </h3>
                            <p className="text-[11px] text-gray-400">
                              Student: <strong className="text-slate-750 dark:text-slate-200">{selectedStudentDocs.fullName}</strong> • Roll: <span className="font-mono">{selectedStudentDocs.rollNo}</span>
                            </p>
                          </div>
                          <button
                            onClick={() => setSelectedStudentDocs(null)}
                            className="text-gray-450 hover:text-red-500 text-xs font-extrabold uppercase font-mono tracking-wider p-2 cursor-pointer"
                          >
                            Close ✕
                          </button>
                        </div>

                        {/* Modal Content - Documents Showcase Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          
                          {/* Passport Photo card */}
                          <div className="space-y-2 text-center">
                            <span className="font-bold text-[10px] uppercase text-gray-400 tracking-wider block">Passport Photo</span>
                            <div className="aspect-square bg-slate-900/10 rounded-xl overflow-hidden border border-gray-400/20 flex items-center justify-center max-h-[160px] mx-auto">
                              <img 
                                src={selectedStudentDocs.passportPhoto || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80"} 
                                alt="Passport Photo" 
                                className="object-cover w-full h-full"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <p className="text-[9px] text-gray-400 truncate px-1" title={selectedStudentDocs.passportPhoto}>
                              Verified Passport Portrait
                            </p>
                          </div>

                          {/* Aadhaar Card Card */}
                          <div className="space-y-2 text-center flex flex-col justify-between">
                            <div>
                              <span className="font-bold text-[10px] uppercase text-gray-400 tracking-wider block">Aadhaar Card</span>
                              <div className="aspect-square bg-slate-900/5 rounded-xl border border-gray-400/20 flex flex-col items-center justify-center p-3 text-center max-h-[160px] mx-auto">
                                <FileText className="w-10 h-10 text-orange-500 mb-1" />
                                <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 truncate max-w-full block" title={selectedStudentDocs.aadhaarCard}>
                                  {selectedStudentDocs.aadhaarCard || 'Aadhaar_Document.pdf'}
                                </span>
                              </div>
                            </div>
                            <p className="text-[9px] text-gray-400">
                              Govt ID Verification
                            </p>
                          </div>

                          {/* Marksheet Photo card */}
                          <div className="space-y-2 text-center">
                            <span className="font-bold text-[10px] uppercase text-gray-400 tracking-wider block">Academic Marksheet</span>
                            <div className="aspect-square bg-slate-900/5 rounded-xl overflow-hidden border border-gray-400/20 flex items-center justify-center p-1 text-center max-h-[160px] mx-auto">
                              {selectedStudentDocs.marksheetPhoto && selectedStudentDocs.marksheetPhoto !== 'Marksheet_Not_Uploaded.png' ? (
                                selectedStudentDocs.marksheetPhoto.startsWith('data:') || selectedStudentDocs.marksheetPhoto.startsWith('http') || selectedStudentDocs.marksheetPhoto.startsWith('blob:') ? (
                                  <img 
                                    src={selectedStudentDocs.marksheetPhoto} 
                                    alt="Academic Marksheet" 
                                    className="object-contain w-full h-full rounded-lg"
                                    referrerPolicy="no-referrer"
                                  />
                                ) : (
                                  <div className="flex flex-col items-center justify-center">
                                    <FileText className="w-10 h-10 text-sky-500 mb-1" />
                                    <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 truncate max-w-full block" title={selectedStudentDocs.marksheetPhoto}>
                                      {selectedStudentDocs.marksheetPhoto}
                                    </span>
                                  </div>
                                )
                              ) : (
                                <div className="text-gray-400 font-mono text-[10px] leading-tight text-center p-2 flex flex-col items-center justify-center">
                                  <span className="text-red-500 font-bold mb-1">NOT ATTACHED</span>
                                  <span>No Marksheet Uploaded</span>
                                </div>
                              )}
                            </div>
                            <p className="text-[9px] text-gray-400">
                              10th / 12th Academic Record
                            </p>
                          </div>

                        </div>

                        {/* Actions drawer inside modal */}
                        <div className="pt-4 border-t border-gray-400/10 flex justify-end gap-2.5">
                          {selectedStudentDocs.marksheetPhoto && selectedStudentDocs.marksheetPhoto !== 'Marksheet_Not_Uploaded.png' && (
                            <a 
                              href={selectedStudentDocs.marksheetPhoto} 
                              download={`${selectedStudentDocs.fullName}_Marksheet`}
                              target="_blank"
                              rel="noreferrer"
                              className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg text-xs"
                            >
                              Download Marksheet
                            </a>
                          )}
                          <button
                            onClick={() => setSelectedStudentDocs(null)}
                            className="bg-slate-500/10 hover:bg-slate-500/20 text-gray-400 font-bold py-2 px-4 rounded-lg text-xs"
                          >
                            Dismiss
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* MODULE 1.5: ATTENDANCE TRACKER */}
              {activeTab === 'attendance' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-400/10 pb-4">
                    <div>
                      <h3 className="font-display font-extrabold text-sm text-blue-900 dark:text-blue-400">
                        {lang === 'en' ? 'Daily Attendance Sheets' : 'दैनिक छात्र उपस्थिति पत्रक'}
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {lang === 'en' ? 'Select date and mark daily attendance. Student percentages recalculate in real-time.' : 'दिनांक चुनें और दैनिक उपस्थिति चिह्नित करें। छात्रों का प्रतिशत वास्तविक समय में पुनर्गणित होता है।'}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <label className="text-xs font-bold text-slate-500 font-mono">Date:</label>
                      <input 
                        type="date" 
                        value={attendanceDate}
                        onChange={(e) => setAttendanceDate(e.target.value)}
                        className={`p-2 border rounded-xl font-mono text-xs ${
                          darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-black'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Bulk Select Helpers */}
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-blue-900/5 dark:bg-blue-950/10 p-3 rounded-xl border border-blue-500/10 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-500">
                        {lang === 'en' ? 'Quick Actions:' : 'त्वरित कार्रवाई:'}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const approvedStudents = students.filter(s => s.admissionStatus === 'approved');
                          const updated: Record<string, 'present' | 'absent'> = {};
                          approvedStudents.forEach(s => { updated[s.id] = 'present'; });
                          setAttendanceStates(updated);
                        }}
                        className="bg-green-500/10 text-green-500 hover:bg-green-500/20 px-2.5 py-1 rounded font-bold transition-all text-[11px]"
                      >
                        {lang === 'en' ? 'Mark All Present' : 'सभी को उपस्थित चिह्नित करें'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const approvedStudents = students.filter(s => s.admissionStatus === 'approved');
                          const updated: Record<string, 'present' | 'absent'> = {};
                          approvedStudents.forEach(s => { updated[s.id] = 'absent'; });
                          setAttendanceStates(updated);
                        }}
                        className="bg-red-500/10 text-red-500 hover:bg-red-500/20 px-2.5 py-1 rounded font-bold transition-all text-[11px]"
                      >
                        {lang === 'en' ? 'Mark All Absent' : 'सभी को अनुपस्थित चिह्नित करें'}
                      </button>
                    </div>
                    
                    <button
                      type="button"
                      onClick={handleSaveAttendance}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer shadow border border-orange-400/20 text-[11px]"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{lang === 'en' ? 'Save and Recalculate' : 'उपस्थिति सुरक्षित करें'}</span>
                    </button>
                  </div>

                  {/* Student Grid / List */}
                  <div className="overflow-x-auto border border-gray-400/10 rounded-xl">
                    <table className="w-full text-xs text-left">
                      <thead className={`text-[10px] uppercase font-mono tracking-wider ${darkMode ? 'bg-slate-900 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                        <tr>
                          <th className="p-3.5">{lang === 'en' ? 'Roll No / Admission ID' : 'रोल नंबर / नामांकन'}</th>
                          <th className="p-3.5">{lang === 'en' ? 'Student Name' : 'छात्र का नाम'}</th>
                          <th className="p-3.5">{lang === 'en' ? 'Course Enrolled' : 'पाठ्यक्रम'}</th>
                          <th className="p-3.5 text-center">{lang === 'en' ? 'Current Attendance' : 'वर्तमान उपस्थिति'}</th>
                          <th className="p-3.5 text-right">{lang === 'en' ? 'Daily Status' : 'दैनिक स्थिति'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-400/10">
                        {students.filter(s => s.admissionStatus === 'approved').length === 0 ? (
                          <tr>
                            <td colSpan={5} className="p-8 text-center text-gray-500">
                              {lang === 'en' ? 'No approved students found.' : 'कोई स्वीकृत छात्र नहीं मिले।'}
                            </td>
                          </tr>
                        ) : (
                          students.filter(s => s.admissionStatus === 'approved').map(student => {
                            const studentCourse = courses.find(c => c.id === student.courseId);
                            const currentStatus = attendanceStates[student.id] || 'present';
                            const attPct = student.attendancePercentage;
                            
                            return (
                              <tr key={student.id} className="hover:bg-gray-500/[0.01] transition-colors">
                                <td className="p-3.5 font-mono">
                                  <span className="block font-bold text-slate-700 dark:text-slate-200">{student.rollNo}</span>
                                  <span className="text-[10px] text-gray-400">{student.id}</span>
                                </td>
                                <td className="p-3.5 font-bold text-slate-800 dark:text-slate-100">
                                  {student.fullName}
                                </td>
                                <td className="p-3.5">
                                  <span className="px-2 py-0.5 rounded bg-blue-900/10 dark:bg-blue-900/30 text-blue-500 font-bold font-mono text-[10px]">
                                    {studentCourse ? studentCourse.code : student.courseId}
                                  </span>
                                </td>
                                <td className="p-3.5 text-center">
                                  <span className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${
                                    attPct >= 75 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                                  }`}>
                                    {attPct}%
                                  </span>
                                </td>
                                <td className="p-3.5 text-right">
                                  <div className="inline-flex rounded-lg bg-slate-500/10 p-1">
                                    <button
                                      type="button"
                                      onClick={() => setAttendanceStates(prev => ({ ...prev, [student.id]: 'present' }))}
                                      className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${
                                        currentStatus === 'present'
                                          ? 'bg-green-500 text-white shadow shadow-green-500/20'
                                          : 'text-gray-400 hover:text-slate-700 dark:hover:text-white'
                                      }`}
                                    >
                                      {lang === 'en' ? 'Present' : 'उपस्थित'}
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setAttendanceStates(prev => ({ ...prev, [student.id]: 'absent' }))}
                                      className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${
                                        currentStatus === 'absent'
                                          ? 'bg-red-500 text-white shadow shadow-red-500/20'
                                          : 'text-gray-400 hover:text-slate-700 dark:hover:text-white'
                                      }`}
                                    >
                                      {lang === 'en' ? 'Absent' : 'अनुपस्थित'}
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Attendance History Summary Board */}
                  <div className={`p-5 rounded-2xl border ${
                    darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <h4 className="font-display font-bold text-xs text-blue-900 dark:text-blue-400 mb-3 uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-orange-500" />
                      <span>{lang === 'en' ? 'Marked Sheets Logs' : 'दर्ज की गई दैनिक उपस्थिति इतिहास'}</span>
                    </h4>

                    {Object.keys(attendanceRecords).length === 0 ? (
                      <p className="text-xs text-gray-500 italic">No historical attendance records saved.</p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {(() => {
                          const summary: Record<string, { date: string; present: number; absent: number }> = {};
                          attendanceRecords.forEach(rec => {
                            if (!summary[rec.date]) {
                              summary[rec.date] = { date: rec.date, present: 0, absent: 0 };
                            }
                            if (rec.status === 'present') {
                              summary[rec.date].present++;
                            } else {
                              summary[rec.date].absent++;
                            }
                          });

                          return Object.values(summary)
                            .sort((a, b) => b.date.localeCompare(a.date))
                            .map(grp => (
                              <div 
                                key={grp.date} 
                                onClick={() => setAttendanceDate(grp.date)}
                                className={`p-3 rounded-xl border cursor-pointer hover:border-orange-500/40 transition-all text-xs text-left flex justify-between items-center ${
                                  attendanceDate === grp.date 
                                    ? 'border-orange-500 bg-orange-500/[0.02] shadow shadow-orange-500/5' 
                                    : 'border-gray-400/10 bg-white dark:bg-slate-950'
                                }`}
                              >
                                <div>
                                  <p className="font-mono font-bold text-slate-800 dark:text-slate-100">{grp.date}</p>
                                  <p className="text-[10px] text-gray-400 mt-0.5">
                                    {lang === 'en' ? 'Students Marked' : 'छात्र उपस्थिति पत्रक'}: {grp.present + grp.absent}
                                  </p>
                                </div>
                                <div className="text-right font-mono text-[10px] space-y-0.5">
                                  <span className="block text-green-500 font-bold">{grp.present} P</span>
                                  <span className="block text-red-500 font-bold">{grp.absent} A</span>
                                </div>
                              </div>
                            ));
                        })()}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* MODULE 2: NOTICES */}
              {activeTab === 'notices' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex justify-between items-center border-b border-gray-400/10 pb-3">
                    <h3 className="font-display font-extrabold text-sm text-blue-900 dark:text-blue-400">Official Bulletin Board Tickers</h3>
                    <button
                      onClick={() => setShowAddNoticeForm(!showAddNoticeForm)}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs py-1.5 px-3 rounded-lg flex items-center space-x-1 cursor-pointer border border-orange-400/10"
                      id="admin-trigger-add-notice"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Publish New Notice</span>
                    </button>
                  </div>

                  {showAddNoticeForm && (
                    <form onSubmit={handleAddNewNotice} className="p-4 rounded-xl bg-orange-500/[0.02] border border-orange-500/15 text-xs space-y-3.5 animate-slideDown">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="font-bold text-slate-500">Notice Heading in English *</label>
                          <input required type="text" className={`w-full p-2 border rounded-lg ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-black'}`} placeholder="Important exam date details..." value={noticeTitle} onChange={e => setNoticeTitle(e.target.value)} id="man-not-title" />
                        </div>
                        <div className="space-y-1">
                          <label className="font-bold text-slate-500">शीर्षक हिन्दी में *</label>
                          <input required type="text" className={`w-full p-2 border rounded-lg ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-black'}`} placeholder="परीक्षा तिथि घोषणा..." value={noticeTitleHi} onChange={e => setNoticeTitleHi(e.target.value)} id="man-not-title-hi" />
                        </div>
                        <div className="space-y-1 sm:col-span-2">
                          <label className="font-bold text-slate-500">Category Tag</label>
                          <select className={`w-full p-2 border rounded-lg ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-black'}`} value={noticeCat} onChange={e => setNoticeCat(e.target.value as any)} id="man-not-cat">
                            <option value="exam">Exam</option>
                            <option value="holiday">Holiday</option>
                            <option value="batch">New Batch</option>
                            <option value="scholarship">Scholarship</option>
                            <option value="job">Job Notification</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="font-bold text-slate-500">Detailed Message Description *</label>
                          <textarea required rows={2} className={`w-full p-2 border rounded-lg ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-black'}`} value={noticeDesc} onChange={e => setNoticeDesc(e.target.value)} id="man-not-desc" />
                        </div>
                        <div className="space-y-1">
                          <label className="font-bold text-slate-500">विस्तृत संदेश विवरण हिन्दी में *</label>
                          <textarea required rows={2} className={`w-full p-2 border rounded-lg ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-black'}`} value={noticeDescHi} onChange={e => setNoticeDescHi(e.target.value)} id="man-not-desc-hi" />
                        </div>
                      </div>
                      <div className="pt-1 flex gap-2">
                        <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-lg font-bold">Publish Notice</button>
                        <button type="button" onClick={() => setShowAddNoticeForm(false)} className="bg-slate-500/10 px-4 py-1.5 rounded-lg text-gray-400">Cancel</button>
                      </div>
                    </form>
                  )}

                  {/* Bulletins lists */}
                  <ul className="divide-y divide-gray-400/10 text-xs text-left">
                    {notices.map((notice) => (
                      <li key={notice.id} className="py-3 flex items-center justify-between gap-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-orange-500 uppercase font-mono text-[9px] bg-orange-500/10 px-1.5 py-0.2 rounded border border-orange-500/10">{notice.category}</span>
                            <span className="text-[10px] text-gray-400 font-mono">{notice.date}</span>
                          </div>
                          <p className="font-bold text-slate-800 dark:text-slate-200 select-all">{notice.title}</p>
                          <p className="text-[10px] text-gray-500 italic">हिन्दी: {notice.titleHindi}</p>
                        </div>
                        <button
                          onClick={() => onDeleteNotice(notice.id)}
                          className="p-1 pb-1 hover:bg-red-500/10 text-red-500 rounded"
                          id={`del-notice-${notice.id}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* MODULE 3: CERTIFICATES ISSUANCE */}
              {activeTab === 'certificates' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex justify-between items-center border-b border-gray-400/10 pb-3">
                    <h3 className="font-display font-extrabold text-sm text-blue-900 dark:text-blue-400">ISO Verified Credentials Engine</h3>
                    <button
                      onClick={() => setShowAddCertForm(!showAddCertForm)}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs py-1.5 px-3 rounded-lg flex items-center space-x-1 cursor-pointer border border-orange-400/10"
                      id="admin-trigger-add-cert"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Issue New Certificate</span>
                    </button>
                  </div>

                  {showAddCertForm && (
                    <form onSubmit={handleAddNewCertificate} className="p-4 rounded-xl bg-orange-500/[0.02] border border-orange-500/15 text-xs space-y-3.5 animate-slideDown">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="font-bold text-slate-500">Student full Name *</label>
                          <input required type="text" className={`w-full p-2 border rounded-lg ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-black'}`} placeholder="Preeti Kashyap" value={certStudentName} onChange={e => setCertStudentName(e.target.value)} id="man-cert-name" />
                        </div>
                        <div className="space-y-1">
                          <label className="font-bold text-slate-500">Student Enrollment ID *</label>
                          <input required type="text" className={`w-full p-2 border rounded-lg ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-black'}`} placeholder="ACL-2026-1002" value={certEnrollId} onChange={e => setCertEnrollId(e.target.value)} id="man-cert-enroll" />
                        </div>
                        <div className="space-y-1">
                          <label className="font-bold text-slate-500">Course Qualified Name *</label>
                          <input required type="text" className={`w-full p-2 border rounded-lg ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-black'}`} placeholder="Advanced Diploma in Computer Applications" value={certCourseName} onChange={e => setCertCourseName(e.target.value)} id="man-cert-course" />
                        </div>
                        <div className="space-y-1">
                          <label className="font-bold text-slate-500">Final Grade</label>
                          <select className={`w-full p-2 border rounded-lg ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-black'}`} value={certGrade} onChange={e => setCertGrade(e.target.value)} id="man-cert-grade">
                            <option value="S Grade (Outstanding)">S Grade (Outstanding)</option>
                            <option value="A Grade (Very Good)">A Grade (Very Good)</option>
                            <option value="B Grade (Good)">B Grade (Good)</option>
                            <option value="C Grade (Average)">C Grade (Average)</option>
                          </select>
                        </div>
                      </div>
                      <div className="pt-1 flex gap-2">
                        <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-lg font-bold">Emit Certificate</button>
                        <button type="button" onClick={() => setShowAddCertForm(false)} className="bg-slate-500/10 px-4 py-1.5 rounded-lg text-gray-400">Cancel</button>
                      </div>
                    </form>
                  )}

                  {/* Issued list */}
                  <ul className="divide-y divide-gray-400/10 text-xs text-left">
                    {certificates.map((cert) => (
                      <li key={cert.id} className="py-2.5 flex justify-between items-center gap-4">
                        <div className="space-y-0.5">
                          <p className="font-bold text-orange-400 font-mono uppercase text-[10px] select-all">{cert.certificateNo}</p>
                          <p className="text-slate-800 dark:text-slate-200 font-bold select-all">{cert.studentName} ({cert.studentId})</p>
                          <p className="text-gray-400 text-[10px] font-mono">{cert.courseName} • Issued: {cert.issueDate} • {cert.grade}</p>
                        </div>
                        <span className="bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-0.5 rounded font-mono text-[9px] uppercase font-bold">Verified</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* MODULE 4: COURSE FEES */}
              {activeTab === 'courses' && (
                <div className="space-y-6 animate-fadeIn">
                  <h3 className="font-display font-extrabold text-sm text-blue-900 dark:text-blue-400 border-b border-gray-400/10 pb-3 mb-4">
                    Course Catalog Pricing Parameters
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {courses.map((c) => (
                      <div key={c.id} className="p-3.5 border border-gray-400/10 rounded-xl space-y-1 text-xs hover:border-gray-500/20 transition-all select-all text-left">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-blue-900 dark:text-blue-400">{c.name}</span>
                          <span className="bg-sky-500/10 text-sky-400 font-mono text-[9px] font-bold px-1.5 rounded uppercase">{c.code}</span>
                        </div>
                        <p className="text-gray-400 text-[10px] italic">{c.duration} • Eligibility: {c.eligibility}</p>
                        <p className="font-bold text-orange-500 text-sm">₹{c.fees.toLocaleString('en-IN')}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MODULE 5: MANAGE STUDY MATERIALS (PDF NOTES & VIDEO LECTURES) */}
              {activeTab === 'materials' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-gray-400/10 pb-3 mb-4 flex justify-between items-center flex-wrap gap-4 text-left">
                    <div>
                      <h3 className="font-display font-extrabold text-sm text-blue-900 dark:text-blue-400">
                        Academic Study Materials
                      </h3>
                      <p className="text-xs text-gray-400 font-mono tracking-wide mt-1">Publish and manage digital PDF notes & interactive video lectures</p>
                    </div>
                    
                    {/* Sub Tab selection */}
                    <div className="flex bg-slate-900/40 p-1 rounded-xl border border-gray-400/10">
                      <button
                        onClick={() => setMaterialsSubTab('notes')}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          materialsSubTab === 'notes' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        PDF Notes ({notes.length})
                      </button>
                      <button
                        onClick={() => setMaterialsSubTab('videos')}
                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          materialsSubTab === 'videos' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        Video Lectures ({videos.length})
                      </button>
                    </div>
                  </div>

                  {materialsSubTab === 'notes' ? (
                    /* PDF NOTES MANAGEMENT SECTION */
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
                      {/* Left: Form */}
                      <div className="lg:col-span-5 space-y-4">
                        <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-950 border-slate-900' : 'bg-slate-50 border-slate-200'}`}>
                          <h4 className="font-bold text-xs uppercase tracking-wider text-orange-500 mb-4">
                            {editingNote ? 'Edit Study Note' : 'Add New Study Note'}
                          </h4>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              if (!noteTitle.trim() || !noteFileSize.trim() || !noteDownloadUrl.trim()) {
                                alert('Please fill in all notes fields.');
                                return;
                              }
                              if (editingNote) {
                                onUpdateNote({
                                  ...editingNote,
                                  title: noteTitle.trim(),
                                  courseId: noteCourseId,
                                  fileSize: noteFileSize.trim(),
                                  downloadUrl: noteDownloadUrl.trim()
                                });
                                setEditingNote(null);
                                alert('Study Note updated successfully!');
                              } else {
                                onAddNote({
                                  id: 'note_' + Date.now(),
                                  title: noteTitle.trim(),
                                  courseId: noteCourseId,
                                  fileSize: noteFileSize.trim(),
                                  downloadUrl: noteDownloadUrl.trim(),
                                  createdAt: new Date().toISOString()
                                });
                                alert('New Study Note published successfully!');
                              }
                              setNoteTitle('');
                              setNoteFileSize('');
                              setNoteDownloadUrl('');
                              setNoteCourseId('all');
                            }}
                            className="space-y-4"
                          >
                            <div>
                              <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1">
                                Note Title / Chapter (चैप्टर का नाम)
                              </label>
                              <input
                                type="text"
                                required
                                value={noteTitle}
                                onChange={(e) => setNoteTitle(e.target.value)}
                                placeholder="e.g. Chapter 1: Introduction to LibreOffice"
                                className={`w-full p-2.5 rounded-lg border text-xs focus:ring-1 focus:ring-orange-500 ${
                                  darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-gray-300 text-slate-900'
                                }`}
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1">
                                Course Target (पाठ्यक्रम का चयन)
                              </label>
                              <select
                                value={noteCourseId}
                                onChange={(e) => setNoteCourseId(e.target.value)}
                                className={`w-full p-2.5 rounded-lg border text-xs focus:ring-1 focus:ring-orange-500 ${
                                  darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-gray-300 text-slate-900'
                                }`}
                              >
                                <option value="all">All Courses (सभी पाठ्यक्रम)</option>
                                {courses.map(c => (
                                  <option key={c.id} value={c.id}>{c.name} ({c.code})</option>
                                ))}
                              </select>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1">
                                  File Size (साइज)
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={noteFileSize}
                                  onChange={(e) => setNoteFileSize(e.target.value)}
                                  placeholder="e.g. 2.4 MB"
                                  className={`w-full p-2.5 rounded-lg border text-xs focus:ring-1 focus:ring-orange-500 ${
                                    darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-gray-300 text-slate-900'
                                  }`}
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1">
                                  File / Download URL
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={noteDownloadUrl}
                                  onChange={(e) => setNoteDownloadUrl(e.target.value)}
                                  placeholder="e.g. Shortcuts_CCC.pdf"
                                  className={`w-full p-2.5 rounded-lg border text-xs focus:ring-1 focus:ring-orange-500 ${
                                    darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-gray-300 text-slate-900'
                                  }`}
                                />
                              </div>
                            </div>

                            <div className="pt-2 flex space-x-2">
                              <button
                                type="submit"
                                className="flex-1 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-lg transition-all cursor-pointer"
                              >
                                {editingNote ? 'Save Changes' : 'Publish Note'}
                              </button>
                              {editingNote && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingNote(null);
                                    setNoteTitle('');
                                    setNoteFileSize('');
                                    setNoteDownloadUrl('');
                                    setNoteCourseId('all');
                                  }}
                                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-lg transition-all cursor-pointer"
                                >
                                  Cancel
                                </button>
                              )}
                            </div>
                          </form>
                        </div>
                      </div>

                      {/* Right: Notes List */}
                      <div className="lg:col-span-7 space-y-3">
                        <h4 className="font-bold text-xs text-blue-950 dark:text-blue-300 uppercase tracking-widest mb-2 flex items-center space-x-1">
                          <FileText className="w-4 h-4 text-orange-500" />
                          <span>Published PDF Notes Repository</span>
                        </h4>
                        
                        <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                          {notes.length === 0 ? (
                            <div className="p-8 text-center text-gray-500 text-xs border border-dashed border-gray-800 rounded-2xl">
                              No study notes published. Fill the form to add notes.
                            </div>
                          ) : (
                            notes.map(n => {
                              const noteCourse = courses.find(c => c.id === n.courseId);
                              return (
                                <div key={n.id} className="p-3.5 bg-slate-900/20 border border-gray-400/10 rounded-xl flex justify-between items-center hover:bg-slate-900/40 transition-all">
                                  <div>
                                    <h5 className="font-bold text-xs text-slate-800 dark:text-slate-100">{n.title}</h5>
                                    <div className="flex items-center space-x-3 mt-1 text-[10px] text-gray-400">
                                      <span className="bg-orange-500/10 text-orange-400 font-mono px-1 py-0.5 rounded">
                                        {n.courseId === 'all' ? 'All Courses' : noteCourse?.code || n.courseId}
                                      </span>
                                      <span>Size: {n.fileSize}</span>
                                      <span className="truncate max-w-[150px]">Link: {n.downloadUrl}</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <button
                                      onClick={() => {
                                        setEditingNote(n);
                                        setNoteTitle(n.title);
                                        setNoteCourseId(n.courseId);
                                        setNoteFileSize(n.fileSize);
                                        setNoteDownloadUrl(n.downloadUrl);
                                      }}
                                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded transition-all cursor-pointer"
                                      title="Edit Note"
                                    >
                                      <Edit className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => {
                                        if (confirm(`Are you sure you want to delete note: "${n.title}"?`)) {
                                          onDeleteNote(n.id);
                                        }
                                      }}
                                      className="p-1.5 bg-red-950/20 hover:bg-red-900/40 text-red-400 hover:text-red-300 rounded transition-all cursor-pointer"
                                      title="Delete Note"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* VIDEO LECTURES MANAGEMENT SECTION */
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
                      {/* Left: Form */}
                      <div className="lg:col-span-5 space-y-4">
                        <div className={`p-5 rounded-2xl border ${darkMode ? 'bg-slate-950 border-slate-900' : 'bg-slate-50 border-slate-200'}`}>
                          <h4 className="font-bold text-xs uppercase tracking-wider text-orange-500 mb-4">
                            {editingVideo ? 'Edit Video Lecture' : 'Add New Video Lecture'}
                          </h4>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              if (!videoTitle.trim() || !videoDuration.trim() || !videoInstructor.trim() || !videoUrl.trim()) {
                                alert('Please fill in all video fields.');
                                return;
                              }
                              if (editingVideo) {
                                onUpdateVideo({
                                  ...editingVideo,
                                  title: videoTitle.trim(),
                                  courseId: videoCourseId,
                                  duration: videoDuration.trim(),
                                  instructor: videoInstructor.trim(),
                                  videoUrl: videoUrl.trim()
                                });
                                setEditingVideo(null);
                                  alert('Video Lecture updated successfully!');
                              } else {
                                onAddVideo({
                                  id: 'video_' + Date.now(),
                                  title: videoTitle.trim(),
                                  courseId: videoCourseId,
                                  duration: videoDuration.trim(),
                                  instructor: videoInstructor.trim(),
                                  videoUrl: videoUrl.trim(),
                                  createdAt: new Date().toISOString()
                                });
                                alert('New Video Lecture published successfully!');
                              }
                              setVideoTitle('');
                              setVideoDuration('');
                              setVideoInstructor('');
                              setVideoUrl('');
                              setVideoCourseId('all');
                            }}
                            className="space-y-4"
                          >
                            <div>
                              <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1">
                                Video Lecture Title (व्याख्यान का शीर्षक)
                              </label>
                              <input
                                type="text"
                                required
                                value={videoTitle}
                                onChange={(e) => setVideoTitle(e.target.value)}
                                placeholder="e.g. Lecture 1: Linux Terminal Command Lines"
                                className={`w-full p-2.5 rounded-lg border text-xs focus:ring-1 focus:ring-orange-500 ${
                                  darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-gray-300 text-slate-900'
                                }`}
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1">
                                Course Target (पाठ्यक्रम का चयन)
                              </label>
                              <select
                                value={videoCourseId}
                                onChange={(e) => setVideoCourseId(e.target.value)}
                                className={`w-full p-2.5 rounded-lg border text-xs focus:ring-1 focus:ring-orange-500 ${
                                  darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-gray-300 text-slate-900'
                                }`}
                              >
                                <option value="all">All Courses (सभी पाठ्यक्रम)</option>
                                {courses.map(c => (
                                  <option key={c.id} value={c.id}>{c.name} ({c.code})</option>
                                ))}
                              </select>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1">
                                  Duration (अवधि)
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={videoDuration}
                                  onChange={(e) => setVideoDuration(e.target.value)}
                                  placeholder="e.g. 15:40 Mins"
                                  className={`w-full p-2.5 rounded-lg border text-xs focus:ring-1 focus:ring-orange-500 ${
                                    darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-gray-300 text-slate-900'
                                  }`}
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1">
                                  Instructor (शिक्षक)
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={videoInstructor}
                                  onChange={(e) => setVideoInstructor(e.target.value)}
                                  placeholder="e.g. Er. Ramesh Chandra Shukla"
                                  className={`w-full p-2.5 rounded-lg border text-xs focus:ring-1 focus:ring-orange-500 ${
                                    darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-gray-300 text-slate-900'
                                  }`}
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-[10px] uppercase font-bold tracking-wider text-gray-400 mb-1">
                                Video URL (YouTube embed link or standard)
                              </label>
                              <input
                                type="text"
                                required
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                                placeholder="e.g. https://www.youtube.com/watch?v=..."
                                className={`w-full p-2.5 rounded-lg border text-xs focus:ring-1 focus:ring-orange-500 ${
                                  darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-gray-300 text-slate-900'
                                }`}
                              />
                            </div>

                            <div className="pt-2 flex space-x-2">
                              <button
                                type="submit"
                                className="flex-1 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-lg transition-all cursor-pointer"
                              >
                                {editingVideo ? 'Save Changes' : 'Publish Lecture'}
                              </button>
                              {editingVideo && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingVideo(null);
                                    setVideoTitle('');
                                    setVideoDuration('');
                                    setVideoInstructor('');
                                    setVideoUrl('');
                                    setVideoCourseId('all');
                                  }}
                                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-lg transition-all cursor-pointer"
                                >
                                  Cancel
                                </button>
                              )}
                            </div>
                          </form>
                        </div>
                      </div>

                      {/* Right: Videos List */}
                      <div className="lg:col-span-7 space-y-3">
                        <h4 className="font-bold text-xs text-blue-950 dark:text-blue-300 uppercase tracking-widest mb-2 flex items-center space-x-1">
                          <Video className="w-4 h-4 text-orange-500" />
                          <span>Published Video Lectures Library</span>
                        </h4>
                        
                        <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                          {videos.length === 0 ? (
                            <div className="p-8 text-center text-gray-500 text-xs border border-dashed border-gray-800 rounded-2xl">
                              No video lectures published. Fill the form to add lectures.
                            </div>
                          ) : (
                            videos.map(v => {
                              const videoCourse = courses.find(c => c.id === v.courseId);
                              return (
                                <div key={v.id} className="p-3.5 bg-slate-900/20 border border-gray-400/10 rounded-xl flex justify-between items-center hover:bg-slate-900/40 transition-all">
                                  <div className="truncate">
                                    <h5 className="font-bold text-xs text-slate-800 dark:text-slate-100">{v.title}</h5>
                                    <div className="flex items-center space-x-3 mt-1 text-[10px] text-gray-400 flex-wrap gap-y-1">
                                      <span className="bg-orange-500/10 text-orange-400 font-mono px-1 py-0.5 rounded">
                                        {v.courseId === 'all' ? 'All Courses' : videoCourse?.code || v.courseId}
                                      </span>
                                      <span>Duration: {v.duration}</span>
                                      <span>Instructor: {v.instructor}</span>
                                      <span className="truncate max-w-[200px] text-gray-500">URL: {v.videoUrl}</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-1 flex-shrink-0">
                                    <button
                                      onClick={() => {
                                        setEditingVideo(v);
                                        setVideoTitle(v.title);
                                        setVideoCourseId(v.courseId);
                                        setVideoDuration(v.duration);
                                        setVideoInstructor(v.instructor);
                                        setVideoUrl(v.videoUrl);
                                      }}
                                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded transition-all cursor-pointer"
                                      title="Edit Video"
                                    >
                                      <Edit className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => {
                                        if (confirm(`Are you sure you want to delete video: "${v.title}"?`)) {
                                          onDeleteVideo(v.id);
                                        }
                                      }}
                                      className="p-1.5 bg-red-950/20 hover:bg-red-900/40 text-red-400 hover:text-red-300 rounded transition-all cursor-pointer"
                                      title="Delete Video"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* MODULE 6: CONTACT ENQUIRIES (FEEDBACKS) */}
              {activeTab === 'feedbacks' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-gray-400/10 pb-3 mb-4 flex justify-between items-center flex-wrap gap-4 text-left">
                    <div>
                      <h3 className="font-display font-extrabold text-sm text-blue-950 dark:text-blue-300 uppercase tracking-widest">
                        Online Enquiries & Contact Submissions (ऑनलाइन पूछताछ)
                      </h3>
                      <p className="text-xs text-gray-400 font-mono tracking-wide mt-1">
                        View real-time messages submitted from the institute contact form
                      </p>
                    </div>
                    
                    <button
                      onClick={fetchFeedbacks}
                      disabled={loadingFeedbacks}
                      className="px-3.5 py-1.5 bg-orange-500 hover:bg-orange-600 font-bold font-sans text-xs text-white rounded-lg flex items-center space-x-1.5 transition-all cursor-pointer disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${loadingFeedbacks ? 'animate-spin' : ''}`} />
                      <span>{loadingFeedbacks ? 'Loading...' : 'Refresh Messages'}</span>
                    </button>
                  </div>

                  {/* Feedbacks list */}
                  <div className="space-y-4 text-left">
                    {loadingFeedbacks ? (
                      <div className="p-12 text-center text-gray-500 text-xs">
                        <RefreshCw className="w-6 h-6 animate-spin mx-auto text-orange-500 mb-2" />
                        <span>Fetching latest message submissions from Supabase database...</span>
                      </div>
                    ) : feedbacksList.length === 0 ? (
                      <div className="p-12 text-center border border-dashed border-gray-400/20 rounded-2xl space-y-2">
                        <Mail className="w-8 h-8 text-gray-500 mx-auto" />
                        <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100">No submissions found</h4>
                        <p className="text-[11px] text-gray-400 max-w-md mx-auto">
                          When a student or visitor fills out the contact form on your website, their name, mobile number, and message will appear here in real-time.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {feedbacksList.map(fb => (
                          <div 
                            key={fb.id} 
                            className={`p-5 rounded-2xl border transition-all hover:shadow-md flex flex-col justify-between ${
                              darkMode 
                                ? 'bg-slate-900/40 border-slate-900 hover:bg-slate-900/60' 
                                : 'bg-slate-50 border-slate-200 hover:bg-slate-100/50'
                            }`}
                          >
                            <div className="space-y-3">
                              {/* Header */}
                              <div className="flex justify-between items-start gap-2">
                                <div>
                                  <h4 className="font-extrabold text-xs text-blue-900 dark:text-blue-400 font-sans">
                                    {fb.name}
                                  </h4>
                                  <span className="text-[9px] font-mono font-semibold text-gray-400 bg-slate-500/10 px-1.5 py-0.5 rounded mt-1 inline-block">
                                    ID: {fb.id}
                                  </span>
                                </div>
                                <span className="text-[10px] text-gray-400 font-mono bg-slate-500/5 px-2 py-1 rounded">
                                  {fb.date}
                                </span>
                              </div>

                              {/* Message body */}
                              <div className={`p-3.5 rounded-xl text-xs leading-relaxed ${
                                darkMode ? 'bg-slate-950/60 text-slate-200' : 'bg-white text-slate-700 shadow-sm'
                              }`}>
                                <p className="whitespace-pre-wrap">{fb.message}</p>
                              </div>

                              {/* Metadata */}
                              <div className="flex items-center space-x-4 text-[10px] text-gray-400 pt-1">
                                <span className="flex items-center space-x-1 font-mono">
                                  <span className="font-bold text-orange-500">Mob:</span>
                                  <strong className="text-slate-800 dark:text-slate-200">{fb.mobile}</strong>
                                </span>
                                {fb.email && (
                                  <span className="flex items-center space-x-1">
                                    <span className="text-gray-500">Email:</span>
                                    <span className="text-slate-800 dark:text-slate-200">{fb.email}</span>
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Actions footer */}
                            <div className="mt-4 pt-3 border-t border-gray-400/10 flex justify-end">
                              <button
                                onClick={() => handleDeleteFeedback(fb.id)}
                                className="px-2.5 py-1 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white transition-all duration-150 rounded-md text-[10px] font-bold flex items-center space-x-1 cursor-pointer"
                                title="Delete submission"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete Submission</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
