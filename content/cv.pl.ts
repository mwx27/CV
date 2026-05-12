import type { CVData } from "./types";

export const cvPl: CVData = {
  name: { first: "Maciej", last: "Wojda" },
  tagline: [
    "Otwarty, ambitny inżynier z silną **pasją** do programowania.",
    "Nastawiony na **rozwiązywanie problemów**, nie boi się wyzwań.",
    "**Proaktywny**, mocno zaangażowany i zmotywowany. Kreatywny, z wizją.",
    "Entuzjasta **czystego kodu** i nowoczesnych technologii.",
    "Uczestniczył w ponad **30** projektach IT w różnych branżach.",
  ],
  photo: "/photo.png",
  contact: [
    { label: "+48 519-727-145", href: "tel:+48519727145", icon: "phone" },
    { label: "maciej@wojda.tech", href: "mailto:maciej@wojda.tech", icon: "email" },
    { label: "github.com/mwx27", href: "https://github.com/mwx27", icon: "github" },
    { label: "linkedin.com/in/maciej-wojda", href: "https://linkedin.com/in/maciej-wojda", icon: "linkedin" },
  ],
  sections: {
    itExperience: "Doświadczenie IT",
    engineeringExperience: "Doświadczenie inżynierskie",
    education: "Wykształcenie",
    skills: "Umiejętności",
    hobby: "Hobby (poza kodem)",
  },
  labels: {
    techStack: "Tech stack:",
    skillsTechStack: "Tech stack:",
    skillsLegacy: "Używane dawno temu:",
    skillsOther: "Inne umiejętności i wiedza:",
    skillsSoft: "Umiejętności miękkie:",
    skillsLanguages: "Języki obce:",
    downloadPdf: "Pobierz PDF",
    others: "Inne",
  },
  itExperience: [
    {
      title: "Software engineer",
      company: "Nexus (aplikacja mobilna na Android/iOS)",
      logo: "/logos/nexus.png",
      period: "12.2024 – 11.2025",
      employmentType: "część etatu",
      bullets: [
        "Modernizacja 4-letniego legacy code (aplikacja do inwestowania w kryptowaluty, nieruchomości, akcje)",
      ],
      techStack: "React Native, TypeScript, ExpoGo, Redux",
    },
    {
      title: "Software engineer",
      company: "Empatify (aplikacja mobilna na Android/iOS)",
      logo: "/logos/empatify.png",
      period: "06.2023 – obecnie",
      employmentType: "część etatu",
      bullets: [
        "Wprowadzenie nowych standardów kodu — duży refactor ciężkiego legacy code całej aplikacji",
        "Dalszy rozwój aplikacji, analityka danych",
        "Burze mózgów nad UI, UX i funkcjonalnościami",
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
          period: "08.2023 – 12.2024, pełny etat",
          bullets: [
            "Odpowiedzialność za wszystkie aplikacje FE: gamified DEX, launchpad, landing page i inne",
            "Implementacja zmian strategicznych: agregator DEX, multi-chain, bridge, migracja płynności…",
            "Okazjonalne kontrybucje do backendu (NestJS)",
            "Dbanie o bezpieczeństwo",
          ],
        },
        {
          company: "StarHeroes",
          logo: "/logos/starheroes.png",
          period: "08–09.2023",
          bullets: ["Stworzenie strony do mintowania i burningu NFT, w tym ujawniania zaszyfrowanych nagród"],
        },
        {
          company: "GameSwift",
          logo: "/logos/gameswift.png",
          period: "08.2022 – 06.2023",
          bullets: [
            "Rozwój platformy gamingowej oraz landing page / launchera, praca w zespole",
            "Aktywny wkład w koncepcje UI/UX, burze mózgów nad standardami czystego kodu",
            "Mentoring juniorów w zakresie projektów i dobrych praktyk",
          ],
        },
        {
          company: "StarTerra",
          logo: "/logos/starterra.png",
          period: "01–06.2022",
          bullets: [
            "Utrzymanie i rozwój IDO Launchpada",
            "Odpowiedzialność za najwyższą jakość treści",
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
        "Mikroserwis z REST API zwracający szczegóły ze struktur danych modeli 3D z Inventora i innych plików CAD",
        "Pluginy Assembly Analyzer dla oprogramowania CAD (komunikacja przez REST API z aplikacją webową)",
        "Inne pluginy do oprogramowania Autodesk dla firm zewnętrznych",
      ],
      techStack: "JavaScript, Node.JS, VB.Net, VBA, Batch Script, Google Cloud, AWS, Windows Server",
    },
    {
      title: "Frontend/fullstack developer, inne startupy",
      period: "2021, 2023",
      subRoles: [
        {
          company: "Toshipad",
          period: "07.2023",
          bullets: ["Launchpad dla tokenów w standardzie BRC-20 (oparty na inskrypcjach Bitcoin)"],
        },
        {
          company: "Zjem Co Mam (proof of concept)",
          period: "10–12.2021",
          bullets: [
            "Scraping treści popularnych stron kulinarnych",
            "Backend: REST API do agregacji/edycji/wyszukiwania danych",
          ],
        },
      ],
      techStack: "JavaScript, TypeScript, Node.JS, Express.js, PostgreSQL, React.JS, Ant Design, SASS/SCSS",
    },
    {
      title: "Inne zlecenia freelance IT",
      company: "Maciej Wojda Challenge Accepted",
      period: "2018 – 2022",
      bullets: [
        "Web development we współpracy z podwykonawcą",
        "Pozyskiwanie i wizualizacja danych (VBA, Python)",
        "Automatyzacja w Excelu i arkuszach Google",
        "Migracja między systemami mailingowymi",
        "Algorytmy do kojarzenia spotkań na eventach networkingowych",
      ],
      techStack: "HTML, CSS, jQuery, VBA, Python, SQL",
    },
  ],
  engineeringExperience: [
    {
      title: "Projektant rurociągów / specjalista ds. automatyzacji / inżynier mechanik",
      company: "ILF Consulting Engineers",
      logo: "/logos/ilf.png",
      logoSize: "lg",
      period: "2018 – 2021",
      bullets: [
        "Szczegółowy projekt rurociągów dla systemów przesyłu wody Jubail-Riyadh, Rabigh-Jeddah",
        "Zapewnienie wysokiej jakości i precyzji danych na tysiącach rysunków izometrycznych",
        "Dogłębne poznanie struktur danych Autodesk w celu tworzenia narzędzi dla projektów rurociągów",
        "Współpraca z zespołami wewnętrznymi: architektonicznym, sanitarnym, budowlanym, drogowym, elektrycznym, mechanicznym",
        "Komunikacja z zewnętrznym zespołem procesowym (niemiecki ILF) oraz dostawcami (producenci zbiorników)",
      ],
      techStack: "AutoCAD, AutoCAD Plant 3D, MS Office, VBA, VB.Net, SQL",
    },
    {
      title: "Inżynier R&D",
      company: "Projekt R&D wielopaliwowego silnika beczkowego HCCI, PW",
      logo: "/logos/wut.png",
      logoSize: "lg",
      period: "2016 – 2017",
      bullets: [
        "Analiza wytrzymałościowa MES części silnika, w tym zjawiska pełzania materiału",
        "Automatyzacja skryptów do analiz MES, pluginy do CAD, aplikacje VBA w Excelu",
        "Badanie rynku kompresorów paliwowych, komunikacja z producentami",
        "Komunikacja z dostawcami, podwykonawcami, producentami",
        "Produkcja/montaż części silnika, narzędzi montażowych, hamowni silnika",
      ],
      techStack: "Siemens NX, MS Office, VBA, VB.Net, SQL, Ansys, APDL",
    },
  ],
  education: [
    {
      degree: "Energetyka",
      school: "Politechnika Warszawska",
      period: "2013 – 2019",
      details: [
        "Praca inżynierska: Analiza MES procesów pełzania w wirniku turbiny układu turbocompound",
        "Praca magisterska: Model magazynu energii w postaci skroplonego powietrza, sprzężonego z procesem regazyfikacji terminalu LNG w Świnoujściu",
      ],
    },
    {
      degree: "Odnawialne Źródła Energii",
      school: "Szkoła Główna Gospodarstwa Wiejskiego",
      period: "2011 – 2015",
      details: ["Praca inżynierska: Wpływ rozwoju OZE na bezpieczeństwo energetyczne Polski"],
    },
    {
      degree: "Inżynieria Środowiska",
      school: "Politechnika Warszawska",
      period: "2011 – 2013",
      details: ["Studia anglojęzyczne z obcokrajowcami, zmienione na energetykę"],
    },
  ],
  otherEducation: {
    title: "Inne",
    period: "2021",
    items: [
      { prefix: "Algorytmy w", label: "codility.com", href: "https://codility.com" },
      { prefix: "Solidity w", label: "cryptozombies.io", href: "https://cryptozombies.io" },
    ],
  },
  skills: {
    techStack:
      "NextJS, Vite, React JS, JavaScript, TypeScript, Redux, Tailwind CSS, Styled Components, SASS/SCSS, React Native, Expo Go, FireBase, ReactQuery, Jotai, Express, NestJS, Axios, Node.js, Ethers, WAGMI, GraphQL, PostgreSQL, MySQL, SQLite, MongoDB, VBA, VB.NET, C#, Python, PHP, AWS, Google Cloud, NewRelic, Docker, CI/CD.",
    legacy: "C, C++, Java, Free Pascal",
    other: "Algorytmy, struktury danych, kryptografia, cierpliwość i wytrwałość w mierzeniu się z problemami i zawiłym legacy code",
    soft: "Odpowiedzialność, komunikacja, empatia, priorytetyzacja zadań, myślenie analityczne, szybka adaptacja do zmieniających się warunków",
    languages: "Angielski (zaawansowany C1), hiszpański (podstawowy), niemiecki (podstawowy)",
  },
  hobbies: "Narciarstwo, jazda na łyżwach, nurkowanie",
  gdprNotice:
    "Wyrażam zgodę na przetwarzanie moich danych osobowych zawartych w niniejszym dokumencie do realizacji procesu rekrutacji zgodnie z ustawą z dnia 10 maja 2018 roku o ochronie danych osobowych (Dz. Ustaw z 2018, poz. 1000) oraz zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (RODO).",
};
