export type Page =
  | 'home'
  | 'about'
  | 'courses'
  | 'admission'
  | 'student-dashboard'
  | 'admin-dashboard'
  | 'test'
  | 'faculty'
  | 'gallery'
  | 'notice-board'
  | 'verification'
  | 'placement'
  | 'blog'
  | 'contact'
  | 'supabase-crud';

export interface SupabaseDemoStudent {
  id: string; // UUID or auto-generated
  name: string;
  mobile: string;
  course: string;
  created_at: string;
}

export interface Course {
  id: string; // e.g. 'ccc'
  code: string;
  name: string;
  duration: string;
  fees: number;
  eligibility: string;
  syllabus: string[];
  certificateDetails: string;
  careerOpportunities: string[];
  category: 'diploma' | 'certificate' | 'programming' | 'other';
}

export interface Student {
  id: string; // admission ID / student ID e.g. ACL-2026-1024
  fullName: string;
  fatherName: string;
  mobileNumber: string;
  email: string;
  dob: string;
  gender: string;
  address: string;
  courseId: string;
  passportPhoto: string; // Base64 or placeholder URL
  aadhaarCard: string; // Base64 or registration ID
  admissionDate: string;
  admissionStatus: 'pending' | 'approved' | 'rejected';
  attendancePercentage: number;
  feesPaid: number;
  totalFees: number;
  rollNo: string;
  password?: string;
  rank: number;
  progress: number; // 0-100
}

export interface Faculty {
  id: string;
  name: string;
  qualification: string;
  experience: string;
  subjects: string[];
  photo: string;
  role: string;
}

export interface BlogPost {
  id: string;
  title: string;
  titleHindi: string;
  excerpt: string;
  excerptHindi: string;
  content: string;
  contentHindi: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  coverImage: string;
  tags: string[];
}

export interface Notice {
  id: string;
  title: string;
  titleHindi: string;
  category: 'exam' | 'holiday' | 'batch' | 'scholarship' | 'job';
  description: string;
  descriptionHindi: string;
  date: string;
  active: boolean;
}

export interface Question {
  id: string;
  testId: string;
  question: string;
  questionHindi: string;
  options: string[];
  optionsHindi: string[];
  correctAnswer: number; // Index 0-3
}

export interface Test {
  id: string;
  courseId: string;
  courseName: string;
  name: string;
  durationMinutes: number;
  questions: Question[];
}

export interface Result {
  id: string;
  testId: string;
  testName: string;
  studentId: string;
  studentName: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  passed: boolean;
  date: string;
  certificateCode?: string;
}

export interface Certificate {
  id: string; // Certificate Verification Number (e.g. CERT-ACL-49520)
  certificateNo: string;
  studentId: string;
  studentName: string;
  courseName: string;
  issueDate: string;
  grade: string;
  validity: 'verified' | 'unverified' | 'expired';
}

export interface GalleryImage {
  id: string;
  title: string;
  category: 'classroom' | 'events' | 'workshops' | 'distribution' | 'activities';
  imageUrl: string;
}

export interface Feedback {
  id: string;
  name: string;
  email: string;
  mobile: string;
  subject: string;
  message: string;
  date: string;
}

export interface PlacementRecord {
  id: string;
  studentName: string;
  courseName: string;
  companyName: string;
  packageText: string; // e.g. "4.2 LPA"
  designation: string;
  studentPhoto: string;
}

export interface StudyNote {
  id: string;
  title: string;
  courseId: string; // 'all' or specific course id like 'ccc', 'adca', 'o_level'
  fileSize: string; // e.g. "2.4 MB"
  downloadUrl: string; // simulated or real URL
  createdAt: string;
}

export interface VideoLecture {
  id: string;
  title: string;
  courseId: string; // 'all' or specific course id like 'ccc', 'adca', 'o_level'
  duration: string; // e.g. "15:40 Mins"
  instructor: string;
  videoUrl: string; // simulated or embed URL
  createdAt: string;
}

