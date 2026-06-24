import React, { useState, useEffect, useRef } from 'react';
import { Test, Question, Result, Student, Certificate } from '../types';
import { ONLINE_MOCK_TESTS } from '../data';
import { 
  Award, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  ChevronRight, 
  Zap, 
  HelpCircle, 
  RotateCcw,
  Sparkles,
  Trophy
} from 'lucide-react';

interface OnlineTestProps {
  currentStudent: Student | null;
  lang: 'en' | 'hi';
  darkMode: boolean;
  onAddResult: (res: Result) => void;
  onAddCertificate: (cert: Certificate) => void;
}

export default function OnlineTest({
  currentStudent,
  lang,
  darkMode,
  onAddResult,
  onAddCertificate
}: OnlineTestProps) {
  // Test selection states
  const [activeTestId, setActiveTestId] = useState<'nielit' | 'tally' | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  // Core quiz state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: number }>({});
  const [timeLeft, setTimeLeft] = useState(0); // in seconds
  const [testFinished, setTestFinished] = useState(false);

  // Latest calculated result
  const [calculatedResult, setCalculatedResult] = useState<Result | null>(null);
  const [generatedCertCode, setGeneratedCertCode] = useState<string | null>(null);

  // Timer reference
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startQuiz = (testType: 'nielit' | 'tally') => {
    const rawQuestions = ONLINE_MOCK_TESTS[testType] || [];
    // Shuffle questions slightly for randomization
    const randomized = [...rawQuestions].sort(() => 0.5 - Math.random());
    setQuestions(randomized);
    setCurrentIdx(0);
    setSelectedAnswers({});
    setTimeLeft(testType === 'nielit' ? 300 : 180); // 5 mins or 3 mins
    setActiveTestId(testType);
    setIsTesting(true);
    setTestFinished(false);
    setCalculatedResult(null);
    setGeneratedCertCode(null);
  };

  // Timer effect
  useEffect(() => {
    if (isTesting && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleFinishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTesting, timeLeft]);

  const handleSelectOption = (qId: string, optIdx: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: optIdx
    }));
  };

  const handleFinishQuiz = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsTesting(false);
    setTestFinished(true);

    // Score calculations
    let correctCount = 0;
    questions.forEach((q) => {
      const selected = selectedAnswers[q.id];
      if (selected !== undefined && selected === q.correctAnswer) {
        correctCount += 1;
      }
    });

    const totalCount = questions.length;
    const finalPercentage = parseFloat(((correctCount / totalCount) * 100).toFixed(1));
    const passed = finalPercentage >= 60; // 60% is standard passing percentage

    // Generate certificates if passed & student is logged in
    let certCode = '';
    const uniqueId = Math.floor(10000 + Math.random() * 90000);
    
    if (passed && currentStudent) {
      certCode = `ACL-CERT-2026-${uniqueId}`;
      setGeneratedCertCode(certCode);

      // Create credential record in root certificates database
      const newCert: Certificate = {
        id: certCode,
        certificateNo: certCode,
        studentId: currentStudent.id,
        studentName: currentStudent.fullName,
        courseName: activeTestId === 'nielit' ? "O Level Foundation Course" : "Tally Prime Specialist",
        issueDate: new Date().toISOString().split('T')[0],
        grade: finalPercentage >= 90 ? "S Grade (Outstanding)" : 
               finalPercentage >= 80 ? "A Grade (Very Good)" : "B Grade (Good)",
        validity: "verified"
      };
      onAddCertificate(newCert);
    }

    const testTitle = activeTestId === 'nielit' ? "O-Level foundation Mock" : "Tally Prime GST check";
    
    // Result payload
    const resultPayload: Result = {
      id: `RES-${uniqueId}`,
      testId: activeTestId || 'generic',
      testName: testTitle,
      studentId: currentStudent?.id || "GUEST-USER",
      studentName: currentStudent?.fullName || "Guest Scholar",
      score: correctCount,
      totalQuestions: totalCount,
      correctAnswers: correctCount,
      percentage: finalPercentage,
      passed,
      date: new Date().toISOString().split('T')[0],
      certificateCode: certCode || undefined
    };

    onAddResult(resultPayload);
    setCalculatedResult(resultPayload);
  };

  // Timer string formatting
  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className={`w-full min-h-screen py-12 md:py-16 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
      <div className="max-w-4xl mx-auto px-6 text-left">
        
        {/* Intros headings */}
        {!isTesting && !testFinished && (
          <div className="space-y-10 animate-fadeIn">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-orange-500 text-xs font-bold uppercase tracking-widest font-mono">
                {lang === 'en' ? 'Online Skills Evaluation' : 'ऑनलाइन परीक्षा प्रणाली'}
              </span>
              <h2 className="font-display font-extrabold text-3xl text-blue-950 dark:text-blue-400">
                {lang === 'en' ? 'MCQ Mock Exam & Testing Lounge' : 'कंप्यूटर ऑनलाइन मॉक टेस्ट रूम'}
              </h2>
              <p className="text-xs text-gray-500 text-center">
                {lang === 'en'
                  ? 'A real simulated exam environment for testing computer competencies. Passing gets you an instantly verified certificate.'
                  : 'सीसीसी, ओ-लेवल और टैली कोर्सेज के लिए विशेष बहुविकल्पीय परीक्षा प्रणाली। ६०% से अधिक स्कोर करने वाले छात्रों के लिए तत्काल सर्टिफिकेट सर्टिफिकेट!'}
              </p>
            </div>

            {/* Test Categories Selector list cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Test Card 1: NIELIT CCC/OLevel */}
              <div className={`p-6 border rounded-2xl space-y-4 ${
                darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-100 shadow-md'
              }`}>
                <div className="flex h-12 w-12 items-center justify-center bg-orange-500/10 text-orange-500 rounded-xl">
                  <Award className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="bg-sky-500/10 text-sky-400 font-mono text-[9px] font-bold uppercase border border-sky-500/20 px-2 py-0.5 rounded">6 Questions • NIELIT Syllabus</span>
                  <h3 className="font-display font-extrabold text-base md:text-lg text-blue-900 dark:text-blue-400">
                    NIELIT CCC & O-Level Computer Mock Exam
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Test your logic surrounding hardware fundamentals, LibreOffice configurations, digital transaction UPI standards, internet IPV routing, and IT tools.
                  </p>
                </div>
                <div className="pt-2 flex justify-between items-center text-xs">
                  <span className="flex items-center space-x-1 text-gray-400 font-mono">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span>Duration: 05:00 Mins</span>
                  </span>
                  <button
                    onClick={() => startQuiz('nielit')}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-xl shadow cursor-pointer transition-all border border-orange-400/20"
                    id="start-mock-nielit-btn"
                  >
                    Start Exam
                  </button>
                </div>
              </div>

              {/* Test Card 2 Tally Prime & Accounting */}
              <div className={`p-6 border rounded-2xl space-y-4 ${
                darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-100 shadow-md'
              }`}>
                <div className="flex h-12 w-12 items-center justify-center bg-blue-500/10 text-blue-500 rounded-xl">
                  <Trophy className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="bg-orange-500/10 text-orange-400 font-mono text-[9px] font-bold uppercase border border-orange-500/20 px-2 py-0.5 rounded">3 Questions • Commerce Specialist</span>
                  <h3 className="font-display font-extrabold text-base md:text-lg text-blue-900 dark:text-blue-400">
                    Tally Prime GST & Ledger Accounting Drills
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Assess journals posting mechanisms, ledger credit/debit balances configurations, and inter-state IGST taxation allocations inside Tally Prime bills.
                  </p>
                </div>
                <div className="pt-2 flex justify-between items-center text-xs">
                  <span className="flex items-center space-x-1 text-gray-400 font-mono">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span>Duration: 03:00 Mins</span>
                  </span>
                  <button
                    onClick={() => startQuiz('tally')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl shadow cursor-pointer transition-all border border-blue-500/20"
                    id="start-mock-tally-btn"
                  >
                    Start Exam
                  </button>
                </div>
              </div>

            </div>

            {/* Note regarding user status */}
            {!currentStudent && (
              <div className="p-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 text-xs text-yellow-500 flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Important Notice for Guest Trial:</p>
                  <p className="text-[11px] text-gray-400">
                    You are taking the exam as guest scholar. To save exam logs in your dashboard and get printable ISO verification certificates upon scoring &gt; 60%, please register an admission form first or login.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* QUIZ ACTIVE VIEW */}
        {isTesting && questions.length > 0 && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header info strip */}
            <div className={`p-4 rounded-xl border flex items-center justify-between text-xs font-mono font-bold ${
              darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="text-orange-500 tracking-wider">Exam: {activeTestId === 'nielit' ? 'NIELIT Master' : 'Tally Accounting'}</span>
              <span className="flex items-center space-x-1 font-sans text-red-500 animate-pulse bg-red-500/5 px-2.5 py-1 rounded border border-red-500/15">
                <Clock className="w-3.5 h-3.5" />
                <span>Timer: {formatTime(timeLeft)}</span>
              </span>
            </div>

            {/* Questions panel layout */}
            <div className={`p-6 md:p-8 rounded-2xl border ${
              darkMode ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-200 shadow'
            }`}>
              {/* index stepper */}
              <div className="flex items-center justify-between border-b border-gray-400/10 pb-3 mb-4 text-xs font-mono">
                <span className="text-gray-400 uppercase tracking-widest font-semibold">Question {currentIdx + 1} of {questions.length}</span>
                <span className="text-orange-400 font-bold bg-orange-500/5 border border-orange-500/15 px-2 py-0.5 rounded">Single Answer</span>
              </div>

              {/* Text display bilingual */}
              <div className="space-y-2 mb-6 select-none">
                <p className="text-base font-bold leading-snug">{questions[currentIdx].question}</p>
                <p className="text-xs text-orange-500 leading-snug font-medium italic">हिन्दी: {questions[currentIdx].questionHindi}</p>
              </div>

              {/* Options panel */}
              <div className="space-y-3">
                {questions[currentIdx].options.map((opt, idx) => {
                  const isSelected = selectedAnswers[questions[currentIdx].id] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(questions[currentIdx].id, idx)}
                      className={`w-full p-4 rounded-xl border text-left text-xs text-semibold select-all font-sans relative transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 cursor-pointer ${
                        isSelected 
                          ? 'bg-orange-500/10 border-orange-500 text-orange-400 font-semibold' 
                          : darkMode 
                          ? 'bg-slate-900 border-slate-800 hover:border-slate-700' 
                          : 'bg-slate-50 border-slate-200 hover:bg-slate-100 shadow-sm'
                      }`}
                      id={`quiz-option-${idx}`}
                    >
                      <div className="flex flex-col">
                        <span>{opt}</span>
                        <span className="text-[10px] text-gray-400 italic font-mono">हिन्दी: {questions[currentIdx].optionsHindi[idx]}</span>
                      </div>
                      {isSelected && <Zap className="w-4 h-4 text-orange-500" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation quiz footer step controls */}
            <div className="flex justify-between items-center">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(prev => prev - 1)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg border border-gray-400/10 hover:bg-gray-500/5 ${
                  currentIdx === 0 ? 'opacity-40 cursor-not-allowed' : ''
                }`}
              >
                Previous Question
              </button>

              <div className="flex items-center space-x-2">
                {currentIdx < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIdx(prev => prev + 1)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 px-5 rounded-lg flex items-center space-x-1 cursor-pointer"
                    id="quiz-next-btn"
                  >
                    <span>Next Question</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleFinishQuiz}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold text-xs py-2.5 px-6 rounded-lg flex items-center space-x-1 select-none animate-bounce"
                    id="quiz-finish-btn"
                  >
                    <CheckCircle className="w-4 h-4 text-white" />
                    <span>Submit & Calculate Results</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        )}

        {/* RESULTS FEEDBACK REPORT */}
        {testFinished && calculatedResult && (
          <div className="space-y-6 max-w-xl mx-auto text-center animate-fadeIn">
            
            <div className={`p-8 border rounded-2xl relative overflow-hidden space-y-4 ${
              calculatedResult.passed 
                ? darkMode ? 'bg-slate-950 border-green-500/15' : 'bg-white border-green-500/20 shadow-xl'
                : darkMode ? 'bg-slate-950 border-red-500/15' : 'bg-white border-red-500/19 shadow-xl'
            }`} id="quiz-result-sheet">
              
              <div className="space-y-1">
                <span className={`inline-flex items-center justify-center p-3 rounded-full mb-2 ${
                  calculatedResult.passed ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                }`}>
                  {calculatedResult.passed ? <Trophy className="w-10 h-10" /> : <AlertCircle className="w-10 h-10" />}
                </span>
                <h3 className="font-display font-extrabold text-xl text-blue-900 dark:text-blue-400">
                  {calculatedResult.passed ? 'Congratulations, You Passed!' : 'Exam Attempt Completed'}
                </h3>
                <p className="text-xs text-gray-400">
                  {lang === 'en' ? 'Simulated Academic Score Card' : 'अकादमिक स्कोर कार्ड विवरण'}
                </p>
              </div>

              {/* Data Table */}
              <div className="p-5 rounded-xl border border-gray-400/10 bg-slate-500/[0.02] font-mono text-xs text-left space-y-2.5">
                <div className="flex justify-between border-b border-gray-400/10 pb-1.5">
                  <span className="text-gray-400 uppercase font-bold text-[10px]">Student Name</span>
                  <span className="font-bold">{calculatedResult.studentName}</span>
                </div>
                <div className="flex justify-between border-b border-gray-400/10 pb-1.5">
                  <span className="text-gray-400 uppercase font-bold text-[10px]">Test Name</span>
                  <span className="font-bold text-sky-400 capitalize">{calculatedResult.testName}</span>
                </div>
                <div className="flex justify-between border-b border-gray-400/10 pb-1.5">
                  <span className="text-gray-400 uppercase font-bold text-[10px]">Response Score</span>
                  <span className="font-bold">{calculatedResult.score} / {calculatedResult.totalQuestions} Questions</span>
                </div>
                <div className="flex justify-between border-b border-gray-400/10 pb-1.5">
                  <span className="text-gray-400 uppercase font-bold text-[10px]">Agregate Percent</span>
                  <span className="font-extrabold text-orange-500">{calculatedResult.percentage}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 uppercase font-bold text-[10px]">Result Verdict</span>
                  <span className={`font-bold ${calculatedResult.passed ? 'text-green-500' : 'text-red-500'}`}>
                    {calculatedResult.passed ? 'PASSED (VERIFIED)' : 'FAILED (RETRIAL KEY AVAILABLE)'}
                  </span>
                </div>

                {/* Print Verification certificate output */}
                {generatedCertCode && (
                  <div className="mt-4 pt-3.5 border-t border-dashed border-gray-400/20 text-center space-y-1 bg-green-500/5 p-3 rounded-lg border border-green-500/15">
                    <p className="font-sans font-bold text-green-500 text-[11px] flex items-center justify-center space-x-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>OFFICIAL VERIFICATION KEY GENERATED:</span>
                    </p>
                    <p className="text-sm font-bold text-orange-400 tracking-wider font-mono select-all">
                      {generatedCertCode}
                    </p>
                    <p className="font-sans text-[10px] text-gray-400 leading-normal">
                      Copy this serial and type it inside the **&quot;Verify Certificate&quot;** page on top header list to test authenticity!
                    </p>
                  </div>
                )}
              </div>

              {/* Control Action selectors */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                <button
                  onClick={() => {
                    setActiveTestId(null);
                    setTestFinished(false);
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-6 rounded-xl text-xs uppercase cursor-pointer flex items-center space-x-1 border border-orange-400/15"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Choose Another Test</span>
                </button>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
