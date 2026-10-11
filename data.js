/* data.js
   ข้อมูลทั้งหมดของเว็บไซต์ อยากแก้ตำแหน่งงานหรือหลักสูตรมาแก้ที่ไฟล์นี้ที่เดียว
   เปลี่ยนรูปได้ที่ฟิลด์ image (ใส่ path รูปของตัวเองแทนได้เลย) */
'use strict';

/* =========================
   Jobs
========================= */
const jobs = [
  {
    id: 1,
    title: 'AI Engineer / Machine Learning Engineer',
    company: 'NexGen AI Solutions Co., Ltd.',
    salary: '35,000–60,000 THB/month',
    type: 'Full-time',
    mode: 'Hybrid',
    level: 'Junior–Mid Level',
    image: 'images/AI-AssistedFrontendDeveloper.jpg',
    short: 'พัฒนาโซลูชัน AI ด้วย Machine Learning และ Generative AI เพื่อแก้ปัญหาในโลกจริง',
    desc: 'บริษัทกำลังมองหา AI Engineer ที่สนใจพัฒนาโซลูชันปัญญาประดิษฐ์ เพื่อช่วยให้องค์กรทำงานได้รวดเร็วและมีประสิทธิภาพมากขึ้น โดยนำ Machine Learning และ Generative AI มาประยุกต์ใช้กับปัญหาในโลกจริง',
    duties: [
      'พัฒนาและทดสอบโมเดล Machine Learning ด้วย Python',
      'สร้างระบบ AI สำหรับวิเคราะห์ข้อมูล พยากรณ์ และจำแนกข้อมูล',
      'ประยุกต์ใช้ Generative AI และ Large Language Models (LLMs)',
      'เตรียมและทำความสะอาดข้อมูล พร้อมประเมินประสิทธิภาพของโมเดล',
      'ทำงานร่วมกับทีม Software Developer และ Data Analyst',
      'จัดทำเอกสารกระบวนการพัฒนาและผลการทดสอบ'
    ],
    quals: [
      'ปริญญาตรีด้าน Computer Science, IT, Data Science หรือสาขาที่เกี่ยวข้อง',
      'มีพื้นฐาน Python และการเขียนโปรแกรม',
      'เข้าใจ Machine Learning และ Statistics เบื้องต้น',
      'หากรู้จัก Pandas, NumPy, Scikit-learn หรือ PyTorch จะได้รับการพิจารณาเป็นพิเศษ',
      'สนใจ AI และพร้อมเรียนรู้เทคโนโลยีใหม่',
      'มีโปรเจกต์ AI หรือ Portfolio จะได้รับการพิจารณาเป็นพิเศษ'
    ],
    benefits: [
      'ประกันสุขภาพและประกันสังคม',
      'งบประมาณสำหรับเรียนคอร์ส AI และสอบ Certificate',
      'สนับสนุนการเข้าร่วมงานสัมมนาด้านเทคโนโลยี',
      'ทำงานแบบ Hybrid ตามนโยบายบริษัท'
    ]
  },
  {
    id: 2,
    title: 'AI-Assisted Frontend Developer',
    company: 'DigitalNext Innovation Co., Ltd.',
    salary: '25,000–45,000 THB/month',
    type: 'Full-time',
    mode: 'On-site / Hybrid',
    level: 'Junior–Mid Level',
    image: 'images/AIEngineerMachineLearningEngineer.jpg',
    short: 'สร้างเว็บ Responsive ด้วย HTML, CSS, JavaScript โดยใช้เครื่องมือ AI ช่วยเขียนและตรวจโค้ด',
    desc: 'พัฒนาเว็บไซต์และเว็บแอปพลิเคชันที่ตอบสนองต่อทุกขนาดหน้าจอ โดยใช้ HTML5, CSS, JavaScript และเครื่องมือ AI ช่วยในการเขียน ตรวจสอบ และปรับปรุงโค้ด เพื่อเพิ่มประสิทธิภาพในการพัฒนาซอฟต์แวร์',
    duties: [
      'พัฒนาเว็บไซต์ด้วย HTML5, CSS3 และ JavaScript ES6+',
      'สร้าง Responsive UI ด้วย Tailwind CSS หรือ Bootstrap และใช้ daisyUI ตามความเหมาะสม',
      'ใช้ GitHub Copilot, Cursor หรือ ChatGPT ช่วยพัฒนาโค้ด',
      'เชื่อมต่อ REST API และจัดการข้อมูล JSON',
      'ทดสอบและแก้ไขข้อผิดพลาดบนเบราว์เซอร์และอุปกรณ์ต่าง ๆ',
      'ปรับปรุงความเร็วและ Accessibility ของเว็บไซต์'
    ],
    quals: [
      'มีพื้นฐาน HTML5, CSS3 และ JavaScript',
      'เข้าใจ Responsive Web Design และ Layout',
      'ใช้ Git และ GitHub ได้',
      'มีความรู้พื้นฐาน HTTP, REST API และ JSON',
      'สามารถใช้ AI ช่วยเขียนโค้ดและตรวจสอบผลลัพธ์ได้',
      'มี Portfolio เว็บไซต์หรือโปรเจกต์จะได้รับการพิจารณาเป็นพิเศษ'
    ],
    benefits: [
      'ประกันสุขภาพและประกันสังคม',
      'สนับสนุนเครื่องมือ AI สำหรับการทำงาน',
      'มีระบบพี่เลี้ยงและการฝึกอบรมพนักงานใหม่',
      'โบนัสตามผลการปฏิบัติงานและโอกาสเติบโต'
    ]
  },
  {
    id: 3,
    title: 'Data Analyst & AI Specialist',
    company: 'Insight Digital Technology Co., Ltd.',
    salary: '28,000–50,000 THB/month',
    type: 'Full-time',
    mode: 'Hybrid',
    level: 'Junior–Mid Level',
    image: 'images/DataAnalyst&AiSpecialist.jpg',
    short: 'วิเคราะห์ข้อมูลด้วย SQL, Dashboard และ AI เพื่อช่วยองค์กรตัดสินใจได้ดีขึ้น',
    desc: 'วิเคราะห์ข้อมูลเพื่อช่วยองค์กรวางแผนธุรกิจและตัดสินใจอย่างมีประสิทธิภาพ โดยใช้ Data Analytics และ AI ในการค้นหารูปแบบข้อมูล สร้างรายงาน และนำเสนอข้อมูลในรูปแบบที่เข้าใจง่าย',
    duties: [
      'รวบรวม ตรวจสอบ และทำความสะอาดข้อมูล',
      'ใช้ SQL และ Excel ในการจัดการและวิเคราะห์ข้อมูล',
      'สร้าง Dashboard ด้วย Power BI หรือ Tableau',
      'ใช้ AI ช่วยสรุปข้อมูลและลดขั้นตอนการทำรายงาน',
      'นำเสนอผลการวิเคราะห์ให้ทีมธุรกิจ',
      'ตรวจสอบความถูกต้อง ความปลอดภัย และความเป็นส่วนตัวของข้อมูล'
    ],
    quals: [
      'จบด้าน IT, Computer Science, Statistics, Data Science หรือสาขาที่เกี่ยวข้อง',
      'มีพื้นฐาน SQL, Excel และ Data Analytics',
      'เข้าใจสถิติพื้นฐานและ Data Visualization',
      'หากใช้ Power BI, Tableau หรือ Python ได้จะได้รับการพิจารณาเป็นพิเศษ',
      'สื่อสารข้อมูลให้ผู้ที่ไม่ใช่สายเทคนิคเข้าใจได้',
      'มีความละเอียดรอบคอบและคำนึงถึงจริยธรรม AI'
    ],
    benefits: [
      'ประกันสุขภาพและประกันสังคม',
      'งบพัฒนาทักษะด้าน Data และ AI',
      'สนับสนุนการสอบ Certificate',
      'โอกาสเติบโตสู่ Data Scientist หรือ AI Specialist'
    ]
  }
];

