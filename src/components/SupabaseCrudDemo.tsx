import React, { useState, useEffect } from 'react';
import { SupabaseDemoStudent } from '../types';
import { 
  loadDemoStudents, 
  createDemoStudent, 
  updateDemoStudent, 
  deleteDemoStudent, 
  checkSupabaseStatus, 
  SUPABASE_SQL_SCHEMA,
  SUPABASE_URL
} from '../lib/supabase';
import { 
  UserPlus, 
  Search, 
  Edit2, 
  Trash2, 
  RefreshCw, 
  Database, 
  Check, 
  Copy, 
  ChevronRight, 
  AlertCircle, 
  Calendar, 
  Phone, 
  BookOpen, 
  X, 
  Wifi, 
  WifiOff 
} from 'lucide-react';

interface SupabaseCrudDemoProps {
  darkMode: boolean;
  lang: 'en' | 'hi';
}

export default function SupabaseCrudDemo({ darkMode, lang }: SupabaseCrudDemoProps) {
  // CRUD Data State
  const [students, setStudents] = useState<SupabaseDemoStudent[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<SupabaseDemoStudent[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Status states
  const [dbStatus, setDbStatus] = useState<{ connected: boolean; tablesCreated: boolean; message: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  
  // Form input states
  const [formName, setFormName] = useState('');
  const [formMobile, setFormMobile] = useState('');
  const [formCourse, setFormCourse] = useState('');
  const [editingStudent, setEditingStudent] = useState<SupabaseDemoStudent | null>(null);

  // Form errors
  const [errors, setErrors] = useState<{ name?: string; mobile?: string; course?: string }>({});

  // Dynamic feedback and alerts
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [copiedSchema, setCopiedSchema] = useState(false);

  // Load students & status
  useEffect(() => {
    fetchStatusAndData();
  }, []);

  // Filter students
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredStudents(students);
    } else {
      const q = searchQuery.toLowerCase();
      setFilteredStudents(
        students.filter(
          s =>
            s.name.toLowerCase().includes(q) ||
            (s.mobile && s.mobile.toLowerCase().includes(q)) ||
            (s.course && s.course.toLowerCase().includes(q))
        )
      );
    }
  }, [searchQuery, students]);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const fetchStatusAndData = async () => {
    setLoading(true);
    setStatusLoading(true);

    try {
      // 1. Diagnostics Check
      const statusResult = await checkSupabaseStatus();
      setDbStatus(statusResult);

      // 2. Load demo list
      if (statusResult.connected) {
        const demoData = await loadDemoStudents();
        setStudents(demoData);
      }
    } catch (err: any) {
      console.error(err);
      showNotification('error', 'Failed to synchronize with Supabase. Verify backend credentials.');
    } finally {
      setLoading(false);
      setStatusLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};
    
    if (!formName.trim()) {
      newErrors.name = 'Full name is required.';
    } else if (formName.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters.';
    }

    if (!formMobile.trim()) {
      newErrors.mobile = 'Mobile number is required.';
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(formMobile.trim())) {
      newErrors.mobile = 'Enter a valid mobile contact number.';
    }

    if (!formCourse.trim()) {
      newErrors.course = 'Please type or select a course path.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormName('');
    setFormMobile('');
    setFormCourse('');
    setEditingStudent(null);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const payload = {
      name: formName.trim(),
      mobile: formMobile.trim(),
      course: formCourse.trim(),
    };

    if (editingStudent) {
      // UPDATE Operation
      const result = await updateDemoStudent(editingStudent.id, payload);
      if (result.success && result.data) {
        setStudents(prev => prev.map(s => (s.id === editingStudent.id ? result.data! : s)));
        showNotification('success', `Student "${payload.name}" updated successfully in Supabase!`);
        resetForm();
      } else {
        showNotification('error', `Update failed: ${result.error || 'Server issue'}`);
      }
    } else {
      // CREATE Operation
      const result = await createDemoStudent(payload);
      if (result.success && result.data) {
        setStudents(prev => [result.data!, ...prev]);
        showNotification('success', `New student Record "${payload.name}" saved to Supabase account!`);
        resetForm();
      } else {
        const msg = result.error || 'Database schema mismatch. Make sure you pasted the SQL tables script.';
        showNotification('error', `Insertion failed: ${msg}`);
      }
    }
    setLoading(false);
  };

  const handleEditClick = (student: SupabaseDemoStudent) => {
    setEditingStudent(student);
    setFormName(student.name);
    setFormMobile(student.mobile || '');
    setFormCourse(student.course || '');
    setErrors({});
  };

  const handleDeleteClick = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete the Supabase record for "${name}"?`)) {
      return;
    }
    setLoading(true);
    const success = await deleteDemoStudent(id);
    if (success) {
      setStudents(prev => prev.filter(s => s.id !== id));
      showNotification('success', `Student record "${name}" has been deleted from Supabase.`);
      if (editingStudent?.id === id) {
        resetForm();
      }
    } else {
      showNotification('error', 'Could not delete the record. Ensure connection and permission settings.');
    }
    setLoading(false);
  };

  const syncSchema = async () => {
    setStatusLoading(true);
    const result = await checkSupabaseStatus();
    setDbStatus(result);
    if (result.connected) {
      const demoData = await loadDemoStudents();
      setStudents(demoData);
      showNotification('success', 'Supabase database tables synchronized and verified!');
    } else {
      showNotification('error', 'Diagnostics check failed. Check keys or internet settings.');
    }
    setStatusLoading(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12 animate-fadeIn text-left">
      {/* Title block */}
      <div className="mb-8 border-b border-gray-500/10 pb-5">
        <div className="flex items-center space-x-2 text-orange-600 dark:text-orange-400 font-mono text-[11px] font-bold tracking-widest uppercase mb-1">
          <Database className="w-3.5 h-3.5" />
          <span>Real-time cloud database module</span>
        </div>
        <h2 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight text-blue-900 dark:text-blue-400">
          Supabase Storage Connection
        </h2>
        <p className="text-xs text-gray-550 dark:text-gray-400 mt-1 max-w-2xl leading-relaxed">
          Integrated with project ID <span className="font-mono bg-blue-500/10 text-blue-700 dark:text-blue-400 px-1 py-0.5 rounded text-[10px] uppercase font-bold">tnhjztqzavzqdlbidvgq</span> and client API key credentials. Manage, create, view, modify, and delete record instances live inside your schema space.
        </p>
      </div>

      {/* Notifications banner */}
      {notification && (
        <div className={`p-4 mb-6 rounded-xl border text-xs font-bold flex items-center space-x-2.5 shadow-sm transition-all duration-300 animate-slideDown ${
          notification.type === 'success' 
            ? 'bg-emerald-500/[0.04] border-emerald-500/20 text-emerald-800 dark:text-emerald-300'
            : 'bg-rose-500/[0.04] border-rose-500/20 text-rose-800 dark:text-rose-300'
        }`}>
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{notification.message}</span>
        </div>
      )}

      {/* Top row: connection status gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Connection gauge */}
        <div className={`lg:col-span-2 p-5 rounded-2xl border text-xs relative overflow-hidden flex flex-col justify-between ${
          dbStatus?.connected 
            ? 'bg-green-500/[0.02] border-green-500/20 text-green-900 dark:text-green-300'
            : 'bg-amber-500/[0.02] border-amber-500/20 text-amber-900 dark:text-amber-300'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center space-x-1.5 font-bold">
                {dbStatus?.connected ? <Wifi className="w-4 h-4 text-green-500" /> : <WifiOff className="w-4 h-4 text-amber-500" />}
                <span className="uppercase tracking-wide font-mono text-[10px]">Cloud Sync status</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-mono font-black ${
                dbStatus?.connected ? 'bg-green-500/20 text-green-500' : 'bg-amber-500/25 text-amber-500'
              }`}>
                {dbStatus?.connected ? 'Live Connected' : 'Checking connection'}
              </span>
            </div>
            
            <p className="font-mono text-[11px] select-all break-all text-gray-500 dark:text-gray-400">
              <strong className="font-sans font-extrabold mr-1">Database Endpoint:</strong> {SUPABASE_URL}
            </p>
            <p className="mt-2 text-slate-700 dark:text-slate-200 text-xs">
              {dbStatus?.message || 'Inspecting cloud backend connection parameters...'}
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-gray-400/10 flex items-center justify-between text-[10px]">
            <span className="font-mono text-gray-400">Project Engine ID: tnhjztqzavzqdlbidvgq</span>
            <button
              onClick={syncSchema}
              disabled={statusLoading}
              className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-[10px] font-extrabold uppercase tracking-wider text-blue-900 dark:text-blue-400 rounded-md flex items-center space-x-1 transition-all cursor-pointer disabled:opacity-40"
            >
              <RefreshCw className={`w-3 h-3 ${statusLoading ? 'animate-spin' : ''}`} />
              <span>{statusLoading ? 'Polling...' : 'Sync Connection'}</span>
            </button>
          </div>
        </div>

        {/* Info card overview */}
        <div className="p-5 rounded-2xl bg-slate-500/[0.03] border border-gray-450/10 text-xs flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-sm text-blue-900 dark:text-blue-400 flex items-center space-x-1">
              <Database className="w-4 h-4 text-orange-500" />
              <span>Table Details</span>
            </h4>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-[11px] mt-1.5">
              The test matches exactly your table request: <code className="text-orange-500 font-mono">supabase_demo_students</code>. 
              The frontend synchronizes with Supabase using safe Web Access Policies.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-450/10 text-[10px] grid grid-cols-2 gap-2 text-left text-gray-400 font-mono">
            <div>🚀 Connection: HTTPS</div>
            <div>📦 JS SDK: Official @supabase</div>
          </div>
        </div>
      </div>

      {/* Main Core Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Create / Edit Form */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-950 border border-gray-400/15 shadow-sm">
            <h3 className="font-display font-extrabold text-sm mb-4 text-blue-950 dark:text-blue-300 flex items-center space-x-2">
              <UserPlus className="w-4 h-4 text-orange-500" />
              <span>{editingStudent ? 'Edit Student Details' : 'Add New Student'}</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-500 dark:text-gray-400 mb-1">Full Student Name *</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formName}
                    onChange={e => {
                      setFormName(e.target.value);
                      if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                    }}
                    placeholder="E.g. Rajesh Kumar"
                    className={`w-full py-2 px-3 bg-slate-100 dark:bg-slate-900/40 border ${
                      errors.name ? 'border-red-500/50' : 'border-gray-300 dark:border-gray-800'
                    } rounded-xl focus:outline-none focus:border-orange-500 text-xs text-slate-850 dark:text-white transition-all`}
                  />
                </div>
                {errors.name && <p className="text-[10px] text-red-500 font-medium font-mono mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block font-bold text-gray-500 dark:text-gray-400 mb-1">Mobile Contact Number *</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-400 font-mono">+91</span>
                  <input
                    type="text"
                    maxLength={15}
                    value={formMobile}
                    onChange={e => {
                      setFormMobile(e.target.value);
                      if (errors.mobile) setErrors(prev => ({ ...prev, mobile: undefined }));
                    }}
                    placeholder="9918666000"
                    className={`w-full py-2 pl-11 pr-3 bg-slate-100 dark:bg-slate-900/40 border ${
                      errors.mobile ? 'border-red-500/50' : 'border-gray-300 dark:border-gray-800'
                    } rounded-xl focus:outline-none focus:border-orange-500 text-xs text-slate-850 dark:text-white transition-all font-mono`}
                  />
                </div>
                {errors.mobile && <p className="text-[10px] text-red-500 font-medium font-mono mt-1">{errors.mobile}</p>}
              </div>

              <div>
                <label className="block font-bold text-gray-500 dark:text-gray-400 mb-1">Select / Input Course *</label>
                <select
                  value={formCourse}
                  onChange={e => {
                    setFormCourse(e.target.value);
                    if (errors.course) setErrors(prev => ({ ...prev, course: undefined }));
                  }}
                  className={`w-full py-2 px-3 bg-slate-100 dark:bg-slate-900/40 border ${
                    errors.course ? 'border-red-500/50' : 'border-gray-300 dark:border-gray-800'
                  } rounded-xl focus:outline-none focus:border-orange-500 text-xs text-slate-850 dark:text-slate-300 transition-all`}
                >
                  <option value="">-- Choose Course Pathway --</option>
                  <option value="ADCA (Advance Diploma in Comp Application)">ADCA (Advance Diploma)</option>
                  <option value="DCA (Diploma in Computer Applications)">DCA (Diploma)</option>
                  <option value="CCC (Course on Computer Concepts)">CCC (CCC Concepts)</option>
                  <option value="O Level (NIELIT)">O Level Software</option>
                  <option value="Python & Web Development">Python & Web Dev</option>
                  <option value="Tally Gold Prime (Accounting)">Tally Prime Accounts</option>
                </select>
                {errors.course && <p className="text-[10px] text-red-500 font-medium font-mono mt-1">{errors.course}</p>}
              </div>

              <div className="pt-2 flex items-center space-x-2.5">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2 bg-orange-500 hover:bg-orange-600 font-bold text-xs text-white uppercase tracking-wider rounded-xl transition-all cursor-pointer disabled:opacity-50 text-center flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <span>{editingStudent ? 'Save Updates' : 'Add Student Record'}</span>
                  )}
                </button>
                {editingStudent && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="p-2 bg-slate-200 dark:bg-slate-850 hover:bg-slate-300 dark:hover:bg-slate-800 text-gray-500 dark:text-white rounded-xl cursor-pointer"
                    title="Cancel changes"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Quick diagnostics message */}
          <div className="p-4 rounded-xl bg-slate-500/[0.02] border border-gray-400/10 text-[11px] leading-relaxed text-gray-400/90 text-left">
            <span className="font-extrabold text-blue-900 dark:text-blue-400 font-sans block mb-1">Row Level Security Note:</span>
            To make sandbox operations instantly responsive, ensure <code className="text-orange-500 font-mono">Row Level Security</code> is set to public or tables are altered with <code className="text-gray-300">DISABLE ROW LEVEL SECURITY</code> as done in the database schema script script.
          </div>
        </div>

        {/* Right Side: Loaded Student List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-950 border border-gray-400/15 shadow-sm min-h-[400px] flex flex-col justify-between">
            <div>
              
              {/* Filter controls */}
              <div className="flex justify-between items-center flex-wrap gap-4 mb-4 pb-3 border-b border-gray-500/10">
                <h3 className="font-display font-extrabold text-sm text-blue-950 dark:text-blue-300">
                  Supabase Student Directory ({filteredStudents.length})
                </h3>
                <div className="relative w-full sm:w-56">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search name, course..."
                    className="w-full py-2 pl-9 pr-3 bg-slate-150/60 dark:bg-slate-900/45 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none text-xs text-slate-850 dark:text-white focus:border-orange-500 transition-all"
                  />
                </div>
              </div>

              {/* Skeletons/Loading state or Empty placeholder */}
              {loading && students.length === 0 ? (
                <div className="space-y-3 py-6">
                  {[1, 2, 3].map(item => (
                    <div key={item} className="p-4 rounded-xl border border-gray-400/5 bg-slate-500/[0.01] animate-pulse flex justify-between">
                      <div className="space-y-2 w-1/2">
                        <div className="h-4 bg-gray-300 dark:bg-slate-800 rounded w-3/4" />
                        <div className="h-3 bg-gray-300 dark:bg-slate-800 rounded w-1/2" />
                      </div>
                      <div className="h-7 bg-gray-300 dark:bg-slate-800 rounded w-12" />
                    </div>
                  ))}
                </div>
              ) : filteredStudents.length === 0 ? (
                <div className="py-12 text-center text-xs space-y-3">
                  <div className="w-12 h-12 bg-slate-200 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto text-gray-400">
                    <Database className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-700 dark:text-slate-350">
                      {students.length === 0 ? 'No Data Stored' : 'No matches found'}
                    </p>
                    <p className="text-gray-400 max-w-sm mx-auto mt-1 leading-relaxed">
                      {students.length === 0 
                        ? 'Ensure that the "supabase_demo_students" table has been created in your Supabase project (id tnhjztqzavzqdlbidvgq) using the SQL code provided below.' 
                        : 'Change your query to find other entries in the database.'}
                    </p>
                  </div>
                </div>
              ) : (
                /* Student List */
                <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1 scrollbar-thin">
                  {filteredStudents.map(student => (
                    <div
                      key={student.id}
                      className="p-4 rounded-xl border border-slate-300/40 dark:border-gray-800 bg-slate-200/[0.01] dark:bg-slate-900/[0.03] hover:border-orange-500/20 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1.5 flex-wrap gap-1">
                          <span className="font-bold text-xs text-blue-950 dark:text-blue-300 font-sans block">{student.name}</span>
                          <span className="px-2 py-0.5 rounded-full bg-orange-600/10 text-orange-600 dark:text-orange-400 text-[9px] font-semibold tracking-wide uppercase">
                            Joined Live
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[10px] text-gray-400 font-mono">
                          <span className="flex items-center space-x-1">
                            <Phone className="w-3 h-3 text-gray-400" />
                            <span>+91 {student.mobile}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <BookOpen className="w-3 h-3 text-gray-500" />
                            <span>{student.course}</span>
                          </span>
                          <span className="flex items-center space-x-1 sm:col-span-2">
                            <Calendar className="w-3 h-3 text-gray-500" />
                            <span>Created: {new Date(student.created_at).toLocaleString()}</span>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2.5 self-end sm:self-center border-t border-gray-400/5 sm:border-0 pt-2 sm:pt-0 w-full sm:w-auto justify-end">
                        <button
                          onClick={() => handleEditClick(student)}
                          className="p-1.5 hover:bg-orange-500/10 text-gray-500 dark:text-gray-300 hover:text-orange-500 rounded-lg transition-all cursor-pointer flex items-center space-x-1"
                          title="Edit details"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span className="text-[9px] uppercase font-bold font-sans">Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteClick(student.id, student.name)}
                          className="p-1.5 hover:bg-red-500/10 text-gray-500 dark:text-gray-300 hover:text-red-500 rounded-lg transition-all cursor-pointer flex items-center space-x-1"
                          title="Delete student"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span className="text-[9px] uppercase font-bold font-sans">Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* Bottom info banner */}
            <div className="pt-4 border-t border-gray-500/10 text-[10px] text-gray-450 dark:text-gray-400 font-mono flex items-center justify-between">
              <span>Cloud Engine: PostgreSQL</span>
              <span>Loaded: {students.length} record(s)</span>
            </div>
          </div>
        </div>

      </div>

      {/* SQL Script Section */}
      <div className="mt-10 p-6 rounded-2xl bg-slate-500/[0.03] border border-gray-400/10 text-xs">
        <h4 className="font-bold text-sm text-blue-900 dark:text-blue-400 flex items-center space-x-1.5">
          <Database className="w-4 h-4 text-orange-500" />
          <span>Execute Database Schema script</span>
        </h4>
        <p className="text-gray-550 dark:text-gray-400 leading-relaxed text-[11px] mt-2 mb-4">
          To ensure that the forms submit seamlessly to your Supabase project (<strong className="text-slate-800 dark:text-slate-200">tnhjztqzavzqdlbidvgq</strong>), copy the script below, navigate to your <strong className="text-slate-800 dark:text-slate-250">Supabase Dashboard &gt; SQL Editor &gt; New Query</strong>, paste it, and run the query:
        </p>

        <div className="relative">
          <button
            onClick={() => {
              navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
              setCopiedSchema(true);
              setTimeout(() => setCopiedSchema(false), 2000);
            }}
            className="absolute top-3 right-3 p-2 rounded-lg bg-slate-900 border border-slate-800 text-gray-400 hover:text-white transition-all flex items-center space-x-1 cursor-pointer"
            title="Copy schema SQL"
          >
            {copiedSchema ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="text-[10px] uppercase font-black font-mono">{copiedSchema ? 'Copied' : 'Copy SQL'}</span>
          </button>
          <pre className="p-4 rounded-xl bg-slate-950 text-emerald-400 font-mono text-[10px] h-60 overflow-y-scroll border border-slate-850 whitespace-pre scrollbar-thin select-all">
            {SUPABASE_SQL_SCHEMA}
          </pre>
        </div>
      </div>
    </div>
  );
}
