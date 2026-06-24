import { createClient } from '@supabase/supabase-js';
import { Student, Notice, Certificate, Result, Feedback, SupabaseDemoStudent, StudyNote, VideoLecture } from '../types';

// Supabase Connection parameters with default values provided by the user
const DEFAULT_PROJECT_ID = 'pudtlahcagrufpqipbem';
const DEFAULT_URL = `https://${DEFAULT_PROJECT_ID}.supabase.co`;
const DEFAULT_ANON_KEY = 'sb_publishable_UPdLBixVRkmFJRSZ1BxF2w_d7JzVNn5';

export const SUPABASE_URL = (import.meta as any).env?.VITE_SUPABASE_URL || DEFAULT_URL;
export const SUPABASE_ANON_KEY = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || DEFAULT_ANON_KEY;

// Create Supabase Client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

/**
 * Type-safe helpers to check connection status and table existence
 */
export async function checkSupabaseStatus() {
  try {
    // Attempt block query to the sample table
    const { data, error } = await supabase.from('supabase_demo_students').select('id').limit(1);
    if (error) {
      // Table doesn't exist yet, but connection was made
      if (error.code === 'PGRST116' || error.code === '42P01') {
        return {
          connected: true,
          tablesCreated: false,
          message: 'Connected to Supabase! However, the sample "supabase_demo_students" database table does not exist yet. Run the SQL schema script provided on this page to create it.'
        };
      }
      return {
        connected: false,
        tablesCreated: false,
        message: `Connection Error: ${error.message} (${error.code})`
      };
    }
    return {
      connected: true,
      tablesCreated: true,
      message: 'Supabase connected and sample "supabase_demo_students" table verified! Instant CRUD operations are live!'
    };
  } catch (err: any) {
    return {
      connected: false,
      tablesCreated: false,
      message: `Failed to connect: ${err?.message || 'unknown network issue. Check your connection or API key correctness.'}`
    };
  }
}

/**
 * 1. Students Sync
 */