/* =========================
   AI competency dimensions
========================= */
// ชื่อมิติของกรอบสมรรถนะ 4 ด้าน (รายละเอียดอยู่ใน index.html)
const dimNames = {
  literacy: 'AI Literacy',
  application: 'AI Application',
  creation: 'AI Creation & Innovation',
  ethics: 'Responsible AI & Ethics'
};

/* =========================
   Courses
========================= */
// cat = หมวดสำหรับปุ่มกรอง, levels = ระดับที่ใช้กรอง
const courses = [
  {
    id: 1, name: 'Microsoft Azure AI Fundamentals', provider: 'Microsoft Learn',
    image: 'images/MicrosoftAzureAIFundamentals.jpg',
    category: 'Certificate Preparation', cat: 'Certificate', levelLabel: 'Beginner', levels: ['Beginner'],
    desc: 'เรียนรู้พื้นฐาน AI, Machine Learning และการประยุกต์ใช้ AI บน Azure เหมาะสำหรับผู้เริ่มต้นที่ต้องการเข้าใจแนวคิด AI และเตรียมความพร้อมสำหรับการสอบ Certification ที่เกี่ยวข้อง',
    topics: ['AI Workloads', 'Machine Learning Basics', 'Computer Vision', 'Natural Language Processing', 'Generative AI Fundamentals'],
    duration: 'Self-paced', price: 'Free learning content; exam fee may apply',
    priceNote: 'เนื้อหาเรียนฟรีไม่ได้หมายความว่าการสอบรับรองฟรีด้วย',
    audience: 'ผู้เริ่มต้นที่อยากเข้าใจ AI และสนใจสอบ Certification', skills: 'ไม่ต้องมีพื้นฐานเขียนโปรแกรม',
    cert: 'ใช้เตรียมสอบ Certification ที่เกี่ยวข้อง ค่าสอบแยกต่างหากและเป็นไปตามเงื่อนไขของผู้ให้บริการ',
    dims: ['literacy']
  },
  {
    id: 2, name: 'Google Cloud Generative AI Leader', provider: 'Google Cloud',
    image: 'images/GoogleCloudGenerativeAILeader.jpg',
    category: 'Certification', cat: 'Certificate', levelLabel: 'Beginner', levels: ['Beginner'],
    desc: 'เรียนรู้แนวคิด Generative AI การนำ AI ไปใช้ในองค์กร และแนวทางการวางแผนใช้งาน AI ในธุรกิจ',
    topics: ['Generative AI Fundamentals', 'Business Applications', 'Responsible AI', 'AI Strategy'],
    duration: 'Self-paced + Exam Preparation',
    price: 'Free learning resources may be available; certification exam fee is separate and subject to current provider terms',
    priceNote: '',
    audience: 'ผู้ที่ทำงานสายธุรกิจหรือผู้บริหารที่ต้องการวางแผนใช้ AI', skills: 'ไม่ต้องมีพื้นฐานเขียนโปรแกรม',
    cert: 'เป็นหลักสูตรเตรียมสอบ Certification ค่าสอบแยกต่างหาก',
    dims: ['literacy', 'application', 'ethics']
  },
  {
    id: 3, name: 'NVIDIA Deep Learning Institute', provider: 'NVIDIA',
    image: 'images/NVIDIADeepLearningInstitute.jpg',
    category: 'Workshop / Technical Training', cat: 'Workshop', levelLabel: 'Beginner–Intermediate', levels: ['Beginner', 'Intermediate'],
    desc: 'ฝึกทักษะด้าน Deep Learning, Data Science และ Generative AI ผ่านเนื้อหาที่เน้นการลงมือทำ',
    topics: ['Deep Learning Fundamentals', 'Neural Networks', 'GPU Computing', 'Generative AI'],
    duration: 'Depends on selected course',
    price: 'Depends on course; some learning resources are free and some workshops are paid',
    priceNote: '',
    audience: 'ผู้เรียนที่อยากลงมือทำ Deep Learning จริง', skills: 'พื้นฐาน Python จะช่วยให้เรียนได้ง่ายขึ้น',
    cert: 'บางหลักสูตรอาจมี Certificate ตรวจสอบเงื่อนไขกับผู้ให้บริการ',
    dims: ['application', 'creation']
  },
  {
    id: 4, name: 'AWS Skill Builder — AI Learning', provider: 'Amazon Web Services',
    image: 'images/AWSSkillBuilder — AI Learning.jpg',
    category: 'Online Learning', cat: 'Online Course', levelLabel: 'Beginner–Intermediate', levels: ['Beginner', 'Intermediate'],
    desc: 'เรียนรู้การประยุกต์ใช้ AI และ Machine Learning บน Cloud รวมถึงแนวคิดการพัฒนา AI Application',
    topics: ['Generative AI', 'Machine Learning', 'AI on Cloud', 'Responsible AI'],
    duration: 'Depends on selected learning path', price: 'Free and paid options may be available',
    priceNote: '',
    audience: 'ผู้ที่สนใจ AI บน Cloud', skills: 'ความรู้พื้นฐานเรื่อง Cloud ช่วยได้ แต่ไม่บังคับ',
    cert: 'บางเส้นทางอาจเชื่อมกับ Certification ตรวจสอบกับผู้ให้บริการ',
    dims: ['literacy', 'application', 'ethics']
  },
  {
    id: 5, name: 'Prompt Engineering for AI Applications Workshop', provider: 'Brainrot AI Lab',
    image: 'images/PromptEngineeringforAIApplicationsWorkshop.jpg',
    category: 'Workshop', cat: 'Workshop', levelLabel: 'Beginner', levels: ['Beginner'],
    desc: 'ฝึกเขียน Prompt เพื่อสั่งงาน AI ให้ได้ผลลัพธ์ที่มีประสิทธิภาพ ทดลองใช้ AI ช่วยสรุปเอกสาร วิเคราะห์ข้อมูล และพัฒนาโค้ด พร้อมเรียนรู้การตรวจสอบคำตอบจาก AI',
    topics: ['Prompt Design', 'Context and Instructions', 'Output Evaluation', 'Responsible AI Usage', 'Hands-on Exercises'],
    duration: '3 Hours', price: '499 THB',
    priceNote: '',
    audience: 'มือใหม่ที่อยากใช้ AI ทำงานให้ได้ผลดีขึ้น', skills: 'ไม่ต้องมีพื้นฐาน',
    cert: 'รายละเอียด Certificate ประกาศโดยผู้จัดกิจกรรม',
    dims: ['application', 'ethics']
  },
  {
    id: 6, name: 'Responsible AI, Data Privacy & AI Governance Seminar', provider: 'Brainrot AI Lab',
    image: 'images/ResponsibleAI,DataPrivacy&AIGovernanceSeminar.jpg',
    category: 'Seminar', cat: 'Seminar', levelLabel: 'Beginner–Intermediate', levels: ['Beginner', 'Intermediate'],
    desc: 'สัมมนาเรื่องการใช้ AI อย่างรับผิดชอบ ความเป็นส่วนตัวของข้อมูล และแนวทางกำกับดูแล AI ในองค์กร',
    topics: ['Responsible AI', 'Data Privacy', 'AI Governance', 'AI Bias'],
    duration: '2 Hours', price: '299 THB',
    priceNote: '',
    audience: 'ผู้สมัครงานและผู้ที่ใช้ AI ในการทำงาน', skills: 'ไม่ต้องมีพื้นฐาน',
    cert: 'รายละเอียด Certificate ประกาศโดยผู้จัดกิจกรรม',
    dims: ['ethics', 'literacy']
  }
];

