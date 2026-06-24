import React, { useState, useEffect } from 'react';
import { Course, Student, Page } from '../types';
import { TRANSLATIONS } from '../data';
import { 
  Award, 
  CheckCircle, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  MapPin, 
  FileText, 
  Download, 
  Upload, 
  Sparkles,
  RefreshCw 
} from 'lucide-react';

interface PageAdmissionProps {
  courses: Course[];
  lang: 'en' | 'hi';
  darkMode: boolean;
  selectedCourseId: string;
  onAddStudent: (newStudent: Student) => void;
  setCurrentPage: (page: Page) => void;
}

export default function PageAdmission({
  courses,
  lang,
  darkMode,
  selectedCourseId,
  onAddStudent,
  setCurrentPage
}: PageAdmissionProps) {
  const t = TRANSLATIONS[lang];

  // Forms Fields state
  const [fullName, setFullName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Male');
  const [address, setAddress] = useState('');
  const [courseId, setCourseId] = useState(selectedCourseId || 'ccc');
  
  // Custom mock base64 assets state or string indicators
  const [passportPhoto, setPassportPhoto] = useState<string>('');
  const [aadhaarCard, setAadhaarCard] = useState<string>('');
  
  // File labels
  const [photoLabel, setPhotoLabel] = useState('');
  const [aadhaarLabel, setAadhaarLabel] = useState('');

  // Submission metrics
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedId, setGeneratedId] = useState('');
  const [generatedRoll, setGeneratedRoll] = useState('');

  useEffect(() => {
    if (selectedCourseId) {
      setCourseId(selectedCourseId);
    }
  }, [selectedCourseId]);

  // Convert files helper
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'photo' | 'aadhaar') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'photo') {
        setPhotoLabel(file.name);
        // Fallback placeholder mock URL for preview simplicity
        setPassportPhoto(URL.createObjectURL(file));
      } else {
        setAadhaarLabel(file.name);
        setAadhaarCard(file.name);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !fatherName || !mobileNumber || !email) {
      alert('Please fill out all mandatory fields.');
      return;
    }

    // Auto generator credentials
    const admId = `ACL-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const studentRoll = `STUDENT-${Math.floor(100 + Math.random() * 900)}`;

    const chosenCourse = courses.find(c => c.id === courseId);
    const totalFees = chosenCourse ? chosenCourse.fees : 5000;

    const newStudent: Student = {
      id: admId,
      fullName,
      fatherName,
      mobileNumber,
      email,
      dob,
      gender,
      address,
      courseId,
      passportPhoto: passportPhoto || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80",
      aadhaarCard: aadhaarCard || "Aadhaar_Document_Uploaded.pdf",
      admissionDate: new Date().toISOString().split('T')[0],
      admissionStatus: 'pending', // Pending authorization by default admin panel
      attendancePercentage: 0,
      feesPaid: 0, // Pay during center visit
      totalFees,
      rollNo: studentRoll,
      password: mobileNumber, // password defaults to mobile number for simplicity!
      rank: 0,
      progress: 0
    };

    onAddStudent(newStudent);
    setGeneratedId(admId);
    setGeneratedRoll(studentRoll);
    setIsSubmitted(true);
  };

  const handleResetForm = () => {
    setFullName('');
    setFatherName('');
    setMobileNumber('');
    setEmail('');
    setDob('');
    setGender('Male');
    setAddress('');
    setPassportPhoto('');
    setAadhaarCard('');
    setPhotoLabel('');
    setAadhaarLabel('');
    setIsSubmitted(false);
  };

  return (
    <div className={`w-full min-h-screen py-12 md:py-16 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Step Indicator / Intro */}
        <div className="text-center space-y-3 max-w-xl mx-auto mb-10">
          <span className="text-orange-500 text-xs font-bold uppercase tracking-widest font-mono">
            {lang === 'en' ? 'Admission Portal 2026' : 'प्रवेश प्रक्रिया सत्र 2026-27'}
          </span>
          <h2 className="font-display font-extrabold text-3xl text-blue-950 dark:text-blue-400">
            {lang === 'en' ? 'Online Student Registration Form' : 'ऑनलाइन छात्र प्रवेश फॉर्म'}
          </h2>
          <p className="text-xs text-slate-500">
            {lang === 'en'
              ? 'Complete this quick digital application. Your admission ID generates instantly. Login password defaults to your entered mobile number.'
              : 'इस डिजिटल आवेदन को पूरा करें। आपका प्रवेश विवरण कर्नलगंज कार्यालय में तुरंत समीक्षा के लिए भेजा जाएगा।'}
          </p>
        </div>

        {isSubmitted ? (
          /* ================= SUCCESS LAYOUT SHEET RECEIPT ================= */
          <div className={`p-8 md:p-12 border border-l-4 border-l-green-500 rounded-sm space-y-6 text-center animate-fadeIn ${
            darkMode ? 'bg-slate-905 border-y-slate-800 border-r-slate-800' : 'bg-white border-y-slate-200 border-r-slate-200 shadow-md'
          }`} id="admission-success-receipt">
            <span className="inline-flex items-center justify-center p-3 rounded-sm bg-green-500/10 text-green-500 border border-green-500/20">
              <CheckCircle className="w-12 h-12" />
            </span>
            
            <div className="space-y-1">
              <h3 className="font-display font-extrabold text-xl text-blue-900 dark:text-blue-400">
                {lang === 'en' ? 'Registration Successfully Received!' : 'ऑनलाइन पंजीकरण सफलतापूर्वक पूर्ण हुआ!'}
              </h3>
              <p className="text-xs text-gray-500">
                {lang === 'en' 
                  ? 'Your admission coordinates have been compiled in our school rolls database.'
                  : 'आपका पंजीकरण विवरण हमारे डाटाबेस में दर्ज कर लिया गया है।'}
              </p>
            </div>

            {/* Generated Receipts Table detail cards */}
            <div className="max-w-md mx-auto p-6 rounded-sm bg-blue-900/5 dark:bg-slate-950/70 border border-l-4 border-l-blue-750 border-y-gray-400/10 border-r-gray-400/10 text-left space-y-3.5 font-sans">
              <div className="flex justify-between items-center border-b border-gray-400/10 pb-2">
                <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">{lang === 'en' ? 'Temporary Admission ID' : 'प्रवेश संख्या (ID)'}</span>
                <span className="text-sm font-bold text-orange-500 font-mono select-all">{generatedId}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-400/10 pb-2">
                <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">{lang === 'en' ? 'Student Roll Number' : 'रोल नंबर'}</span>
                <span className="text-sm font-bold text-sky-400 font-mono select-all">{generatedRoll}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-400/10 pb-2">
                <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">{lang === 'en' ? 'Full Student Name' : 'छात्र का नाम'}</span>
                <span className="text-xs font-semibold select-all">{fullName}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-400/10 pb-2">
                <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">{lang === 'en' ? 'Selected Course' : 'चुना गया कोर्स'}</span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {courses.find(c => c.id === courseId)?.name}
                </span>
              </div>
              <div className="flex justify-between items-center pt-1 text-xs">
                <span className="text-gray-400 uppercase font-bold tracking-wider">{lang === 'en' ? 'Default Portal Password' : 'लॉगिन पासवर्ड'}</span>
                <span className="bg-orange-500/10 text-orange-400 font-mono font-bold px-2 py-0.5 rounded-sm select-all">{mobileNumber}</span>
              </div>
            </div>

            <div className="p-4 rounded-sm border border-l-4 border-l-orange-500 border-y-orange-500/20 border-r-orange-500/20 bg-orange-500/10 max-w-md mx-auto text-xs text-orange-400 font-medium">
              💡 {lang === 'en' 
                ? 'Tip: Copy your Roll Number and Mobile password above, then visit the "Student Dashboard" menu to login, view study notes, and try MCQs.'
                : 'सुझाव: छात्र डैशबोर्ड पर जाकर तुरंत मॉक टेस्ट देने के लिए अपना रोल नंबर और मोबाइल नंबर का उपयोग करें।'}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => setCurrentPage('student-dashboard')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-3 rounded-sm shadow-md transition-all uppercase tracking-wider"
              >
                {lang === 'en' ? 'Open Student Dashboard' : 'छात्र डैशबोर्ड खोलें'}
              </button>
              
              <button
                onClick={handleResetForm}
                className="bg-white/10 dark:bg-slate-800 text-slate-800 dark:text-white font-semibold text-xs px-5 py-3 rounded-sm border border-gray-400/20 hover:bg-gray-500/5 transition-all text-center flex items-center space-x-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Register Another New Student' : 'नया एडमिशन फॉर्म भरें'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* ================= ADMISSION FORM SHEET ================= */
          <form 
            onSubmit={handleSubmit}
            className={`p-6 md:p-10 border border-l-4 border-l-blue-750/80 rounded-sm space-y-6 text-left ${
              darkMode ? 'bg-slate-950 border-y-slate-800 border-r-slate-800' : 'bg-white border-y-slate-200 border-r-slate-200 shadow-md'
            }`}
          >
            <div className="border-b border-gray-400/10 pb-3 flex items-center space-x-2">
              <span className="p-1.5 inline-block bg-orange-500/10 text-orange-500 rounded-sm">
                <FileText className="w-4 h-4" />
              </span>
              <h3 className="font-display font-extrabold text-lg text-blue-900 dark:text-blue-400">
                {lang === 'en' ? 'Academic & Personal Coordinates' : 'शैक्षणिक एवं व्यक्तिगत विवरण'}
              </h3>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              
              {/* Full Name */}
              <div>
                <label className="block mb-1.5 font-semibold text-slate-500 uppercase tracking-wider text-[11px]">{lang === 'en' ? "Full Student Name" : "पूरा नाम"} *</label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    className={`w-full pl-9 pr-3 py-2 border rounded-sm ${
                      darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-black'
                    }`}
                    placeholder="e.g. Roshan Kumar Maurya"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    id="adm-input-fullname"
                  />
                  <User className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3.5" />
                </div>
              </div>

              {/* Father Name */}
              <div>
                <label className="block mb-1.5 font-semibold text-slate-500 uppercase tracking-wider text-[11px]">{lang === 'en' ? "Father's Name" : "पिता का नाम"} *</label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    className={`w-full pl-9 pr-3 py-2 border rounded-sm ${
                      darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-black'
                    }`}
                    placeholder="Shri Santosh Kumar Maurya"
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                    id="adm-input-fathername"
                  />
                  <User className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3.5" />
                </div>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block mb-1.5 font-semibold text-slate-500 uppercase tracking-wider text-[11px]">{lang === 'en' ? "Mobile Number" : "मोबाइल नंबर"} *</label>
                <div className="relative">
                  <input
                    required
                    type="tel"
                    maxLength={10}
                    pattern="[0-9]{10}"
                    className={`w-full pl-9 pr-3 py-2 border rounded-sm ${
                      darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-black'
                    }`}
                    placeholder="e.g. 9876543210"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    id="adm-input-mobile"
                  />
                  <Phone className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3.5" />
                </div>
              </div>

              {/* Email ID */}
              <div>
                <label className="block mb-1.5 font-semibold text-slate-500 uppercase tracking-wider text-[11px]">{lang === 'en' ? "Email Address" : "ईमेल खाता"} *</label>
                <div className="relative">
                  <input
                    required
                    type="email"
                    className={`w-full pl-9 pr-3 py-2 border rounded-sm ${
                      darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-black'
                    }`}
                    placeholder="e.g. student@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="adm-input-email"
                  />
                  <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3.5" />
                </div>
              </div>

              {/* DOB */}
              <div>
                <label className="block mb-1.5 font-semibold text-slate-500 uppercase tracking-wider text-[11px]">{lang === 'en' ? "Date of Birth" : "जन्म तिथि"}</label>
                <div className="relative">
                  <input
                    type="date"
                    className={`w-full pl-9 pr-3 py-2 border rounded-sm ${
                      darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-black'
                    }`}
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    id="adm-input-dob"
                  />
                  <Calendar className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3.5" />
                </div>
              </div>

              {/* Gender selector */}
              <div>
                <label className="block mb-1.5 font-semibold text-slate-500 uppercase tracking-wider text-[11px]">{lang === 'en' ? "Gender" : "लिंग"}</label>
                <select
                  className={`w-full px-3 py-2 border rounded-sm ${
                    darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-black'
                  }`}
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  id="adm-input-gender"
                >
                  <option value="Male">{lang === 'en' ? 'Male' : 'पुरुष'}</option>
                  <option value="Female">{lang === 'en' ? 'Female' : 'महिला'}</option>
                  <option value="Other">{lang === 'en' ? 'Other' : 'अन्य'}</option>
                </select>
              </div>

              {/* Course Selection */}
              <div className="md:col-span-2">
                <label className="block mb-1.5 font-semibold text-slate-500 uppercase tracking-wider text-[11px]">{lang === 'en' ? "Course Selection" : "कंप्यूटर कोर्स का चयन करें"}</label>
                <select
                  className={`w-full px-3 py-2 border rounded-sm ${
                    darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-black'
                  }`}
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  id="adm-input-course"
                >
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name} (Fees: ₹{course.fees.toLocaleString('en-IN')})
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-gray-400 mt-1 cursor-pointer" onClick={() => setCurrentPage('courses')}>
                  💡 Want to review individual syllabus first? Click here to view details.
                </p>
              </div>

              {/* Home Address */}
              <div className="md:col-span-2">
                <label className="block mb-1.5 font-semibold text-slate-500 uppercase tracking-wider text-[11px]">{lang === 'en' ? "Address" : "स्थायी पता"}</label>
                <div className="relative">
                  <textarea
                    rows={2}
                    className={`w-full pl-9 pr-3 py-2 border rounded-sm ${
                      darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-black'
                    }`}
                    placeholder="e.g. Kotwali Tiraha near Bus Station, Colonelganj, Gonda"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    id="adm-input-address"
                  />
                  <MapPin className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3.5" />
                </div>
              </div>

              {/* Document upload panels */}
              <div className="p-4 border rounded-sm border-dashed border-gray-400/20 bg-blue-900/5 dark:bg-slate-900/40 space-y-2">
                <p className="font-bold text-[11px] uppercase tracking-wider text-slate-500">{lang === 'en' ? "Passport Photo" : "पासपोर्ट फोटो"}</p>
                <div className="flex items-center space-x-2">
                  <label className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white py-1.5 px-3 rounded text-[11px] font-semibold flex items-center space-x-1">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload File</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, 'photo')} />
                  </label>
                  <span className="text-[10px] text-gray-400 truncate max-w-[150px]">
                    {photoLabel || (lang === 'en' ? 'No file selected' : 'कोई फाइल नहीं चुनी')}
                  </span>
                </div>
              </div>

              <div className="p-4 border rounded-sm border-dashed border-gray-400/20 bg-blue-900/5 dark:bg-slate-900/40 space-y-2">
                <p className="font-bold text-[11px] uppercase tracking-wider text-slate-500">{lang === 'en' ? "Aadhaar Card Upload" : "आधार कार्ड अपलोड"}</p>
                <div className="flex items-center space-x-2">
                  <label className="cursor-pointer bg-slate-700 hover:bg-slate-800 text-white py-1.5 px-3 rounded text-[11px] font-semibold flex items-center space-x-1">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload PDF</span>
                    <input type="file" accept=".pdf,image/*" className="hidden" onChange={(e) => handleFileChange(e, 'aadhaar')} />
                  </label>
                  <span className="text-[10px] text-gray-400 truncate max-w-[150px]">
                    {aadhaarLabel || (lang === 'en' ? 'No file selected' : 'कोई फाइल नहीं चुनी')}
                  </span>
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-gray-400/10 text-center">
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-sm text-xs uppercase tracking-wider shadow-lg shadow-orange-500/15 cursor-pointer hover:scale-101 active:scale-99 transition-all inline-flex items-center space-x-2 border border-orange-400/20"
                id="sumbit-admission-btn"
              >
                <span>{lang === 'en' ? 'Submit Application and Generate Roll' : 'आवेदन जमा करें और आईडी प्राप्त करें'}</span>
                <CheckCircle className="w-4 h-4 text-white" />
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
