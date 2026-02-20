export default function NightSkyBackground() {
  return (
    <svg className="fixed inset-0 w-full h-full -z-10" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="nightSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0F2027" />
          <stop offset="50%" stopColor="#203A43" />
          <stop offset="100%" stopColor="#2C5364" />
        </linearGradient>
        <radialGradient id="moonGlow">
          <stop offset="0%" stopColor="#FFF" opacity="0.8" />
          <stop offset="100%" stopColor="#FFF" opacity="0" />
        </radialGradient>
      </defs>
      
      {/* Night Sky */}
      <rect width="1200" height="800" fill="url(#nightSky)" />
      
      {/* Stars */}
      <g fill="#FFF">
        <circle cx="100" cy="80" r="2" opacity="0.8" />
        <circle cx="250" cy="120" r="1.5" opacity="0.9" />
        <circle cx="180" cy="150" r="1" opacity="0.7" />
        <circle cx="400" cy="90" r="2" opacity="0.8" />
        <circle cx="500" cy="140" r="1.5" opacity="0.9" />
        <circle cx="350" cy="180" r="1" opacity="0.6" />
        <circle cx="650" cy="70" r="2" opacity="0.9" />
        <circle cx="720" cy="130" r="1.5" opacity="0.8" />
        <circle cx="580" cy="160" r="1" opacity="0.7" />
        <circle cx="850" cy="100" r="2" opacity="0.8" />
        <circle cx="920" cy="150" r="1.5" opacity="0.9" />
        <circle cx="780" cy="190" r="1" opacity="0.6" />
        <circle cx="1050" cy="85" r="2" opacity="0.9" />
        <circle cx="1120" cy="125" r="1.5" opacity="0.8" />
        <circle cx="980" cy="170" r="1" opacity="0.7" />
        
        <circle cx="150" cy="250" r="1.5" opacity="0.7" />
        <circle cx="300" cy="280" r="1" opacity="0.8" />
        <circle cx="450" cy="240" r="2" opacity="0.9" />
        <circle cx="600" cy="290" r="1.5" opacity="0.7" />
        <circle cx="750" cy="260" r="1" opacity="0.8" />
        <circle cx="900" cy="270" r="2" opacity="0.9" />
        <circle cx="1050" cy="250" r="1.5" opacity="0.8" />
      </g>
      
      {/* Moon */}
      <circle cx="950" cy="150" r="80" fill="url(#moonGlow)" />
      <circle cx="950" cy="150" r="50" fill="#F4F4F4" />
      <circle cx="935" cy="140" r="8" fill="#E0E0E0" opacity="0.5" />
      <circle cx="960" cy="165" r="6" fill="#E0E0E0" opacity="0.5" />
      <circle cx="945" cy="155" r="5" fill="#E0E0E0" opacity="0.5" />
      
      {/* Shooting star */}
      <g opacity="0.8">
        <line x1="200" y1="200" x2="280" y2="240" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
        <line x1="200" y1="200" x2="240" y2="220" stroke="#FFF" strokeWidth="1" opacity="0.5" />
      </g>
      
      {/* Mountains silhouette */}
      <path d="M 0 600 L 200 450 L 400 550 L 600 400 L 800 520 L 1000 420 L 1200 580 L 1200 800 L 0 800 Z" 
            fill="#0A1828" opacity="0.8" />
      
      {/* Trees silhouette */}
      <g fill="#0A1828" opacity="0.9">
        <path d="M 150 650 L 160 550 L 170 650 Z" />
        <path d="M 140 650 L 160 520 L 180 650 Z" />
        
        <path d="M 350 680 L 360 600 L 370 680 Z" />
        <path d="M 340 680 L 360 570 L 380 680 Z" />
        
        <path d="M 850 670 L 860 590 L 870 670 Z" />
        <path d="M 840 670 L 860 560 L 880 670 Z" />
        
        <path d="M 1050 690 L 1060 620 L 1070 690 Z" />
        <path d="M 1040 690 L 1060 590 L 1080 690 Z" />
      </g>
      
      {/* Fireflies */}
      <g>
        <circle cx="300" cy="650" r="3" fill="#FFE66D" opacity="0.8">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="500" cy="680" r="3" fill="#FFE66D" opacity="0.8">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="700" cy="660" r="3" fill="#FFE66D" opacity="0.8">
          <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="950" cy="690" r="3" fill="#FFE66D" opacity="0.8">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="1.8s" repeatCount="indefinite" />
        </circle>
      </g>
      
      {/* Ground */}
      <rect y="700" width="1200" height="100" fill="#0A1828" opacity="0.9" />
    </svg>
  );
}