/* =========================
   Highlights
========================= */
// [อีโมจิ, หัวข้อ, คำอธิบาย] — หน้า About แสดงครบ 6 ข้อ ส่วนหน้า Home ตัดข้อแรกออก เหลือ 5 ข้อ
const highlights = [
  ['🌱', 'No Skill? No Problem.', 'เปิดโอกาสให้ผู้เริ่มต้นเรียนรู้และพัฒนาตัวเอง'],
  ['🧭', 'AI-Powered Career Development', 'สนับสนุนการค้นหาอาชีพและทักษะที่เหมาะสม'],
  ['📝', 'Skill Assessment', 'ประเมินทักษะเบื้องต้นและแนะนำสิ่งที่ควรพัฒนา'],
  ['📚', 'Learn Before You Apply', 'เรียนรู้ทักษะก่อนสมัครงาน'],
  ['🗂️', 'Portfolio First', 'สนับสนุนการสร้างผลงานเพื่อแสดงความสามารถ'],
  ['☕', 'Beginner-Friendly Community', 'สร้างสภาพแวดล้อมที่ทุกคนเรียนรู้ได้โดยไม่ถูกกดดัน']
];

/* =========================
   Helpers
========================= */
const findJob = id => jobs.find(j => j.id === Number(id));
const findCourse = id => courses.find(c => c.id === Number(id));
