import type { CVData } from "./types";

export const cvEn: CVData = {
  name: { first: "Maciej", last: "Wojda" },
  tagline: [
    "Open minded, ambitious engineer with strong **passion** for programming.",
    "With **problems solving** approach, not afraid of challenges.",
    "**Proactive**, highly involved and motivated. Creative, visionary.",
    "Enthusiast of **clean code** and modern technologies.",
    "Participated in over **30** IT projects from various industries.",
  ],
  photo: "/photo.png",
  contact: [
    { label: "+48 519-727-145", href: "tel:+48519727145", icon: "phone" },
    { label: "maciej@wojda.tech", href: "mailto:maciej@wojda.tech", icon: "email" },
    { label: "github.com/mwx27", href: "https://github.com/mwx27", icon: "github" },
    { label: "linkedin.com/in/maciej-wojda", href: "https://linkedin.com/in/maciej-wojda", icon: "linkedin" },
  ],
  sections: {
    itExperience: "IT Experience",
    engineeringExperience: "Engineering Experience",
    education: "Education",
    skills: "Skills Summary",
    hobby: "No-Code Hobby",
  },
  labels: {
    techStack: "Tech stack:",
    skillsTechStack: "Tech stack:",
    skillsLegacy: "Used long time ago:",
    skillsOther: "Other dev skills & knowledge:",
    skillsSoft: "Soft skills:",
    skillsLanguages: "Foreign Languages:",
    downloadPdf: "Download PDF",
    others: "Others",
  },
  itExperience: [
    {
      title: "Software engineer",
      company: "Nexus (mobile app for Android/iOS)",
      logo: "/logos/nexus.png",
      period: "12.2024 – 11.2025",
      employmentType: "part time",
      bullets: [
        "Modernizing 4-year-old legacy code (app for investing in cryptocurrencies, real estates, stock)",
      ],
      techStack: "React Native, TypeScript, ExpoGo, Redux",
    },
    {
      title: "Software engineer",
      company: "Empatify (mobile app for Android/iOS)",
      logo: "/logos/empatify.png",
      period: "06.2023 – present",
      employmentType: "part time",
      bullets: [
        "Introducing brand new code standards — big refactor of whole app's heavy legacy code",
        "Further app development, data analytics",
        "Brainstorming about UI, UX, functionalities",
      ],
      techStack: "React Native, TypeScript, ExpoGo, FireBase, Sentry, Node.JS, SQLite",
    },
    {
      title: "Frontend web3 engineer",
      period: "01.2022 – 12.2024",
      subRoles: [
        {
          company: "SpartaDEX",
          logo: "/logos/spartadex.png",
          period: "08.2023 – 12.2024, full time",
          bullets: [
            "Owned all FE apps including: gamified DEX, launchpad, landing page, and others",
            "Implementation of strategic changes, i.e. dex aggregator, multi-chain support, bridge, liquidity migration…",
            "Occasional contribution to backend (NestJS)",
            "Taking care of security",
          ],
        },
        {
          company: "StarHeroes",
          logo: "/logos/starheroes.png",
          period: "08–09.2023",
          bullets: ["Development of NFT minting & burning page, including revealing rewards"],
        },
        {
          company: "GameSwift",
          logo: "/logos/gameswift.png",
          period: "08.2022 – 06.2023",
          bullets: [
            "Gaming platform & landing/launcher page development, working in team",
            "Active contribution to UI/UX concepts, brainstorming about clean coding standards",
            "Mentoring for junior engineers about projects and best practices",
          ],
        },
        {
          company: "StarTerra",
          logo: "/logos/starterra.png",
          period: "01–06.2022",
          bullets: [
            "Maintenance & development of IDO Launchpad",
            "Responsibility for best content quality",
          ],
        },
      ],
      techStack:
        "Next.JS, Vite, ReactJS, TypeScript, JavaScript, WAGMI, Ethers, React Query, Jotai, Docker, NestJS, Radix UI, Tailwind CSS, Styled Components, SASS/SCSS",
    },
    {
      title: "Software engineer",
      company: "4Dustry sp. z o.o.",
      logo: "/logos/4dustry.png",
      period: "01.2022 – 06.2023",
      bullets: [
        "Microservice with REST API returning details from data structures of Inventor 3D models and other CAD files",
        "Assembly Analyzer plugins for CAD software (communicating via REST API with web app)",
        "Other plugins to Autodesk Software for external companies",
      ],
      techStack: "JavaScript, Node.JS, VB.Net, VBA, Batch Script, Google Cloud, AWS, Windows Server",
    },
    {
      title: "Frontend/fullstack developer, other startups",
      period: "2021, 2023",
      subRoles: [
        {
          company: "Toshipad",
          period: "07.2023",
          bullets: ["Launchpad for tokens in standard BRC-20 (based on Bitcoin inscriptions)"],
        },
        {
          company: "Zjem Co Mam (proof of concept)",
          period: "10–12.2021",
          bullets: [
            "Content scraping of popular cooking pages",
            "Backend: REST API for aggregating/editing/querying data",
          ],
        },
      ],
      techStack: "JavaScript, TypeScript, Node.JS, Express.js, PostgreSQL, React.JS, Ant Design, SASS/SCSS",
    },
    {
      title: "Other IT freelance jobs",
      company: "Maciej Wojda Challenge Accepted",
      period: "2018 – 2022",
      bullets: [
        "Web development with subcontractor",
        "Data acquisition and visualisation (VBA, Python)",
        "Automation in Excel and Google spreadsheets",
        "Migration between mailing systems",
        "Algorithms for meetings on networking events",
      ],
      techStack: "HTML, CSS, jQuery, VBA, Python, SQL",
    },
  ],
  engineeringExperience: [
    {
      title: "Piping designer / automation specialist / Mechanical engineer",
      company: "ILF Consulting Engineers",
      logo: "/logos/ilf.png",
      logoSize: "lg",
      period: "2018 – 2021",
      bullets: [
        "Piping detailed design on Jubail-Riyadh, Rabigh-Jeddah water transmission systems",
        "Providing high quality and precision of data on thousands of isometric drawings",
        "Deep dive in data structures of Autodesk for developing custom tools on piping projects",
        "Cooperation with internal teams: architects, sanitary, civil, road, electric, mechanical",
        "Communication with external process team (German ILF), vendors (vessels manufacturers)",
      ],
      techStack: "AutoCAD, AutoCAD Plant 3D, MS Office, VBA, VB.Net, SQL",
    },
    {
      title: "R&D Engineer",
      company: "R&D project of multifuel barrel-type HCCI engine, WUT",
      logo: "/logos/wut.png",
      logoSize: "lg",
      period: "2016 – 2017",
      bullets: [
        "FEM strength analysis of engine parts, including material creeping phenomenon",
        "Automating scripts for FEM analysis, plugins for CAD software, VBA applications in Excel",
        "Research about fuel compressors, communication with manufacturers",
        "Communication with suppliers, subcontractors, manufacturers",
        "Manufacturing/assembling of engine parts, assembly tools, engine dyno",
      ],
      techStack: "Siemens NX, MS Office, VBA, VB.Net, SQL, Ansys, APDL",
    },
  ],
  education: [
    {
      degree: "Power Engineering",
      school: "Warsaw University of Technology",
      period: "2013 – 2019",
      details: [
        "Bachelor thesis: FEM analysis of creep processes in a turbine rotor of the turbocompound system",
        "Master thesis: Model of liquefied air energy storage coupled with regasification process of the LNG terminal in Świnoujście",
      ],
    },
    {
      degree: "Renewable Energy Sources",
      school: "Warsaw University of Life Sciences",
      period: "2011 – 2015",
      details: ["Bachelor thesis: RES development impact on energy safety of Poland"],
    },
    {
      degree: "Environmental Engineering",
      school: "Warsaw University of Technology",
      period: "2011 – 2013",
      details: ["English-language studies with foreigners, changed for power engineering"],
    },
  ],
  otherEducation: {
    title: "Others",
    period: "2021",
    items: [
      { prefix: "Algorithms at", label: "codility.com", href: "https://codility.com" },
      { prefix: "Solidity at", label: "cryptozombies.io", href: "https://cryptozombies.io" },
    ],
  },
  skills: {
    techStack:
      "NextJS, Vite, React JS, JavaScript, TypeScript, Redux, Tailwind CSS, Styled Components, SASS/SCSS, React Native, Expo Go, FireBase, ReactQuery, Jotai, Express, NestJS, Axios, Node.js, Ethers, WAGMI, GraphQL, PostgreSQL, MySQL, SQLite, MongoDB, VBA, VB.NET, C#, Python, PHP, AWS, Google Cloud, NewRelic, Docker, CI/CD.",
    legacy: "C, C++, Java, Free Pascal",
    other: "Algorithms, data structures, cryptography, patience and resilience for problems and cryptic legacy code",
    soft: "Responsibility, communication, empathy, tasks prioritizing, analytical thinking, fast adaptation to changing conditions",
    languages: "English (advanced C1), Spanish (elementary), German (elementary)",
  },
  hobbies: "Skiing, skating, diving",
  gdprNotice:
    "I agree to the processing of personal data provided in this document for realising the recruitment process pursuant to the Personal Data Protection Act of 10 May 2018 (Journal of Laws 2018, item 1000) and in agreement with Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 on the protection of natural persons with regard to the processing of personal data and on the free movement of such data, and repealing Directive 95/46/EC (General Data Protection Regulation).",
};
