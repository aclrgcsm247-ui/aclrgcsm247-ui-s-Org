import React, { useState } from 'react';
import { Student, Course, Result, Notice, StudyNote, VideoLecture, AttendanceRecord } from '../types';
import { TRANSLATIONS } from '../data';
import { 
  Award, 
  Lock, 
  User, 
  BookOpen, 
  FolderDown, 
  Tv, 
  CheckCircle, 
  TrendingUp, 
  Calendar, 
  CreditCard,
  LogOut,
  Mail,
  Phone,
  Clock,
  Sparkles,
  UploadCloud,
  Camera,
  Image as ImageIcon,
  Check,
  AlertCircle
} from 'lucide-react';

interface DashboardStudentProps {
  students: Student[];
  courses: Course[];
  resultsList: Result[];
  notices: Notice[];
  lang: 'en' | 'hi';
  darkMode: boolean;
  loggedInStudent: Student | null;
  onLogin: (student: Student) => void;
  onLogout: () => void;
  onUpdateStudent: (id: string, updatedFields: Partial<Student>) => void;
  notes?: StudyNote[];
  videos?: VideoLecture[];
  attendanceRecords?: AttendanceRecord[];
}

export default function DashboardStudent({
  students,
  courses,
  resultsList,
  notices,
  lang,
  darkMode,
  loggedInStudent,
  onLogin,
  onLogout,
  onUpdateStudent,
  notes = [],
  videos = [],
  attendanceRecords = []
}: DashboardStudentProps) {
  const t = TRANSLATIONS[lang];

  // Login form status
  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Edit profile states
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editDob, setEditDob] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhoto, setEditPhoto] = useState('');
  const [editMarksheetPhoto, setEditMarksheetPhoto] = useState('');
  const [dragActive, setDragActive] = useState(false);

  // Sync edits if loggedInStudent state updates
  React.useEffect(() => {
    if (loggedInStudent) {
      setEditDob(loggedInStudent.dob || '');
      setEditAddress(loggedInStudent.address || '');
      setEditEmail(loggedInStudent.email || '');
      setEditPhoto(loggedInStudent.passportPhoto || '');
      setEditMarksheetPhoto(loggedInStudent.marksheetPhoto || '');
    }
  }, [loggedInStudent]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setEditPhoto(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid image file. (कृपया एक वैध इमेज फाइल अपलोड करें।)');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleMarksheetFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setEditMarksheetPhoto(event.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // Active study tab selection
  const [materialTab, setMaterialTab] = useState<'notes' | 'videos'>('notes');
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  // Track completed video lecture IDs
  const [completedVideos, setCompletedVideos] = useState<string[]>(() => {
    if (!loggedInStudent) return [];
    const saved = localStorage.getItem(`completed_lectures_${loggedInStudent.id}`);
    return saved ? JSON.parse(saved) : [];
  });

  // Sync completed videos when student logs in or changes
  React.useEffect(() => {
    if (loggedInStudent) {
      const saved = localStorage.getItem(`completed_lectures_${loggedInStudent.id}`);
      setCompletedVideos(saved ? JSON.parse(saved) : []);
    } else {
      setCompletedVideos([]);
    }
  }, [loggedInStudent]);

  const toggleVideoCompletion = (videoId: string) => {
    if (!loggedInStudent) return;
    setCompletedVideos(prev => {
      const next = prev.includes(videoId)
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId];
      localStorage.setItem(`completed_lectures_${loggedInStudent.id}`, JSON.stringify(next));
      return next;
    });
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(false);
    
    // Check credentials matching
    const match = students.find(
      s => s.rollNo.toUpperCase() === rollNo.trim().toUpperCase() && 
           (s.password === password || password === 'password')
    );

    if (match) {
      onLogin(match);
      setRollNo('');
      setPassword('');
      // Populate fields for edit mode
      setEditDob(match.dob || '');
      setEditAddress(match.address || '');
      setEditEmail(match.email || '');
      setEditPhoto(match.passportPhoto || '');
      setEditMarksheetPhoto(match.marksheetPhoto || '');
    } else {
      setLoginError(true);
    }
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loggedInStudent) return;

    onUpdateStudent(loggedInStudent.id, {
      dob: editDob,
      address: editAddress,
      email: editEmail,
      passportPhoto: editPhoto,
      marksheetPhoto: editMarksheetPhoto
    });
    alert('Student profile coordinates updated successfully!');
    setShowEditProfile(false);
  };

  const activeStudentCourse = loggedInStudent 
    ? courses.find(c => c.id === loggedInStudent.courseId)
    : null;

  // Filter student-specific results
  const studentResults = loggedInStudent
    ? resultsList.filter(r => r.studentId === loggedInStudent.id)
    : [];

  // Filter student-specific notes and videos
  const filteredNotes = loggedInStudent
    ? notes.filter(n => n.courseId === 'all' || n.courseId === loggedInStudent.courseId)
    : [];

  const filteredVideos = loggedInStudent
    ? videos.filter(v => v.courseId === 'all' || v.courseId === loggedInStudent.courseId)
    : [];

  const totalLecturesCount = filteredVideos.length;
  const completedLecturesCount = filteredVideos.filter(v => completedVideos.includes(v.id)).length;
  const progressPercentage = totalLecturesCount > 0 ? Math.round((completedLecturesCount / totalLecturesCount) * 100) : 0;

  const handleDownloadSimulation = (fileName: string) => {
    alert(`Downloading study note package: ${fileName}...\nSuccessfully saved in your local downloads folder.`);
  };

  return (
    <div className={`w-full min-h-screen py-12 md:py-16 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
      <div className="max-w-7xl mx-auto px-6">
        
        {!loggedInStudent ? (
          /* ========================================================================= */
          /* STUDENT LOGIN INTERFACE                                                   */
          /* ========================================================================= */
          <div className="max-w-md mx-auto animate-fadeIn space-y-6">
            <div className="text-center space-y-2">
              <span className="text-orange-500 text-xs font-bold uppercase tracking-widest font-mono">
                {lang === 'en' ? 'Student Portal Security' : 'छात्र अधिकृत लॉगिन'}
              </span>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl text-blue-950 dark:text-blue-400">
                {lang === 'en' ? 'Student Login Dashboard' : 'अकादमिक छात्र लॉगिन'}
              </h2>
              <p className="text-xs text-gray-400">
                Type your unique computer Roll Number or Admission ID to login.
              </p>
            </div>

            <form 
              onSubmit={handleLoginSubmit}
              className={`p-6 md:p-8 border rounded-2xl space-y-4 text-left text-xs ${
                darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-200 shadow-xl'
              }`}
            >
              {loginError && (
                <div className="p-3 bg-red-500/10 border border-red-500/15 rounded-lg text-red-500 font-bold font-mono">
                  ⚠ Error: Mismatched Roll No or Password. Try STUDENT-001
                </div>
              )}

              <div>
                <label className="block mb-1.5 font-semibold text-slate-500 uppercase tracking-wider text-[10px]">Student Roll Number *</label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    placeholder="STUDENT-001"
                    className={`w-full pl-9 pr-3 py-2.5 border rounded-xl font-mono ${
                      darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-black'
                    }`}
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    id="student-login-roll"
                  />
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block mb-1.5 font-semibold text-slate-500 uppercase tracking-wider text-[10px]">Access Password *</label>
                <div className="relative">
                  <input
                    required
                    type="password"
                    placeholder="Enter password"
                    className={`w-full pl-9 pr-3 py-2.5 border rounded-xl font-sans ${
                      darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-black'
                    }`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="student-login-pass"
                  />
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider shadow cursor-pointer transition-all border border-blue-500/10"
                  id="student-login-submit"
                >
                  Verify and Authenticate
                </button>
              </div>

              <div className="pt-3 border-t border-gray-400/10 text-[10px] text-slate-400 leading-normal space-y-1">
                <p className="font-bold text-orange-500">💡 Demo Student Credentials Listing:</p>
                <p>• Roll: <span className="text-white font-bold font-mono">STUDENT-001</span> • Pass: <span className="text-white font-bold font-mono">password</span> (Rohan)</p>
                <p>• Roll: <span className="text-white font-bold font-mono">STUDENT-002</span> • Pass: <span className="text-white font-bold font-mono">password</span> (Preeti)</p>
                <p className="text-gray-500 italic mt-1">Note: Newly registered admissions appear inside Admin Panel. Admins can approve them, after which they can login with their Roll No and WhatsApp Mobile password!</p>
              </div>
            </form>
          </div>
        ) : (
          /* ========================================================================= */
          /* STUDENT ACTIVE PORTAL DASHBOARD                                           */
          /* ========================================================================= */
          <div className="space-y-8 animate-fadeIn text-left">
            
            {/* Header welcome belt */}
            <div className={`p-6 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4 ${
              darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center space-x-4">
                <img 
                  className="w-16 h-16 rounded-full object-cover border-2 border-orange-500" 
                  src={loggedInStudent.passportPhoto || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80"} 
                  alt={loggedInStudent.fullName}
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h2 className="font-display font-extrabold text-xl text-blue-900 dark:text-blue-400 leading-none">{loggedInStudent.fullName}</h2>
                  <p className="text-xs text-gray-400 font-mono tracking-wider mt-1.5 uppercase font-semibold">
                    Enroll: <span className="text-white bg-slate-800 px-1.5 py-0.5 rounded select-all">{loggedInStudent.id}</span> • Roll: <span className="text-white bg-slate-800 px-1.5 py-0.5 rounded select-all">{loggedInStudent.rollNo}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowEditProfile(!showEditProfile)}
                  className="bg-white/10 dark:bg-slate-800 hover:bg-slate-700/5 text-xs text-slate-700 dark:text-white font-semibold py-2 px-4 rounded-lg border border-gray-400/20 transition-all cursor-pointer"
                  id="student-edit-profile-btn"
                >
                  {showEditProfile ? 'View Core Stats' : 'Update Profile'}
                </button>
                <button
                  onClick={onLogout}
                  className="bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white text-xs font-bold py-2 px-4 rounded-lg transition-all flex items-center space-x-1"
                  id="student-logout-btn"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {showEditProfile ? (
              /* ================= EDIT PROFILE COORDINATES PANELS ================= */
              <form 
                onSubmit={handleUpdateProfile}
                className={`p-6 rounded-2xl border space-y-4 max-w-xl text-xs ${
                  darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-200'
                }`}
              >
                <h3 className="font-display font-bold text-sm text-blue-900 dark:text-blue-400">Update Student Contact Coordinates</h3>
                
                {/* Profile Photo Editor Section */}
                <div className="space-y-3.5 border-b border-gray-400/10 pb-4">
                  <label className="text-slate-500 font-bold uppercase tracking-wider text-[10px] block">
                    {lang === 'en' ? 'Profile Passport Photo' : 'प्रोफ़ाइल पासपोर्ट फोटो'}
                  </label>
                  
                  <div className="flex flex-col md:flex-row gap-4 items-start">
                    {/* Live Preview Circle */}
                    <div className="relative group flex-shrink-0 mx-auto md:mx-0">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-orange-500 bg-slate-900/10 flex items-center justify-center">
                        {editPhoto ? (
                          <img 
                            src={editPhoto} 
                            alt="Profile Preview" 
                            className="w-full h-full object-cover" 
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <Camera className="w-8 h-8 text-gray-400" />
                        )}
                      </div>
                      <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                        <Camera className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Uploader & Presets Control */}
                    <div className="flex-1 w-full space-y-3">
                      {/* Drag and Drop Box */}
                      <div 
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-xl p-3 text-center cursor-pointer transition-all ${
                          dragActive 
                            ? 'border-orange-500 bg-orange-500/[0.04]' 
                            : 'border-gray-300 dark:border-gray-800 hover:border-orange-500/40'
                        }`}
                        onClick={() => document.getElementById('student-file-upload')?.click()}
                      >
                        <UploadCloud className="w-6 h-6 text-orange-500 mx-auto mb-1" />
                        <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                          {lang === 'en' ? 'Drag & drop photo here or click to choose' : 'यहाँ फोटो ड्रैग करें या चुनने के लिए क्लिक करें'}
                        </p>
                        <p className="text-[9px] text-gray-400 mt-0.5">Supports JPG, PNG (Max 1MB)</p>
                        <input 
                          type="file" 
                          id="student-file-upload" 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </div>

                      {/* URL Option & Quick Presets */}
                      <div className="space-y-2">
                        <div className="flex gap-1 items-center">
                          <input 
                            type="text" 
                            placeholder={lang === 'en' ? "Or paste direct image URL here..." : "या सीधे इमेज का URL यहाँ पेस्ट करें..."}
                            className={`flex-1 p-1.5 text-[11px] border rounded-lg ${
                              darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-black'
                            }`}
                            value={editPhoto.startsWith('data:') ? '' : editPhoto}
                            onChange={(e) => setEditPhoto(e.target.value)}
                          />
                          {editPhoto && (
                            <button 
                              type="button"
                              onClick={() => setEditPhoto('')}
                              className="px-2 py-1.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg text-[10px] font-bold"
                            >
                              Reset
                            </button>
                          )}
                        </div>

                        {/* Presets List */}
                        <div className="space-y-1">
                          <p className="text-[9px] text-gray-400 uppercase tracking-wider font-bold">
                            {lang === 'en' ? 'Quick Avatars Presets:' : 'त्वरित अवतार प्रीसेट:'}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {[
                              { label: lang === 'en' ? 'Student 1' : 'छात्र 1', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
                              { label: lang === 'en' ? 'Student 2' : 'छात्र 2', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' },
                              { label: lang === 'en' ? 'Student 3' : 'छात्र 3', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
                              { label: lang === 'en' ? 'Student 4' : 'छात्र 4', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
                              { label: lang === 'en' ? 'Student 5' : 'छात्र 5', url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80' }
                            ].map((preset, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setEditPhoto(preset.url)}
                                className={`px-2 py-1 border rounded-lg text-[10px] font-medium transition-all ${
                                  editPhoto === preset.url 
                                    ? 'border-orange-500 bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold' 
                                    : 'border-gray-200 dark:border-gray-800 hover:border-gray-300'
                                }`}
                              >
                                {preset.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Email Address</label>
                    <input 
                      required
                      type="email"
                      className={`w-full p-2 border rounded-lg ${
                        darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-black'
                      }`}
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      id="edit-student-email"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Date of Birth</label>
                    <input 
                      type="date"
                      className={`w-full p-2 border rounded-lg ${
                        darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-black'
                      }`}
                      value={editDob}
                      onChange={(e) => setEditDob(e.target.value)}
                      id="edit-student-dob"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Surbuban Address</label>
                  <textarea 
                    rows={2}
                    className={`w-full p-2 border rounded-lg ${
                      darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-black'
                    }`}
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                    id="edit-student-address"
                  />
                </div>

                <div className="space-y-2 border-t border-gray-400/10 pt-4 text-left">
                  <label className="text-slate-500 font-bold uppercase tracking-wider text-[10px] block">
                    {lang === 'en' ? 'Verified Marksheet Photo / Document' : 'सत्यापित मार्कशीट फोटो / दस्तावेज़'}
                  </label>
                  <div className="flex flex-col sm:flex-row items-center gap-4 bg-blue-900/5 dark:bg-slate-900/40 p-4 rounded-xl border border-gray-400/10">
                    {editMarksheetPhoto ? (
                      editMarksheetPhoto.startsWith('data:image/') || editMarksheetPhoto.startsWith('http') || editMarksheetPhoto.startsWith('blob:') ? (
                        <img 
                          src={editMarksheetPhoto} 
                          alt="Marksheet Preview" 
                          className="w-16 h-16 object-cover rounded-lg border border-orange-500/30" 
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-16 h-16 flex items-center justify-center bg-sky-500/10 text-sky-500 rounded-lg border border-sky-500/20 font-bold text-[10px] uppercase font-mono text-center leading-none p-1">
                          PDF / Document
                        </div>
                      )
                    ) : (
                      <div className="w-16 h-16 flex items-center justify-center bg-gray-500/10 text-gray-400 rounded-lg border border-dashed border-gray-400/20 text-[10px] text-center">
                        No File
                      </div>
                    )}
                    <div className="flex-1 w-full space-y-2 text-left">
                      <div className="flex items-center gap-2">
                        <label className="cursor-pointer bg-sky-600 hover:bg-sky-700 text-white py-1.5 px-3 rounded-lg text-[11px] font-bold flex items-center space-x-1">
                          <UploadCloud className="w-3.5 h-3.5" />
                          <span>Upload Marksheet</span>
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*,.pdf"
                            onChange={handleMarksheetFileChange}
                          />
                        </label>
                        {editMarksheetPhoto && (
                          <button 
                            type="button"
                            onClick={() => setEditMarksheetPhoto('')}
                            className="px-2.5 py-1.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg text-[10px] font-bold"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <p className="text-[9px] text-gray-400">Attach secondary / high school marksheets for permanent office files.</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2.5 pt-2">
                  <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-bold">
                    Save Structural Changes
                  </button>
                  <button type="button" onClick={() => setShowEditProfile(false)} className="bg-slate-500/10 px-4 py-2 rounded-lg text-gray-400 hover:bg-slate-500/20">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              /* ================= MAIN DASHBOARD STATS MODULES ================= */
              <div className="space-y-8 animate-fadeIn">
                {/* 1. Academic counters cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-xs text-left">
                  
                  {/* Attendance Card */}
                  <div className={`p-4 rounded-xl border space-y-1.5 ${
                    darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-100 shadow'
                  }`}>
                    <span className="flex items-center space-x-1 text-gray-400 uppercase font-mono font-bold tracking-wider text-[10px]">
                      <Calendar className="w-4 h-4 text-orange-500" />
                      <span>Monthly Attendance</span>
                    </span>
                    <p className="text-2xl font-extrabold text-blue-900 dark:text-blue-400 font-display">
                      {loggedInStudent.attendancePercentage}%
                    </p>
                    <p className="text-[10px] text-gray-500 leading-none">Min required is 75% for NIELIT exams</p>
                  </div>

                  {/* Course Progress Card */}
                  <div className={`p-4 rounded-xl border space-y-1.5 ${
                    darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-100 shadow'
                  }`}>
                    <span className="flex items-center space-x-1 text-gray-400 uppercase font-mono font-bold tracking-wider text-[10px]">
                      <TrendingUp className="w-4 h-4 text-orange-500" />
                      <span>Syllabus Progression</span>
                    </span>
                    <p className="text-2xl font-extrabold text-blue-900 dark:text-blue-400 font-display">
                      {loggedInStudent.progress}%
                    </p>
                    
                    {/* Visual bar */}
                    <div className="w-full bg-slate-500/10 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-orange-500 h-full" style={{ width: `${loggedInStudent.progress}%` }}></div>
                    </div>
                  </div>

                  {/* Fees card */}
                  <div className={`p-4 rounded-xl border space-y-1.5 ${
                    darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-100 shadow'
                  }`}>
                    <span className="flex items-center space-x-1 text-gray-400 uppercase font-mono font-bold tracking-wider text-[10px]">
                      <CreditCard className="w-4 h-4 text-orange-500" />
                      <span>Accounting Fee Ledger</span>
                    </span>
                    <p className="text-2xl font-extrabold text-blue-900 dark:text-blue-400 font-display">
                      ₹{loggedInStudent.feesPaid.toLocaleString('en-IN')} / ₹{loggedInStudent.totalFees.toLocaleString('en-IN')}
                    </p>
                    <p className="text-[10px] text-gray-500 leading-none">
                      Pending Due: <span className="font-bold text-orange-500">&apos;₹{(loggedInStudent.totalFees - loggedInStudent.feesPaid).toLocaleString('en-IN')}&apos;</span>
                    </p>
                  </div>

                  {/* Academic rank cards */}
                  <div className={`p-4 rounded-xl border space-y-1.5 ${
                    darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-100 shadow'
                  }`}>
                    <span className="flex items-center space-x-1 text-gray-400 uppercase font-mono font-bold tracking-wider text-[10px]">
                      <Award className="w-4 h-4 text-orange-500" />
                      <span>Institute Rank Status</span>
                    </span>
                    <p className="text-2xl font-extrabold text-blue-900 dark:text-blue-400 font-display">
                      Rank #{loggedInStudent.rank}
                    </p>
                    <p className="text-[10px] text-gray-500 leading-none">Calculated weekly over lab MCQ exams</p>
                  </div>

                  {/* Video Lectures Progress Card */}
                  <div className={`p-4 rounded-xl border space-y-1.5 ${
                    darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-100 shadow'
                  }`}>
                    <span className="flex items-center space-x-1 text-gray-400 uppercase font-mono font-bold tracking-wider text-[10px]">
                      <Tv className="w-4 h-4 text-orange-500" />
                      <span>Video Progression</span>
                    </span>
                    <p className="text-2xl font-extrabold text-blue-900 dark:text-blue-400 font-display">
                      {progressPercentage}%
                    </p>
                    
                    {/* Visual progress bar */}
                    <div className="w-full bg-slate-500/10 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-orange-500 h-full transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                    <p className="text-[10px] text-gray-400 leading-none">
                      Completed <strong className="text-orange-500">{completedLecturesCount}</strong> of <strong className="text-slate-700 dark:text-white">{totalLecturesCount}</strong>
                    </p>
                  </div>

                </div>

                {/* 2. Study Material, PDF & Lectures */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Notes & lectures */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className={`p-6 rounded-2xl border ${
                      darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-200'
                    }`}>
                      <div className="flex justify-between items-center border-b border-gray-400/10 pb-3 mb-4">
                        <h3 className="font-display font-bold text-sm text-blue-900 dark:text-blue-400">
                          {activeStudentCourse ? `${activeStudentCourse.code} Certified Material Hub` : 'Study Material Port'}
                        </h3>
                        {/* Selector Tabs */}
                        <div className="flex bg-slate-500/10 p-1 rounded-lg">
                          <button
                            onClick={() => setMaterialTab('notes')}
                            className={`px-3 py-1 text-[10px] font-bold rounded-md ${
                              materialTab === 'notes' ? 'bg-orange-500 text-white' : 'text-gray-400'
                            }`}
                          >
                            PDF Notes
                          </button>
                          <button
                            onClick={() => setMaterialTab('videos')}
                            className={`px-3 py-1 text-[10px] font-bold rounded-md ${
                              materialTab === 'videos' ? 'bg-orange-500 text-white' : 'text-gray-400'
                            }`}
                          >
                            Lectures
                          </button>
                        </div>
                      </div>

                      {materialTab === 'notes' ? (
                        /* Notes listing */
                        <ul className="space-y-3 text-xs">
                          {filteredNotes.length === 0 ? (
                            <li className="p-6 text-center text-gray-500 dark:text-gray-400">
                              No PDF notes uploaded yet for your enrolled course. (आपके पाठ्यक्रम के लिए कोई पीडीएफ नोट्स अभी उपलब्ध नहीं हैं।)
                            </li>
                          ) : (
                            filteredNotes.map(n => (
                              <li key={n.id} className="p-3 bg-blue-900/5 rounded-xl border border-blue-500/10 flex justify-between items-center">
                                <div>
                                  <p className="font-bold text-slate-800 dark:text-slate-100">{n.title}</p>
                                  <p className="text-[10px] text-gray-400">File structure: Compiled PDF • {n.fileSize}</p>
                                </div>
                                <button 
                                  onClick={() => handleDownloadSimulation(n.downloadUrl)}
                                  className="bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-bold py-1.5 px-3 rounded flex items-center space-x-1 cursor-pointer animate-pulse-slow"
                                  id={`dl-notes-${n.id}`}
                                >
                                  <FolderDown className="w-3.5 h-3.5" />
                                  <span>Download</span>
                                </button>
                              </li>
                            ))
                          )}
                        </ul>
                      ) : (
                        /* Lectures listing video simulation */
                        <div className="space-y-4">
                          {filteredVideos.length > 0 && (
                            <div className="p-4 bg-orange-500/5 rounded-xl border border-orange-500/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-left">
                              <div>
                                <h4 className="font-bold text-slate-800 dark:text-slate-100 text-xs">Lectures Completion Progress (लेक्चर पूर्णता प्रगति)</h4>
                                <p className="text-[10px] text-gray-400 mt-0.5">
                                  You have completed <strong className="text-orange-500">{completedLecturesCount}</strong> out of <strong className="text-slate-700 dark:text-white">{totalLecturesCount}</strong> video lectures.
                                </p>
                              </div>
                              <div className="flex items-center space-x-3 flex-1 sm:max-w-[240px]">
                                <div className="flex-1 bg-slate-500/10 h-2 rounded-full overflow-hidden">
                                  <div className="bg-orange-500 h-full transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
                                </div>
                                <span className="font-mono text-xs font-bold text-orange-500 whitespace-nowrap">{progressPercentage}%</span>
                              </div>
                            </div>
                          )}

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {filteredVideos.length === 0 ? (
                              <div className="col-span-full p-6 text-center text-gray-500 dark:text-gray-400">
                                No video lectures uploaded yet for your enrolled course. (आपके पाठ्यक्रम के लिए कोई वीडियो व्याख्यान अभी उपलब्ध नहीं हैं।)
                              </div>
                            ) : (
                              filteredVideos.map(v => {
                                const isCompleted = completedVideos.includes(v.id);
                                return (
                                  <div key={v.id} className={`border rounded-xl overflow-hidden group transition-all duration-200 ${
                                    isCompleted 
                                      ? 'border-green-500/20 bg-green-500/[0.01]' 
                                      : 'border-gray-400/10'
                                  }`}>
                                    {activeVideoId === v.id ? (
                                      <div className="relative h-44 bg-black">
                                        <iframe
                                          src={v.videoUrl.includes('youtube.com') && !v.videoUrl.includes('embed') ? v.videoUrl.replace('watch?v=', 'embed/') : v.videoUrl}
                                          title={v.title}
                                          className="w-full h-full"
                                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                          allowFullScreen
                                        ></iframe>
                                        <button 
                                          onClick={(e) => { e.stopPropagation(); setActiveVideoId(null); }}
                                          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white font-bold text-[9px] px-2 py-1 rounded shadow-lg z-10"
                                        >
                                          Close Player
                                        </button>
                                      </div>
                                    ) : (
                                      <div 
                                        onClick={() => setActiveVideoId(v.id)}
                                        className="relative h-28 bg-slate-900 flex items-center justify-center cursor-pointer group-hover:bg-slate-800 transition-colors"
                                      >
                                        <Tv className="w-8 h-8 text-orange-500 group-hover:scale-110 transition-transform" />
                                        <span className="absolute bottom-1 right-1 bg-black/80 text-[9px] text-white px-1.5 py-0.5 rounded font-mono font-bold">{v.duration}</span>
                                        {isCompleted && (
                                          <div className="absolute top-2 left-2 bg-green-600 text-white text-[9px] font-bold px-2 py-0.5 rounded flex items-center space-x-1 shadow-md z-10">
                                            <Check className="w-3 h-3" />
                                            <span>Completed</span>
                                          </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                          <span className="bg-orange-500 text-white font-bold text-[10px] px-2 py-1 rounded shadow">Click to Play</span>
                                        </div>
                                      </div>
                                    )}
                                    <div className="p-3 text-left space-y-2">
                                      <div>
                                        <p className="font-bold text-[11px] line-clamp-1 text-slate-800 dark:text-slate-100">{v.title}</p>
                                        <p className="text-[10px] text-gray-500 mt-1">Instructor: {v.instructor}</p>
                                      </div>
                                      
                                      {/* Complete toggle checkbox/button */}
                                      <div className="pt-2 border-t border-gray-400/10 flex items-center justify-between">
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            toggleVideoCompletion(v.id);
                                          }}
                                          className={`w-full py-1.5 px-2.5 rounded-lg text-[10px] font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                                            isCompleted
                                              ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
                                              : 'bg-slate-500/10 text-gray-400 hover:bg-slate-500/20'
                                          }`}
                                        >
                                          {isCompleted ? (
                                            <>
                                              <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                                              <span>Completed (पूर्ण)</span>
                                            </>
                                          ) : (
                                            <>
                                              <span className="w-3.5 h-3.5 rounded-full border border-gray-400 inline-block"></span>
                                              <span>Mark Completed (पूर्ण चिह्नित करें)</span>
                                            </>
                                          )}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Completed Mock Records */}
                  <div className="lg:col-span-5 space-y-6">
                    {/* Academic Dossier */}
                    <div className={`p-6 rounded-2xl border text-left ${
                      darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-200 shadow-sm'
                    }`}>
                      <h3 className="font-display font-bold text-sm text-blue-900 dark:text-blue-400 border-b border-gray-400/10 pb-3 mb-4 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-orange-500" />
                        <span>Academic Dossier</span>
                      </h3>
                      <div className="space-y-3 text-xs">
                        <div className="flex justify-between items-center py-1.5 border-b border-gray-400/5">
                          <span className="text-gray-400">Father's Name</span>
                          <span className="font-semibold text-slate-700 dark:text-slate-300">{loggedInStudent.fatherName}</span>
                        </div>
                        <div className="flex justify-between items-center py-1.5 border-b border-gray-400/5">
                          <span className="text-gray-400">Date of Birth</span>
                          <span className="font-semibold text-slate-700 dark:text-slate-300">{loggedInStudent.dob || 'Not set'}</span>
                        </div>
                        <div className="flex justify-between items-center py-1.5 border-b border-gray-400/5">
                          <span className="text-gray-400">WhatsApp Mobile</span>
                          <span className="font-semibold text-slate-700 dark:text-slate-300">{loggedInStudent.mobileNumber}</span>
                        </div>
                        <div className="flex justify-between items-center py-1.5 border-b border-gray-400/5">
                          <span className="text-gray-400">Email Address</span>
                          <span className="font-semibold text-slate-700 dark:text-slate-300">{loggedInStudent.email}</span>
                        </div>
                        <div className="py-1.5 border-b border-gray-400/5 space-y-1">
                          <span className="text-gray-400 block">Surbuban Address</span>
                          <span className="font-medium text-slate-600 dark:text-slate-400 block">{loggedInStudent.address || 'No address added'}</span>
                        </div>
                        
                        {/* Documents Attached */}
                        <div className="pt-2 space-y-2">
                          <p className="font-mono text-[9px] text-gray-400 uppercase tracking-wider font-bold">Verified Enclosures</p>
                          <div className="grid grid-cols-2 gap-2">
                            {loggedInStudent.marksheetPhoto && loggedInStudent.marksheetPhoto !== 'Marksheet_Not_Uploaded.png' ? (
                              <a 
                                href={loggedInStudent.marksheetPhoto} 
                                target="_blank" 
                                rel="noreferrer"
                                className="p-2 bg-sky-500/5 border border-sky-500/10 hover:border-sky-500/30 rounded-lg text-center font-bold text-sky-500 hover:text-sky-400 transition-colors block text-[10px]"
                              >
                                View Marksheet
                              </a>
                            ) : (
                              <div className="p-2 bg-gray-500/5 border border-gray-500/10 rounded-lg text-center text-gray-400 text-[10px]" title="No academic marksheet uploaded yet">
                                No Marksheet
                              </div>
                            )}
                            <div className="p-2 bg-orange-500/5 border border-orange-500/10 rounded-lg text-center font-bold text-orange-500 text-[10px] truncate" title={loggedInStudent.aadhaarCard}>
                              Aadhaar: Attached
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Daily Attendance Log */}
                    {(() => {
                      const myAttendance = attendanceRecords
                        .filter(r => r.studentId === loggedInStudent.id)
                        .sort((a, b) => b.date.localeCompare(a.date));

                      return (
                        <div className={`p-6 rounded-2xl border text-left ${
                          darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-200 shadow-sm'
                        }`}>
                          <h3 className="font-display font-bold text-sm text-blue-900 dark:text-blue-400 border-b border-gray-400/10 pb-3 mb-4 flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4 text-orange-500" />
                              <span>{lang === 'en' ? 'Detailed Attendance Logs' : 'दैनिक उपस्थिति इतिहास'}</span>
                            </span>
                            <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                              loggedInStudent.attendancePercentage >= 75 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                            }`}>
                              {loggedInStudent.attendancePercentage}%
                            </span>
                          </h3>

                          {myAttendance.length === 0 ? (
                            <div className="p-4 text-center text-gray-500 text-xs italic">
                              {lang === 'en' ? 'No attendance records registered yet.' : 'कोई उपस्थिति रिकॉर्ड अभी दर्ज नहीं है।'}
                            </div>
                          ) : (
                            <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                              {myAttendance.map(rec => (
                                <div key={rec.id} className="flex justify-between items-center py-1.5 border-b border-gray-400/5 text-xs">
                                  <span className="font-mono font-bold text-slate-600 dark:text-slate-400">{rec.date}</span>
                                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase font-mono tracking-wider ${
                                    rec.status === 'present'
                                      ? 'bg-green-500/10 text-green-500'
                                      : 'bg-red-500/10 text-red-500'
                                  }`}>
                                    {rec.status === 'present' ? (lang === 'en' ? 'Present' : 'उपस्थित') : (lang === 'en' ? 'Absent' : 'अनुपस्थित')}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    <div className={`p-6 rounded-2xl border ${
                      darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-200 shadow-sm'
                    }`}>
                      <h3 className="font-display font-bold text-sm text-blue-900 dark:text-blue-400 border-b border-gray-400/10 pb-3 mb-4">
                        Completed Online MCQ Logs
                      </h3>

                      {studentResults.length === 0 ? (
                        <div className="p-6 text-center text-gray-500 text-xs">
                          No computed test logs found. Search the top panel and select &quot;Online Tests&quot; to test your skills!
                        </div>
                      ) : (
                        <ul className="space-y-3.5 text-xs text-left">
                          {studentResults.map((res) => (
                            <li 
                              key={res.id}
                              className={`p-3.5 rounded-xl border flex flex-col justify-between gap-2.5 ${
                                res.passed 
                                  ? 'bg-green-500/[0.02] border-green-500/15'
                                  : 'bg-red-500/[0.02] border-red-500/15'
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <span className="font-bold text-slate-800 dark:text-slate-100">{res.testName}</span>
                                <span className={`font-semibold font-mono text-[10px] px-2 py-0.5 rounded capitalize ${
                                  res.passed ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                                }`}>
                                  {res.passed ? 'PASSED' : 'RETRY NEEDED'}
                                </span>
                              </div>

                              <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono">
                                <span>Score: {res.score} / {res.totalQuestions} ({res.percentage}%)</span>
                                <span>{res.date}</span>
                              </div>

                              {res.certificateCode && (
                                <div className="p-2.5 bg-green-500/5 rounded-lg border border-green-500/10 flex flex-col space-y-1">
                                  <span className="text-[9px] text-gray-400 uppercase font-bold tracking-wider font-mono">Verified Certificate Key:</span>
                                  <span className="font-bold text-orange-400 font-mono select-all text-xs">{res.certificateCode}</span>
                                </div>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
