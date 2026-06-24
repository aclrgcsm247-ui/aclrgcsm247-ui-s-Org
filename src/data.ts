import { Course, Faculty, BlogPost, Notice, GalleryImage, Certificate, PlacementRecord, Student, Question, StudyNote, VideoLecture } from './types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'ccc',
    code: 'CCC',
    name: 'Course on Computer Concepts (CCC)',
    duration: '3 Months (80 Hours)',
    fees: 3500,
    eligibility: 'No Minimum Qualification, open to all',
    syllabus: [
      'Introduction to Computer & Operating Systems',
      'Word Processing (LibreOffice Writer / MS Word)',
      'Spreadsheets (LibreOffice Calc / MS Excel)',
      'Presentation (LibreOffice Impress / MS Powerpoint)',
      'Introduction to Internet, WWW and Web Browsers',
      'E-mail, Social Networking and E-Governance Services',
      'Oversight of Digital Financial Tools & Applications',
      'Overview of FutureSkills & Cyber Security'
    ],
    certificateDetails: 'NIELIT Gov Scheme recognized certificate, valid for all UP state government jobs (including UPSSSC VDO, Lekhpal, etc.).',
    careerOpportunities: ['Data Entry Operator', 'Office Assistant', 'E-Governance Coordinator', 'Computer Operator'],
    category: 'certificate'
  },
  {
    id: 'o_level',
    code: 'O-LEVEL',
    name: "O Level (NIELIT Foundation Course)",
    duration: '1 Year (2 Semesters)',
    fees: 15000,
    eligibility: '10+2 Pass or ITI Certificate course after class 10',
    syllabus: [
      'M1-R5: Information Technology Tools and Network Basics',
      'M2-R5: Web Designing & Publishing (HTML5, CSS3, JavaScript, Photo Editor, Angular/W3.CSS)',
      'M3-R5: Programming and Problem Solving through Python (Data Types, Control Loops, Functions, Modules, NumPy)',
      'M4-R5: Internet of Things and its Applications (Microcontrollers, Sensors, IoT Security)',
      'PR1-R5: Practical Examination based on all four subjects',
      'PJ1-R5: Complete Project submission evaluated by NIELIT'
    ],
    certificateDetails: 'Govt. of India (NIELIT - National Institute of Electronics & Information Technology) certified, Highly coveted for RO/ARO, ASI and high-tier government recruitments in UP.',
    careerOpportunities: ['Web Designer', 'UI/UX Developer', 'Python Programmer', 'IoT Application Integrator', 'Junior Backend Architect'],
    category: 'diploma'
  },
  {
    id: 'dca',
    code: 'DCA',
    name: 'Diploma in Computer Applications',
    duration: '6 Months',
    fees: 5500,
    eligibility: '10th / High School Pass',
    syllabus: [
      'Computer Fundamentals & Operating System (Windows)',
      'MS Office Suite (MS Word, MS Excel, MS PowerPoint)',
      'Database Management Systems (MS Access / FoxPro)',
      'Internet Application & E-Mail Operations',
      'Hindi / English Typing Skills (Kruti Dev & Mangal)',
      'Introduction to Financial Accounting tools'
    ],
    certificateDetails: 'Institutional Registered Diploma with ISO 9001:2015 certification, valid across private sector and multiple state level recruitments.',
    careerOpportunities: ['Office Supervisor', 'Front Desk Executive', 'Billing Clerk', 'Data Analyst Trainee'],
    category: 'diploma'
  },
  {
    id: 'adca',
    code: 'ADCA',
    name: 'Advanced Diploma in Computer Applications',
    duration: '12 Months (2 Semesters)',
    fees: 8500,
    eligibility: '10+2 Intermediate Pass',
    syllabus: [
      'Semester 1: Computer Fundamentals, GUI Operations, MS Office Suite, HTML & CSS, Core DTP (PageMaker, CorelDraw, Photoshop)',
      'Semester 2: Tally Prime with GST integrations, Advanced MS Excel, Python Programming introduction, Management Information Systems (MIS), Hardware & Networking basics, Live Project Work'
    ],
    certificateDetails: 'Advanced industry-accredited Diploma featuring comprehensive modules, coupled with a performance grade-sheet.',
    careerOpportunities: ['Senior Computer Operator', 'DTP Graphic Designer', 'Accountant Assistant', 'System Support Technician', 'Computer Teacher'],
    category: 'diploma'
  },
  {
    id: 'tally_gst',
    code: 'TALLY-GST',
    name: 'Tally Prime with GST Certification',
    duration: '3 Months',
    fees: 4000,
    eligibility: '10+2 Intermediate (Commerce background preferred but open to all)',
    syllabus: [
      'Basic Principles of Accounting & Double Entry System',
      'Company Creation / Chart of Accounts in Tally Prime',
      'Inventory Management & Voucher Customizations',
      'GST Composition & Regular Scheme Billing (CGST, SGST, IGST)',
      'TDS (Tax Deducted at Source) & TCS Settings',
      'E-Way Bill Generation & GSTR-1, GSTR-3B Reporting',
      'Year-End Auditing, Profit & Loss Statements, Balance Sheets'
    ],
    certificateDetails: 'Professional GST Accounting Specialist Certification, highly valued by regional traders, industries, and accounting houses.',
    careerOpportunities: ['Professional Accountant', 'Taxation Assistant', 'Billing Specialist', 'Tally Operator', 'Inventory Control Executive'],
    category: 'certificate'
  },
  {
    id: 'python_programming',
    code: 'PYTHON',
    name: 'Python Programming Essentials',
    duration: '3 Months',
    fees: 4500,
    eligibility: '10+2 Pass with Basic Logic or Coding Orientation',
    syllabus: [
      'Python Installation, Interactive Shell & Scripting Modes',
      'Variables, Data Types, Lists, Tuples, Dictionaries, Sets',
      'Conditional Checks (if-else) and Loop Iterations (while, for)',
      'Function Declarations, Scope, Lambda & Inline Expressiveness',
      'Module Imports, PIP Package Manager, and Standard Library overview',
      'Object-Oriented Programming (Classes, Inheritance, Polymorphism)',
      'File Handling, Error Exceptions, and Introduction to NumPy / Pandas'
    ],
    certificateDetails: 'Gold Standard Programmer Certificate specifying core coding competence and project execution milestones.',
    careerOpportunities: ['Junior Software Developer', 'Data Preprocessor', 'Systems Automation scriptwriter', 'QA Automation Analyst'],
    category: 'programming'
  },
  {
    id: 'web_dev',
    code: 'WEB-DEV',
    name: 'Full Stack Web Development (MERN)',
    duration: '6 Months',
    fees: 7500,
    eligibility: '10+2 and interest in coding and designs',
    syllabus: [
      'Module 1: Semantic HTML5, CSS3, Flexbox, CSS Grid & Tailwind CSS utilities',
      'Module 2: JavaScript Modern ES6+ syntax, Promises, DOM rendering, Fetch API',
      'Module 3: React.js Component trees, State and Hooks, Custom Hooks, Navigation',
      'Module 4: Express.js, Node.js Backends, RESTful API design, Middlewares',
      'Module 5: MongoDB Schema formulation, Queries, and Cloud Atlas synchronization',
      'Module 6: Git, GitHub version controls, deployment on Cloud platforms and Hosting APIs'
    ],
    certificateDetails: 'Professional Web Software Engineer Certificate outlining specialized front/back project credits.',
    careerOpportunities: ['Frontend Engineer', 'Backend API Programmer', 'React UI Developer', 'Freelance Web Consultant'],
    category: 'programming'
  },
  {
    id: 'graphic_design',
    code: 'GRAPHIC',
    name: 'Professional Graphic Designing',
    duration: '3 Months',
    fees: 4500,
    eligibility: '10th Pass with creative visualization',
    syllabus: [
      'Adobe Photoshop: Layers, Masks, Photo Retouching, Double Exposure, Color Correction',
      'CorelDraw: Vector illustrations, Logo Creation, Flex Banner layouts, Brochure drafting',
      'Adobe Illustrator: Paths, Vector Assets, Flat icons, Typography design, SVG exports',
      'Print Media vs Digital Media guidelines (CMYK vs RGB, DPI settings, Bleeds)',
      'Portfolio Construction: 10 completed banner projects and 5 logo works'
    ],
    certificateDetails: 'Professional Media Designer certificate highlighting digital publishing competence.',
    careerOpportunities: ['Graphic Artist', 'Logo & Identity Designer', 'UI Assets Creator', 'Social Media Campaign Layout Specialist', 'Media Editor'],
    category: 'other'
  },
  {
    id: 'digital_marketing',
    code: 'MARKETING',
    name: 'Digital Marketing & SEO Catalyst',
    duration: '3 Months',
    fees: 5000,
    eligibility: '10+2 Intermediate with General Internet awareness',
    syllabus: [
      'Fundamentals of Inbound/Outbound Digital Marketing',
      'Search Engine Optimization (SEO): Keyword Research, On-Page & Off-Page SEO',
      'Social Media Marketing (SMM): Facebook Pages, Instagram Campaigns, Budget Settings',
      'Google Ads & Meta Ads dashboard setup, PPC bidding, and Audience profiling',
      'Content Writing strategies and Canva UI Asset Creation',
      'Email Marketing templates, Google Analytics analytics tracking'
    ],
    certificateDetails: 'Digital Marketing strategist certification indicating expert dashboard operations.',
    careerOpportunities: ['SEO Specialist', 'Social Media Manager', 'PPC Account Manager', 'Content Marketing Officer', 'Freelance Campaigner'],
    category: 'other'
  },
  {
    id: 'typing_course',
    code: 'TYPING',
    name: 'Professional Computer Typing Mastery',
    duration: '2 Months',
    fees: 2000,
    eligibility: 'No prerequisites',
    syllabus: [
      'English Typing Mechanics: Touch typing principles, Home/Top/Bottom rows practices',
      'Hindi Typing: Krutidev 010 and Mangal font in Remington Gail layout',
      'Speed Building Drills: Paragraph practices, accuracy optimization, word counts',
      'Interactive Typing Software training and State Board/Competitive Mock tests (e.g. Allahabad High Court RO/ARO, Junior Assistant Typist)'
    ],
    certificateDetails: 'Verified speed & accuracy assessment card specifying WPM count (Words Per Minute) and accuracy percentage.',
    careerOpportunities: ['Typist Clerk', 'Data Entry Executive', 'Court Stenographer Assistant', 'Revenue Typist Clerk'],
    category: 'other'
  },
  {
    id: 'ms_office',
    code: 'MS-OFFICE',
    name: 'Office Automation & MS Office Excel Specialist',
    duration: '2 Months',
    fees: 2500,
    eligibility: '10th / Open to all',
    syllabus: [
      'Operating System configurations and File/Directory Management',
      'MS Word: Document styling, Mail Merge, Macro utilities, PDF reports generation',
      'MS Excel: VLOOKUP/HLOOKUP, Pivot Tables, SUMIFS, logical IF nesting, charts',
      'MS PowerPoint: Slide master templates, voice attachments, visual transitions',
      'Email drafting protocols, Printing parameters, and Cloud Storage management'
    ],
    certificateDetails: 'Office Automation Mastery Certificate endorsing corporate workspace computer skills.',
    careerOpportunities: ['Administrative Assistant', 'MIS Reporting Executive', 'Coordinator', 'Billing Executive'],
    category: 'certificate'
  }
];

