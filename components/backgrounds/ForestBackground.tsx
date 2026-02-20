export default function ForestBackground() {
  return (
    <svg className="fixed inset-0 w-full h-full -z-10" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E0C3FC" />
          <stop offset="100%" stopColor="#8EC5FC" />
        </linearGradient>
      </defs>
      
      {/* Sky */}
      <rect width="1200" height="800" fill="url(#skyGradient)" />
      
      {/* Sun */}
      <circle cx="950" cy="150" r="60" fill="#FFD93D" opacity="0.8" />
      <circle cx="950" cy="150" r="70" fill="#FFD93D" opacity="0.3" />
      
      {/* Clouds */}
      <g opacity="0.6">
        <ellipse cx="200" cy="120" rx="60" ry="30" fill="white" />
        <ellipse cx="230" cy="120" rx="50" ry="25" fill="white" />
        <ellipse cx="170" cy="120" rx="40" ry="20" fill="white" />
        
        <ellipse cx="600" cy="180" rx="70" ry="35" fill="white" />
        <ellipse cx="640" cy="180" rx="60" ry="30" fill="white" />
        
        <ellipse cx="900" cy="100" rx="50" ry="25" fill="white" />
        <ellipse cx="930" cy="100" rx="45" ry="22" fill="white" />
      </g>
      
      {/* Mountains */}
      <path d="M 0 500 L 300 300 L 600 500 Z" fill="#A8DADC" opacity="0.7" />
      <path d="M 400 500 L 700 250 L 1000 500 Z" fill="#457B9D" opacity="0.7" />
      <path d="M 800 500 L 1100 320 L 1200 500 Z" fill="#A8DADC" opacity="0.7" />
      
      {/* Trees */}
      <g>
        {/* Tree 1 */}
        <rect x="100" y="550" width="20" height="80" fill="#8B4513" rx="3" />
        <circle cx="110" cy="540" r="40" fill="#2D6A4F" />
        <circle cx="90" cy="550" r="35" fill="#40916C" />
        <circle cx="130" cy="550" r="35" fill="#40916C" />
        
        {/* Tree 2 */}
        <rect x="250" y="580" width="18" height="70" fill="#8B4513" rx="3" />
        <circle cx="259" cy="570" r="35" fill="#2D6A4F" />
        <circle cx="240" cy="580" r="30" fill="#52B788" />
        <circle cx="278" cy="580" r="30" fill="#52B788" />
        
        {/* Tree 3 */}
        <rect x="850" y="560" width="22" height="75" fill="#8B4513" rx="3" />
        <circle cx="861" cy="550" r="38" fill="#2D6A4F" />
        <circle cx="840" cy="560" r="33" fill="#40916C" />
        <circle cx="882" cy="560" r="33" fill="#40916C" />
        
        {/* Tree 4 */}
        <rect x="1050" y="590" width="16" height="65" fill="#8B4513" rx="3" />
        <circle cx="1058" cy="585" r="32" fill="#2D6A4F" />
        <circle cx="1040" cy="593" r="28" fill="#52B788" />
        <circle cx="1076" cy="593" r="28" fill="#52B788" />
      </g>
      
      {/* Grass */}
      <ellipse cx="200" cy="700" rx="150" ry="30" fill="#95D5B2" opacity="0.6" />
      <ellipse cx="500" cy="720" rx="200" ry="40" fill="#95D5B2" opacity="0.6" />
      <ellipse cx="900" cy="710" rx="180" ry="35" fill="#95D5B2" opacity="0.6" />
      
      {/* Flowers */}
      <g>
        <circle cx="180" cy="680" r="5" fill="#FF6B9D" />
        <circle cx="220" cy="690" r="5" fill="#FFC6FF" />
        <circle cx="480" cy="700" r="5" fill="#FF6B9D" />
        <circle cx="520" cy="710" r="5" fill="#FFD93D" />
        <circle cx="880" cy="695" r="5" fill="#FFC6FF" />
        <circle cx="920" cy="705" r="5" fill="#FF6B9D" />
      </g>
    </svg>
  );
}
