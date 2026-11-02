# sparks
Hackathon Fanilo


Architecture du projet :

Nom du projet/
│
├── frontend/
│
├── backend/
│
├── ai/
│
├── storage/
│
├── database/
│
├── documentation/
│
├── scripts/
│
├── tests/
│
├── .gitignore
├── README.md
└── .env.example

Organisation détaillée :

#optionnel vous pouvez changer
frontend/
│
├── public/
│   ├── images/
│   ├── icons/
│   └── manifest.json
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── forms/
│   │   └── charts/
│   │
│   ├── pages/
│   │   ├── Home/
│   │   ├── Dashboard/
│   │   ├── Login/
│   │   ├── Register/
│   │   ├── FactChecking/
│   │   ├── Monitoring/
│   │   ├── Statistics/
│   │   ├── Sources/
│   │   └── Reports/
│   │
│   ├── modules/
│   │   ├── authentication/
│   │   ├── fact-checking/
│   │   ├── social-media/
│   │   ├── geolocation/
│   │   ├── credibility/
│   │   └── reporting/
│   │
│   ├── services/
│   │   ├── api.ts
│   │   ├── facebook.ts
│   │   └── auth.ts
│   │
│   ├── hooks/
│   ├── contexts/
│   ├── routes/
│   ├── database/
│   ├── offline/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
│
├── package.json
└── vite.config.ts  

backend/
│
├── app/
│   │
│   ├── api/
│   │   ├── routes/
│   │   └── dependencies.py
│   │
│   ├── core/
│   │   ├── config.py
│   │   ├── security.py
│   │   └── permissions.py
│   │
│   ├── models/
│   ├── schemas/
│   ├── repositories/
│   ├── services/
│   │
│   ├── modules/
│   │   ├── authentication/
│   │   ├── users/
│   │   ├── fact_checking/
│   │   ├── monitoring/
│   │   ├── social_media/
│   │   │   ├── facebook/
│   │   │   ├── instagram/
│   │   │   ├── tiktok/
│   │   │   └── x/
│   │   ├── media_analysis/
│   │   ├── credibility/
│   │   ├── geolocation/
│   │   ├── statistics/
│   │   ├── sources/
│   │   └── reporting/
│   │
│   └── main.py
│
├── workers/
├── migrations/
├── tests/
├── requirements.txt
└── .env

Intelligence artificielle
Nous séparons les modèles IA du backend pour faciliter leur évolution.
ai/
│
├── text/
│   ├── summarization/
│   ├── translation/
│   └── fact_analysis/
│
├── image/
│   ├── manipulation_detection/
│   └── image_analysis/
│
├── video/
│   ├── frame_extraction/
│   └── video_analysis/
│
├── local/
│   └── ollama/
│
├── online/
│   └── external_services/
│
└── models/