export const INITIAL_FACULTY: Faculty[] = [
  {
    id: 'fac-1',
    name: "Er. Ramesh Chandra Shukla",
    qualification: "M.Tech in Computer Science, MCA",
    experience: "15+ Years in Information Technology & Professional Coaching",
    subjects: ["O Level", "Python Programming", "Computer Networks", "Cyber Security"],
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80",
    role: "Founder & Executive Director"
  },
  {
    id: 'fac-2',
    name: "Mrs. Shashi Mishra",
    qualification: "MCA, B.Ed, ISO Qualified Computer Trainer",
    experience: "10+ Years in Education and Web Technologies",
    subjects: ["Web Designing (HTML/CSS/JS)", "DCA Module", "ADCA Module", "MS Office Tools"],
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    role: "Academic Head & Senior Faculty"
  },
  {
    id: 'fac-3',
    name: "Mr. Alok Pratap Singh",
    qualification: "MBA in Operations, M.Com, Certified Accounting Professional",
    experience: "8+ Years in Financial Accounting & GST Audits",
    subjects: ["Tally Prime with GST", "Digital Financial Tools", "E-Governance Services", "Digital Marketing"],
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    role: "Senior Financial Accounting Faculty"
  },
  {
    id: 'fac-4',
    name: "Miss Priya Gupta",
    qualification: "BFA (Bachelor of Fine Arts), ISO Graphics Consultant",
    experience: "5+ Years in Digital Media & Graphic Design",
    subjects: ["CorelDraw Layouts", "Adobe Photoshop CC", "Adobe Illustrator", "Typing (English & Hindi)"],
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    role: "Design Lead & Typing Coordinator"
  }
];