export async function saveStudent(student: Student): Promise<boolean> {
  try {
    const { error } = await supabase.from('students').upsert(student);
    if (error) {
      console.warn('Supabase saveStudent failed (local storage fallback active):', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase saveStudent network error:', err);
    return false;
  }
}

export async function deleteStudent(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from('students').delete().eq('id', id);
    if (error) {
      console.warn('Supabase deleteStudent failed:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase deleteStudent network error:', err);
    return false;
  }
}

export async function loadStudents(): Promise<Student[] | null> {
  try {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('id', { ascending: false });
    
    if (error) {
      console.warn('Supabase loadStudents failed:', error.message);
      return null;
    }
    return data as Student[];
  } catch (err) {
    console.warn('Supabase loadStudents network error:', err);
    return null;
  }
}

/**
 * 2. Demo Booking Submission
 */
export async function saveDemoBooking(booking: {
  studentName: string;
  mobileNumber: string;
  courseId: string;
}): Promise<boolean> {
  try {
    const { error } = await supabase.from('demo_bookings').insert(booking);
    if (error) {
      console.warn('Supabase saveDemoBooking failed:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase saveDemoBooking network error:', err);
    return false;
  }
}

/**
 * 3. Notice Board Sync
 */
export async function saveNotice(notice: Notice): Promise<boolean> {
  try {
    const { error } = await supabase.from('notices').upsert(notice);
    if (error) {
      console.warn('Supabase saveNotice failed:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase saveNotice network error:', err);
    return false;
  }
}

export async function deleteNotice(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from('notices').delete().eq('id', id);
    if (error) {
      console.warn('Supabase deleteNotice failed:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase deleteNotice network error:', err);
    return false;
  }
}

export async function loadNotices(): Promise<Notice[] | null> {
  try {
    const { data, error } = await supabase
      .from('notices')
      .select('*')
      .order('id', { ascending: false });
    
    if (error) {
      console.warn('Supabase loadNotices failed:', error.message);
      return null;
    }
    return data as Notice[];
  } catch (err) {
    console.warn('Supabase loadNotices network error:', err);
    return null;
  }
}

/**
 * 5. Certificate Verification Sync
 */
export async function saveCertificate(cert: Certificate): Promise<boolean> {
  try {
    const { error } = await supabase.from('certificates').upsert(cert);
    if (error) {
      console.warn('Supabase saveCertificate failed:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase saveCertificate network error:', err);
    return false;
  }
}

export async function loadCertificates(): Promise<Certificate[] | null> {
  try {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .order('id', { ascending: false });
    
    if (error) {
      console.warn('Supabase loadCertificates failed:', error.message);
      return null;
    }
    return data as Certificate[];
  } catch (err) {
    console.warn('Supabase loadCertificates network error:', err);
    return null;
  }
}

/**
 * 6. Test Results Records Sync
 */
export async function saveResult(res: Result): Promise<boolean> {
  try {
    const { error } = await supabase.from('results').upsert(res);
    if (error) {
      console.warn('Supabase saveResult failed:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase saveResult network error:', err);
    return false;
  }
}

export async function loadResults(): Promise<Result[] | null> {
  try {
    const { data, error } = await supabase
      .from('results')
      .select('*')
      .order('id', { ascending: false });
    
    if (error) {
      console.warn('Supabase loadResults failed:', error.message);
      return null;
    }
    return data as Result[];
  } catch (err) {
    console.warn('Supabase loadResults network error:', err);
    return null;
  }
}

/**
 * 7. Feedback Form Submission
 */
export async function saveFeedback(fb: Feedback): Promise<boolean> {
  try {
    const { error } = await supabase.from('feedbacks').upsert(fb);
    if (error) {
      console.warn('Supabase saveFeedback failed:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase saveFeedback network error:', err);
    return false;
  }
}

export async function loadFeedbacks(): Promise<Feedback[] | null> {
  try {
    const { data, error } = await supabase
      .from('feedbacks')
      .select('*')
      .order('id', { ascending: false });
    if (error) {
      console.warn('Supabase loadFeedbacks failed:', error.message);
      return null;
    }
    return data || [];
  } catch (err) {
    console.warn('Supabase loadFeedbacks network error:', err);
    return null;
  }
}

export async function deleteFeedback(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('feedbacks')
      .delete()
      .eq('id', id);
    if (error) {
      console.warn('Supabase deleteFeedback failed:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase deleteFeedback network error:', err);
    return false;
  }
}

/**
 * 7.5. Study Notes & Video Lectures Sync
 */
export async function saveStudyNote(note: StudyNote): Promise<boolean> {
  try {
    const { error } = await supabase.from('study_notes').upsert(note);
    if (error) {
      console.warn('Supabase saveStudyNote failed:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase saveStudyNote network error:', err);
    return false;
  }
}

export async function deleteStudyNote(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from('study_notes').delete().eq('id', id);
    if (error) {
      console.warn('Supabase deleteStudyNote failed:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase deleteStudyNote network error:', err);
    return false;
  }
}

export async function loadStudyNotes(): Promise<StudyNote[] | null> {
  try {
    const { data, error } = await supabase
      .from('study_notes')
      .select('*')
      .order('id', { ascending: false });
    if (error) {
      console.warn('Supabase loadStudyNotes failed:', error.message);
      return null;
    }
    return data as StudyNote[];
  } catch (err) {
    console.warn('Supabase loadStudyNotes network error:', err);
    return null;
  }
}

export async function saveVideoLecture(video: VideoLecture): Promise<boolean> {
  try {
    const { error } = await supabase.from('video_lectures').upsert(video);
    if (error) {
      console.warn('Supabase saveVideoLecture failed:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase saveVideoLecture network error:', err);
    return false;
  }
}

export async function deleteVideoLecture(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from('video_lectures').delete().eq('id', id);
    if (error) {
      console.warn('Supabase deleteVideoLecture failed:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase deleteVideoLecture network error:', err);
    return false;
  }
}

export async function loadVideoLectures(): Promise<VideoLecture[] | null> {
  try {
    const { data, error } = await supabase
      .from('video_lectures')
      .select('*')
      .order('id', { ascending: false });
    if (error) {
      console.warn('Supabase loadVideoLectures failed:', error.message);
      return null;
    }
    return data as VideoLecture[];
  } catch (err) {
    console.warn('Supabase loadVideoLectures network error:', err);
    return null;
  }
}

/**
 * 8. Sample Students CRUD Playground Helpers (Matching standard requirements)
 */
export async function loadDemoStudents(): Promise<SupabaseDemoStudent[]> {
  try {
    const { data, error } = await supabase
      .from('supabase_demo_students')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.warn('Supabase loadDemoStudents failed:', error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error('Failed to loading demo students:', err);
    return [];
  }
}

export async function createDemoStudent(student: { name: string; mobile: string; course: string }): Promise<{ success: boolean; data?: SupabaseDemoStudent; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('supabase_demo_students')
      .insert([student])
      .select()
      .single();
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Network error' };
  }
}

export async function updateDemoStudent(id: string, updates: { name: string; mobile: string; course: string }): Promise<{ success: boolean; data?: SupabaseDemoStudent; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('supabase_demo_students')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Network error' };
  }
}

export async function deleteDemoStudent(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('supabase_demo_students')
      .delete()
      .eq('id', id);
    if (error) {
      console.warn('Supabase deleteDemoStudent failed:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Failed to delete:', err);
    return false;
  }
}

export const SUPABASE_SQL_SCHEMA = `-- Direct Copy & Paste into your Supabase SQL Editor:

-- 0. Create SAMPLE students table for the interactive CRUD Playground
CREATE TABLE IF NOT EXISTS supabase_demo_students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  mobile TEXT,
  course TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Disable Row Level Security (RLS) for the demo sandbox to make public access instantly functional,
-- or you can configure a SELECT/INSERT/UPDATE/DELETE policy.
ALTER TABLE supabase_demo_students DISABLE ROW LEVEL SECURITY;

-- 1. Create admissions students table
CREATE TABLE IF NOT EXISTS students (
  id TEXT PRIMARY KEY,
  "fullName" TEXT NOT NULL,
  "fatherName" TEXT,
  "mobileNumber" TEXT,
  email TEXT,
  dob TEXT,
  gender TEXT,
  address TEXT,
  "courseId" TEXT,
  "passportPhoto" TEXT,
  "aadhaarCard" TEXT,
  "admissionDate" TEXT,
  "admissionStatus" TEXT DEFAULT 'pending',
  "attendancePercentage" NUMERIC DEFAULT 0,
  "feesPaid" NUMERIC DEFAULT 0,
  "totalFees" NUMERIC DEFAULT 0,
  "rollNo" TEXT,
  password TEXT,
  rank INTEGER DEFAULT 0,
  progress INTEGER DEFAULT 0
);

-- Enable row level security (or let public write for simplicity)
ALTER TABLE students DISABLE ROW LEVEL SECURITY;

-- 2. Create demo_bookings table
CREATE TABLE IF NOT EXISTS demo_bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "studentName" TEXT NOT NULL,
  "mobileNumber" TEXT NOT NULL,
  "courseId" TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

ALTER TABLE demo_bookings DISABLE ROW LEVEL SECURITY;

-- 3. Create notices table
CREATE TABLE IF NOT EXISTS notices (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  "titleHindi" TEXT,
  category TEXT,
  description TEXT,
  "descriptionHindi" TEXT,
  date TEXT,
  active BOOLEAN DEFAULT true
);

ALTER TABLE notices DISABLE ROW LEVEL SECURITY;

-- 4. Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id TEXT PRIMARY KEY,
  "certificateNo" TEXT NOT NULL,
  "studentId" TEXT,
  "studentName" TEXT,
  "courseName" TEXT,
  "issueDate" TEXT,
  grade TEXT,
  validity TEXT DEFAULT 'verified'
);

ALTER TABLE certificates DISABLE ROW LEVEL SECURITY;

-- 5. Create results table
CREATE TABLE IF NOT EXISTS results (
  id TEXT PRIMARY KEY,
  "testId" TEXT NOT NULL,
  "testName" TEXT,
  "studentId" TEXT,
  "studentName" TEXT,
  score NUMERIC,
  "totalQuestions" INTEGER,
  "correctAnswers" INTEGER,
  percentage NUMERIC,
  passed BOOLEAN,
  date TEXT,
  "certificateCode" TEXT
);

ALTER TABLE results DISABLE ROW LEVEL SECURITY;

-- 6. Create feedbacks table
CREATE TABLE IF NOT EXISTS feedbacks (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  mobile TEXT,
  subject TEXT,
  message TEXT,
  date TEXT
);

ALTER TABLE feedbacks DISABLE ROW LEVEL SECURITY;

-- 7. Create study_notes table
CREATE TABLE IF NOT EXISTS study_notes (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  "courseId" TEXT,
  "fileSize" TEXT,
  "downloadUrl" TEXT,
  "createdAt" TEXT
);

ALTER TABLE study_notes DISABLE ROW LEVEL SECURITY;

-- 8. Create video_lectures table
CREATE TABLE IF NOT EXISTS video_lectures (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  "courseId" TEXT,
  duration TEXT,
  "instructor" TEXT,
  "videoUrl" TEXT,
  "createdAt" TEXT
);

ALTER TABLE video_lectures DISABLE ROW LEVEL SECURITY;
`;
