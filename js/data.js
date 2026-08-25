/* Single source of truth for all portfolio content. Consumed by apps.js, terminal.js, search.js. */

const DATA = {
  profile: {
    name: "Bhagyasree Roy",
    role: "Software Engineer",
    tagline: "Turning complex data into clear decisions.",
    bio: "Computer Applications graduate (MCA, CHRIST University) with hands-on experience in data analysis, system design, and full-stack development. Proficient in Python, SQL, and BI tooling — from building end-to-end pipelines to interactive analytics dashboards.",
    email: "bhagyasree.roy04@gmail.com",
    phone: "+91 877-769-6080",
    location: "Bangalore, India",
    resumeUrl: "assets/resume/Bhagyasree_Roy_Resume.pdf",
    githubs: [
      { label: "GitHub", url: "https://github.com/Bhagyasreeroy" },
      { label: "GitHub (eersay)", url: "https://github.com/eersay" },
    ],
    linkedin: "https://www.linkedin.com/in/bhagyasree-roy",
  },

  experience: [
    {
      role: "Junior Software Developer Intern",
      company: "IOLITE Technologies (P) Ltd.",
      date: "Nov 2024 – Mar 2025",
      points: [
        "Contributed to architecture and feature development of an online degree platform, translating business needs into technical specifications.",
        "Conducted end-to-end testing and performance optimization, resolving functional defects to improve system reliability.",
        "Collaborated with cross-functional teams (design, content, QA) to ensure smooth data integration and consistent workflows.",
      ],
    },
    {
      role: "Deputy Creative Head",
      company: "Christ Consulting, Bangalore",
      date: "Jul 2023 – Jul 2024",
      points: [
        "Managed project timelines and deliverables for multiple concurrent client engagements, consistently meeting deadlines.",
        "Analyzed client requirements and translated them into structured project briefs, improving team alignment.",
      ],
    },
    {
      role: "Club Manager",
      company: "UABLE (Remote)",
      date: "Nov 2021 – Jan 2022",
      points: [
        "Collected and analyzed participant feedback to drive iterative improvements in event quality and engagement.",
        "Coordinated 10+ virtual events, managing logistics, budgets, and multi-stakeholder communications.",
      ],
    },
  ],

  projects: [
    {
      name: "MAGE — Multi-Agent Goal-conditioned EDA",
      github: "https://github.com/eersay/MAGE",
      live: "https://frontend-production-6d15.up.railway.app",
      featured: true,
      desc: "Multi-agent AI system for exploratory data analysis: upload a dataset, state a goal in plain English, and a pipeline of specialist agents (ingestion, statistical mining, visualization, RAG-grounded recommendation) profiles and explains it back — every recommendation cited against a retrievable methodology knowledge base, not just an LLM opinion. Next.js 16 frontend, FastAPI backend, Postgres, FAISS/Chroma vector store, JWT + Google OAuth.",
      tags: ["Python", "Next.js", "FastAPI", "PostgreSQL", "RAG", "FAISS", "Multi-Agent"],
    },
    {
      name: "Procto",
      github: "https://github.com/eersay/Procto",
      desc: "AI-powered proctoring system with React/Vite frontend, Express REST API, and PostgreSQL data layer. Containerized via Docker Compose. Shared TypeScript schemas enforce data consistency across system boundaries.",
      tags: ["TypeScript", "React", "Express", "PostgreSQL", "Docker"],
    },
    {
      name: "Silver Analytics Dashboard",
      github: "https://github.com/Bhagyasreeroy/Silver-Analytics-Dashboard",
      desc: "Interactive analytics dashboard visualizing historical silver price trends and state-wise purchase data across India using geospatial shapefiles. Time-series processing and geographic data joins enable multi-dimensional commodity analysis.",
      tags: ["Python", "Plotly/Dash", "Pandas", "GeoPandas"],
    },
    {
      name: "Consumer Behaviour Analysis",
      github: "https://github.com/Bhagyasreeroy/shopping-behaviour",
      desc: "Analyzed a structured consumer dataset to uncover purchasing patterns and segment customer behavior. Applied EDA and visualization techniques to present stakeholder-ready retail insights.",
      tags: ["Python", "Pandas", "Scikit-learn", "Matplotlib", "Seaborn"],
    },
    {
      name: "HEAL",
      github: "https://github.com/neha-n-git/HEAL",
      desc: "Mental health web platform with personalized health tracking tools and secure communication channels for users and professionals. Full-stack implementation from UI to backend.",
      tags: ["HTML", "CSS", "JavaScript", "PHP", "JSON"],
    },
    {
      name: "Christite",
      github: "https://github.com/eersay/Christite",
      desc: "Comprehensive student mobile app for CHRIST University with secure authentication, timetable management, real-time announcements, and push notifications via cloud backend.",
      tags: ["React Native", "Expo", "Appwrite", "Node.js"],
    },
  ],

  skills: [
    { group: "Languages", items: ["Python", "SQL", "TypeScript", "JavaScript", "Java", "C"] },
    { group: "Data & Analytics", items: ["Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn", "GeoPandas", "Power BI", "WEKA", "Excel"] },
    { group: "Databases", items: ["PostgreSQL", "MySQL", "Appwrite", "Query Optimization"] },
    { group: "Development", items: ["React", "React Native", "Express.js", "PHP", "HTML/CSS", "Android Studio"] },
    { group: "DevOps & Tools", items: ["Docker", "Git/GitHub", "Google Colab", "Jupyter"] },
    { group: "Concepts", items: ["EDA", "Data Visualization", "System Design", "REST APIs", "Agile", "Requirements Analysis"] },
  ],

  education: [
    { degree: "Master of Computer Applications (MCA)", school: "CHRIST University, Bangalore", detail: "Jun 2025 – Present · Ongoing" },
    { degree: "Bachelor of Computer Applications (BCA)", school: "CHRIST University, Bangalore", detail: "Jul 2022 – Apr 2025 · CGPA 9.52 / 10 · 83%" },
  ],

  leadership: [
    "SAMAGRA (CS Association) – Head of Creatives",
    "WIST Women Coding Club – Core Member",
    "SDG Cell – Student Council",
    "SWO Art Cultural Team",
    "🏆 First Runner-Up, Open Weaver Makeathon",
  ],

  certs: [
    { id: "aws_cloud", title: "AWS Cloud Foundations", issuer: "AWS Academy", date: "May 2024", cat: "cloud", img: "assets/certs/aws_cloud.jpg" },
    { id: "google_cybersecurity", title: "Google Cybersecurity Professional Certificate V2", issuer: "Coursera / Google", date: "Jun 2023", cat: "security", img: "assets/certs/google_cybersecurity_v2.png", credly: "https://www.credly.com/badges/93a0fc8d-1ccf-4341-9e3d-806322dfa8dd/public_url" },
    { id: "public_speaking", title: "Public Speaking (Elite)", issuer: "NPTEL / IIT Roorkee", date: "Jul–Oct 2023", cat: "other", img: "assets/certs/public_speaking.jpg" },
    { id: "web_dev_udemy", title: "Complete Web Dev Bootcamp", issuer: "Udemy / Dr. Angela Yu", date: "Apr 2024", cat: "dev", img: "assets/certs/web_dev_udemy.jpg" },
    { id: "data_engineering_udemy", title: "Data Engineering 101", issuer: "Udemy", date: "Jun 2026", cat: "data", img: "assets/certs/data_engineering_udemy.jpg" },
    { id: "javascript_coursera", title: "Intro to JavaScript: The Basics", issuer: "Coursera Project Network", date: "Jul 2025", cat: "dev", img: "assets/certs/javascript_coursera.jpg" },
    { id: "machine_learning", title: "Machine Learning", issuer: "Simplilearn SkillUp", date: "May 2024", cat: "data", img: "assets/certs/machine_learning.jpg" },
    { id: "bi_tableau", title: "Business Intelligence with Tableau", issuer: "Infosys Springboard", date: "Sep 2024", cat: "data", img: "assets/certs/bi_tableau.jpg" },
    { id: "cloud_computing", title: "Introduction to Cloud Computing", issuer: "Simplilearn SkillUp", date: "Sep 2024", cat: "cloud", img: "assets/certs/cloud_computing.jpg" },
    { id: "google_cloud_engineering", title: "Google Cloud Engineering Certificate", issuer: "Google Cloud", date: "Aug 2026", cat: "cloud", img: "assets/certs/google_cloud_engineering.png", credly: "https://www.credly.com/badges/418a1b09-03ef-4e13-95fd-888b77c63fa8/public_url" },
    { id: "intermediate_python", title: "Intermediate Python", issuer: "DataCamp", date: "Jun 2025", cat: "data", img: "assets/certs/intermediate_python.jpg" },
    { id: "oop_python", title: "Intermediate OOP in Python", issuer: "DataCamp", date: "Jun 2025", cat: "data", img: "assets/certs/oop_python.jpg" },
    { id: "pandas_datacamp", title: "Data Manipulation with Pandas", issuer: "DataCamp", date: "Jul 2025", cat: "data", img: "assets/certs/pandas_datacamp.jpg" },
    { id: "kaggle_python", title: "Winning a Kaggle Competition in Python", issuer: "DataCamp", date: "Jul 2025", cat: "data", img: "assets/certs/kaggle_python.jpg" },
    { id: "python_data_structures", title: "Python for Beginners: Data Structures", issuer: "Coursera Project Network", date: "Jun 2025", cat: "data", img: "assets/certs/python_data_structures.jpg" },
    { id: "agile_scrum_cert", title: "Agile Scrum Certification", issuer: "Infosys Springboard", date: "Apr 2024", cat: "dev", img: "assets/certs/agile_scrum_cert.jpg" },
    { id: "software_eng_agile", title: "Software Engineering & Agile Dev", issuer: "Infosys Springboard", date: "Mar 2024", cat: "dev", img: "assets/certs/software_eng_agile.jpg" },
    { id: "agile_scrum_practice", title: "Agile Scrum in Practice", issuer: "Infosys Springboard", date: "Mar 2024", cat: "dev", img: "assets/certs/agile_scrum_practice.jpg" },
    { id: "kotlin_android", title: "Mastering Kotlin for Android Dev", issuer: "Infosys Springboard", date: "Sep 2024", cat: "dev", img: "assets/certs/kotlin_android.jpg" },
    { id: "software_engineering", title: "Software Engineering", issuer: "Infosys Springboard", date: "Mar 2024", cat: "dev", img: "assets/certs/software_engineering.jpg" },
    { id: "makeathon", title: "Open Weaver Makeathon – First Runner-Up 🏆", issuer: "CHRIST University", date: "Sep 2023", cat: "other", img: "assets/certs/makeathon.png" },
  ],
};