export const INITIAL_NOTICES: Notice[] = [
  {
    id: 'not-1',
    title: "NIELIT O Level and CCC Exam Registration July 2026",
    titleHindi: "नाइलिट ओ लेवल और सीसीसी परीक्षा पंजीकरण जुलाई 2026",
    category: "exam",
    description: "Important message for all students: Last date to fill July 2026 NIELIT O Level (M1, M2, M3, M4) Exam forms through ACL center is June 30, 2026. Submit your exam fee at the administrative counter as soon as possible to avoid late fees.",
    descriptionHindi: "सभी छात्रों के लिए महत्वपूर्ण सूचना: एसीएल केंद्र के माध्यम से जुलाई 2026 नाइलिट ओ लेवल (M1, M2, M3, M4) परीक्षा फॉर्म भरने की अंतिम तिथि 30 जून 2026 है। विलंब शुल्क से बचने के लिए जल्द से जल्द प्रशासनिक पटल पर अपनी परीक्षा शुल्क जमा करें।",
    date: "2026-06-18",
    active: true
  },
  {
    id: 'not-2',
    title: "Special Scholarship Test for DCA and ADCA courses on June 28, 2026",
    titleHindi: "28 जून 2026 को डीसीए और एडीसीए पाठ्यक्रमों के लिए विशेष छात्रवृत्ति परीक्षा",
    category: "scholarship",
    description: "Academy of Computer Learning is organizing an offline Scholarship exam on Sunday, June 28, 2026. Students securing more than 85% marks can avail up to 50% waiver in overall tuition fees for ADCA or Tally-GST courses. Free enrollment opens for everyone in Colonelganj, Gonda region.",
    descriptionHindi: "एकेडमी ऑफ कंप्यूटर लर्निंग रविवार, 28 जून 2026 को एक ऑफलाइन छात्रवृत्ति परीक्षा आयोजित कर रहा है। 85% से अधिक अंक प्राप्त करने वाले छात्र एडीसीए या टैली-जीएसटी पाठ्यक्रमों के कुल शिक्षण शुल्क में 50% तक की छूट प्राप्त कर सकते हैं। कर्नलगंज, गोंडा क्षेत्र में सभी के लिए नि:शुल्क नामांकन खुला है।",
    date: "2026-06-16",
    active: true
  },
  {
    id: 'not-3',
    title: "Launch of New Web Development and Python Batches",
    titleHindi: "नए वेब डेवलपमेंट और पायथन बैचों का शुभारंभ",
    category: "batch",
    description: "Admissions are open for custom weekend and evening batches of Full Stack MERN Development and Python Web automation. Time slots available: 08:00 AM - 10:00 AM and 04:00 PM - 06:00 PM starting July 1, 2026. Limited seats per batch (25 computers max per lab class).",
    descriptionHindi: "फुल स्टैक मर्न डेवलपमेंट और पायथन वेब ऑटोमेशन के विशेष सप्ताहांत और शाम के बैचों के लिए प्रवेश खुले हैं। समय स्लॉट उपलब्ध हैं: 1 जुलाई, 2026 से सुबह 08:00 - सुबह 10:00 और शाम 04:00 - शाम 06:00 बजे। प्रति बैच सीमित सीटें (प्रति लैब कक्षा अधिकतम 25 कंप्यूटर)।",
    date: "2026-06-12",
    active: true
  },
  {
    id: 'not-4',
    title: "Upcoming Campus Placement Drive: Web Creators Gonda Division",
    titleHindi: "आगामी कैंपस प्लेसमेंट ड्राइव: वेब क्रिएटर्स गोंडा डिवीजन",
    category: "job",
    description: "Web Creators Pvt Ltd is visiting Academy of Computer Learning, Colonelganj, Gonda branch for recruiting Junior Web Designers & Tally Accountants on July 5, 2026. Eligibility: O-Level / Web-Dev / Tally certified with minimum 60% grades. Registrations open on online portal.",
    descriptionHindi: "वेब क्रिएटर्स प्राइवेट लिमिटेड 5 जुलाई, 2026 को जूनियर वेब डिजाइनर और टैली अकाउंटेंट की भर्ती के लिए कर्नलगंज, गोंडा शाखा में एकेडमी ऑफ कंप्यूटर लर्निंग का दौरा कर रहे हैं। पात्रता: न्यूनतम 60% अंकों के साथ ओ-लेवल / वेब-देव / टैली प्रमाणित। ऑनलाइन पोर्टल पर पंजीकरण खुले हैं।",
    date: "2026-06-10",
    active: true
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: "How to Clear NIELIT CCC Exam on Your First Attempt - Full Masterclass",
    titleHindi: "अपने पहले प्रयास में नाइलिट सीसीसी परीक्षा को कैसे क्रैक करें - पूरी मास्टरक्लास",
    excerpt: "Learn the exact blueprint, highest-yield topics, and online exam tricks to score an S-grade (85%+) or A-grade in your upcoming CCC examination.",
    excerptHindi: "आगामी सीसीसी परीक्षा में एस-ग्रेड (85%+) या ए-ग्रेड प्राप्त करने के लिए सटीक ब्लूप्रिंट, और ऑनलाइन परीक्षा ट्रिक्स सीखें।",
    content: "The NIELIT Course on Computer Concepts (CCC) is a crucial prerequisite for numerous Uttar Pradesh government jobs. To pass it gracefully in your first go, you must organize your study around key chapters:\n\n1. **High Weightage Areas**: Focus intensely on LibreOffice Writer, Calc, and Impress (which replaced classic MS Office in latest syllabus versions). Memorize all key shortcut keys like F2 for formulabar, Ctrl+F3 for auto text, and Ctrl+Shift+S.\n\n2. **FutureSkills and Cyber Security**: Around 15-20 questions cover digital bank wallets (UPI, BHIM, USSD), IoT, cloud, blockchain, AI, and password safety.\n\n3. **Practice Online Simulator Tests**: The format consists of 100 MCQs (with no negative markings) in 90 minutes. Practice our built-in ACL simulator tests daily which mimic the real NIELIT interface. Maintain consistency and pay attention to basic definitions.",
    contentHindi: "नाइलिट कंप्यूटर अवधारणाओं का कोर्स (सीसीसी) उत्तर प्रदेश की कई सरकारी नौकरियों के लिए एक महत्वपूर्ण पूर्वापेक्षा है। इसे अपने पहले प्रयास में सुगमता से पास करने के लिए, आपको इन प्रमुख अध्यायों पर ध्यान देना चाहिए:\n\n1. **अधिक अंक वाले क्षेत्र**: लिब्रेऑफिस राइटर, कैल्क और इम्प्रेस पर ध्यान केंद्रित करें। सभी शॉर्टकट कुंजियों जैसे F2, Ctrl+F3 और Ctrl+Shift+S को याद करें।\n\n2. **फ्यूचरस्किल्स और साइबर सुरक्षा**: लगभग 15-20 प्रश्न डिजिटल बैंक वॉलेट (UPI, BHIM, USSD), IoT, क्लाउड, ब्लॉकचेन, AI और पासवर्ड सुरक्षा को कवर करते हैं।\n\n3. **ऑनलाइन सिम्युलेटर टेस्ट का अभ्यास करें**: परीक्षा में 90 मिनट में 100 बहुविकल्पीय प्रश्न (बिना किसी नेगेटिव मार्किंग के) होते हैं। हमारे इन-बिल्ट एसीएल टेस्ट का प्रतिदिन अभ्यास करें।",
    author: "Er. Ramesh Chandra Shukla",
    date: "2026-06-15",
    category: "CCC Guidance",
    readTime: "5 min read",
    coverImage: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800&auto=format&fit=crop&q=80",
    tags: ["CCC", "NIELIT", "Exam Tips", "Gonda Education"]
  },
  {
    id: 'blog-2',
    title: "Unlocking Career Opportunities Post O-Level: Government & Tech Sectors",
    titleHindi: "ओ-लेवल के बाद करियर के अवसरों को अनलॉक करें: सरकारी और तकनीकी क्षेत्र",
    excerpt: "A comprehensive guide on jobs open for NIELIT O-Level passed candidates in UP state government and remote software assignments.",
    excerptHindi: "उत्तर प्रदेश राज्य सरकार और रिमोट सॉफ्टवेयर असाइनमेंट में नाइलिट ओ-लेवल पास उम्मीदवारों के लिए खुले रोजगार पर एक व्यापक गाइड।",
    content: "The NIELIT 'O' Level is highly respected by various state public service recruitments. Having this certification unlocks jobs such as:\n\n- **UPPSC Review Officer (RO) / Assistant Review Officer (ARO)**: The statutory eligibility lists O-Level certification as essential for qualifying for computer tests.\n- **UP Police Assistant Sub-Inspector (Clerical/Accounts)**: Excellent opportunities for candidates seeking police administrative support roles.\n- **Web Designer / Frontend Developer**: Since the M2-R5 module covers advanced CSS, HTML, and JavaScript, O-Level graduates possess core competencies to immediately apply for regional IT houses or build full-scale freelance portfolios.\n\nAt building your skill set, focus on practical concepts. Our lab in Colonelganj ensures every student codes their own IoT modules with microcontrollers so they have genuine structural industry experience.",
    contentHindi: "नाइलिट 'ओ' लेवल विभिन्न राज्य लोक सेवा भर्तियों द्वारा अत्यधिक सम्मानित है। इस प्रमाणन के बाद निम्न नौकरी के दरवाजे खुलते हैं:\n\n- **यूपीपीएससी समीक्षा अधिकारी (RO) / सहायक समीक्षा अधिकारी (ARO)**: बुनियादी पात्रता में कंप्यूटर परीक्षणों के लिए 'ओ' लेवल को आवश्यक घोषित किया गया है।\n- **यूपी पुलिस सहायक उप-निरीक्षक**: पुलिस प्रशासनिक सहायता भूमिकाओं की इच्छा रखने वाले उम्मीदवारों के लिए शानदार अवसर।\n- **वेब डिजाइनर / फ्रंटएंड डेवलपर**: चूंकि M2-R5 मॉड्यूल उन्नत CSS, HTML और JS को कवर करता है, इसलिए आप आसानी से प्राइवेट टेक जॉब भी पा सकते हैं।",
    author: "Mrs. Shashi Mishra",
    date: "2026-06-11",
    category: "Career Guidance",
    readTime: "7 min read",
    coverImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
    tags: ["O Level", "Govt Jobs", "Uttar Pradesh", "Web Technologies"]
  },
  {
    id: 'blog-3',
    title: "Understanding GST Accounting Entries in Tally Prime: A Beginner Checklist",
    titleHindi: "टैली प्राइम में जीएसटी अकाउंटिंग प्रविष्टियों को समझना: शुरुआती चेकलिस्ट",
    excerpt: "Master CGST, SGST, and IGST calculations inside Tally Prime bills with this quick structural walkthrough.",
    excerptHindi: "इस त्वरित गाइड के साथ टैली प्राइम बिलों के भीतर सीजीएसटी, एसजीएसटी और आईजीएसटी गणनाओं में महारत हासिल करें।",
    content: "Working with taxation in regional industries requires flawless journal voucher posting. Follow this structured checklist:\n\n1. **Define HSN/SAC Codes**: Input exact values during ledger creation of stock items with proper percentages (5%, 12%, 18%, or 28%).\n2. **Establish Local tax ledgers vs Inter-state ledgers**: CGST (Central) and SGST (State) will activate strictly when buyer is local (Uttar Pradesh). For outer state deliveries (e.g. Bihar, Delhi), configure IGST (Integrated).\n3. **Calculate Auto Tax**: In Tally Prime, press Alt+A inside the purchase/sales voucher layout to verify the tax breakout before posting. This single action prevents mismatched returns during monthly GSTR fillings.",
    contentHindi: "क्षेत्रीय उद्योगों में कराधान के साथ काम करने के लिए सटीक जर्नल वाउचर पोस्टिंग की आवश्यकता होती है। इस चेकलिस्ट का पालन करें:\n\n1. **HSN/SAC कोड परिभाषित करें**: उचित प्रतिशत (5%, 12%, 18%) के साथ स्टॉक आइटम के बहीखाता निर्माण के दौरान सही इनपुट दर्ज करें।\n2. **स्थानीय बनाम अंतर-राज्यीय बहीखाता**: सीजीएसटी और एसजीएसटी केवल तभी सक्रिय होंगे जब खरीदार स्थानीय (उत्तर प्रदेश) हो। अन्य राज्यों (जैसे बिहार, दिल्ली) के लिए, आईजीएसटी चुनें।\n3. **स्वचालित टैक्स की गणना**: टैली प्राइम में, पोस्टिंग से पहले टैक्स ब्रेकआउट को सत्यापित करने के लिए खरीद/बिक्री वाउचर लेआउट के भीतर Alt+A दबाएं।",
    author: "Mr. Alok Pratap Singh",
    date: "2026-06-08",
    category: "Tally Prime",
    readTime: "4 min read",
    coverImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80",
    tags: ["Tally Prime", "GST Accounting", "Taxation", "Commerce Gonda"]
  }
];

