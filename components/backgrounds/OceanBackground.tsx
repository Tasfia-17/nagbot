export default function OceanBackground() {
  return (
    <svg className="fixed inset-0 w-full h-full -z-10" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="oceanSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#87CEEB" />
          <stop offset="100%" stopColor="#B0E0E6" />
        </linearGradient>
        <linearGradient id="ocean" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4A90E2" />
          <stop offset="100%" stopColor="#2E5C8A" />
        </linearGradient>
      </defs>
      
      {/* Sky */}
      <rect width="1200" height="400" fill="url(#oceanSky)" />
      
      {/* Sun */}
      <circle cx="1000" cy="100" r="50" fill="#FFE66D" opacity="0.9" />
      <circle cx="1000" cy="100" r="65" fill="#FFE66D" opacity="0.3" />
      
      {/* Seagulls */}
      <g stroke="#666" strokeWidth="2" fill="none" opacity="0.6">
        <path d="M 300 150 Q 310 145 320 150" />
        <path d="M 320 150 Q 330 145 340 150" />
        
        <path d="M 700 200 Q 710 195 720 200" />
        <path d="M 720 200 Q 730 195 740 200" />
      </g>
      
      {/* Ocean */}
      <rect y="400" width="1200" height="400" fill="url(#ocean)" />
      
      {/* Waves */}
      <g opacity="0.3">
        <path d="M 0 450 Q 100 440 200 450 T 400 450 T 600 450 T 800 450 T 1000 450 T 1200 450" 
              stroke="#B0E0E6" strokeWidth="3" fill="none" />
        <path d="M 0 480 Q 100 470 200 480 T 400 480 T 600 480 T 800 480 T 1000 480 T 1200 480" 
              stroke="#B0E0E6" strokeWidth="3" fill="none" />
        <path d="M 0 520 Q 100 510 200 520 T 400 520 T 600 520 T 800 520 T 1000 520 T 1200 520" 
              stroke="#B0E0E6" strokeWidth="2" fill="none" />
      </g>
      
      {/* Island */}
      <ellipse cx="200" cy="380" rx="120" ry="40" fill="#D4A574" />
      <ellipse cx="200" cy="370" rx="100" ry="30" fill="#E8C4A0" />
      
      {/* Palm tree */}
      <rect x="190" y="320" width="12" height="60" fill="#8B6F47" rx="2" />
      <path d="M 196 320 Q 160 300 150 310" fill="#2D6A4F" />
      <path d="M 196 320 Q 180 290 170 295" fill="#40916C" />
      <path d="M 196 320 Q 232 300 242 310" fill="#2D6A4F" />
      <path d="M 196 320 Q 212 290 222 295" fill="#40916C" />
      <path d="M 196 320 Q 196 280 196 270" fill="#52B788" />
      
      {/* Boat */}
      <g transform="translate(800, 500)">
        <path d="M 0 0 L 60 0 L 50 20 L 10 20 Z" fill="#8B4513" />
        <rect x="25" y="-40" width="3" height="40" fill="#654321" />
        <path d="M 28 -35 L 50 -25 L 28 -15 Z" fill="#FFF" opacity="0.9" />
      </g>
      
      {/* Fish jumping */}
      <g opacity="0.7">
        <ellipse cx="450" cy="520" rx="15" ry="8" fill="#FF6B9D" />
        <path d="M 435 520 L 425 515 L 425 525 Z" fill="#FF6B9D" />
        
        <ellipse cx="950" cy="580" rx="12" ry="6" fill="#FFD93D" />
        <path d="M 938 580 L 930 576 L 930 584 Z" fill="#FFD93D" />
      </g>
      
      {/* Bubbles */}
      <g opacity="0.4" fill="#B0E0E6">
        <circle cx="300" cy="600" r="4" />
        <circle cx="320" cy="650" r="3" />
        <circle cx="600" cy="620" r="5" />
        <circle cx="900" cy="680" r="3" />
        <circle cx="1100" cy="640" r="4" />
      </g>
    </svg>
  );
}
