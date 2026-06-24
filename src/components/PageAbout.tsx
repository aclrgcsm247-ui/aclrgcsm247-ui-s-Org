import { INITIAL_FACULTY, TRANSLATIONS } from '../data';
import { Award, CheckCircle2, Eye, ShieldCheck, HeartPulse, Sparkles, MapPin } from 'lucide-react';

interface PageAboutProps {
  lang: 'en' | 'hi';
  darkMode: boolean;
}

export default function PageAbout({ lang, darkMode }: PageAboutProps) {
  const t = TRANSLATIONS[lang];

  return (
    <div className={`w-full min-h-screen py-12 md:py-16 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Header Introduction */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-orange-500 text-xs font-bold uppercase tracking-widest font-mono">
            {lang === 'en' ? 'Who We Are' : 'हमारे बारे में'}
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-blue-950 dark:text-blue-400">
            {lang === 'en' ? 'Academy of Computer Learning' : 'एकेडमी ऑफ़ कंप्यूटर लर्निंग'}
          </h2>
          <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-sans">
            {lang === 'en'
              ? 'Founded with a solid vision to bring premium, ISO-certified high-end computer training to Colonelganj, Gonda district. We support both Hindi & English instruction models.'
              : 'कर्नलगंज (गोंडा) में उच्च गुणवत्ता वाली, आईएसओ-प्रमाणित कंप्यूटर विज्ञान शिक्षा प्रदान करने के लिए स्थापित अग्रणी संस्थान। हम हिंदी और अंग्रेजी दोनों माध्यमों में शिक्षा प्रदान करते हैं।'}
          </p>
        </div>

        {/* Director Message & Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 relative">
            {/* Visual background pattern */}
            <div className="absolute inset-0 bg-orange-500 rounded-sm transform rotate-3 scale-99 opacity-10"></div>
            <img 
              className="w-full h-[380px] object-cover rounded-sm shadow-xl border-4 border-orange-500/10 relative z-10" 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80" 
              alt="Director Er. Ramesh Chandra Shukla"
              referrerPolicy="no-referrer"
            />
            {/* Overlay tag */}
            <div className="absolute bottom-4 left-4 right-4 z-20 bg-slate-950/85 backdrop-blur border border-white/10 p-4 rounded-sm text-white">
              <p className="font-bold text-sm tracking-tight text-orange-400">Er. Ramesh Chandra Shukla</p>
              <p className="text-[10px] text-gray-400 font-mono">Founder & Executive Director</p>
            </div>
          </div>

          <div className="lg:col-span-7 text-left space-y-4">
            <div className="inline-flex items-center space-x-1 bg-blue-950/10 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-sm px-2.5 py-1 text-xs font-semibold">
              <Award className="w-4 h-4 text-orange-500" />
              <span>{t.directorDesk}</span>
            </div>
            
            <h3 className="font-display font-extrabold text-2xl text-blue-900 dark:text-blue-400">
              {lang === 'en' ? '"Digital Literacy is the Ultimate Empowerment"' : '"डिजिटल साक्षरता ही परम सशक्तिकरण है"'}
            </h3>
            
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-sans">
              {lang === 'en'
                ? "Dear Students and Guardians, since our inception in Colonelganj, Gonda, we have pledged to make computer literacy affordable, practical, and highly synchronized with industry demands. We understand that certificates are useless if not backed by functional skills. Hence, our lab is loaded with state-of-the-art computers, smart projectors, and live routers."
                : "प्रिय छात्रों और अभिभावकों, कर्नलगंज (गोंडा) में अपनी स्थापना के बाद से, हमने कंप्यूटर साक्षरता को वहनीय, व्यावहारिक और उद्योग की मांगों के साथ अत्यधिक तालमेल बिठाने का संकल्प लिया है। हम समझते हैं कि यदि प्रमाण पत्र व्यावहारिक कौशल द्वारा समर्थित नहीं हैं तो वे बेकार हैं।"}
            </p>
            
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-sans mt-2">
              {lang === 'en'
                ? "Our NIELIT courses (CCC, O Level) are structured methodically. Every student undergoes extensive laboratory drills, weekly mock tests, and continuous evaluation so their state exams are cleared on the very first attempt. I welcome you all to explore the magnificent ocean of computer learning with our veteran faculties."
                : "हमारे नाइलिट पाठ्यक्रम (सीसीसी, ओ-लेवल) व्यवस्थित रूप से संरचित हैं। प्रत्येक छात्र व्यापक प्रयोगशाला प्रशिक्षण, साप्ताहिक मॉक टेस्ट और निरंतर मूल्यांकन से गुजरता है ताकि उनकी वास्तविक नाइलिट परीक्षा बहुत पहले प्रयास में क्रैक हो सके।"}
            </p>

            <div className="flex items-center space-x-2 text-xs font-semibold font-mono text-orange-500 pt-2">
              <span>Warm Regards,</span>
              <span className="bg-orange-500/10 px-2 py-1 rounded-sm">Directorate Desk, ACL Colonelganj</span>
            </div>
          </div>
        </div>

        {/* Vision and Mission (Two columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision card */}
          <div className={`p-8 rounded-sm border border-l-4 border-l-blue-750 text-left space-y-4 ${
            darkMode ? 'bg-slate-900 border-y-slate-800 border-r-slate-800' : 'bg-slate-50 border-y-slate-200 border-r-slate-200 shadow-sm'
          }`}>
            <span className="p-3 inline-block bg-orange-500/10 border border-orange-500/20 text-orange-500 rounded-sm">
              <Eye className="w-6 h-6" />
            </span>
            <h4 className="font-display font-bold text-lg text-blue-900 dark:text-blue-400">
              {t.vision}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {lang === 'en'
                ? "To bridge the rural-urban digital literacy gap in Colonelganj, Gonda region by creating an ecosystem where every student qualifies for state and software jobs through deep computer proficiency and certifications."
                : "गोंडा जिले में ग्रामीण-शहरी डिजिटल विभाजन को पाटना। हम एक ऐसा पारिस्थितिकी तंत्र तैयार करना चाहते हैं जहां प्रत्येक छात्र उत्कृष्ट कंप्यूटर दक्षता और प्रामाणिक प्रमाण पत्रों के माध्यम से राज्यीय और राष्ट्रीय नौकरियों के लिए योग्य बन सके।"}
            </p>
          </div>

          {/* Mission card */}
          <div className={`p-8 rounded-sm border border-l-4 border-l-orange-500 text-left space-y-4 ${
            darkMode ? 'bg-slate-900 border-y-slate-800 border-r-slate-800' : 'bg-slate-50 border-y-slate-200 border-r-slate-200 shadow-sm'
          }`}>
            <span className="p-3 inline-block bg-blue-500/10 border border-blue-500/20 text-blue-500 rounded-sm">
              <ShieldCheck className="w-6 h-6" />
            </span>
            <h4 className="font-display font-bold text-lg text-blue-900 dark:text-blue-400">
              {t.mission}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {lang === 'en'
                ? "To deliver affordable, structured computer courses (CCC, DCA, ADCA, Tally) leveraging personal mentor guidance, advanced lab facilities, regular real-life placement assists, and auto assessment tools."
                : "सुलभ और वहनीय दरों पर व्यवस्थित, नौकरी-उन्मुख कंप्यूटर पाठ्यक्रम (जैसे सीसीसी, ओ-लेवल, एडीसीए, टैली जीएसटी) प्रदान करना। जिसके अंतर्गत व्यक्तिगत प्रशिक्षण, सप्ताहिक मॉक टेस्ट और प्लेसमेंट सहायता शामिल हैं।"}
            </p>
          </div>
        </div>

        {/* Why Choose Us - Infographics */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h3 className="font-display font-extrabold text-2xl text-blue-900 dark:text-blue-400">
              {lang === 'en' ? 'Why Colonelganj Academy Stands Apart' : 'हम क्यों हैं सबसे अलग?'}
            </h3>
            <p className="text-xs text-gray-500 font-sans">{lang === 'en' ? 'Accompanying multiple advantages' : 'कर्नलगंज, गोंडा क्षेत्र में नंबर #1 विकल्प'}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-5 border border-l-4 border-l-blue-700 border-y-gray-400/10 border-r-gray-400/10 rounded-sm space-y-2 bg-white dark:bg-slate-950">
              <CheckCircle2 className="w-5 h-5 text-orange-500" />
              <h5 className="font-bold text-sm text-slate-800 dark:text-slate-100">{lang === 'en' ? 'Individual Computer Station' : 'व्यक्तिगत कंप्यूटर की सुविधा'}</h5>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">We strictly ensure 1:1 computer allotment. Zero sharing policy during practice laboratory hours.</p>
            </div>

            <div className="p-5 border border-l-4 border-l-orange-500 border-y-gray-400/10 border-r-gray-400/10 rounded-sm space-y-2 bg-white dark:bg-slate-950">
              <CheckCircle2 className="w-5 h-5 text-orange-500" />
              <h5 className="font-bold text-sm text-slate-800 dark:text-slate-100">{lang === 'en' ? 'Authorized ISO Registration' : 'आईएसओ अधिकृत पंजीकरण'}</h5>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Nationally valid certifications, aligned directly under ISO registration standards with QR validation.</p>
            </div>

            <div className="p-5 border border-l-4 border-l-blue-700 border-y-gray-400/10 border-r-gray-400/10 rounded-sm space-y-2 bg-white dark:bg-slate-950">
              <CheckCircle2 className="w-5 h-5 text-orange-500" />
              <h5 className="font-bold text-sm text-slate-800 dark:text-slate-100">{lang === 'en' ? 'Power Backup & AC lab' : 'अनवरत बिजली और एसी लैब'}</h5>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Equipped with reliable inverter generator systems, keeping lab functional during UP power cuts.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