export const INITIAL_GALLERY: GalleryImage[] = [
  { id: 'gal-1', title: "State-of-the-Art Computer Laboratory", category: 'classroom', imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=80" },
  { id: 'gal-2', title: "Hands-on Practical Programming Classes", category: 'classroom', imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80" },
  { id: 'gal-3', title: "Annual Information Technology Workshop 2026", category: 'workshops', imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80" },
  { id: 'gal-4', title: "Meritorious Student Certificate Distribution", category: 'distribution', imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80" },
  { id: 'gal-5', title: "Independence Day Cultural Activities", category: 'activities', imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80" },
  { id: 'gal-6', title: "Career Placement and Mock Coding Round", category: 'events', imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80" }
];

export const INITIAL_PLACEMENTS: PlacementRecord[] = [
  {
    id: 'plc-1',
    studentName: "Abhishek Srivastava",
    courseName: "ADCA (Advanced Diploma)",
    companyName: "WebTech Solutions, Lucknow",
    packageText: "3.6 LPA",
    designation: "Junior Web Developer",
    studentPhoto: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: 'plc-2',
    studentName: "Nisha Pathak",
    courseName: "Tally Prime with GST",
    companyName: "Gonda Agro Industries Private Ltd",
    packageText: "2.4 LPA",
    designation: "Senior Billing Accountant",
    studentPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: 'plc-3',
    studentName: "Amit Kumar Verma",
    courseName: "O Level & Python",
    companyName: "E-Governance Center, UP Govt Project",
    packageText: "3.2 LPA",
    designation: "District Data Operator Leads",
    studentPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
  },
  {
    id: 'plc-4',
    studentName: "Kajal Tiwari",
    courseName: "Web Development (MERN)",
    companyName: "Infinia Software solutions Ltd",
    packageText: "4.5 LPA",
    designation: "Frontend React Developer",
    studentPhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80"
  }
];

export const INITIAL_CERTIFICATES: Certificate[] = [
  { id: 'cert-101', certificateNo: "ACL-CERT-2026-9041", studentId: "ACL-2026-1001", studentName: "Rohan Kumar Maurya", courseName: "O Level (NIELIT foundation)", issueDate: "2026-05-10", grade: "A Grade (Very Good)", validity: "verified" },
  { id: 'cert-102', certificateNo: "ACL-CERT-2026-9042", studentId: "ACL-2026-1002", studentName: "Preeti Kashyap", courseName: "Advanced Diploma in Computer Applications", issueDate: "2026-05-15", grade: "S Grade (Outstanding)", validity: "verified" },
  { id: 'cert-103', certificateNo: "ACL-CERT-2026-9043", studentId: "ACL-2026-1003", studentName: "Aman Gupta", courseName: "Tally Prime with GST", issueDate: "2026-05-18", grade: "B Grade (Good)", validity: "verified" },
  { id: 'cert-104', certificateNo: "ACL-CERT-2026-9044", studentId: "ACL-2026-1004", studentName: "Supriya Pandey", courseName: "Course on Computer Concepts (CCC)", issueDate: "2026-06-01", grade: "A Grade (Very Good)", validity: "verified" }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: "ACL-2026-1001",
    fullName: "Rohan Kumar Maurya",
    fatherName: "Shri Santosh Kumar Maurya",
    mobileNumber: "9876543210",
    email: "rohan@gmail.com",
    dob: "2002-04-12",
    gender: "Male",
    address: "Bazar Mohalla, Colonelganj, Gonda, UP",
    courseId: "o_level",
    passportPhoto: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80",
    aadhaarCard: "123456789012",
    marksheetPhoto: "Rohan_Maurya_Marksheet.png",
    admissionDate: "2026-01-10",
    admissionStatus: "approved",
    attendancePercentage: 92,
    feesPaid: 10000,
    totalFees: 15000,
    rollNo: "STUDENT-001",
    password: "password",
    rank: 3,
    progress: 75
  },
  {
    id: "ACL-2026-1002",
    fullName: "Preeti Kashyap",
    fatherName: "Shri Om Prakash Kashyap",
    mobileNumber: "8765432109",
    email: "preeti@gmail.com",
    dob: "2003-09-21",
    gender: "Female",
    address: "In front of Kotwali, Colonelganj, Gonda, UP",
    courseId: "adca",
    passportPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80",
    aadhaarCard: "987654321012",
    marksheetPhoto: "Preeti_Kashyap_Marksheet.png",
    admissionDate: "2026-01-15",
    admissionStatus: "approved",
    attendancePercentage: 98,
    feesPaid: 8500,
    totalFees: 8500,
    rollNo: "STUDENT-002",
    password: "password",
    rank: 1,
    progress: 95
  }
];

export const ONLINE_MOCK_TESTS: { [courseId: string]: Question[] } = {
  nielit: [
    {
      id: "q-1",
      testId: "nielit",
      question: "Which of the following is equivalent to one Gigabyte (1 GB) of computer storage?",
      questionHindi: "निम्न में से कौन कंप्यूटर स्टोरेज के एक गीगाबाइट (1 जीबी) के बराबर है?",
      options: ["1024 Kilobytes", "1024 Megabytes", "1024 Terabytes", "1024 Bytes"],
      optionsHindi: ["1024 किलोबाइट", "1024 मेगाबाइट", "1024 टेराबाइट", "1024 बाइट"],
      correctAnswer: 1
    },
    {
      id: "q-2",
      testId: "nielit",
      question: "In LibreOffice Writer, which shortcut key is used for 'Save As' action?",
      questionHindi: "लिब्रेऑफिस राइटर में, 'Save As' क्रिया के लिए किस शॉर्टकट कुंजी का उपयोग किया जाता है?",
      options: ["Ctrl + S", "Ctrl + Shift + S", "Ctrl + Alt + S", "F12"],
      optionsHindi: ["Ctrl + S", "Ctrl + Shift + S", "Ctrl + Alt + S", "F12"],
      correctAnswer: 1
    },
    {
      id: "q-3",
      testId: "nielit",
      question: "What is the full form of BHIM UPI in Indian Digital Financial Framework?",
      questionHindi: "भारतीय डिजिटल वित्तीय ढांचे में BHIM UPI का पूर्ण रूप क्या है?",
      options: [
        "Bharat Interface for Money - Unified Payments Interface",
        "Bharat Instant Money - Universal Port Interface",
        "Basic Integrated Money - Unified Protocol Internet",
        "Billing Integrated Money - Unified Payments Installation"
      ],
      optionsHindi: [
        "भारत इंटरफ़ेस फॉर मनी - यूनिफाइड पेमेंट्स इंटरफ़ेस",
        "भारत इंस्टेंट मनी - यूनिवर्सल पोर्ट इंटरफ़ेस",
        "बेसिक इंटीग्रेटेड मनी - यूनिफाइड प्रोटोकॉल इंटरनेट",
        "बिलिंग इंटीग्रेटेड मनी - यूनिफाइड पेमेंट्स इंस्टॉलेशन"
      ],
      correctAnswer: 0
    },
    {
      id: "q-4",
      testId: "nielit",
      question: "Which component of computer CPU is responsible for comparison and mathematical operations?",
      questionHindi: "कंप्यूटर सीपीयू का कौन सा घटक तुलना और गणितीय संचालन के लिए जिम्मेदार है?",
      options: ["Control Unit (CU)", "Arithmetic Logic Unit (ALU)", "Registers Panel", "RAM Module"],
      optionsHindi: ["नियंत्रण इकाई (CU)", "अंकगणितीय तर्क इकाई (ALU)", "रजिस्टर पैनल", "रैम मॉड्यूल"],
      correctAnswer: 1
    },
    {
      id: "q-5",
      testId: "nielit",
      question: "In internet technology, what is the length of IPv6 address protocol?",
      questionHindi: "इंटरनेट तकनीक में IPV6 एड्रेस प्रोटोकॉल की लंबाई कितनी होती है?",
      options: ["32 Bits", "64 Bits", "128 Bits", "256 Bits"],
      optionsHindi: ["32 बिट्स", "64 बिट्स", "128 बिट्स", "256 बिट्स"],
      correctAnswer: 2
    },
    {
      id: "q-6",
      testId: "nielit",
      question: "Which network topology features a centralized point which hub or switch handles?",
      questionHindi: "किस नेटवर्क टोपोलॉजी में एक केंद्रीकृत बिंदु होता है जिसे हब या स्विच संभालता है?",
      options: ["Ring Topology", "Bus Topology", "Star Topology", "Mesh Topology"],
      optionsHindi: ["रिंग टोपोलॉजी", "बस टोपोलॉजी", "स्टार टोपोलॉजी", "मेष टोपोलॉजी"],
      correctAnswer: 2
    }
  ],
  tally: [
    {
      id: "q-t1",
      testId: "tally",
      question: "Which pre-defined voucher key is allocated to Receipt entry in Tally Prime?",
      questionHindi: "टैली प्राइम में रसीद (Receipt) प्रविष्टि के लिए कौन सी पूर्व-निर्धारित वाउचर कुंजी आवंटित है?",
      options: ["F4", "F5", "F6", "F7"],
      optionsHindi: ["F4", "F5", "F6", "F7"],
      correctAnswer: 2
    },
    {
      id: "q-t2",
      testId: "tally",
      question: "Which tax is applicable when transactions take place between traders of two distinct Indian states (e.g., UP to Delhi)?",
      questionHindi: "जब दो अलग-अलग राज्यों (जैसे यूपी से दिल्ली) के व्यापारियों के बीच लेनदेन होता है तो कौन सा कर लागू होता है?",
      options: ["SGST", "CGST", "IGST", "UTGST"],
      optionsHindi: ["SGST", "CGST", "IGST", "UTGST"],
      correctAnswer: 2
    },
    {
      id: "q-t3",
      testId: "tally",
      question: "In double entry system of accounting, purchase ledger always carries which core balance?",
      questionHindi: "दोषी प्रविष्टि लेखांकन प्रणाली में, खरीद बहीखाता (Purchase Ledger) हमेशा कौन सा मुख्य शेष रखता है?",
      options: ["Debit Balance", "Credit Balance", "Neutral Balance", "Asset balance with no statement"],
      optionsHindi: ["डेबिट शेष (Debit Balance)", "क्रेडिट शेष (Credit Balance)", "तटस्थ शेष (Neutral Balance)", "बिना विवरण वाली संपत्ति शेष"],
      correctAnswer: 0
    }
  ]
};

// Application Translations
export const TRANSLATIONS = {
  en: {
    navHome: "Home",
    navAbout: "About Us",
    navCourses: "Courses",
    navAdmission: "Online Admission",
    navDashboard: "Student Dashboard",
    navAdmin: "Admin Panel",
    navTest: "Online Tests",
    navFaculty: "Instructors",
    navGallery: "Gallery",
    navNotice: "Notices",
    navVerify: "Verify Certificate",
    navCareer: "Placements",
    navBlog: "Education Blog",
    navContact: "Contact",
    enrollNow: "Enroll Now",
    freeDemo: "Free Demo Class",
    tagline: "Empowering Futures with Elite Digital Competencies",
    address: "Kotwali Tiraha, Lucknow Gonda Highway, Colonelganj, Gonda, Uttar Pradesh - 271502",
    footerText: "Copyright © 2026 Academy of Computer Learning. Authorized ISO 9001:2015 Certified Computer Education Center. Governed by Regional Computer Education Framework.",
    courseDetails: "Course Details",
    duration: "Duration",
    fees: "Total Course Fee",
    eligibility: "Eligibility Criteria",
    syllabus: "Covered Syllabus Modules",
    certificates: "Certification Scope",
    careerOpp: "Career Paths",
    noticesHeadline: "Official Desk & Latest Notifications",
    studentSuccessStats: "Our Academic Milestone Statistics",
    successCountTitle: "Over 5000+ Qualified Alumnus across Gonda & UP",
    verifiedTitle: "National ISO 9001:2015 & Government-recognized Educational Ecosystem",
    classesTitle: "Fully air-conditioned computer laboratory with individual screens and high-speed Wi-Fi.",
    hindiLang: "हिंदी भाषा",
    englishLang: "English",
    darkMode: "Dark UI",
    lightMode: "Light UI",
    directorDesk: "From the Director's Desk",
    vision: "Our Strategic Vision",
    mission: "Our Core Mission"
  },
  hi: {
    navHome: "होम",
    navAbout: "हमारे बारे में",
    navCourses: "पाठ्यक्रम",
    navAdmission: "ऑनलाइन प्रवेश",
    navDashboard: "छात्र डैशबोर्ड",
    navAdmin: "प्रशासक पैनल",
    navTest: "ऑनलाइन परीक्षा",
    navFaculty: "शिक्षक",
    navGallery: "गैलरी",
    navNotice: "सूचनाएं",
    navVerify: "सर्टिफिकेट सत्यापन",
    navCareer: "प्लेसमेंट",
    navBlog: "शैक्षणिक ब्लॉग",
    navContact: "संपर्क करें",
    enrollNow: "अभी प्रवेश लें",
    freeDemo: "फ्री डेमो क्लास",
    tagline: "उत्कृष्ट डिजिटल योग्यताओं के साथ भविष्य को सशक्त बनाना",
    address: "कोतवाली तिराहा, लखनऊ गोंडा हाईवे, कर्नलगंज, गोंडा, उत्तर प्रदेश - 271502",
    footerText: "कॉपीराइट © 2026 अकैडमी ऑफ़ कंप्यूटर लर्निंग। अधिकृत आईएसओ 9001:2015 प्रमाणित कंप्यूटर शिक्षा केंद्र।",
    courseDetails: "पाठ्यक्रम का विवरण",
    duration: "अवधि",
    fees: "कुल पाठ्यक्रम शुल्क",
    eligibility: "पात्रता मानदंड",
    syllabus: "कवर किए गए सिलेबस मॉड्यूल",
    certificates: "प्रमाणन का दायरा",
    careerOpp: "करियर के अवसर",
    noticesHeadline: "कार्यालयी नोटिस बोर्ड और नवीनतम अपडेट",
    studentSuccessStats: "हमारे शैक्षणिक मील के पत्थर",
    successCountTitle: "गोंडा और यूपी में 5000+ से अधिक योग्य पूर्व छात्र",
    verifiedTitle: "राष्ट्रीय ISO 9001:2015 और सरकार-मान्यता प्राप्त शैक्षिक पारिस्थितिकी तंत्र",
    classesTitle: "व्यक्तिगत स्क्रीन और हाई-स्पीड वाई-फाई के साथ पूर्ण वातानुकूलित कंप्यूटर प्रयोगशाला।",
    hindiLang: "हिंदी भाषा",
    englishLang: "English",
    darkMode: "डार्क मोड",
    lightMode: "लाइट मोड",
    directorDesk: "निदेशक का संदेश",
    vision: "हमारा रणनीतिक विजन",
    mission: "हमारा मुख्य मिशन"
  }
};

export const INITIAL_NOTES: StudyNote[] = [
  {
    id: 'note-1',
    title: 'Chapter 1: Hardware Logic & LibreOffice Shortcuts',
    courseId: 'all',
    fileSize: '2.4 MB',
    downloadUrl: 'CCC_Shortcuts_Chapter1.pdf',
    createdAt: '2026-06-01'
  },
  {
    id: 'note-2',
    title: 'Chapter 2: Financial Wallet UPI Services & Security',
    courseId: 'ccc',
    fileSize: '1.8 MB',
    downloadUrl: 'UPI_DigitalFinance_Chapter2.pdf',
    createdAt: '2026-06-05'
  },
  {
    id: 'note-3',
    title: 'Chapter 3: Python syntax data types cheatsheets',
    courseId: 'adca',
    fileSize: '4.1 MB',
    downloadUrl: 'PythonSyntax_ADCA_Chapter3.pdf',
    createdAt: '2026-06-10'
  }
];

export const INITIAL_VIDEOS: VideoLecture[] = [
  {
    id: 'vid-1',
    title: 'Lecture 1: Linux Command lines & Terminal workflows',
    courseId: 'all',
    duration: '15:40 Mins',
    instructor: 'Er. Ramesh Chandra Shukla',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    createdAt: '2026-06-01'
  },
  {
    id: 'vid-2',
    title: 'Lecture 2: Advanced excel spreadsheets pivot configurations',
    courseId: 'adca',
    duration: '22:15 Mins',
    instructor: 'Er. Ramesh Chandra Shukla',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    createdAt: '2026-06-05'
  }
];

export const INITIAL_ATTENDANCE = [
  { id: 'att-1', studentId: 'ACL-2026-1001', studentName: 'Rohan Kumar Maurya', date: '2026-06-15', status: 'present' },
  { id: 'att-2', studentId: 'ACL-2026-1001', studentName: 'Rohan Kumar Maurya', date: '2026-06-16', status: 'present' },
  { id: 'att-3', studentId: 'ACL-2026-1001', studentName: 'Rohan Kumar Maurya', date: '2026-06-17', status: 'present' },
  { id: 'att-4', studentId: 'ACL-2026-1001', studentName: 'Rohan Kumar Maurya', date: '2026-06-18', status: 'present' },
  { id: 'att-5', studentId: 'ACL-2026-1001', studentName: 'Rohan Kumar Maurya', date: '2026-06-19', status: 'absent' },
  { id: 'att-6', studentId: 'ACL-2026-1001', studentName: 'Rohan Kumar Maurya', date: '2026-06-20', status: 'present' },
  { id: 'att-7', studentId: 'ACL-2026-1001', studentName: 'Rohan Kumar Maurya', date: '2026-06-22', status: 'present' },
  { id: 'att-8', studentId: 'ACL-2026-1001', studentName: 'Rohan Kumar Maurya', date: '2026-06-23', status: 'present' },
  { id: 'att-9', studentId: 'ACL-2026-1001', studentName: 'Rohan Kumar Maurya', date: '2026-06-24', status: 'present' },

  { id: 'att-10', studentId: 'ACL-2026-1002', studentName: 'Preeti Kashyap', date: '2026-06-15', status: 'present' },
  { id: 'att-11', studentId: 'ACL-2026-1002', studentName: 'Preeti Kashyap', date: '2026-06-16', status: 'present' },
  { id: 'att-12', studentId: 'ACL-2026-1002', studentName: 'Preeti Kashyap', date: '2026-06-17', status: 'present' },
  { id: 'att-13', studentId: 'ACL-2026-1002', studentName: 'Preeti Kashyap', date: '2026-06-18', status: 'present' },
  { id: 'att-14', studentId: 'ACL-2026-1002', studentName: 'Preeti Kashyap', date: '2026-06-19', status: 'present' },
  { id: 'att-15', studentId: 'ACL-2026-1002', studentName: 'Preeti Kashyap', date: '2026-06-20', status: 'present' },
  { id: 'att-16', studentId: 'ACL-2026-1002', studentName: 'Preeti Kashyap', date: '2026-06-22', status: 'present' },
  { id: 'att-17', studentId: 'ACL-2026-1002', studentName: 'Preeti Kashyap', date: '2026-06-23', status: 'present' },
  { id: 'att-18', studentId: 'ACL-2026-1002', studentName: 'Preeti Kashyap', date: '2026-06-24', status: 'present' },
];
